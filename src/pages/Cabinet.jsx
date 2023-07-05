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
import { BUTTON_STATES } from "../enums/BUTTON_STATES";

export const Cabinet = ({appState}) => {
    
    const [methodics, setMethodics] = useState([]);
    const [researches, setResearches] = useState([]);
    const [fetchingMethodics, setFetchingMethodics] = useState(true);
    const [fetchingResearches, setFetchingResearches] = useState(true);
    const [confirmAlert, setConfirmAlert] = useState({message: null, callback: ()=>1});

    const [deletingMethodic, setDeletingMethodic] = useState(null);
    const [deletingResearch, setDeletingResearch] = useState(null);

    const [infoAlert, setInfoAlert] = useState(null);
    const [loadingAlert, setLoadingAlert] = useState(null);
    const [waitingPublish, setWaitingPublish] = useState(false);

    const nav = useNavigate();

    const fetchData = useCallback(() => {
        Api(API_ROUTES.METHODICS_ALL).auth().callback(({ok, data}) => {
            setFetchingMethodics(false);
            if(ok) {
                setMethodics(data);
                setDeletingMethodic(null);
            }
            else {
                setInfoAlert("Ошибка загрузки методик");
            }
        }).send();
        Api(API_ROUTES.RESEARCHES_ALL)
        .auth()
        .callback(({ok, data}) => {
            setFetchingResearches(false);
            if(ok) {
                setResearches(data);
                setDeletingResearch(null);
            }
            else {
                setInfoAlert("Ошибка загрузки исследований");
            }
        })
        .send();
    }, []);

    useEffect(fetchData, [fetchData]);


    const methodicActions = () => {
        const remove = (id) => {
            setConfirmAlert(
                {
                    message: `Вы подтверждаете удаление методики "${methodics.find(m => m.id === id).private_name}"?`,
                    callback: () => {
                        setDeletingMethodic(id);
                        Api(API_ROUTES.METHODIC_REMOVE)
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
        const publish = (id, slug) => {
            setWaitingPublish(true);
            Api(API_ROUTES.RESEARCH_PUBLISH)
            .auth()
            .post({id})
            .callback(({ok}) => {
                setWaitingPublish(false);
                if(ok) {
                    nav(ROUTES.PUBLISHED(slug));
                }
                else {
                    setInfoAlert("Ошибка публикации, попробуйте ещё раз");
                }
            })
            .send();
        }
        const remove = (id) => {
            setDeletingResearch(id);
            setConfirmAlert({
                message: `Удалить исследование ${researches.find(r => r.id === id).private_name}?`,
                callback: () => {
                    Api(API_ROUTES.RESEARCH_REMOVE)
                    .auth()
                    .post({id})
                    .callback(fetchData)
                    .send()
                }
            });
        }
        return {
            remove,
            update: (id) => nav(ROUTES.RESEARCH_CONSTRUCTOR(id)),
            create: () => nav(ROUTES.RESEARCH_CONSTRUCTOR("new")),
            results: (id) => nav(ROUTES.RESULTS(id)),
            get: (id) => window.open(ROUTES.RESEARCH(id)),
            nav: (slug) => nav(ROUTES.PUBLISHED(slug)),
            publish
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
                        research={true}
                        fetching={fetchingResearches}
                        deletingId={deletingResearch}
                        waitingPublish={waitingPublish}
                        />
                </div>
                <div className="cabinet-spoiler">
                    <ElementSpoiler 
                        callbacks={methodicActions()}
                        text="Мои методики"
                        elements={methodics}
                        createText="Создать новую методику" 
                        fetching={fetchingMethodics}
                        deletingId={deletingMethodic}
                        />
                </div>
            </div>
        </div>
    </Page>
}

const ElementSpoiler = ({text, createText, elements, callbacks, research = false, fetching, deletingId, waitingPublish = false}) => <Spoiler text={text}>
    <div className="cabinet-spoiler-children-container">
        <div className="cabinet-element-name-container __create">
            <Button type={BUTTON_TYPES.EDIT} onClick={callbacks.create}
                state={fetching ? BUTTON_STATES.WAITING : BUTTON_STATES.ENABLED}>
                {createText}
            </Button>
        </div>
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
                            research && element.published?
                            <td className="cabinet-element-table-td"><Button type={BUTTON_TYPES.EDIT} onClick={() => callbacks.results(element.slug)} >Результаты</Button></td>
                            :
                            <td className="cabinet-element-table-td"><Button type={BUTTON_TYPES.EDIT} onClick={() => callbacks.update(research?element.slug:element.id)}>Конструктор</Button></td>
                        }
                        {
                            research?
                            element.published?
                            <td className="cabinet-element-table-td"><Button type={BUTTON_TYPES.EDIT} onClick={() => callbacks.nav(element.slug)}>Ссылка</Button></td>
                            :
                            <td className="cabinet-element-table-td"><Button state={waitingPublish?BUTTON_STATES.WAITING:BUTTON_STATES.ENABLED} type={BUTTON_TYPES.EDIT} onClick={() => callbacks.publish(element.id, element.slug)}>Опубликовать</Button></td>
                            :<></>
                        }
                        <td className="cabinet-element-table-td"><Button state={deletingId === element.id ? BUTTON_STATES.WAITING : BUTTON_STATES.ENABLED} type={BUTTON_TYPES.DELETE} onClick={() => callbacks.remove(element.id)}>Удалить</Button></td>
                    </tr>    
                )
            }
            </tbody>
        </table>
    </div>
</Spoiler>