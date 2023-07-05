import { Button } from "../Button";
import { Page } from "../Page";
import { Phisher } from "../Phisher";
import "../css/Statistic.css";
import { BUTTON_TYPES } from "../enums/BUTTON_TYPES";

export const Statistic = ({appState}) => {
    
    let research = "Детские страхи и тревожность";
    let stat = [
        {
            id: 1,
            criteria: "Фишера",
            effect: "Страхи Захарова.1 содержит Нападения",
            groups: [
                {name: "Без волнения", count: 35, effect: 24},
                {name: "С волнением", count: 19, effect: 18}
            ],
            phi: 2.552,
            zone: "Значимости"
        },
        {
            id: 2,
            criteria: "Фишера",
            effect: "Страхи Захарова.1 содержит Опоздания",
            groups: [
                {name: "Без волнения", count: 35, effect: 7},
                {name: "С волнением", count: 19, effect: 9}
            ],
            phi: 2.073,
            zone: "Неопределённости"
        }
    ]
    
    return <Page title="Статистика" appState={appState}>
        <div className="statistic-header">Статистическая обработка исследования "{research}"</div>
        {
            stat.map(statistic =>
                <div key={statistic.id} className="statistic-container">
                    <Phisher zone={statistic.zone} groups={statistic.groups} effect={statistic.effect} phi={statistic.phi} />
                </div>    
            )
        }
        <div className="statistic-add-button">
            <Button type={BUTTON_TYPES.EDIT}>Добавить статистическую обработку</Button>
        </div>
    </Page>
}