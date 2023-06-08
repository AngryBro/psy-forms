import { Answer } from "./Answer";
import "./css/AnswerListFormBlock.css";

export const AnswerListFormBlock = ({many = false, answers_get, edit=false, handleDelete, handleAdd, handleUpdate}) => {
    return <div className="answer-list-form-block-container">
        {
            answers_get.map((answer, i) =>
            <div key={i}>
                {
                answer.text!==null?
                <Answer
                    score={answer.score}
                    autoFocus={true} 
                    edit={edit} 
                    checkbox={many} 
                    tip={"Текст варианта"} 
                    handle={{
                        delete: () => handleDelete(i),
                        edit: (value) => handleUpdate(i, "text", value),
                        editScore: (value) => handleUpdate(i, "score", value)
                    }}>
                    {answer.text}
                </Answer>
                :
                <Answer 
                    checkbox={many} 
                    other={true} 
                    edit={edit}
                    tip={"Другое..."}
                    handle={{delete: () => handleDelete(i)}}
                >{""}</Answer>
                }
            </div>
            )
        }
        {
            edit?
            <div className="answer-list-form-block-add-container">
                <div className="answer-list-form-block-add">
                    {/* <Answer edit={true} checkbox={many} tip={"Добавить вариант"} onFocus={handleAdd}>
                        {""}
                    </Answer> */}
                    <Answer 
                        checkbox={many} 
                        other={true} 
                        tip={"Добавить вариант"}
                        onFocus={handleAdd}
                    >{""}</Answer>
                </div>
                {
                    answers_get.find(el => el.text === null)!==undefined?<></>:
                    <div onClick={() => handleAdd(true)}>или &nbsp; <span className="answer-list-form-block-other">добавить вариант "Другое"</span></div>
                }
            </div>
            :<></>
        }
    </div>
};