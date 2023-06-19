import { useState } from "react";
import "./css/Textarea.css";

export const Textarea = ({value, tip = "", font = 16, readOnly=false, onChangeValue}) => {

    // const [savedValue, setSavedValue] = useState(value===null?"":value);
    // const [height, setHeight] = useState("20px");
    const [text, setText] = useState(value===null?"":value);

    // const ref = useRef();

    // const parseEnters = (string) => {
    //     string = string.replace(/\n\n/g, "\n");
    //     if(string.length === 1 && string[0] === "\n" ) {
    //         string = "";
    //     }
    //     return string;
    // }

    // const parseText = text => {
        
    // }

    const handleChange = e => {
        let value = e.target.innerText;
        // let value = e.target.innerHTML;
        // let value = e.target.value;
        // value = value.replace(/\n\n/g, "\n");
        onChangeValue(value);
    }

    const handleInput = e => {
        setText(e.target.textContent);
    }

    return <div className="textarea">
        <div className="textarea-container">
            {/* <div className="textarea-input" aria-multiline="true" role="textbox"
                contentEditable={!readOnly}
                onInput={e => {onInput(e); console.log(e.target.innerText)}}
                onBlur={() => setSavedValue(parseEnters(value))}
                style={{fontSize:`${font}pt`}}
            >
                {
                    savedValue.split("\n").map((string, i) => <div key={i}>{string}</div>)
                }
            </div> */}
            <div className="textarea-input" 
                contentEditable={!readOnly}
                onBlur={handleChange}
                onInput={handleInput}
                style={{fontSize:`${font}pt`}}
                dangerouslySetInnerHTML={{__html: (value===null?"":value).replace(/\n/g, "<br>")}}
            >
            </div>
            {/* <textarea className="textarea-input" style={{fontSize:`${font}pt`, height}} onChange={handleChange} value={value}></textarea> */}
            {/* <textarea className="textarea-input textarea-input-hidden" style={{fontSize:`${font}pt`}} onChange={() => 1} value={value}></textarea> */}
            <div style={{fontSize: `${font}pt`}} className="textarea-tip" hidden={text.length}>{tip}</div>
        </div>
    </div>
}