import { useCallback, useEffect, useState } from "react"
import { Page } from "../Page"
import { Spoiler } from "../Spoiler"
import "../css/Cabinet.css";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../enums/ROUTES";

export const Cabinet = () => {
    
    
    const [methodics, setMethodics] = useState([]);
    const [researches, setResearches] = useState([]);

    const nav = useNavigate();

    const fetchData = useCallback(() => {
        let met = [
            {id: 1, public_name: "Методика 1", private_name: "мет 1"},
            {id: 2, public_name: "Методика 2", private_name: "мет 2"}
        ]
        let res = [
            {id: 1, public_name: "Исследование 1", private_name: "исл 1"},
            {id: 2, public_name: "Исследование 2", private_name: "исл 2"}
        ]
        setMethodics(met);
        setResearches(res);
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    const methodicActions = () => {
        const remove = (id) => {
            //показ модалки с уведомлением
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
            //показ модалки с уведомлением
        }
        return {
            remove,
            update: (id) => nav(ROUTES.RESEARCH_CONSTRUCTOR(id)),
            create: () => nav(ROUTES.RESEARCH_CONSTRUCTOR("new")),
            results: (id) => nav(ROUTES.RESULTS(id)),
            get: (id) => window.open(ROUTES.RESEARCH(id))
        }
    }

    
    return <Page title="Личный кабинет">
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

const ElementSpoiler = ({text, createText, elements, callbacks, results = false}) => <Spoiler text={text}>
    <div className="cabinet-spoiler-children-container">
        <div className="cabinet-element-name-container __create" onClick={callbacks.create}>{createText}</div>
        {
            elements.map(element =>
                <div key={element.id} className="cabinet-element">
                    <div onClick={() => callbacks.get(element.id)} className="cabinet-element-name-container">
                        <div className="cabinet-element-name">{element.public_name}</div>
                        <div className="cabinet-element-name">({element.private_name})</div>
                    </div>
                    {
                        results?
                        <div className="cabinet-element-button" onClick={() => callbacks.results(element.id)}>Результаты</div>
                        :<></>
                    }
                    <div className="cabinet-element-button" onClick={() => callbacks.update(element.id)}>Редактировать</div>
                    <div className="cabinet-element-button" onClick={() => callbacks.remove(element.id)}>Удалить</div>
                </div>    
            )
        }
    </div>
</Spoiler>