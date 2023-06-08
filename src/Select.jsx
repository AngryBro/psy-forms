import { useEffect, useRef, useState } from 'react';
import './css/Select.css';

export const Select = ({children, selected_key}) => {

    const [opened, setOpened] = useState(false);

    const selectRef = useRef();

    const handleSelect = (key) => {
        selected_key.set(key);
        setOpened(false);
    }

    useEffect(() => {
        const handleClick = e => {
            if(!selectRef.current) return;
            if(!selectRef.current.contains(e.target)) {
                setOpened(false);
            }
        }
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, [selectRef])

    return <div className='select' ref={selectRef}>
        <div className='select-container'>
            <div className='select-option-container' onClick={() => setOpened(true)}>
                <div className='select-option'>{children.find(el => el.key === selected_key.get).value}</div>
            </div>
            <div className='select-arrow'>&gt;</div>
            <div className='select-options-container' hidden={!opened}>
                <div style={{opacity:0}} className='select-option-container'></div>
                {
                    children.map((child) => child.display===false?<div key={child.key}></div>:
                        <div onClick={() => handleSelect(child.key)} className='select-option-container' key={child.key}>
                            <div className='select-option'>{child.value}</div>
                        </div>
                    )
                }
            </div>
        </div>
    </div>
};