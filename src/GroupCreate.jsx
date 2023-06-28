import { Modal } from "./Modal";
import { Input } from "./Input";
import { Select } from "./Select";
import { useState } from "react";
import { OPERATOR } from "./enums/OPERATOR";

export const GroupCreate = ({onClose}) => {

    const [name, setName] = useState("");

    // const [fetching] = useState(true);

    const methodics = {
        "Захаров": {
            scales: ["scare"],
            tableHeaders: ["scare", "1.1", "1.2"],
        },
        "Тревожность": {
            scales: ["anxiety", "scare"],
            tableHeaders: ["anxiety", "scare", "1", "2"]
        }
    }

    const conditions = [
        {string: "Захаров.Scare > 10", methodic: "Захаров", scale: "Scare", operator: OPERATOR.MORE, value: 10},
        {string: "Тревожность.Тревога <= 10", methodic: "Тревожность", scale: "Тревога", operator: OPERATOR.LESS_EQUALS, value: 5},
        {string: null, methodic: null, scale: null, operator: null, value: null, answers: null}
    ]

    const tableHeaders = (methodic) => methodics[methodic].tableHeaders;

    const scales = methodic => methodics[methodic].scales;


    return <Modal onClose={onClose}>
        <div className="group-create-container">
            <div className="group-create-header">Создание группы</div>
            <div className="group-create-name"><Input tip="Название группы" value={name} onChange={e => setName(e.target.value)} /></div>
            {
                conditions.map((condition, i) =>
                    <div key={i} className="group-create-condition">{condition.string},</div>    
                )
            }
            <ConditionCreate methodics={Object.keys(methodics)} scales={scales} tableHeaders={tableHeaders} />
        </div>
    </Modal>
}

const ConditionCreate = ({scales, tableHeaders, methodics}) => {
    
    const [headerIndex, setHeaderIndex] = useState(null);
    const [methodic, setMethodic] = useState(null);
    const [operator, setOperator] = useState(null);
    const [value, setValue] = useState(null);


    const conditionsTemplate = [
        {symbol: ">", text: "больше"},
        {symbol: "<", text: "меньше"},
        {symbol: "=", text: "равно"},
        {symbol: ">=", text: "больше либо равно"},
        {symbol: "<=", text: "меньше либо равно"}
    ]
    // const scaleSelected = () => {
    //     return selected !== null && selected < scales.length;
    // }

    const setValidValue = e => {
        setValue(e.target.value);
    }

    return <div className="group-create-condition">
        <Select value={methodic} onSelect={setMethodic}>
            {
                [{key: null, value: "Выберите методику", display: false}].concat(methodics.map(methodic => ({key: methodic, value: methodic})))
            }
        </Select>
        {
            methodic !== null?
            <Select value={headerIndex} onSelect={setHeaderIndex}>
                    {
                        [{key: null, value: "Шкала или вопрос", display: false}].concat(tableHeaders(methodic).map((header, i) => ({key: i, value: header})))
                    }
            </Select>
            :<></>
        }
        {
            headerIndex !== null?
            headerIndex < scales(methodic).length?
            <div className="group-create-scale-condition">
                <div>
                    <Select>
                        {conditionsTemplate.map(cond => ({key: cond.symbol, value: cond.text}))}
                    </Select>
                </div>
                <div>
                    <Input value={value} onChange={setValidValue} />
                </div>
            </div>
            :
            <div className="group-create-answers-condition">
                вопрос
            </div>
            :<></>
        }
    </div>
}