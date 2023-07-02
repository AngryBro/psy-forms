import { useCallback, useEffect, useState } from "react"
import { Page } from "../Page"
import { Spoiler } from "../Spoiler"
import "../css/Cabinet.css";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../enums/ROUTES";
import { Api } from "../Api";
import { API_ROUTES } from "../enums/API_ROUTES";
import { Alert } from "../Alert";
import { Button } from "../Button";
import { BUTTON_TYPES } from "../enums/BUTTON_TYPES";

export const Cabinet = ({appState}) => {
    
    const [methodics, setMethodics] = useState([]);
    const [researches, setResearches] = useState([]);
    const [confirmAlert, setConfirmAlert] = useState({message: null, callback: ()=>1});

    const [infoAlert, setInfoAlert] = useState(null);
    const [loadingAlert, setLoadingAlert] = useState(null);

    const nav = useNavigate();

    const fetchData = useCallback(() => {
        Api(API_ROUTES.METHODICS_ALL).auth().callback(({ok, data}) => {
            if(ok) {
                setMethodics(data);
            }
            else {
                setInfoAlert("Ошибка загрузки методик");
            }
        }).send();
        let res = [
            {id: 1, public_name: "Исследование 1", private_name: "исл 1"},
            {id: 2, public_name: "Исследование 2", private_name: "исл 2"}
        ]
        setResearches(res);
    }, []);

    useEffect(fetchData, [fetchData]);


    const methodicActions = () => {
        const remove = (id) => {
            setConfirmAlert(
                {
                    message: `Вы подтверждаете удаление методики "${methodics.find(m => m.id === id).private_name}"?`,
                    callback: () => {
                        Api(API_ROUTES.METHODICS_REMOVE)
                        .post({id})
                        .auth()
                        .callback(fetchData)
                        .send()
                    }
                }
            );
        }
        return {
            remove,
            update: (id) => nav(ROUTES.METHODIC_CONSTRUCTOR(id)),
            create: () => nav(ROUTES.METHODIC_CONSTRUCTOR("new")),
            get: id => window.open(ROUTES.METHODIC(id))
        }
    }

    const researchActions = () => {
        const remove = (id) => {
            
        }
        return {
            remove,
            update: (id) => nav(ROUTES.RESEARCH_CONSTRUCTOR(id)),
            create: () => nav(ROUTES.RESEARCH_CONSTRUCTOR("new")),
            results: (id) => nav(ROUTES.RESULTS(id)),
            get: (id) => window.open(ROUTES.RESEARCH(id))
        }
    }

    
    return <Page title="Личный кабинет" appState={appState}>
        <Alert onConfirm={confirmAlert.callback} onClose={() => setConfirmAlert({...confirmAlert, message: null})} text="Подтверждаю">{confirmAlert.message}</Alert>
        <Alert onClose={setInfoAlert}>{infoAlert}</Alert>
        <Alert onClose={setLoadingAlert} waiting={true}>{loadingAlert}</Alert>
        <div className="cabinet-container">
            <div className="cabinet-header">Личный кабинет</div>
            <div className="cabinet-spoiler-container">
                <div className="cabinet-spoiler">
                    <ElementSpoiler 
                        callbacks={researchActions()} 
                        text="Мои исследования" 
                        elements={researches} 
                        createText="Создать новое исследование"
                        results={true}
                        />
                </div>
                <div className="cabinet-spoiler">
                    <ElementSpoiler 
                        callbacks={methodicActions()}
                        text="Мои методики"
                        elements={methodics}
                        createText="Создать новую методику" 
                        />
                </div>
            </div>
        </div>
    </Page>
}

const ElementSpoiler = ({text, createText, elements, callbacks, research = false}) => <Spoiler text={text}>
    <div className="cabinet-spoiler-children-container">
        <div className="cabinet-element-name-container __create"><Button type={BUTTON_TYPES.EDIT} onClick={callbacks.create}>{createText}</Button></div>
        <table className="cabinet-element-table">
            <tbody>
            {
                elements.map(element =>
                    <tr key={element.id} className="cabinet-element">
                        <td className="cabinet-element-table-td">
                            <div className="cabinet-element-name">{element.public_name}</div>
                            <div className="cabinet-element-name">({element.private_name})</div>
                        </td>
                        {
                            research?
                            <td className="cabinet-element-table-td" onClick={() => callbacks.results(element.id)}>Результаты</td>
                            :<></>
                        }
                        <td className="cabinet-element-table-td"><Button type={BUTTON_TYPES.EDIT} onClick={() => callbacks.update(element.id)}>Конструктор</Button></td>
                        <td className="cabinet-element-table-td"><Button type={BUTTON_TYPES.DELETE} onClick={() => callbacks.remove(element.id)}>Удалить</Button></td>
                    </tr>    
                )
            }
            </tbody>
        </table>
    </div>
</Spoiler>