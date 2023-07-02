import { useState } from "react";
import {Input} from "./Input";
import { Modal } from "./Modal";
import "./css/Auth.css";
import { Api } from "./Api";
import { API_ROUTES } from "./enums/API_ROUTES";
import { Button } from "./Button";
import { BUTTON_STATES } from "./enums/BUTTON_STATES";
import { ALERTS } from "./enums/ALERTS";
import { Alert } from "./Alert";

export const Auth = ({onClose, setAuth, setPageEmail}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [codeHidden, setCodeHidden] = useState(true);
    const [pswdBtnWaiting, setPswdBtnWaiting] = useState(false);
    const [emailBtnWaiting, setEmailBtnWaiting] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);

    const getPassword = () => {
        setEmailBtnWaiting(true);
        Api(API_ROUTES.GET_PASSWORD).post({email}).callback((response) => {
            setEmailBtnWaiting(false);
            if(response.ok) {
                setCodeHidden(false);
            }
            else if(response.status === 422) {
                setAlertMessage("Попробуйте другой адрес электронной почты");
            }
            else {
                setAlertMessage(ALERTS.ERROR);
            }
        }).send();
    }

    const verifyPassword = () => {
        setPswdBtnWaiting(true);
        Api(API_ROUTES.VERIFY_PASSWORD).post({email, password}).callback((response) => {
            setPswdBtnWaiting(false);
            if(response.ok) {
                let token = response.data.token;
                localStorage.setItem("Authorization", token);
                setAuth(true);
                setPageEmail(email);
                onClose();
            }
            else {
                setAlertMessage("Пароль неверный");
                setCodeHidden(true);
            }
        }).send();
    }


    return <Modal onClose={onClose}>
        <div className="auth">
            <AuthFormElement callback={getPassword} value={email} btnWaiting={emailBtnWaiting} text="Ваш E-mail" tip="ex@mple.ru" onChange={e => setEmail(e.target.value)} btnText="Отправить пароль" />
            <div className="auth-margin"></div>
            <AuthFormElement callback={verifyPassword} value={password} hidden={codeHidden} btnWaiting={pswdBtnWaiting} text="Одноразовый пароль" onChange={e => setPassword(e.target.value)} btnText="Войти" />
        </div>
        <Alert onClose={setAlertMessage}>{alertMessage}</Alert>
    </Modal>
}

const AuthFormElement = ({text, tip, value, onChange, btnText, callback, btnWaiting, hidden = false}) => (
    <div className={"auth-form-element"+(hidden?" hidden":"")}>
        <div className="auth-form-element-container">
            <div className="auth-form-element-text">{text}:</div>
            <div className="auth-form-element-input">
                <Input value={value} tip={tip} onChange={onChange} />
            </div>
        </div>
        <div className="auth-form-element-button-container">
            <Button onClick={callback} state={btnWaiting?BUTTON_STATES.WAITING:BUTTON_STATES.ENABLED} >{btnText}</Button>
        </div>          
    </div>
)