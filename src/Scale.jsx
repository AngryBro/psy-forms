import './css/Scale.css';
import multyStringText from './functions';

const Scale = ({min, max, minText, maxText, value}) => {


    const numbers = () => {
        var temp = [];
        for(var i = min; i <= max; i++) {
            temp.push(i);
        }
        return temp;
    };

    return <div className='scale'>
        <div className='scale-container'>
            <div className='scale-text'>{multyStringText(minText)}</div>
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
            <div className='scale-text'>{multyStringText(maxText)}</div>
        </div>
    </div>
};

const Element = ({number, fill, handleClick}) => {
    return <div onClick={() => handleClick(number)} className='scale-element-container'>
        <div className={'scale-element' + (fill?' scale-element-fill':'')}></div>
        <div className='scale-number'>{number}</div>
    </div>
};

export default Scale;