import { useState } from "react"
import { GROUPS } from "./enums/GROUPS";
import { Select } from "./Select";
import "./css/Respondents.css";

export const Respondents = ({methodics, group, respondents, hiddenQuestions, scoreAnswers, scales, questions, tableHeaders}) => {


    const [methodic, setMethodic] = useState(methodics[0]);


    const answer = (respondent, question_number) => {
        let ans = respondent.answers[methodic].answers.find(ans => ans.number === question_number);
        return (scoreAnswers ? ans.scores : ans.texts).join(", ");
    }

    const opacity = () => (hiddenQuestions?{opacity: 0, border: "none", cursor: "default"}:{});

    return <div className="respondents-container">
        <div className="respondents-group">
            <div className="respondents-group-text">Выбранная группа:</div>
            <div className="respondents-group-name">{group === null?GROUPS.ALL:group}</div>
        </div>
        <div className="respondents-table">
            <div className="respondents-table-container">
                <table>
                    <tbody>
                        <tr>
                            {
                                tableHeaders(methodic).map((header, i) => <th key={i}>{header}</th>)
                            }
                            {
                                questions(methodic).map((header, i) => <th style={opacity()} key={i}>{header}</th>)
                            }
                        </tr>
                        {
                            respondents.map((respondent,i) =>
                                <tr className={i % 2 === 0 ? "__even":"__odd"} key={respondent.number}>
                                    <td>{respondent.number}</td>
                                    <td>{(new Date(respondent.created_at)).toDateString()}</td>
                                    {
                                        scales(methodic).map((scale, i) => 
                                            <td key={i}>{respondent.answers[methodic].scales.find(_scale => _scale.name === scale).score}</td>
                                        )
                                    }
                                    {
                                        questions(methodic).map((question, i) => 
                                            <td style={opacity()} key={i}>{answer(respondent, question)}</td>
                                        )
                                    }
                                </tr>    
                            )
                        }
                    </tbody>
                </table>
            </div>
            { respondents.length && methodic!==undefined?
            <div className="respondents-methodic-select">
                <Select onSelect={setMethodic} value={methodic}>
                    {methodics.map((methodic) => ({key: methodic, value: methodic}))}
                </Select>
            </div>:<></>
            }
        </div>
    </div>
}