import './css/SlideFlag.css';


export const SlideFlag = ({flag, onClick, children}) => {

    return <div className='slideflag' onClick={onClick}>
        <div className='slideflag-text'>{children}</div>
        <div className='slideflag-slider'>
            <div className={`slideflag-point${flag?' slideflag-point-active':''}`}></div>
        </div>
    </div>
};