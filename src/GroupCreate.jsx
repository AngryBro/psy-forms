import { Modal } from "./Modal";
import { Input } from "./Input";
import { Select } from "./Select";
import { useState } from "react";
import { Spoiler } from "./Spoiler";
import { Answer } from "./Answer";
import { Button } from "./Button";
import { BUTTON_TYPES } from "./enums/BUTTON_TYPES";
import { Api } from "./Api";
import { API_ROUTES } from "./enums/API_ROUTES";
import { Alert } from "./Alert";
import { BUTTON_STATES } from "./enums/BUTTON_STATES";

export const GroupCreate = ({onClose, methodics, headers, scales, allAnswers, slug, setGroups}) => {

    const [name, setName] = useState("");

    const [conditions, setConditions] = useState([]);
    const [methodic, setMethodic] = useState(null);
    const [isScale, setIsScale] = useState(null);
    const [header, setHeader] = useState(null);
    const [operator, setOperator] = useState(null);
    const [value, setValue] = useState(null);
    const [answerTexts, setAnswerTexts] = useState({});
    const [error, setError] = useState(null);
    const [creating, setCreating] = useState(false);

    const operators = [
        {value: "Знак сравнения", key: null, display: false},
        {key: ">", value: "Больше"},
        {key: "<", value: "Меньше"},
        {key: ">=", value: "Больше либо равно"},
        {key: "<=", value: "Меньше либо равно"},
        {key: "=", value: "Равно"}
    ]

    const resetValues = () => {
        setIsScale(null);
        setHeader(null);
        setOperator(null);
        setValue(null);
        setAnswerTexts({});
        setMethodic(null);
    }

    const conditionString = (condition) => {
        if(condition.is_scale) {
            return `${condition.methodic_private_name}.${headers(condition.methodic_private_name)[condition.scale_index]} ${condition.operator} ${condition.value}`;
        }
        else {
            return `${condition.methodic_private_name}, ${condition.question_number}- ${condition.answer_texts.join(", ")}`;
        }
    }

    const onSelectHeader = (header) => {
        setHeader(header);
        setIsScale(header < scales(methodic).length);
    }

    const handlesAnswers = (ans) => {
        const select = () => {
            setAnswerTexts(a => ({...a, [ans]:ans}));
        }
        const deselect = () => {
            setAnswerTexts(s => ({...s, [ans]: undefined}));
        }
        return {select, deselect}
    }

    const removeCondition = (index) => {
        setConditions(c => c.filter((e,i) => i!==index));
    }

    const saveCondition = () => {
        if(isScale === null || methodic === null || header === null 
            || (isScale === true && (operator === null || value === null))
            || (isScale === false && answerTexts.length === 0)) {
                return;
            }
        let newCondition = {
            is_scale: isScale,
            methodic_private_name: methodic
        };
        if(isScale) {
            newCondition = {...newCondition, 
                scale_index: header,
                operator,
                value
            }
        }
        else {
            newCondition = {...newCondition, 
                question_number: headers(methodic)[header],
                answer_texts: Object.values(answerTexts).filter(t => t !== undefined)
            }
        }
        newCondition.string = conditionString(newCondition);
        setConditions(c => c.concat([newCondition]));
        resetValues();
    }

    const inputValue = (e) => {
        let value = e.target.value;
        let numberValue = Number(value);
        if(isNaN(numberValue)) {
            return false;
        }
        if(value === "") {
            numberValue = null;
        }
        setValue(numberValue);
    }
    
    const create = () => {
        setCreating(true);
        Api(API_ROUTES.GROUP_CREATE)
        .auth()
        .post({
            slug,
            name,
            conditions
        })
        .callback(({ok, data}) => {
            setCreating(false);
            if(ok) {
                setGroups(data);
                onClose();
            }
            else {
                setError("Ошибка создания группы");
            }
        })
        .send();
    }

    return <Modal onClose={onClose}>
        <div className="group-create-container">
            <Alert onClose={setError}>{error}</Alert>
            <div className="group-create-header">Выделение подгруппы</div>
            <div className="group-create-name"><Input tip="Название группы" value={name} onChange={e => setName(e.target.value)} /></div>
            {
                conditions.map((condition, i) =>
                    <div key={i}>
                        <div className="group-create-condition">{condition.string};</div>
                        <div><Button onClick={() => removeCondition(i)} type={BUTTON_TYPES.DELETE}>x</Button></div>    
                    </div>
                )
            }
            <div>
                {
                name === null || name === "" ? <></>:
                    <>
                    <div>Добавить условие:</div>
                    <div>
                        <Select onSelect={setMethodic} value={methodic}>
                            {
                                [{key: null, value: "Разделить по методике", display: false}]
                                .concat(methodics.map(methodic => ({key: methodic, value: methodic})))
                            }
                        </Select>
                    </div>
                    </>
                }
                {
                    methodic === null ?<></>:
                    <div>
                        <Select onSelect={onSelectHeader} value={header}>
                            {
                                [{key: null, value: "По шкале или вопросу", display: false}]
                                .concat(headers(methodic).map((header, i) => ({key: i, value: header})))
                            }
                        </Select>
                    </div>
                }
                {
                    header === null ? <></>:
                    isScale?
                    <div>
                        <Select onSelect={setOperator} value={operator}>
                            {operators}
                        </Select>
                        {
                            operator === null?<></>:
                            <div>
                                <Input tip="Число для сравнения" value={value} onChange={inputValue} />
                            </div>
                        }
                    </div>
                    :
                    <Spoiler text="Подходящие ответы" >
                        {
                            allAnswers(methodic, headers(methodic)[header])
                            .map((ans, i) => 
                                <div key={i}>
                                    <Answer selected={answerTexts[ans]!==undefined} handles={handlesAnswers(ans)} checkbox={true}>{ans}</Answer>
                                </div>    
                            )
                        }
                    </Spoiler>
                }
                <div>
                    <Button onClick={saveCondition}>Сохранить условие</Button>
                </div>
            </div>
            <div>
                <Button state={creating?BUTTON_STATES.WAITING:BUTTON_STATES.ENABLED} onClick={create}>Выделить подгруппу</Button>
            </div>
        </div>
    </Modal>
}