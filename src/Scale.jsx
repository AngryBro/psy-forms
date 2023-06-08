import './css/Scale.css';

export const Scale = ({min, max, minText, maxText, value}) => {


    const numbers = () => {
        var temp = [];
        var s_min, s_max;
        if(min === "" && max === "") {
            s_min = 1;
            s_max = 2;
        }
        if(min === "" && max !== "") {
            s_min = max-1;
            s_max = max;
        }
        if(min !== "" && max === "") {
            s_min = min;
            s_max = min+1;
        }
        if(min !== "" && max !== "") {
            s_max = max;
            s_min = min;
        }
        for(var i = s_min; i <= s_max; i++) {
            temp.push(i);
        }
        return temp;
    };

    return <div className='scale'>
        <div className='scale-container'>
            <div className='scale-text'>{minText}</div>
            <div className='scale-bar-container'>
                <div className='scale-bar-elements'>
                {
                    numbers().map(number => <Element key={number} number={number} fill={value.get >= number} handleClick={value.set} />)
                }
                </div>
                <div className='scale-bar'>
                    <div style={{width: `${100*(Math.max(value.get-min, 0)) / (max-min)}%`}} className='scale-bar-fill'></div>
                </div>
            </div>
            <div className='scale-text'>{maxText}</div>
        </div>
    </div>
};

const Element = ({number, fill, handleClick}) => {
    return <div onClick={() => handleClick(number)} className='scale-element-container'>
        <div className={'scale-element' + (fill?' scale-element-fill':'')}></div>
        <div className='scale-number'>{number}</div>
    </div>
};