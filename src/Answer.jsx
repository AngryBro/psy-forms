import { Input } from './Input';
import './css/Answer.css';

export const Answer = ({other = false, autoFocus = false ,children, selected = false, handles = {}, edit=false, checkbox = false, tip = "", score = undefined, onFocus = () => 1}) => {



    return <div className="answer">
        <div className={"answer-container" + (edit?"":" __readonly")}>
            <div onClick={handles.select!==undefined?selected?handles.deselect:handles.select:()=>1} className={`answer-${checkbox?'checkbox':'circle'} ${selected?`answer-circle-selected`:''}`}>
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
                    <div onClick={other?handles.select:()=>1} className='answer-input'><Input readOnly={!selected && other} onChange={handles.updateText===undefined?()=>1:(e) => handles.updateText(e.target.value)} value={children} tip={tip} onFocus={onFocus} autoFocus={autoFocus}  /></div>
                    {   score === undefined?<></>:
                        <div className='answer-input-score-container'>
                            <div className='answer-input-score'>Балл:</div>
                            <div className='answer-input-score-input'><Input onFocus={() => onFocus()} value={score===null?"":score} onChange={e => handles.updateScore===undefined?1:handles.updateScore(e.target.value)} tip={"Нет"} /></div>
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