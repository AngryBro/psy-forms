import { useCallback, useEffect, useState } from "react";
import { Button } from "../Button";
import { Page } from "../Page";
import { Phisher } from "../Phisher";
import { StatisticCreate } from "../StatisticCreate";
import "../css/Statistic.css";
import { BUTTON_TYPES } from "../enums/BUTTON_TYPES";
import { BUTTON_STATES } from "../enums/BUTTON_STATES";
import { Api } from "../Api";
import { useParams } from "react-router-dom";
import { API_ROUTES } from "../enums/API_ROUTES";
import { Alert } from "../Alert";
import { CRITERIAS } from "../enums/CRITERIAS";

export const Statistic = ({appState}) => {
    
    const {slug} = useParams();

    const [statistics, setStatistics] = useState([]);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState({groups: false, criterias: false, statistics: false, research: false});
    const [openedCreateWindow, setOpenedCreateWindow] = useState(false);
    const [groups, setGroups] = useState([]);
    const [criterias, setCriterias] = useState([]);
    const [research, setResearch] = useState({private_name: "..."});
    const [removing, setRemoving] = useState({});

    const remove = id => {
        setRemoving(r => ({...r, [id]: true}));
        Api(API_ROUTES.STATISTIC_REMOVE)
        .auth()
        .post({id})
        .callback(({ok}) => {
            if(ok) {
                fetchData();
            }
            else {
                setError("Ошибка удаления");
            }
        })
        .send();
    }

    const fetchData = useCallback(() => {
        setFetching(f => ({...f, statistics: true}));
        Api(API_ROUTES.STATISTIC_GET)
        .auth()
        .get({slug})
        .callback(({ok, data}) => {
            setFetching(f => ({...f, statistics: false}));
            setRemoving({});
            if(ok) {
                setStatistics(data);
            }
            else {
                setError("Ошибка загрузки данных");
            }
        })
        .send();
    }, [slug]);

    useEffect(() => {
        const fetchGroups = () => {
            setFetching(f => ({...f, groups: true}));
            Api(API_ROUTES.GROUPS)
            .auth()
            .get({slug})
            .callback(({ok, data}) => {
                setFetching(f => ({...f, groups: false}));
                if(ok) {
                    setGroups(data);
                }
                else {
                    setError("Ошибка загрузки групп");
                }
            })
            .send();
        }
        const fetchCriterias = () => {
            setFetching(f => ({...f, criterias: true}));
            Api(API_ROUTES.CRITERIAS)
            .auth()
            .callback(({ok, data}) => {
                setFetching(f => ({...f, criterias: false}));
                if(ok) {
                    setCriterias(data);
                }
                else {
                    setError("Ошибка загрузки критериев");
                }
            })
            .send();
        }
        const fetchResearch = () => {
            setFetching(f => ({...f, research: true}));
            Api(API_ROUTES.RESEARCH_META)
            .auth()
            .get({slug})
            .callback(({ok, data}) => {
                setFetching(f => ({...f, research: false}));
                if(ok) {
                    setResearch(data);
                }
                else {
                    setError("Ошибка загрузки исследования");
                }
            })
            .send();
        }
        fetchGroups();
        fetchCriterias();
        fetchData();
        fetchResearch();
    }, [fetchData, slug]);

    const isSomeFetching = () => {
        return Object.values(fetching).includes(true) ? "Загрузка данных" : null;
    }
    
    return <Page title="Статистика" appState={appState}>
        <Alert onClose={setError}>{error}</Alert>
        <Alert waiting={true}>{isSomeFetching()}</Alert>
        <div className="statistic-header">Статистическая обработка исследования "{research.private_name}"</div>
        {
            statistics.map(statistic =>
                <div key={statistic.id} className="statistic-container">
                    {
                        statistic.criteria_id === CRITERIAS.PHISHER ?
                        <Phisher groups={statistic.groups} criteria={statistic.criteria} n={statistic.result.n} m={statistic.result.m} zone={statistic.result.zone} effect={statistic.effect} phi={statistic.result.phi} />
                        :<></>
                    }
                    <div className="statistic-remove">
                        <Button state={removing[statistic.id]?BUTTON_STATES.WAITING:BUTTON_STATES.ENABLED} type={BUTTON_TYPES.DELETE} onClick={() => remove(statistic.id)}>Удалить обработку</Button>
                    </div>
                </div>    
            )
        }
        <div className="statistic-add-button">
            <Button onClick={() => setOpenedCreateWindow(true)} type={BUTTON_TYPES.EDIT}>Добавить статистическую обработку</Button>
        </div>
        {
            openedCreateWindow?<StatisticCreate groups={groups} criterias={criterias} onClose={() => setOpenedCreateWindow(false)} slug={slug} fetchData={fetchData} />:<></>
        }
    </Page>
}