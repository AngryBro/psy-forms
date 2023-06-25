import { useEffect, useState } from "react";
import { BLOCK_TYPE } from "./enums/BLOCK_TYPE";
import { ANSWER_TYPE } from "./enums/ANSWER_TYPE";
import { TextFormBlock } from "./TextFormBlock";
import { ImgFormBlock } from "./ImgFormBlock";
import { Methodic } from "./Methodic";
import "./css/Research.css";

export const Research = () => {


    const [data, setData] = useState({blocks: []});

    const [answers, setAnswers] = useState({});

    const select_one_answer = (methodic_id, question_number, answer_index, select, other = null) => {
        let answers1 = JSON.parse(JSON.stringify(answers));
        if(select) {
            answers1[methodic_id][question_number].forEach(ans => {ans.selected = false});
        }
        answers1[methodic_id][question_number][answer_index].selected = select;
        answers1[methodic_id][question_number][answer_index].other = other;
        setAnswers(answers1);
    }

    const select_many_answer = (methodic_id, question_number, answer_index, select, other = null) => {
        let answers1 = JSON.parse(JSON.stringify(answers));
        answers1[methodic_id][question_number][answer_index].selected = select;
        answers1[methodic_id][question_number][answer_index].other = other;
        setAnswers(answers1);
    }

    const update_free_answer = (methodic_id ,question_number, answer_index, key, value) => {
        let answers1 = JSON.parse(JSON.stringify(answers));
        answers1[methodic_id][question_number][answer_index][key] = value;
        setAnswers(answers1);
    }

    const scale_answer = (methodic_id, question_number, value) => {
        let answers1 = JSON.parse(JSON.stringify(answers));
        answers1[methodic_id][question_number] = value;
        setAnswers(answers1);
    }

    const answerHandles = (methodic_id) => {
        return {
            one: (question_number, answer_index, select, other = null) => select_one_answer(methodic_id, question_number, answer_index, select, other),
            many: (question_number, answer_index, select, other = null) => select_many_answer(methodic_id, question_number, answer_index, select, other),
            free: (question_number, answer_index, key, value) => update_free_answer(methodic_id, question_number, answer_index, key, value),
            scale: (question_number, value) => scale_answer(methodic_id, question_number, value)
        }
    }

    useEffect(() => {
        const init_answers = (data) => {
            let ans = {};
            const push_data = (methodic_id, question) => {
                switch(question.answer_type) {
                    case ANSWER_TYPE.SCALE: {
                        ans[methodic_id][question.number] = null;
                        break;
                    }
                    case ANSWER_TYPE.ONE: {
                        let array = [];
                        question.answers.forEach(() => {
                            array.push({selected: false, other: null});
                        })
                        ans[methodic_id][question.number] = array;
                        break;
                    }
                    case ANSWER_TYPE.MANY: {
                        let array = [];
                        question.answers.forEach(() => {
                            array.push({selected: false, other: null});
                        })
                        ans[methodic_id][question.number] = array;
                        break;
                    }
                    case ANSWER_TYPE.FREE: {
                        let array = [];
                        question.answers.forEach(() => {
                            array.push({text: null, img: null});
                        })
                        ans[methodic_id][question.number] = array;
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
            data.blocks.forEach(block => {
                if(block.type === BLOCK_TYPE.METHODIC) {
                    ans[block.id] = {};
                    block.questions.forEach(question => {
                        if(question.answer_type === ANSWER_TYPE.QUESTIONS) {
                            question.answers.forEach(subquestion => {
                                push_data(block.id, subquestion);
                            })
                        }
                        else {
                            push_data(block.id, question);
                        }
                    })
                }
            });
            console.log(ans);
            setAnswers(ans);
        }
        const fetchData = () => {
            let f = {
                public_name: null,
                private_name: null,
                description: null,
                blocks: [
                    {
                        public_name: "Тестовая методика",
                        private_name: "Тестовая методика (скрытое)",
                        instruction: "Инструкция по выполнению",
                        type: BLOCK_TYPE.METHODIC,
                        id: 1,
                        time: null,
                        questions: [
                            {
                                id: null,
                                type: "q",
                                text: "Насколько вы боитесь:",
                                number: "1",
                                answer_type: ANSWER_TYPE.QUESTIONS,
                                required: true,
                                answers: 
                                        [
                                        {
                                            id: null,
                                            type: "q",
                                            text: "Пауков",
                                            number: "1.1",
                                            required: false,
                                            answer_type: ANSWER_TYPE.SCALE,
                                            answers: {
                                                    min: 0,
                                                    max: 3,
                                                    min_text: "Не боюсь",
                                                    max_text: "Очень боюсь",
                                                    min_score: 0,
                                                    max_score: 3
                                                },
                                        },
                                        {
                                            id: null,
                                            type: "q",
                                            text: "Змей",
                                            number: "1.2",
                                            required: false,
                                            subquestions: null,
                                            answer_type: ANSWER_TYPE.SCALE,
                                            answers: {
                                                    min: 0,
                                                    max: 3,
                                                    min_text: "Не боюсь",
                                                    max_text: "Очень\nбоюсь",
                                                    min_score: 0,
                                                    max_score: 3
                                            }
                                        }
                                    ],
                            },
                            {
                                id: null,
                                text: "Насколько сложно делать это приложение?",
                                type: "q",
                                number: "2",
                                required: false,
                                subquestions: [],
                                answer_type: ANSWER_TYPE.ONE,
                                answers:
                                    [
                                        {id: 1, text: "Легко", score: 1},
                                        {id: 2, text: "Средне", score: 2},
                                        {id: 3, text: "Сложно", score: 3}
                                    ],
                            },
                            {
                                id: null,
                                text: "Кто такая бока?",
                                type: "q",
                                number: "3",
                                required: true,
                                answer_type: ANSWER_TYPE.MANY,
                                answers:  [
                                        {id: null, text: "Киса", score: null},
                                        {id: null, text: "Собачка", score: null},
                                        {id: null, text: "Змейка", score: null},
                                        {id: null, text: "Черепашка", score: null},
                                        {text: null, other: true}
                                    ]
                            },
                            {
                                type: "q",
                                number:"4",
                                required: true,
                                answer_type: ANSWER_TYPE.SCALE,
                                answers: {
                                    min:1,
                                    max: 10,
                                    min_text: null,
                                    max_text: null,
                                    min_score: null,
                                    max_score: null 
                                }
                            }
                        ],
                        scales: [
                            {name: "Страх", questions: {"1.1": [], "1.2": []}, type: "score"},
                            {name: "Бока", questions: {"3": []}, type:"nominative"},
                            {name: "Остальное", questions: {}, type: null}
                        ]
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
                        public_name: "Вторая методика",
                        private_name: "Вторая методика (скрытое)",
                        instruction: "Инструкция по выполнению",
                        type: BLOCK_TYPE.METHODIC,
                        time: null,
                        id: 2,
                        questions: [
                            {
                                id: null,
                                type: "q",
                                text: "Насколько вы боитесь:",
                                number: "1",
                                answer_type: ANSWER_TYPE.QUESTIONS,
                                required: true,
                                answers: 
                                        [
                                        {
                                            id: null,
                                            type: "q",
                                            text: "Бабушку",
                                            number: "1.1",
                                            required: false,
                                            answer_type: ANSWER_TYPE.SCALE,
                                            answers: {
                                                    min: 0,
                                                    max: 3,
                                                    min_text: "Не боюсь",
                                                    max_text: "Очень\nбоюсь",
                                                    min_score: 0,
                                                    max_score: 3
                                                },
                                        },
                                        {
                                            id: null,
                                            type: "q",
                                            text: "Дедушку",
                                            number: "1.2",
                                            required: false,
                                            subquestions: null,
                                            answer_type: ANSWER_TYPE.SCALE,
                                            answers: {
                                                    min: 0,
                                                    max: 3,
                                                    min_text: "Не боюсь",
                                                    max_text: "Очень\nбоюсь",
                                                    min_score: 0,
                                                    max_score: 3
                                            }
                                        }
                                    ],
                            },
                            {
                                id: null,
                                text: "Насколько сложно делать это приложение?",
                                type: "q",
                                number: "2",
                                required: false,
                                subquestions: [],
                                answer_type: ANSWER_TYPE.ONE,
                                answers:
                                    [
                                        {id: 1, text: "Изипизи", score: 1},
                                        {id: 2, text: "Норм", score: 2},
                                        {id: 3, text: "Хардово", score: 3}
                                    ],
                            },
                            {
                                id: null,
                                text: "Выберите города России",
                                type: "q",
                                number: "3",
                                required: true,
                                answer_type: ANSWER_TYPE.MANY,
                                answers:  [
                                        {id: null, text: "Владивосток", score: null},
                                        {id: null, text: "London", score: null},
                                        {id: null, text: "Moscow", score: null},
                                        {id: null, text: "Таких нет", score: null}
                                    ]
                            },
                            {
                                text: "Опишите погоду сейчас",
                                number: "4",
                                required: false,
                                answer_type: ANSWER_TYPE.FREE,
                                answers: [
                                    {img: false},
                                    {img: false}
                                ]
                            }
                        ],
                        scales: [
                            {name: "Страх", questions: {"1.1": [], "1.2": []}, type: "score"},
                            {name: "Бока", questions: {"3": []}, type:"nominative"},
                            {name: "Остальное", questions: {}, type: null}
                        ]
                    },
                ]
            }
            setData(f);
            init_answers(f);
        }
        fetchData();
    }, []);

    return <div className="research-page">
        <div className="research-container">
            {
                data.blocks.map((block, i) => 
                    <div key={i}>
                        {
                            block.type === BLOCK_TYPE.TEXT?
                            <TextFormBlock isActive={false} data={block} />
                            :block.type === BLOCK_TYPE.IMG?
                            <ImgFormBlock isActive={false} data={block} />
                            :
                            <Methodic readOnly={false} data={block} handles={answerHandles(block.id)} answers={answers[block.id]} />
                        }
                    </div>
                )
            }
            <div className="research-constructor-publish-button research-send-button">Отправить</div>
        </div>
    </div>
};