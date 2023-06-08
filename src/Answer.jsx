import { Input } from './Input';
import './css/Answer.css';

export const Answer = ({other = false, autoFocus = false ,children, selected = false, handle = {}, edit=false, checkbox = false, tip = "", score = null, onFocus = () => 1}) => {



    return <div className="answer" onClick={handle.select===undefined?()=>1:handle.select}>
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
                    {/* <input readOnly={other} onFocus={() => onFocus()} autoFocus={autoFocus} placeholder={tip} className='answer-input' type="text" value={children} onChange={handle.edit===undefined?()=>1:handle.edit} /> */}
                    <div className='answer-input'><Input readOnly={!selected && other} onChange={handle.edit===undefined?()=>1:handle.edit} value={children} tip={tip} onFocus={onFocus} autoFocus={autoFocus}  /></div>
                    {
                        handle.editScore === undefined?<></>:
                        <div className='answer-input-score-container'>
                            <div className='answer-input-score'>Балл:</div>
                            <div className='answer-input-score-input'><Input onFocus={() => onFocus()} value={score===null?"":score} onChange={handle.editScore} tip={"Нет"} /></div>
                        </div>
                    }
                </div>
                :
                <div className="answer-text">{children}</div>
            }
        </div>
        {
            edit && (handle.delete!==undefined) ?
            <div className='answer-delete' onClick={handle.delete}>&#10006;</div>:<></>
        }
    </div>
};