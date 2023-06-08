import './css/SlideFlag.css';


export const SlideFlag = ({flag, handleClick, children}) => {

    return <div className='slideflag' onClick={handleClick}>
        <div className='slideflag-text'>{children}</div>
        <div className='slideflag-slider'>
            <div className={`slideflag-point${flag?' slideflag-point-active':''}`}></div>
        </div>
    </div>
};