import './css/AnswerOne.css';

const AnswerOne = ({children, selected, handleSelect, edit=false, handleEdit = () => 1}) => {
    return <div className="answer-one" onClick={handleSelect}>
        <div className="answer-one-container">
            <div className={`answer-one-circle ${selected?'answer-one-circle-selected':''}`}>
                <div hidden={!selected} className="answer-one-selected"></div>
            </div>
            {
                edit?
                <input className='answer-one-input' type="text" value={children} onChange={handleEdit} />:
                <div className="answer-one-text">{children}</div>
            }
            {
                edit?
                <div className='answer-one-delete'>&#10006;</div>:<></>
            }
            
        </div>
    </div>
};

export default AnswerOne;