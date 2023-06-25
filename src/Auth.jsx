import { useState } from "react";
import {Input} from "./Input";
import { Modal } from "./Modal";
import "./css/Auth.css";

export const Auth = ({onClose}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [codeHidden, setCodeHidden] = useState(false);


    return <Modal onClose={onClose}>
        <div className="auth" onClick={() => setCodeHidden(c => !c)}>
            <AuthFormElement value={email} btnDisabled={false} text="Ваш E-mail" tip="example@mail.ru" onChange={e => setEmail(e.target.value)} btnText="Отправить пароль" />
            <div className="auth-margin"></div>
            <AuthFormElement value={password} hidden={codeHidden} btnDisabled={true} text="Одноразовый пароль" onChange={e => setPassword(e.target.value)} btnText="Войти" />
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
            <div className={"auth-form-element-button"+(btnDisabled?" disabled":"")} onClick={callback}>{btnText}</div>     
        </div>          
    </div>
)