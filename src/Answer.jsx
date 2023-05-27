import './css/Answer.css';

const Answer = ({children, selected, handle, edit=false, checkbox = false}) => {



    return <div className="answer" onClick={edit?()=>1:handle.select}>
        <div className="answer-container">
            <div className={`answer-${checkbox?'checkbox':'circle'} ${selected?`answer-circle-selected`:''}`}>
                {/* <div hidden={!selected} className={`answer-circle-selected-inner`}></div> */}
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
                edit?
                <input className='answer-input' type="text" value={children} onChange={handle.edit===undefined?()=>1:handle.edit} />:
                <div className="answer-text">{children}</div>
            }
            {
                edit?
                <div className='answer-delete' onClick={handle.delete===undefined?()=>1:handle.delete}>&#10006;</div>:<></>
            }
            
        </div>
    </div>
};

export default Answer;