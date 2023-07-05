import { Spinner } from "./Spinner";
import { BUTTON_STATES } from "./enums/BUTTON_STATES";
import { BUTTON_TYPES } from "./enums/BUTTON_TYPES";
import { SPINNER_COLORS } from "./enums/SPINNER_COLORS";
import "./css/Button.css";

export const Button = ({state = BUTTON_STATES.ENABLED, onClick, type = BUTTON_TYPES.S, children, className}) => {
    
    const color = () => {
        switch(type) {
            case BUTTON_TYPES.EDIT: return SPINNER_COLORS.BLUE;
            case BUTTON_TYPES.DELETE: return SPINNER_COLORS.RED;
            case BUTTON_TYPES.M: return SPINNER_COLORS.WHITE;
            case BUTTON_TYPES.S: return SPINNER_COLORS.PURPLE;
            default: return SPINNER_COLORS.GREY;
        }
    }

    const extraClass = () => {
        switch(state) {
            case BUTTON_STATES.DISABLED: return "__disabled";
            case BUTTON_STATES.ENABLED: return "__enabled";
            case BUTTON_STATES.WAITING: return "__waiting";
            default: return "";
        }
    }
    
    return <div className={`button-container ${type} ${extraClass()}`} onClick={state === BUTTON_STATES.ENABLED ? onClick : ()=>1}>
        {
            state === BUTTON_STATES.WAITING?
            <div className={"button-spinner" + (type === BUTTON_TYPES.DELETE || type === BUTTON_TYPES.EDIT ? " __small":"")}>
                <Spinner color={color()} />
            </div>
            :<></>
        }
            <div style={{opacity: Number(state !== BUTTON_STATES.WAITING)}} className={`button-text ${className} ${type}` + (state === BUTTON_STATES.DISABLED ? " __disabled":"")}>{children}</div>
    </div>
}