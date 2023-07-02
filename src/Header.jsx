import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import "./css/Header.css";
import { BUTTON_STATES } from "./enums/BUTTON_STATES";
import { BUTTON_TYPES } from "./enums/BUTTON_TYPES";
import { ROUTES } from "./enums/ROUTES";

export const Header = ({auth, email, onClicks, btnWaiting}) => {

    const email_alt = "Войдите, чтобы начать работу";

    const buttonState = () => {
        if(btnWaiting) {
            return BUTTON_STATES.WAITING;
        }
        if(auth === undefined) {
            return BUTTON_STATES.DISABLED;
        }
        return BUTTON_STATES.ENABLED;
    }

    const nav = useNavigate();

    return <div className="header">
        <div className="header-container">
            <div className="header-logo" onClick={() => nav(ROUTES.MAIN)}>
                psy forms
            </div>
            <div className="header-buttons" style={{opacity: Number(auth !== undefined)}}>
                <div className={"header-email"+(auth?" __auth":"")} onClick={auth?onClicks.cabinet:()=>1}>
                    {auth===undefined?"":auth?email:email_alt}
                </div>
                <div className="header-login">
                    <Button state={buttonState()} type={BUTTON_TYPES.M} onClick={auth===false?onClicks.login:onClicks.logout}>
                        {auth?"Выход":"Войти по E-mail"} 
                    </Button>
                </div>
            </div>
        </div>
    </div>
}