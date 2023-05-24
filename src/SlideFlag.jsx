import './css/SlideFlag.css';


const SlideFlag = ({flag, handleClick, children}) => {

    return <div className='slideflag'>
        <div className='slideflag-text'>{children}</div>
        <div className='slideflag-slider' onClick={handleClick}>
            <div className={`slideflag-point${flag?' slideflag-point-active':''}`}></div>
        </div>
    </div>
};

export default SlideFlag;