// import { useState } from "react";
import "./css/Textarea.css";

export const Textarea = ({value, onInput, tip = "", font = 16, readOnly=false}) => {

    // const [savedValue, setSavedValue] = useState(value);

    return <div className="textarea">
        <div className="textarea-container">
            <div className="textarea-input"
                contentEditable={!readOnly}
                onInput={onInput}
                // onBlur={() => setSavedValue(value)}
                style={{fontSize:`${font}pt`}}
                // dangerouslySetInnerHTML={{__html:textToHtml(savedValue)}}
            >
            </div>
            <div className="textarea-tip" hidden={value!==null && value!==""}>{tip}</div>
        </div>
    </div>
}