import { Answer } from "./Answer";
import "./css/AnswerListFormBlock.css";

export const AnswerListFormBlock = ({many = false, answers, edit=false, handles}) => {

    const updateScore = (answer_index, value) => {
        if(value === "") {
            value = null;
            handles.update(answer_index, "score", value);
        }
        else {
            if(!isNaN(value)) {
                value = Number(value);
                handles.update(answer_index, "score", value);
            }
        }
    }

    return <div className="answer-list-form-block-container">
        {
            answers.map((answer, i) =>
            <div key={i}>
                {
                answer.text!==null?
                <Answer
                    score={answer.score}
                    autoFocus={true} 
                    edit={edit} 
                    checkbox={many} 
                    tip={"Текст варианта"} 
                    handles={{
                        remove: () => handles.remove(i),
                        updateText: (value) => handles.update(i, "text", value),
                        updateScore: (value) => updateScore(i, value)
                    }}>
                    {answer.text}
                </Answer>
                :
                <Answer 
                    checkbox={many} 
                    other={true} 
                    edit={edit}
                    tip={"Другое..."}
                    handles={{remove: () => handles.remove(i)}}
                    score="Нет"
                >{""}</Answer>
                }
            </div>
            )
        }
        {
            edit?
            <div className="answer-list-form-block-add-container">
                <div className="answer-list-form-block-add">
                    <Answer 
                        checkbox={many} 
                        other={true} 
                        tip={"Добавить вариант"}
                        onFocus={() => handles.create()}
                    >{""}</Answer>
                </div>
                {
                    answers.find(el => el.text === null)!==undefined?<></>:
                    <div onClick={() => handles.create(true)}>или &nbsp; <span className="answer-list-form-block-other">добавить вариант "Другое"</span></div>
                }
            </div>
            :<></>
        }
    </div>
};