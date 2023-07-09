import { useEffect, useState } from "react";
import { Respondents } from "./Respondents";
import { SlideFlag } from "./SlideFlag";
import "./css/ResultsBlock.css";
import { GroupsBlock } from "./GroupsBlock";
import { Api } from "./Api";
import { API_ROUTES } from "./enums/API_ROUTES";
import { Alert } from "./Alert";

export const ResultsBlock = ({researchName, conditionString, slug, groups, removeGroup, deletingGroups, setOpenedModalCreateGroup}) => {

    // const [group, setGroup] = useState(null);
    const [respondents, setRespondents] = useState([]);
    const [hiddenQuestions, setHiddenQuestions] = useState(false);
    const [scoreAnswers, setScoreAnswers] = useState(false);

    const [loadingAlert, setLoadingAlert] = useState(null);
    const [infoAlert, setInfoAlert] = useState(null);
    const [groupId, setGroupId] = useState(0);

    useEffect(() => {
        setLoadingAlert("Загрузка данных");
        Api(API_ROUTES.RESPONDENTS)
        .auth()
        .get({research_slug: slug, group_id: groupId}) 
        .callback(({ok, data, status}) => {
            setLoadingAlert(null);
            if(ok) {
                setRespondents(data);
            }
            else {
                setInfoAlert(`Произошла ошибка ${status} ${data}`);
            }
        })
        .send();
    }, [slug, groupId]);

    const scales = (methodic) => {
        if(!respondents.length || methodic === undefined) {
            return [];
        }
        let scales_array = [];
        respondents[0].answers[methodic].scales.forEach(scale => {
            scales_array.push(scale.name);
        });
        return scales_array;
    }

    const questions = (methodic) => {
        let question_numbers = [];
        if(respondents.length && methodic !== undefined) {
            respondents[0].answers[methodic].answers.forEach(answer => {
                question_numbers.push(answer.number);
            });
        }
        return question_numbers;
    }

    const tableHeaders = (methodic) => ["Номер", "Время ответа"].concat(methodic===undefined?[]:scales(methodic));

    const methodics = () => {
        return respondents.length?Object.keys(respondents[0].answers):[];
    }


    const groupName = () => {
        let gr =  groups.find(gr => gr.id === groupId);
        return gr === undefined? null : gr.name;
    }

    return <div className="results-block-container">
        <Alert onClose={setLoadingAlert} waiting={loadingAlert!==null}>{loadingAlert}</Alert>
        <Alert onClose={setInfoAlert}>{infoAlert}</Alert>
        <div className="results-groups-container">
            <GroupsBlock deletingGroups={deletingGroups} conditionString={conditionString} setGroupId={setGroupId} removeGroup={removeGroup} createGroup={() => setOpenedModalCreateGroup(true)} groups={groups} />
        </div>
        <div>
            <div className="results-flags-container">
                <div className="results-flag">
                    <SlideFlag onClick={() => setHiddenQuestions(h => !h)} flag={hiddenQuestions}>Скрыть ответы на вопросы:</SlideFlag>
                </div>
                <div className="results-flag" style={{opacity: hiddenQuestions?0:1}}>
                    <SlideFlag onClick={() => setScoreAnswers(s => !s)} flag={scoreAnswers}>Показывать баллы:</SlideFlag>
                </div>
            </div>
            {
                respondents.length?
                <div className="results-table-container">
                    <Respondents methodics={methodics()} scales={scales} questions={questions} tableHeaders={tableHeaders} group={groupName()} respondents={respondents} hiddenQuestions={hiddenQuestions} scoreAnswers={scoreAnswers} />
                </div>
                :
                <div className="results-table-empty">Ответы не найдены</div>
            }
            <div className="results-download">
                Скачать файл {researchName}{groupName()===null?"":"_"}{groupName()}.xlsx
            </div>
        </div>
    </div>
}