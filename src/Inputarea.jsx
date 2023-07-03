import { useEffect, useRef, useState } from "react";
import "./css/Inputarea.css";

export const Inputarea = ({tip = "",value, onChange, className = "", readOnly = false, onFocus = () => 1, autoFocus = false}) => {
    
    const [defaultValue, setDefaultValue] = useState(value); 
    const [focused, setFocused] = useState(false);
    const ref = useRef();

    useEffect(() => {
        if(autoFocus) {
            ref.current.focus();
        }   
    }, [autoFocus]);

    const empty = () => {
        return ["", null, "\n", "\t"].includes(value);
    }

    const handleFocus = (e) => {
        setDefaultValue(value);
        setFocused(true);
        onFocus(e);
    }

    const handleBlur = () => {
        setFocused(false);
    }

    const handleKey = e => {
        if(e.code === "Enter") {
            e.preventDefault();
        }
    }

    
    return <div className="inputarea-container">
        <div 
            ref={ref}
            onFocus={handleFocus} 
            onBlur={handleBlur} 
            suppressContentEditableWarning={true} 
            placeholder={tip} 
            className={`inputarea ${empty()?"__empty":""} ${className}`} 
            contentEditable={!readOnly} 
            onInput={readOnly?()=>1:onChange}
            onKeyDown={handleKey}
            >{focused?defaultValue:value}</div>
    </div>
}