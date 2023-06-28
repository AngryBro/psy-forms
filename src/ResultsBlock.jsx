import { useState } from "react";
import { Respondents } from "./Respondents";
import { SlideFlag } from "./SlideFlag";
import "./css/ResultsBlock.css";
import { GroupsBlock } from "./GroupsBlock";

export const ResultsBlock = ({researchName, groups, groupId, setGroupId, removeGroup, setOpenedModalCreateGroup}) => {

    // const [group, setGroup] = useState(null);
    // const [respondents, setRespondents] = useState([]);
    const [hiddenQuestions, setHiddenQuestions] = useState(false);
    const [scoreAnswers, setScoreAnswers] = useState(false);

    const respondents = [
        {
            methodics: {
                "Захаров": {
                    answers: [{number: "1", text: "да", score: null}, {number: "2", text: "no", score: 0}],
                    scales: [{name: "Scare", score: 3}]
                },
                "Тревожность": {
                    answers: [{number: "1.1", text: "more yes", score: 3}, {number: "1.2", text: "exactly no", score: 4}],
                    scales: [{name: "anxiety", score: 7}]
                }
            },
            number: 1,
            created_at: (new Date()).toDateString()
        }
    ]

    for(let i = 0; i < 30; i++) {
        respondents.push({...respondents[respondents.length-1], number: i+2});
    }

    const scales = (methodic) => {
        if(!respondents.length) {
            return [];
        }
        let scales_array = [];
        respondents[0].methodics[methodic].scales.forEach(scale => {
            scales_array.push(scale.name);
        });
        return scales_array;
    }

    const questions = (methodic) => {
        let question_numbers = [];
        if(respondents.length) {
            respondents[0].methodics[methodic].answers.forEach(answer => {
                question_numbers.push(answer.number);
            });
        }
        return question_numbers;
    }

    const tableHeaders = (methodic) => ["Номер", "Время ответа"].concat(scales(methodic));

    const methodics = () => {
        return respondents.length?Object.keys(respondents[0].methodics):[];
    }


    const groupName = () => {
        let gr =  groups.find(gr => gr.id === groupId);
        return gr === undefined? null : gr.name;
    }

    return <div className="results-block-container">
        <div className="results-groups-container">
            <GroupsBlock setGroupId={setGroupId} removeGroup={removeGroup} createGroup={() => setOpenedModalCreateGroup(true)} groups={groups} />
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
            <div className="results-table-container">
                <Respondents methodics={methodics} scales={scales} questions={questions} tableHeaders={tableHeaders} group={groupName()} respondents={respondents} hiddenQuestions={hiddenQuestions} scoreAnswers={scoreAnswers} />
            </div>
            <div className="results-download">
                Скачать файл {researchName}{groupName()===null?"":"_"}{groupName()}.xlsx
            </div>
        </div>
    </div>
}