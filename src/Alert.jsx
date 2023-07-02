import { Button } from "./Button";
import { Modal } from "./Modal";
import { BUTTON_TYPES } from "./enums/BUTTON_TYPES";
import "./css/Alert.css";
import { BUTTON_STATES } from "./enums/BUTTON_STATES";

export const Alert = ({children, onClose = () => 1, onConfirm = () => 1, text = "Понятно", waiting = false}) => {
  
    const handleClick = () => {
        onConfirm();
        onClose(null);
    }
  
    return children===null?<></>:(
    <Modal onClose={() => onClose(null)}>
        <div className="alert-message-container">{children}</div>
        <div className="alert-button-container">
            <Button state={waiting?BUTTON_STATES.WAITING:BUTTON_STATES.ENABLED} onClick={handleClick} type={BUTTON_TYPES.M}>{text}</Button>
        </div>
    </Modal>
)}