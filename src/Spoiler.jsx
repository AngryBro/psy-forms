import { useCallback, useState } from "react";
import "./css/Spoiler.css";
import { useEffect, useRef } from "react";


export const Spoiler = ({controlled = false, children, text, hidden = true, setHidden = () => 1}) => {

    const childrenRef = useRef();
    const childrenContainerRef = useRef();
    const [overflow, setOverflow] = useState("hidden");

    const [localHidden, setLocalHidden] = useState(hidden);

    const duration = 300;

    const handleClick = () => {
        if(controlled) {
            setHidden(!hidden);
        }
        else {
            setLocalHidden(!localHidden);
        }
    }

    const isHidden = useCallback(() => {
        return (controlled && hidden) || (!controlled && localHidden);
    }, [hidden, localHidden, controlled]);

    useEffect(() => {
        if(childrenRef.current === undefined || childrenContainerRef === undefined) return;
        let childHeight = childrenRef.current.offsetHeight+1;
        if(!isHidden()) {
            childrenContainerRef.current.style.height = `${childHeight}px`;
            setTimeout(() => {childrenContainerRef.current.style.height = "fit-content"; setOverflow("visible")}, duration);
        }
        else {
            childrenContainerRef.current.style.height = `${childHeight}px`;
            setTimeout(() => {childrenContainerRef.current.style.height = "0px"; setOverflow("hidden")}, 0);
        }
    }, [childrenRef, childrenContainerRef, isHidden]);

    return <div className="spoiler">
        <div className="spoiler-header" onClick={handleClick}>
            <div className="spoiler-text">{text}</div>
            <div className={"spoiler-icon" + (isHidden()?"":" active")}>{"<"}</div>
        </div>
        <div ref={childrenContainerRef} className={"spoiler-children-container"+(isHidden()?"":" active")} style={{transition: `all ${duration}ms ease`, overflow}}>
            <div ref={childrenRef} className="spoiler-children">
                {
                    Array.isArray(children)?
                    children.map((child, i) => <div className="spoiler-child" key={i}>{child}</div>)
                    :children
                }
            </div>
        </div>
    </div>
}