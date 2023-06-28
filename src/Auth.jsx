import { useState } from "react";
import {Input} from "./Input";
import { Modal } from "./Modal";
import "./css/Auth.css";
import { Api } from "./Api";

export const Auth = ({onClose, setAuth, setPageEmail}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [codeHidden, setCodeHidden] = useState(true);
    const [pswdBtnDisabled, setPswdBtnDisabled] = useState(false);
    const [emailBtnDisabled, setEmailBtnDisabled] = useState(false);

    const getPassword = () => {
        setEmailBtnDisabled(true);
        Api("getPassword").post({email}).callback((response) => {
            if(response.ok) {
                setCodeHidden(false);
                setEmailBtnDisabled(false);
            }
        }).send();
    }

    const verifyPassword = () => {
        setPswdBtnDisabled(true);
        Api("verifyPassword").post({email, password}).callback((response) => {
            if(response.ok) {
                let token = response.array.token;
                localStorage.setItem("Authorization", token);
                setAuth(true);
                setPageEmail(email);
                onClose();
            }
        }).send();
    }


    return <Modal onClose={onClose}>
        <div className="auth">
            <AuthFormElement callback={getPassword} value={email} btnDisabled={emailBtnDisabled} text="Ваш E-mail" tip="ex@mple.ru" onChange={e => setEmail(e.target.value)} btnText="Отправить пароль" />
            <div className="auth-margin"></div>
            <AuthFormElement callback={verifyPassword} value={password} hidden={codeHidden} btnDisabled={pswdBtnDisabled} text="Одноразовый пароль" onChange={e => setPassword(e.target.value)} btnText="Войти" />
        </div>
    </Modal>
}

const AuthFormElement = ({text, tip, value, onChange, btnText, callback, btnDisabled, hidden = false}) => (
    <div className={"auth-form-element"+(hidden?" hidden":"")}>
        <div className="auth-form-element-container">
            <div className="auth-form-element-text">{text}:</div>
            <div className="auth-form-element-input">
                <Input value={value} tip={tip} onChange={onChange} />
            </div>
        </div>
        <div className="auth-form-element-button-container">
            <div className={"auth-form-element-button"+(btnDisabled?" disabled":"")} onClick={btnDisabled?()=>1:callback}>{btnText}</div>     
        </div>          
    </div>
)