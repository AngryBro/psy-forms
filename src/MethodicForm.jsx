import { useState } from "react";
import { Input } from "./Input";
import "./css/MethodicForm.css";
import { Textarea } from "./Textarea";

const MethodicForm = () => {

    const methodic = {
        public_name: null,//"Тестовая методика",
        private_name: null,//"Тестовая методика (скрытое)",
        instruction: null,//"Инструкция по выполнению",
        time: null,
        saved_answers: [
            {
                id: 1,
                min: 0,
                max: 3,
                min_text: "Не боюсь",
                max_text: "Очень\nбоюсь"
            }
        ],
        questions: [
            {
                id: 1,
                text: "Насколько вы боитесь:",
                subquestions: [
                    {
                        id: 2,
                        text: "Мать",
                        subquestions: null,
                        answer_type: "scale",
                        answers: [
                            {
                                id: 1,
                                min: 0,
                                max: 3,
                                min_text: "Не боюсь",
                                max_text: "Очень\nбоюсь"
                            }
                        ]
                    },
                    {
                        id: 3,
                        text: "Отца",
                        subquestions: null,
                        answer_type: "scale",
                        answers: [
                            {
                                id: 1,
                                min: 0,
                                max: 3,
                                min_text: "Не боюсь",
                                max_text: "Очень\nбоюсь"
                            }
                        ]
                    }
                ],
                answers: null
            },
            {
                id: 4,
                text: "Насколько сложно делать это приложение?",
                subquestions: null,
                answer_type: "one",
                answers: [
                    {id: 1, text: "Изипизи", score: 1},
                    {id: 2, text: "Норм", score: 2},
                    {id: 3, text: "Хардово", score: 3}
                ]
            },
            {
                id: 5,
                text: "Кто такая бока?",
                subquestions: null,
                answer_type: "many",
                answers: [
                    {id: 4, text: "Киса", score: null},
                    {id: 5, text: "Собачка", score: null},
                    {id: 6, text: "Змейка", score: null},
                    {id: 7, text: "Черепашка", score: null}
                ]
            }
        ],
        inserts: [],
        scales: []
    }
    
    const [data, setData] = useState(methodic);
    const [activeBlock, setActiveBlock] = useState(undefined);

    const handleChangeMeta = (key) => {
        var callback = value => {
            var temp = JSON.parse(JSON.stringify(data));
            temp[key] = value;
            setData(temp);
        };
        return callback;
    };

    return <div className="methodic-form">
        <div className="methodic-form-container">
            <div className="methodic-form-header-container">
                
            </div>
            <Block active={-1 === activeBlock} handleActive={() => setActiveBlock(-1)}>
                <div className="methodic-form-name-container">
                    <Input font={25} onChange={handleChangeMeta('public_name')} tip="Открытое название" value={data.public_name} />
                </div>
                <div className="methodic-form-name-container">
                    <Input font={25} onChange={handleChangeMeta('private_name')} tip="Скрытое название" value={data.private_name}/>
                </div>
                <div className="methodic-form-instruction">
                    <Textarea tip="Инструкция" font={16} onChange={handleChangeMeta('instruction')} value={data.instruction} />
                </div>
            </Block>
        </div>
    </div>
};

const Block = ({children, active, handleActive}) => {
    return <div className="methodic-form-block-container">
        <div onClick={handleActive} className={"methodic-form-block" + (active?" methodic-form-block-active":"")}>
            {children}
        </div>
        <div className="methodic-form-block-new-container" style={{maxHeight: active?"100px":"0px"}}>
            <div className="methodic-form-block-action">+вопрос</div>
            <div className="methodic-form-block-action">+текст</div>
            <div className="methodic-form-block-action">+картинка</div>
        </div>
        <div style={{height:"15px"}}></div>
    </div>
};

export default MethodicForm;