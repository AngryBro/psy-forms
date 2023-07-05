import { Button } from "./Button";
import { BUTTON_TYPES } from "./enums/BUTTON_TYPES";
import "./css/Pagination.css";
import { BUTTON_STATES } from "./enums/BUTTON_STATES";

export const Pagination = ({callbacks, isLast, isFirst, sending}) => {
    return <div className="pagintaion-container">
        <div className={"pagination-button" + (isFirst?" __hidden":"")}>
            <Button onClick={callbacks.prev} state={isFirst ? BUTTON_STATES.DISABLED : BUTTON_STATES.ENABLED} type={BUTTON_TYPES.M}>Назад</Button>
        </div>
        <div className={"pagination-button"}>
            {
                isLast?
                <Button state={sending?BUTTON_STATES.WAITING:BUTTON_STATES.ENABLED} onClick={callbacks.send} type={BUTTON_TYPES.M}>Отправить</Button>
                :
                <Button onClick={callbacks.next} type={BUTTON_TYPES.M}>Далее</Button>
            }
        </div>
    </div>
}