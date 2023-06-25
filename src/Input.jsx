import { useState } from "react";
import "./css/Input.css";

export const Input = ({value, onChange, onBlur = () => 1, onFocus = () => 1, tip = "", font, readOnly = false, autoFocus=false}) => {
    
    const [focused, setFocused] = useState(false);
    
    return <div className="input"> 
        <div className="input-container">
            <input 
            autoFocus = {autoFocus}
            readOnly={readOnly}
            className="input-content"
            // style={{fontSize: `${font}pt`}}
            onFocus={(e) => {setFocused(true); onFocus(e)}}
            onBlur={(e) => {setFocused(false); onBlur(e)}}
            onChange={onChange}
            value={value===null?"":value}
            placeholder={tip}
            />
            <div className="input-border-container">
                <div className={"input-border"+(focused?" input-border-focus":"")}></div>
                <div className="input-nonactive-border"></div>
            </div>
        </div>
        <div className="input-tip" style={{opacity: 0, fontSize: `${font}pt`}}>{value!==null&&value!==""?value:tip}</div>
        <div style={{height:"15px", width:"100%"}}></div>
    </div>
};
