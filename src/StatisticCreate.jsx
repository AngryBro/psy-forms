import { useState } from "react";
import {Modal} from "./Modal";
import {Select} from "./Select";
import {CRITERIAS} from "./enums/CRITERIAS";
import {Api} from "./Api";
import {API_ROUTES} from "./enums/API_ROUTES";
import {Button} from "./Button";
import {Alert} from "./Alert";
import { BUTTON_STATES } from "./enums/BUTTON_STATES";
import "./css/Statistic.css";


export const StatisticCreate = ({slug, fetchData, onClose, groups, criterias}) => {
    

    const [criteriaId, setCriteriaId] = useState(null);
    const [effect, setEffect] = useState({});
    const [groupIds, setGroupIds] = useState([]);
    const [error, setError] = useState(null);
    const [calculating, setCalculating] = useState(false);

    const enabled = () => {
        return Object.keys(effect).length && groupIds.length > 1 && criteriaId !== null;
    }

    const selectGroups = text => [{key: null, value: text, display: false}]
    .concat(groups.map(group => ({key: group.id, value: group.name})));

    const onSelectGroup = (number, groupId) => {
        if(number >= groupIds.length) {
            let temp = [];
            for(let i = 0; i < number - groupIds.length; i++) {
                temp.push(null);
            }
            temp.push(groupId);
            setGroupIds(s => s.concat(temp));
        }
        else {
            setGroupIds(s => s.map((el, i) => i===number?groupId:el));
        }
    }

    const selectedGroupId = (number) => {
        if(number < groupIds.length) {
            return groupIds[number];
        }
        return null;
    }

    const calculate = () => {
        setCalculating(true);
        Api(API_ROUTES.STATISTIC_CREATE)
        .auth()
        .post({
            slug,
            group_ids: groupIds,
            criteria_id: criteriaId,
            effect
        })
        .callback(({ok}) => {
            setCalculating(false);
            if(ok) {
                onClose();
                fetchData();
            }
            else {
                setError("Ошибка рассчётов");
            }
        })
        .send();
    }
    
    return <Modal onClose={onClose}>
        <Alert onClose={setError}>{error}</Alert>
        <div className="statistic-create-container">
            <div className="statistic-create-select-criteria">
                <Select onSelect={setCriteriaId} value={criteriaId}>
                    {
                        [{key: null, value:"Выберите статистический критерий", display: false}]
                        .concat(criterias.map(criteria => ({key: criteria.id, value: criteria.name})))
                    }
                </Select>
            </div>
            {
                criteriaId === CRITERIAS.PHISHER?
                <div className="statistic-create-phisher-container">
                    <div className="statistic-create-phisher-tip">
                        Выберите 2 группы для выявления различий в них
                    </div>
                    <div className="statistic-create-phisher-groups-container">
                        {
                            [0, 1].map(number => 
                                <Select onSelect={(groupId) => onSelectGroup(number, groupId)} value={selectedGroupId(number)} key={number}>{selectGroups(`Группа ${number+1}`)}</Select>    
                            )
                        }
                    </div>
                    <div className="statistic-create-phisher-tip">
                        Выберите группу, соответствующую проверяемому эффекту
                    </div>
                    <div>
                        <Select value={effect.group_id===undefined?null:effect.group_id} onSelect={group_id => setEffect(e => ({...e, group_id}))}>{selectGroups("Эффект")}</Select>
                    </div>
                </div>
                :<></>
            }
            <div className="statistic-create-button">
                <Button state={!enabled()?BUTTON_STATES.DISABLED:calculating?BUTTON_STATES.WAITING:BUTTON_STATES.ENABLED} onClick={calculate}>Рассчитать</Button>
            </div>
        </div>
    </Modal>
}