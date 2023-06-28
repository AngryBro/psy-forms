import "./css/Header.css";

export const Header = ({auth, email, onClicks}) => {

    const email_alt = "Войдите, чтобы начать работу";

    return <div className="header">
        <div className="header-container">
            <div className="header-logo">
                psy forms
            </div>
            <div className="header-buttons">
                <div className={"header-email"+(auth?" __auth":"")} onClick={auth?onClicks.cabinet:()=>1}>
                    {auth===undefined?"...":auth?email:email_alt}
                </div>
                <div className="header-cabinet" onClick={auth===false?onClicks.login:onClicks.logout}>
                    {
                        auth===undefined?
                        "...":
                        auth?
                        "Выход":
                        "Войти по E-mail"
                    }
                </div>
            </div>
        </div>
    </div>
}