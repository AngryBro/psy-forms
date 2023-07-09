import { useParams } from "react-router-dom"
import { Page } from "../Page"
import { useCallback, useEffect, useState } from "react";
import "../css/ResearchResults.css";
import { ResultsBlock } from "../ResultsBlock";
import { GroupCreate } from "../GroupCreate";
import { Api } from "../Api";
import { API_ROUTES } from "../enums/API_ROUTES";
import { Spinner } from "../Spinner";
import { Button } from "../Button";
import {ANSWER_TYPE} from "../enums/ANSWER_TYPE";
import {BLOCK_TYPE} from "../enums/BLOCK_TYPE";
import { Alert } from "../Alert";

export const ResearchResults = ({appState}) => {

    const {slug} = useParams();

    const [data, setData] = useState(null);
    const [respondents, setRespondents] = useState([]);
    const [groups, setGroups] = useState([]);
    const [openedModalCreateGroup, setOpenedModalCreateGroup] = useState(false);
    const [error, setError] = useState(null);

    const [deletingGroups, setDeletingGroups] = useState({});

    const removeGroup = id => {
        setDeletingGroups(g => ({...g, [id]: true}));
        Api(API_ROUTES.GROUP_REMOVE)
        .auth()
        .post({id})
        .callback(({ok}) => {
            setDeletingGroups(g => ({...g, [id]: false}));
            if(ok) {
                fetchGroups();
            }
            else {
                setError("Ошибка удаления группы");
            }
        })
        .send();
    }

    const addTable = () => {
        let data1 = JSON.parse(JSON.stringify(data));
        data1.block_groups.push(data1.block_groups[data1.block_groups.length-1]);
        setData(data1);
    }

    const fetchGroups = useCallback(() => {
        Api(API_ROUTES.GROUPS)
        .auth()
        .get({slug})
        .callback(({ok, data}) => {
            if(ok) {
                setGroups(data);
            }
            else {
                setError("Ошибка загрузки групп");
            }
        })
        .send();
    }, [slug]);

    const fetchData = useCallback(() => {
        fetchGroups();
        Api(API_ROUTES.RESEARCH_GET)
        .auth()
        .get({slug})
        .callback(({ok, data}) => {
            if(ok) {
                setData({...data, block_groups:[0]});
            }
            else {
                setError("Ошибка загрузки исследования");
            }
        })
        .send();
        Api(API_ROUTES.RESPONDENTS)
        .auth()
        .get({research_slug: slug, group_id: 0})
        .callback(({ok, data}) => {
            if(ok) {
                setRespondents(data);
            }
            else {
                setError("Ошибка загрузки респондентов");
            }
        })
        .send();
    }, [slug, fetchGroups]);

    const methodics = data === null ? [] :
        data.blocks.filter(block => block.type === BLOCK_TYPE.METHODIC)
        .map(methodic => methodic.private_name);

    const scales = methodic => data === null ? [] :
        data.blocks
        .find(block => block.type === BLOCK_TYPE.METHODIC && block.private_name === methodic)
        .scales.map(scale => scale.name);

    const questionNumbers = methodic => {
        if(data === null) return [];
        let numbers = [];
        let methodicData = data.blocks.find(block => block.type === BLOCK_TYPE.METHODIC && block.private_name === methodic);
        methodicData.questions.forEach(question => {
            if(question.answer_type === ANSWER_TYPE.QUESTIONS) {
                question.answers.forEach(subquestion => numbers.push(subquestion.number));
            }
            else {
                numbers.push(question.number);
            }
        });
        return numbers;
    }

    const allAnswers = (methodic, questionNumber) => {
        if(data === null || respondents.length === 0) return [];
        let ans = {};
        let methodicData = data.blocks.find(block => block.type === BLOCK_TYPE.METHODIC && block.private_name === methodic);
        let questionMainNumber = questionNumber.split(".")[0];
        let question = methodicData.questions.find(q => q.number === questionMainNumber);
        const getAns = question => {
            if(question.answer_type === ANSWER_TYPE.MANY || question.answer_type === ANSWER_TYPE.ONE) {
                question.answers.forEach(answer => ans[answer.text] = true);
            }
            else if(question.answer_type === ANSWER_TYPE.SCALE) {
                for(let i = question.answers.min; i <= question.answers.max; i++) {
                    ans[i] = true;
                }
            }
        }
        if(questionMainNumber === questionNumber) {
            getAns(question);
        }
        else {
            getAns(question.answers.find(subq => subq.number === questionNumber))
        }
        respondents.forEach(respondent => {
            respondent.answers[methodic].answers
            .find(answer => answer.number === questionNumber)
            .texts
            .forEach(text => ans[text] = true);

        });
        return Object.keys(ans);
    }

    const headers = methodic => scales(methodic).concat(questionNumbers(methodic));

    useEffect(fetchData, [fetchData]);

    return <Page appState={appState} title="Результаты">
        <Alert onClose={setError}>{error}</Alert>
        <div className="research-results-header">Результаты исследования &laquo;{data !== null?`${data.public_name} (${data.private_name})`:""}&raquo;</div>
        {
        data !== null ?
        <div className="research-results-container">
            {
                data.block_groups.map((group_id, i) => 
                    <div key={i} className="research-results-block">
                        <ResultsBlock 
                            setOpenedModalCreateGroup={setOpenedModalCreateGroup}
                            removeGroup={removeGroup} 
                            deletingGroups={deletingGroups}
                            researchName={data.private_name} 
                            groups={groups} 
                            slug={slug} />
                    </div>    
                )
            }
            <div className="research-results-button-container">
                <div className="research-results-button">
                    <Button onClick={addTable}>Добавить ещё одну таблицу респондентов</Button>
                </div>
            </div>
        </div>
        :
        <div className="research-results-loader"><Spinner color="var(--purple-form)" /></div>
        }
        {
            openedModalCreateGroup?
            <GroupCreate setGroups={setGroups} slug={slug} allAnswers={allAnswers} methodics={methodics} scales={scales} headers={headers} onClose={() => setOpenedModalCreateGroup(false)} />
            :<></>
        }
    </Page>
}