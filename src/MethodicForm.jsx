import { useEffect, useRef, useState } from "react";
import { Input } from "./Input";
import "./css/MethodicForm.css";
import { Textarea } from "./Textarea";
import { QuestionFormBlock } from "./QuestionFormBlock";
import { TextFormBlock } from "./TextFormBlock";
import { ImgFormBlock } from "./ImgFormBlock";
// import { ScaleFormBlock } from "./ScaleFormBlock";
import { ScaleTableForm } from "./ScaleTableForm";


export const ANSWER_TYPE = {
    SCALE: "scale",
    ONE: "one",
    MANY: "many",
    PREVIOUS: "prev",
    QUESTIONS: "questions",
    FREE: "free"
}

export const BLOCK_TYPE = {
    QUESTION: "q",
    TEXT: "t",
    IMG: "i"
}

export const MethodicForm = () => {

    const newText = () => {
        return {
            id: null,
            type: BLOCK_TYPE.TEXT,
            text: "",
            title: ""
        }
    }

    const newImg = () => {
        return {
            id: null,
            type: BLOCK_TYPE.IMG,
            url: "https://i.pinimg.com/originals/45/03/2e/45032e54ea876a51492a1ca832e797a2.jpg"
        }
    }

    // const newMethodic = () => {
    //     return {
    //         public_name: null,//"Тестовая методика",
    //         private_name: null,//"Тестовая методика (скрытое)",
    //         instruction: null,//"Инструкция по выполнению",
    //         time: null,
    //         questions: [],
    //         scales: []
    //     }
    // }

    const methodic = {
        public_name: "Тестовая методика",
        private_name: "Тестовая методика (скрытое)",
        instruction: "Инструкция по выполнению",
        time: null,
        questions: [
            {
                id: null,
                type: "q",
                text: "Насколько вы боитесь:",
                answer_type: ANSWER_TYPE.QUESTIONS,
                required: true,
                answers: {
                    "questions" : [
                        {
                            id: null,
                            type: "q",
                            text: "Мать",
                            required: false,
                            answer_type: ANSWER_TYPE.SCALE,
                            answers: {
                                "one": [
                                    {text: "", score: null}
                                ],
                                "many": [
                                    {text: "", score: null}
                                ],
                                "scale": {
                                    min: 0,
                                    max: 3,
                                    min_text: "Не боюсь",
                                    max_text: "Очень\nбоюсь"
                                },
                                "questions": [],
                                "free": [{img: false}]
                            }
                        },
                        {
                            id: null,
                            type: "q",
                            text: "Отца",
                            required: false,
                            subquestions: null,
                            answer_type: ANSWER_TYPE.SCALE,
                            answers: {
                                "one": [
                                    {text: "", score: null}
                                ],
                                "many": [
                                    {text: "", score: null}
                                ],
                                "scale": {
                                    min: 0,
                                    max: 3,
                                    min_text: "Не боюсь",
                                    max_text: "Очень\nбоюсь"
                                },
                                "questions": [],
                                "free": [{img: false}]
                            }
                        }
                    ],
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
                    },
                    "free": [{img: false}]
                }
            },
            {
                id: null,
                text: "Насколько сложно делать это приложение?",
                type: "q",
                required: false,
                subquestions: [],
                answer_type: ANSWER_TYPE.ONE,
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
                    },
                    "questions":[],
                    "free": [{img: false}]
                }
            },
            {
                id: null,
                title: "Устал проходить?",
                text: "Надо как-то, ещё один вопрос.\nПосмотри на котиков.",
                type: BLOCK_TYPE.TEXT
            },
            {
                id: null,
                type: BLOCK_TYPE.IMG,
                url: "https://img3.goodfon.ru/original/2560x1440/c/87/regdoll-koshki-mordochki.jpg"
            },
            {
                id: null,
                text: "Кто такая бока?",
                type: "q",
                required: true,
                answer_type: ANSWER_TYPE.MANY,
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
                    },
                    "questions": [],
                    "free": [{img: false}]
                }
            }
        ],
        scales: [
            {name: "Страх", questions: {"1.1": [], "1.2": []}, type: "nominative"},
            {name: "Бока", questions: {"3": []}, type:"nominative"},
            {name: "Остальное", questions: {}, type: null}
        ]
    }
    
    const [data, setData] = useState(methodic);
    const [activeBlock, setActiveBlock] = useState(undefined);

    const containerRef = useRef();

    useEffect(() => {
        const click = e => {
            if(containerRef.current === undefined) return;
            let pos = containerRef.current.getBoundingClientRect();
            let x1 = pos.left;
            let x2 = x1+pos.width;
            if(e.clientX <  x1 || e.clientX > x2) {
                setActiveBlock(undefined);
            }
        }
        window.onclick = click;
        return () => window.onclick = null;
    }, []);

    const newSelectAnswer = (other = false) => JSON.parse(JSON.stringify(
        {text: other?null:"", score: null}
    ));

    const newFreeAnswer = () => {
        return {img: false}
    }

    const setActiveWithScroll = (i) => {
        setActiveBlock(i);
        // if(activeBlockRef.current!==undefined) activeBlockRef.current.scrollIntoView();
    }

    const blocks = () => {
        // let questions = [];
        let number = 0;
        data.questions.forEach(question => {
            if(question.type === BLOCK_TYPE.QUESTION) {
                number ++;
            }
            question.number = number;
        });
        return data.questions;
    }

    const newQuestion = () => {
        return {
        text: null,
        id: null,
        type: BLOCK_TYPE.QUESTION,
        required: false,
        answer_type: null,
        answers: {
            "one": [
                newSelectAnswer()
            ],
            "many": [
                newSelectAnswer()
            ],
            "scale": {
                min: 1,
                max: 3,
                min_text: null,
                max_text: null
            },
            "questions": [
                {
                    text: null,
                    id: null,
                    type: "q",
                    scales: [],
                    required: false,
                    answer_type: null,
                    answers: {
                        "one": [
                            newSelectAnswer()
                        ],
                        "many": [
                            newSelectAnswer()
                        ],
                        "scale": {
                            min: 1,
                            max: 3,
                            min_text: null,
                            max_text: null
                        },
                        "questions": [
                            
                        ],
                        "free": [
                            newFreeAnswer()
                        ]
                    }
                }
            ],
            "free": [
                newFreeAnswer()
            ]
        }
    }};

    const changeData = (...argument_array) => {
        console.log(argument_array);
        var temp = JSON.parse(JSON.stringify(data));
        var one_change = (args) => {
            var path = [];
            for(var i = 0; i < args.length-1; i++) {
                path.push(String(args[i]));
            }
            var value = args[args.length-1];
            var link_temp = temp;
            for(let i = 0; i < path.length-1; i++) {
                link_temp = link_temp[path[i]];
            }
            if(typeof value === "function") {
                value(link_temp[path[path.length-1]]);
            }
            else {
                link_temp[path[path.length-1]] = value;
            }
        }
        argument_array.forEach(one_change)
        setData(temp);
        console.log(temp);
    };

    
    const handlesNew = (block_id) => {
        var question = () => {
            addQuestion(block_id);
        };
        var text = () => {
            setActiveBlock(block_id+1);
            changeData(["questions", array => array.splice(block_id+1, 0, newText())]);
        };
        var img = () => {
            setActiveBlock(block_id+1);
            changeData(["questions", array => array.splice(block_id+1, 0, newImg())]);
        };
        return [
            {f: question, text: "Добавить вопрос"},
            {f: text, text: "Добавить текст"},
            {f :img, text: "Добавить изображение"}
        ]
    }

    const addQuestion = (i) => {
        setActiveBlock(i+1);
        changeData(["questions", array => array.splice(i+1, 0, newQuestion())]);
    }

    const deleteBlock = (i) => {
        if(i > 0) {
            setActiveBlock(i-1);
        }
        changeData(["questions", array => array.splice(i, 1)]);
    }

    const copyPrevAnswers = (question_index) => {
        var answers = JSON.parse(JSON.stringify(data.questions[question_index-1].answers));
        changeData(["questions", question_index, "answers", answers],
        ["questions", question_index, "answer_type", data.questions[question_index-1].answer_type]);
    }

    const copyPrevSubAnswers = (question_index, subquestion_index) => {
        var answers = JSON.parse(JSON.stringify(data.questions[question_index].answers[ANSWER_TYPE.QUESTIONS][subquestion_index-1].answers));
        changeData(["questions", question_index, "answers", ANSWER_TYPE.QUESTIONS, subquestion_index, "answers", answers],
        ["questions", question_index, "answers", ANSWER_TYPE.QUESTIONS, subquestion_index, "answer_type", data.questions[question_index].answers[ANSWER_TYPE.QUESTIONS][subquestion_index-1].answer_type]);
    }

    const resetSubQuestion = (question_index) => {
        changeData(["questions", question_index, "answers", ANSWER_TYPE.QUESTIONS, array => array[0] = newQuestion()]);
    }

    return <div className="methodic-form">
        <div className="methodic-form-container" ref={containerRef}>
            {/* <div className="methodic-form-header-container">
                
            </div> */}
            <div className="methodic-form-meta-block">
                <MetaBlock
                    data={data} 
                    isActive={-1===activeBlock} 
                    handleActive={() => setActiveWithScroll(-1)}
                    handlesNew={handlesNew(-1)}
                    handleChange={(key, value) => changeData([key, value])}
                />
            </div>
            {
                blocks().map((question, i) => 
                    question.type===BLOCK_TYPE.QUESTION?
                    <div key={i}>
                        <QuestionFormBlock
                            question={question}
                            handlesNew={handlesNew(i)}
                            handleActive={() => setActiveWithScroll(i)}
                            handleChange={(key, value) => changeData(["questions", i, key, value])}
                            isActive={i === activeBlock}
                            number={`${question.number}.`}
                            handleDelete={() => deleteBlock(i)}
                            isFirst={i === 0}
                            handlesAnswer={{
                                scale: (key, value) => changeData(["questions", i, "answers", ANSWER_TYPE.SCALE, key, value]),
                                select: {
                                    create: (other = false) => changeData(["questions", i, "answers", question.answer_type, array => array.push(newSelectAnswer(other))]),
                                    update: (answer_index, key, value) => changeData(["questions", i, "answers", question.answer_type, answer_index, key, value]),
                                    remove: (answer_index) => changeData(["questions", i, "answers", question.answer_type, array => array.splice(answer_index, 1)]),
                                },
                                copy: () => copyPrevAnswers(i),
                                sub: {
                                    handleChange: (index, key, value) => changeData([
                                        "questions",
                                        i,
                                        "answers",
                                        ANSWER_TYPE.QUESTIONS,
                                        index,
                                        key,
                                        value
                                    ]),
                                    handlesAnswer: {
                                        scale: (index, key, value) => changeData(["questions", i, "answers", ANSWER_TYPE.QUESTIONS, index, "answers", ANSWER_TYPE.SCALE, key, value]),
                                        select: {
                                            create: (question_index, other = false) => changeData(["questions", i, "answers", ANSWER_TYPE.QUESTIONS, question_index, "answers", question.answers[ANSWER_TYPE.QUESTIONS][question_index].answer_type, array => array.push(newSelectAnswer(other))]),
                                            update: (question_index, answer_index, key, value) => changeData(["questions", i, "answers", ANSWER_TYPE.QUESTIONS, question_index, "answers", question.answers[ANSWER_TYPE.QUESTIONS][question_index].answer_type, answer_index, key, value]),
                                            remove: (question_index, answer_index) => changeData(["questions", i, "answers", ANSWER_TYPE.QUESTIONS, question_index, "answers", question.answers[ANSWER_TYPE.QUESTIONS][question_index].answer_type, array => array.splice(answer_index, 1)]),
                                        },
                                        copy: (subquestion_index) => copyPrevSubAnswers(i, subquestion_index),
                                        reset: () => resetSubQuestion(i),
                                        free: {
                                            add: (question_index) => changeData(["questions", i, "answers",ANSWER_TYPE.QUESTIONS, question_index, "answers", ANSWER_TYPE.FREE, array => array.push(newFreeAnswer())]),
                                            remove: (question_index,index) => changeData(["questions", i, "answers",ANSWER_TYPE.QUESTIONS, question_index, "answers", ANSWER_TYPE.FREE, array => array.splice(index, 1)]),
                                            img: (question_index,index) => changeData(["questions", i, "answers",ANSWER_TYPE.QUESTIONS, question_index, "answers", ANSWER_TYPE.FREE, index, "img", !question.answers[ANSWER_TYPE.QUESTIONS][question_index].answers[ANSWER_TYPE.FREE][index].img])
                                        }
                                    },
                                    handleDelete: (index) => changeData(["questions", i, "answers", ANSWER_TYPE.QUESTIONS, array => array.splice(index, 1)]),
                                    handleNew: (index) => changeData(["questions",i,"answers", ANSWER_TYPE.QUESTIONS, array => array.splice(index+1, 0, newQuestion())])
                                },
                                free: {
                                    add: () => changeData(["questions", i, "answers", ANSWER_TYPE.FREE, array => array.push(newFreeAnswer())]),
                                    remove: index => changeData(["questions", i, "answers", ANSWER_TYPE.FREE, array => array.splice(index, 1)]),
                                    img: (index) => changeData(["questions", i, "answers", ANSWER_TYPE.FREE, index, "img", !question.answers[ANSWER_TYPE.FREE][index].img])
                                }
                            }}
                        />
                    </div>
                    :question.type === BLOCK_TYPE.TEXT?
                    <div key={i}>
                        <TextFormBlock handleChange={(key, value) => changeData(["questions", i, key, value])} data={question} isActive={i === activeBlock} handleActive={() => setActiveBlock(i)} handlesNew={handlesNew(i)} handleDelete={() => deleteBlock(i)} />
                    </div>
                    :question.type === BLOCK_TYPE.IMG?
                    <div key={i}>
                        <ImgFormBlock  data={question} isActive={i === activeBlock} handleActive={() => setActiveBlock(i)} handlesNew={handlesNew(i)} handleDelete={() => deleteBlock(i)} />
                    </div>
                    :<div key={i}/>                  
                )
            }
            <div>
                <ScaleTableForm data={data} changeData={changeData} />
            </div>
        </div>
        <div style={{height:"500px"}}></div>
    </div>
};

export const Block = ({children, isActive, handleActive, handlesNew}) => {


    return <div className="methodic-form-block-container">
        <div onClick={isActive?() => 1:handleActive} className={"methodic-form-block" + (isActive?" methodic-form-block-active":"")}>
            {children}
        </div>
        <div className="methodic-form-block-new-container" style={{maxHeight: isActive?"50px":"0px"}}>
            {
                handlesNew.map((handle,i) => <div key={i} className="methodic-form-block-action" onClick={handle.f}>{handle.text}</div>)
            }
        </div>
        <div style={{height:"15px"}}></div>
        
    </div>
};

const MetaBlock = ({handlesNew, handleActive, isActive, handleChange, data}) => {
    return <Block isActive={isActive} handleActive={handleActive} handlesNew={handlesNew}>
        <div className="methodic-form-name-container">
            <Input font={25} readOnly={!isActive} onChange={e => handleChange("public_name", e.target.value)} tip="Открытое название" value={data.public_name} />
        </div>
        <div className="methodic-form-name-container">
            <Input font={25} readOnly={!isActive} onChange={e => handleChange("private_name", e.target.value)} tip="Скрытое название" value={data.private_name}/>
        </div>
        <div className="methodic-form-instruction">
            <Textarea readOnly={!isActive} tip="Инструкция" font={16} onChangeValue={value => handleChange("instruction", value)} value={data.instruction} />
        </div>
    </Block>
};