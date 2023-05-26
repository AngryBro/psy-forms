import { useState } from 'react';
import './css/Select.css';

const Select = ({children, value}) => {

    const [opened, setOpened] = useState(false);

    const handleSelect = (i) => {
        value.set(i);
        setOpened(false);
    }

    return <div className='select'>
        <div className='select-container'>
            <div className='select-option-container' onClick={() => setOpened(true)}>
                <div className='select-option'>{children[value.get]}</div>
            </div>
            <div className='select-arrow'>&gt;</div>
            <div className='select-options-container' hidden={!opened}>
                <div style={{opacity:0}} className='select-option-container'></div>
                {
                    children.map((child, i) =>
                        <div onClick={() => handleSelect(i)} className='select-option-container' key={i}>
                            <div className='select-option'>{child}</div>
                        </div>
                    )
                }
            </div>
        </div>
    </div>
};

export default Select;