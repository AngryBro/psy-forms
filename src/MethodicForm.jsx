import { useState } from "react";
import { Input } from "./Input";
import "./css/MethodicForm.css";
import { Textarea } from "./Textarea";
import { QuestionFormBlock } from "./QuestionFormBlock";
import { scrollTo } from "./functions";

// const SCALE = "scale";
// const ONE = "one";
// const MANY = "many";
// const PREVIOUS = "prev";
// const QUESTIONS = "questions";

export const ANSWER_TYPE = {
    SCALE: "scale",
    ONE: "one",
    MANY: "many",
    PREVIOUS: "prev",
    QUESTIONS: "questions"
}

export const MethodicForm = () => {

    const methodic = {
        public_name: null,//"Тестовая методика",
        private_name: null,//"Тестовая методика (скрытое)",
        instruction: null,//"Инструкция по выполнению",
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
                                "questions": []
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
                                "questions": []
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
                    }
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
                    "questions":[]
                }
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
                    "questions": []
                }
            }
        ],
        scales: []
    }
    
    const [data, setData] = useState(methodic);
    const [activeBlock, setActiveBlock] = useState(undefined);

    const newSelectAnswer = (other = false) => JSON.parse(JSON.stringify(
        {text: other?null:"", score: null}
    ));

    const setActiveWithScroll = (i) => {
        setActiveBlock(i);
        scrollTo();
    }

    const newQuestion = () => JSON.parse(JSON.stringify({
        text: null,
        id: null,
        type: "q",
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
            "questions": []
        }
    }));

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
    };

    const deactiveBlocks = () => 1;

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

    return <div className="methodic-form" onClick={deactiveBlocks}>
        <div className="methodic-form-container">
            <div className="methodic-form-header-container">
                
            </div>
            <div>
                <MetaBlock
                    data={data} 
                    isActive={-1===activeBlock} 
                    handleActive={() => setActiveWithScroll(-1)}
                    handlesNew={handlesNew(-1)}
                    handleChange={(key, value) => changeData([key, value])}
                />
            </div>
            {
                data.questions.map((question, i) => 
                    // question.answer_type !== ANSWER_TYPE.QUESTIONS?
                    <div key={i}>
                        <QuestionFormBlock
                            question={question}
                            handlesNew={handlesNew(i)}
                            handleActive={() => setActiveWithScroll(i)}
                            handleChange={(key, value) => changeData(["questions", i, key, value])}
                            isActive={i === activeBlock}
                            number={`${i+1}.`}
                            handleDelete={() => changeData(["questions", array => array.splice(i,1)])}
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
                                        reset: () => resetSubQuestion(i)
                                    },
                                    handleDelete: (index) => changeData(["questions", i, "answers", ANSWER_TYPE.QUESTIONS, array => array.splice(index, 1)]),
                                    handleNew: (index) => changeData(["questions",i,"answers", ANSWER_TYPE.QUESTIONS, array => array.splice(index+1, 0, newQuestion())])
                                },
                            }}
                        />
                    </div>
                    // :
                    // <div key={i}>
                    //     <QuestionFormBlock
                    //         question={question}
                    //         handlesNew={handlesNew(i)}
                    //         handleActive={() => setActiveBlock(i)}
                    //         handleChange={(key, value) => changeData(["questions", i, key, value])}
                    //         isActive={i === activeBlock}
                    //         number={`${i+1}.`}
                    //         handleDelete={() => changeData(["questions", array => array.splice(i,1)])}
                    //         isFirst={i === 0}
                    //         handlesAnswer={{
                    //             sub: {
                    //                 handleChange: (index, key, value) => changeData([
                    //                     "questions",
                    //                     i,
                    //                     "answers",
                    //                     ANSWER_TYPE.QUESTIONS,
                    //                     index,
                    //                     key,
                    //                     value
                    //                 ]),
                    //                 handleDelete: (index) => changeData(["questions", i, "answers", ANSWER_TYPE.QUESTIONS, array => array.splice(index, 1)]),
                    //                 // handlesNew
                    //             },
                    //             scale: (key, value) => changeData(["questions", i, "answers", ANSWER_TYPE.SCALE, key, value]),
                    //             select: {
                    //                 create: (other = false) => changeData(["questions", i, "answers", question.answer_type, array => array.push({id: null, score: null, text: other?null:""})]),
                    //                 update: (answer_index, key, value) => changeData(["questions", i, "answers", question.answer_type, answer_index, key, value]),
                    //                 remove: (answer_index) => changeData(["questions", i, "answers", question.answer_type, array => array.splice(answer_index, 1)]),
                    //             },
                    //             copy: () => copyPrevAnswers(i)
                    //         }}
                    //     />
                    // </div>                        
                )
            }
        </div>
        <div style={{height:"500px"}}></div>
    </div>
};

export const Block = ({children, isActive, handleActive, handlesNew}) => {


    return <div className="methodic-form-block-container">
        <div onClick={handleActive} className={"methodic-form-block" + (isActive?" methodic-form-block-active":"")}>
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
            <Textarea readOnly={!isActive} tip="Инструкция" font={16} onInput={e => handleChange("instruction", e.target.innerText)} value={data.instruction} />
        </div>
    </Block>
};