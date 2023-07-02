import { useState } from "react";
import "./css/Inputarea.css";

export const Inputarea = ({tip = "",value, onChange, className = "", readOnly = false}) => {
    
    const [defaultValue] = useState(value); 

    const empty = () => {
        return ["", null, "\n", "\t"].includes(value);
    }
    
    return <div className="inputarea-container">
        <div suppressContentEditableWarning={true} placeholder={tip} className={`inputarea ${empty()?"__empty":""} ${className}`} contentEditable={!readOnly} onInput={onChange}>{defaultValue}</div>
    </div>
}