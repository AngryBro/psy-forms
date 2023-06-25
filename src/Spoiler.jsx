import { useState } from "react";
import "./css/Spoiler.css";
import { useEffect, useRef } from "react";


export const Spoiler = ({children, text, hidden = true, setHidden = () => 1}) => {

    const childrenRef = useRef();
    const childrenContainerRef = useRef();
    const [overflow, setOverflow] = useState("hidden");

    const [localHidden, setLocalHidden] = useState(hidden);

    const duration = 300;

    const handleClick = () => {
        let prev_hidden = !hidden || !localHidden;
        setHidden(prev_hidden);
        setLocalHidden(prev_hidden);
    }

    useEffect(() => {
        if(childrenRef.current === undefined || childrenContainerRef === undefined) return;
        let childHeight = childrenRef.current.offsetHeight+1;
        if(!localHidden) {
            // childrenContainerRef.current.style.height = "0px";
            childrenContainerRef.current.style.height = `${childHeight}px`;
            setTimeout(() => {childrenContainerRef.current.style.height = "fit-content"; setOverflow("visible")}, duration);
        }
        else {
            childrenContainerRef.current.style.height = `${childHeight}px`;
            // childrenContainerRef.current.style.height = "0px";
            setTimeout(() => {childrenContainerRef.current.style.height = "0px"; setOverflow("hidden")}, 0);
            // childrenContainerRef.current.style.height = "0px";
        }
    }, [childrenRef, childrenContainerRef, localHidden]);

    return <div className="spoiler">
        <div className="spoiler-header" onClick={handleClick}>
            <div className="spoiler-text">{text}</div>
            <div className={"spoiler-icon" + (hidden && localHidden?"":" active")}>{"<"}</div>
        </div>
        <div ref={childrenContainerRef} className={"spoiler-children-container"+(hidden && localHidden?"":" active")} style={{transition: `all ${duration}ms ease`, overflow}}>
            <div ref={childrenRef} className="spoiler-children">
                {
                    Array.isArray(children)?
                    children.map((child, i) => <div className="spoiler-child" key={i}>{child}</div>)
                    :children
                    // children.length === 1?
                    // children:
                    // children.map((child, i) => <div className="spoiler-child" key={i}>{child}</div>)
                }
            </div>
        </div>
    </div>
}