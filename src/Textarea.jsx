import { useState } from "react";
import "./css/Textarea.css";
import {htmlToText, textToHtml} from "./functions";

export const Textarea = ({value, onChange, tip = "", font, readOnly=false}) => {

    const [savedValue, setSavedValue] = useState(value);

    return <div className="textarea">
        <div className="textarea-container">
            <div className="textarea-input"
                contentEditable={!readOnly}
                onInput={e => {onChange(htmlToText(e.target.innerHTML)); console.log(htmlToText(e.target.innerHTML))}}
                onBlur={() => setSavedValue(value)}
                style={{fontSize:`${font}pt`}}
                dangerouslySetInnerHTML={{__html:textToHtml(savedValue)}}
            />
            <div className="textarea-tip" hidden={value!==null && value!==""}>{tip}</div>
        </div>
    </div>
}