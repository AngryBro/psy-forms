import { Textarea } from "./Textarea"
import "./css/FreeAnswer.css";

export const FreeAnswer = ({children}) => {
    const {number, readOnly = false, value, setValue} = children;
    return <div className="free-answer">
        <div className="free-answer-number" hidden={number===null}>{number}.</div>
        <div className="free-answer-input"><Textarea value={value} onInput={e => setValue(e.tatget.innerText)} readOnly={readOnly} tip="Мой ответ"/></div>
    </div>
}