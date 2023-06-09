import { Input } from './Input';
import './css/Answer.css';

export const Answer = ({other = false, autoFocus = false ,children, selected = false, handles = {}, edit=false, checkbox = false, tip = "", score = null, onFocus = () => 1}) => {



    return <div className="answer" onClick={handles.select===undefined?()=>1:handles.select}>
        <div className="answer-container">
            <div className={`answer-${checkbox?'checkbox':'circle'} ${selected?`answer-circle-selected`:''}`}>
                {
                    selected?
                    checkbox?
                    <div className='answer-checkbox-selected-inner'>&#10004;</div>
                    :
                    <div className={`answer-circle-selected-inner`}></div>
                    :<></>
                }
            </div>
            {
                edit || other?
                <div className='answer-input-container'>
                    <div className='answer-input'><Input readOnly={!selected && other} onChange={handles.updateText===undefined?()=>1:(e) => handles.updateText(e.target.value)} value={children} tip={tip} onFocus={onFocus} autoFocus={autoFocus}  /></div>
                    {
                        handles.updateScore === undefined?<></>:
                        <div className='answer-input-score-container'>
                            <div className='answer-input-score'>Балл:</div>
                            <div className='answer-input-score-input'><Input onFocus={() => onFocus()} value={score===null?"":score} onChange={e => handles.updateScore(e.target.value)} tip={"Нет"} /></div>
                        </div>
                    }
                </div>
                :
                <div className="answer-text">{children}</div>
            }
        </div>
        {
            edit && (handles.remove!==undefined) ?
            <div className='answer-delete' onClick={handles.remove}>&#10006;</div>:<></>
        }
    </div>
};