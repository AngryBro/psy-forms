import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { Page } from "../Page"
import "../css/Main.css";
import { BUTTON_TYPES } from "../enums/BUTTON_TYPES";
import { ROUTES } from "../enums/ROUTES";

export const Main = ({appState}) => {

    const nav = useNavigate();

    return <Page title="PSY FORMS" appState={appState}>
        <div className="main-container">
            <div className="main-title">психологические исследования</div>
            <div className="main-steps-container">
                <div className="main-step">Сформируйте методики</div>
                <div className="main-arrow"/>
                <div className="main-step">Опубликуйте исследование</div>
                <div className="main-arrow"/>
                <div className="main-step">Обработайте результаты</div>
            </div>
            <div className="main-info-container">
                <div className="main-info-header">Как это работает?</div>
                <div className="main-info">
                    <p>
                        Войдите в личный кабинет через E-mail. В личном кабинете
                        доступны конструкторы методик и исследований.
                        В конструкторе методик создайте форму для методики с указанием шкал
                        и правил подсчёта баллов. В конструкторе исследований добавьте созданные методики,
                        опубликуйте исследование.
                    </p>
                    <p>
                        На странице результатов исследования в табличной форме будут отражены
                        результаты прохождения респондентами. Делите выбору на группы по различным условиям,
                        сравнивайте группы, используя статистические критерии (на данный момент только Фишера).
                    </p>
                </div>
            </div>
            <div className="main-buttons-container">
                <div className="main-button-container">
                    <Button onClick={() => nav(ROUTES.RESEARCH("feedback"))} type={BUTTON_TYPES.L}>Обратная связь</Button>
                </div>
                <div hidden={!appState.auth} className="main-button-container">
                    <Button onClick={() => nav("/my")} type={BUTTON_TYPES.L}>Личный кабинет</Button>
                </div>
                <div hidden={appState.auth} className="main-button-container">
                    <Button onClick={() => appState.setOpenedAuthModal(true)} type={BUTTON_TYPES.L}>Вход</Button>
                </div>
            </div>
        </div>
    </Page>
}