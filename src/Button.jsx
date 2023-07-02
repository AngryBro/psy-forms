import { Spinner } from "./Spinner";
import { BUTTON_STATES } from "./enums/BUTTON_STATES";
import { BUTTON_TYPES } from "./enums/BUTTON_TYPES";
import { SPINNER_COLORS } from "./enums/SPINNER_COLORS";
import "./css/Button.css";

export const Button = ({state = BUTTON_STATES.ENABLED, onClick, type = BUTTON_TYPES.S, children}) => {
    return <div className={`button-container ${type}` + (state === BUTTON_STATES.ENABLED ? " __enabled":" __disabled")} onClick={state === BUTTON_STATES.ENABLED ? onClick : ()=>1}>
        {
            state === BUTTON_STATES.WAITING?
            <div className="button-spinner">
                <Spinner color={type !== BUTTON_TYPES.S ? SPINNER_COLORS.WHITE : SPINNER_COLORS.PURPLE} />
            </div>
            :<></>
        }
            <div style={{opacity: Number(state !== BUTTON_STATES.WAITING)}} className={`button-text ${type}` + (state === BUTTON_STATES.DISABLED ? " __disabled":"")}>{children}</div>
    </div>
}