import { useState } from "react";
import { Input } from "./Input";
import "./css/MethodicForm.css";
import { Textarea } from "./Textarea";
import { Select } from "./Select";
import { ScaleFormBlock } from "./AnswerFormBlocks";
import { Scale } from "./Scale";
import { AnswerListFormBlock } from "./AnswerListFormBlock";
import {SlideFlag} from "./SlideFlag";

const SCALE = "scale";
const ONE = "one";
const MANY = "many";
const PREVIOUS = "prev";

export const MethodicForm = () => {

    const methodic = {
        public_name: null,//"Тестовая методика",
        private_name: null,//"Тестовая методика (скрытое)",
        instruction: null,//"Инструкция по выполнению",
        time: null,
        saved_answers: [
            {
                id: null,
                min: 0,
                max: 3,
                min_text: "Не боюсь",
                max_text: "Очень\nбоюсь",
                type: SCALE
            }
        ],
        questions: [
            //{
            //     id: null,
            //     type: "q",
            //     text: "Насколько вы боитесь:",
            //     subquestions: [
            //         {
            //             id: null,
            //             type: "q",
            //             text: "Мать",
            //             subquestions: null,
            //             answer_type: SCALE,
            //             answers: [
            //                 {
            //                     id: 1,
            //                     min: 0,
            //                     max: 3,
            //                     min_text: "Не боюсь",
            //                     max_text: "Очень\nбоюсь"
            //                 }
            //             ]
            //         },
            //         {
            //             id: null,
            //             type: "q",
            //             text: "Отца",
            //             subquestions: null,
            //             answer_type: SCALE,
            //             answers: [
            //                 {
            //                     id: 1,
            //                     min: 0,
            //                     max: 3,
            //                     min_text: "Не боюсь",
            //                     max_text: "Очень\nбоюсь"
            //                 }
            //             ]
            //         }
            //     ],
            //     answers: null
            // },
            {
                id: null,
                text: "Насколько сложно делать это приложение?",
                type: "q",
                required: false,
                subquestions: null,
                answer_type: ONE,
                answers: {
                    "one": [
                        {id: 1, text: "Изипизи", score: 1},
                        {id: 2, text: "Норм", score: 2},
                        {id: 3, text: "Хардово", score: 3}
                    ],
                    "many": [],
                    "scale": {
                        min: 1,
                        max: 3,
                        min_text: null,
                        max_text: null
                    }
                }
            },
            {
                id: null,
                text: "Кто такая бока?",
                subquestions: null,
                type: "q",
                required: true,
                answer_type: MANY,
                answers: {
                    "one": [],
                    "many": [
                        {id: null, text: "Киса", score: null},
                        {id: null, text: "Собачка", score: null},
                        {id: null, text: "Змейка", score: null},
                        {id: null, text: "Черепашка", score: null}
                    ],
                    "scale": {
                        min: 1,
                        max: 3,
                        min_text: null,
                        max_text: null
                    }
                }
            }
        ],
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

    // const deactiveBlocks = useCallback(() => setActiveBlock(undefined), []);
    const deactiveBlocks = () => 1;

    const handleChangeQuestion = (key, i, sub=false, j) => {
        var callback = value => {
            var temp = JSON.parse(JSON.stringify(data));
            if(sub) {
                temp.questions[i].subquestions[j][key] = value;
            }
            else {
                if(key === "answer_type" && value === PREVIOUS) {
                    temp.questions[i].answers = JSON.parse(JSON.stringify(temp.questions[i-1].answers));
                    value = temp.questions[i-1].answer_type;
                }
                temp.questions[i][key] = value;
            }
            setData(temp);
            console.log(temp);
        }
        return callback;
    }

    const handleEditScale = (question_index, key) => {
        var callback = value => {
            var temp = JSON.parse(JSON.stringify(data));
            if((key === "min" || key === "max") && value !== "") {
                value = Number(value);
                if(!isNaN(value)) {
                    temp.questions[question_index].answers[SCALE][key] = value;
                }
            }
            else {
                temp.questions[question_index].answers[SCALE][key] = value;
            }
            
            setData(temp);
        }
        return callback;
    }

    const handlesNew = (block_id) => {
        var question = () => {
            addQuestion(block_id);
        };
        var text = () => {
            console.log(`Добавить текст для ${block_id}`);
        };
        var img = () => {
            console.log(`Добавить картинку для ${block_id}`);
        };
        return {
            question,
            text,
            img
        }
    }

    const answerDelete = (type, q_index, a_index) => {
        var temp = JSON.parse(JSON.stringify(data));
        temp.questions[q_index].answers[type].splice(a_index, 1);
        setData(temp);
    }

    const answerAdd = (type, q_index, other) => {
        var temp = JSON.parse(JSON.stringify(data));
        temp.questions[q_index].answers[type].push({text:other?null:"", score:null, id: null});
        setData(temp);
    }

    const answerUpdate = (type, q_index, a_index, key, value) => {
        var temp = JSON.parse(JSON.stringify(data));
        if(key === "text") {
            temp.questions[q_index].answers[type][a_index][key] = value;
        }
        else {
            if(value === "") {
                temp.questions[q_index].answers[type][a_index][key] = null;
            }
            else {
                if(!isNaN(value)) {
                    temp.questions[q_index].answers[type][a_index][key] = Number(value);
                }
            }
        }
        setData(temp);
    }

    const deleteBlock = (i) => {
        var temp = JSON.parse(JSON.stringify(data));
        temp.questions.splice(i, 1);
        setData(temp);
    }

    const addQuestion = (i) => {
        var temp = JSON.parse(JSON.stringify(data));
        var new_question = {
            text: null,
            id: null,
            type: "q",
            required: false,
            answer_type: null,
            answers: {
                "one": [
                    {text: "", score: null}
                ],
                "many": [
                    {text: "", score: null}
                ],
                "scale": {
                    min: 1,
                    max: 3,
                    min_text: null,
                    max_text: null
                }
            }
        }
        temp.questions.splice(i+1, 0, new_question);
        setData(temp);
    }

    return <div className="methodic-form" onClick={deactiveBlocks}>
        <div className="methodic-form-container">
            <div className="methodic-form-header-container">
                
            </div>
            <div>
                <MetaBlock
                    data={data} 
                    isActive={-1===activeBlock} 
                    handleActive={() => setActiveBlock(-1)}
                    handlesNew={handlesNew(-1)}
                    handleChange={handleChangeMeta}
                    handleDeactive={deactiveBlocks}
                />
            </div>
            {
                data.questions.map((question, i) => 
                    <div key={i}>
                        <QuestionBlock
                            question={question}
                            handlesNew={handlesNew(i)}
                            handleActive={() => setActiveBlock(i)}
                            handleDeactive={deactiveBlocks}
                            handleChange={(key) => handleChangeQuestion(key, i)}
                            handleEditScale={key => handleEditScale(i, key)}
                            isActive={i === activeBlock}
                            number={`${i+1}.`}
                            handleAnswerDelete = {(index) => answerDelete(question.answer_type, i, index)}
                            handleAnswerAdd = {(other = false) => answerAdd(question.answer_type, i, other)}
                            handleAnswerUpdate = {(index, key, value) => answerUpdate(question.answer_type,i,index, key, value)}
                            handleDelete={() => deleteBlock(i)}
                            isFirst={i === 0}
                        />
                    </div>                        
                )
            }
        </div>
        <div style={{height:"500px"}}></div>
    </div>
};

const Block = ({children, isActive, handleActive, handlesNew, handleDeactive}) => {

    // const blockRef = useRef();

    // useEffect(() => {
    //     if(isActive) {
    //         const handleClick = e => {
    //             if(!blockRef.current) return;
    //             if(!blockRef.current.contains(e.target)) {
    //                 handleDeactive();
    //             }
    //         }
    //         document.addEventListener("click", handleClick);
    //         return () => document.removeEventListener("click", handleClick);
    //     }
    // }, [blockRef, handleDeactive, isActive])

    return <div className="methodic-form-block-container" onClick={handleActive}>
        <div className={"methodic-form-block" + (isActive?" methodic-form-block-active":"")}>
            {children}
        </div>
        <div className="methodic-form-block-new-container" style={{maxHeight: isActive?"50px":"0px"}}>
            <div className="methodic-form-block-action" onClick={handlesNew.question}>Добавить вопрос</div>
            <div className="methodic-form-block-action" onClick={handlesNew.text}>Добавить текст</div>
            <div className="methodic-form-block-action" onClick={handlesNew.img}>Добавить картинку</div>
        </div>
        <div style={{height:"15px"}}></div>
    </div>
};

const MetaBlock = ({handlesNew, handleActive, isActive, handleChange, data, handleDeactive}) => {
    return <Block isActive={isActive} handleActive={handleActive} handlesNew={handlesNew} handleDeactive={handleDeactive}>
        <div className="methodic-form-name-container">
            <Input font={25} readOnly={!isActive} onChange={handleChange('public_name')} tip="Открытое название" value={data.public_name} />
        </div>
        <div className="methodic-form-name-container">
            <Input font={25} readOnly={!isActive} onChange={handleChange('private_name')} tip="Скрытое название" value={data.private_name}/>
        </div>
        <div className="methodic-form-instruction">
            <Textarea readOnly={!isActive} tip="Инструкция" font={16} onChange={handleChange('instruction')} value={data.instruction} />
        </div>
    </Block>
};

const QuestionBlock = ({handlesNew, isFirst, handleActive, handleDelete, isActive, handleChange, question, number, handleEditScale, handleAnswerDelete, handleAnswerAdd, handleAnswerUpdate, handleDeactive}) => {

    return <Block isActive={isActive} handleActive={handleActive} handlesNew={handlesNew} handleDeactive={handleDeactive}>
        <div className="methodic-form-question-input">
            <div className="methodic-form-question-number">{number} <span className="methodic-form-question-required" style={{opacity:Number(question.required)}}>*</span> </div>
            <Input readOnly={!isActive} font={20} tip="Текст вопроса" value={question.text} onChange={handleChange("text")}/>
        </div>
        <div className={isActive?"methodic-form-question-constructor-active":"methodic-form-question-constructor"}>
            <div className="methodic-form-question-flex">
                    <div className="methodic-form-answer-type-select">
                        <Select selected_key={{get: question.answer_type, set: handleChange("answer_type")}}>
                            {[
                                {key: null, value: "Выбрать тип ответа", display: false},
                                {key: PREVIOUS, value: "Копировать у предыдущего", display: !isFirst},
                                {key: ONE, value: "Один из списка"},
                                {key: MANY, value: "Множественный выбор"},
                                {key: SCALE, value: "Шкала"}
                            ]}
                        </Select>
                    </div>
            </div>
            {
                question.answer_type === SCALE?
                <div>
                    <ScaleFormBlock scale_data_set={handleEditScale}  scale_data_get={key => question.answers[SCALE][key]}/>
                </div>
                :(question.answer_type === ONE || question.answer_type === MANY)?
                <div>
                    <AnswerListFormBlock answers_get={question.answers[question.answer_type]} edit={true} 
                        handleDelete={handleAnswerDelete}
                        handleAdd={handleAnswerAdd}
                        handleUpdate={handleAnswerUpdate}
                        many={question.answer_type === MANY}
                    />
                </div>
                :<></>
            }
        </div>
        <div className="methodic-form-answer-block-view">
            {
                question.answer_type === SCALE?
                <div>
                    <Scale
                        min={question.answers[question.answer_type].min}
                        max = {question.answers[question.answer_type].max}
                        minText={question.answers[question.answer_type].min_text}
                        maxText={question.answers[question.answer_type].max_text}
                        value={{get: question.answers[question.answer_type].min-1, set: () => 1}}
                    />
                </div>
                :(question.answer_type === ONE || question.answer_type === MANY) && !isActive?
                <div>
                    <AnswerListFormBlock answers_get={question.answers[question.answer_type]} many={question.answer_type === MANY}/>
                </div>
                :<></>
            }
        </div>
        {
            isActive?
            <div className="methodic-form-question-block-footer">
                <div className="methodic-form-question-block-line"></div>
                <div className="methodic-form-question-block-actions">
                    <div onClick={handleDelete} className="methodic-form-question-block-bin">&#128465;</div>
                    <div className="methodic-form-question-block-vline"></div>
                    <div>
                    <SlideFlag flag={question.required} handleClick={() => handleChange("required")(!question.required)}>
                        Обязательный вопрос:
                    </SlideFlag>
                    </div>
                </div>
            </div>
            :<></>
        }
    </Block>
};