import { useEffect, useState } from "react";
import { BLOCK_TYPE } from "./enums/BLOCK_TYPE";
import { ANSWER_TYPE } from "./enums/ANSWER_TYPE";
import { TextFormBlock } from "./TextFormBlock";
import { ImgFormBlock } from "./ImgFormBlock";
import { Methodic } from "./Methodic";
import "./css/Research.css";
import { Pagination } from "./Pagination";
import { Api } from "./Api";
import { API_ROUTES } from "./enums/API_ROUTES";
import { useParams } from "react-router-dom";
import { Alert } from "./Alert";
import { Spinner } from "./Spinner";
import { Button } from "./Button";
import { BUTTON_TYPES } from "./enums/BUTTON_TYPES";
import { BUTTON_STATES } from "./enums/BUTTON_STATES";

export const Research = () => {


    const [data, setData] = useState({pages: [[]]});

    const [answers, setAnswers] = useState({});

    const [page, setPage] = useState(null);

    const [error, setError] = useState(null);

    const [sending, setSending] = useState(false);

    const select_one_answer = (methodic_id, question_number, answer_index, select, other = null) => {
        let answers1 = JSON.parse(JSON.stringify(answers));
        if(select) {
            answers1[methodic_id][question_number].forEach(ans => {ans.selected = false});
        }
        answers1[methodic_id][question_number][answer_index].selected = select;
        if(other !== null) {
            answers1[methodic_id][question_number][answer_index].other = other;
        }
        setAnswers(answers1);
        save(answers1);
    }

    const select_many_answer = (methodic_id, question_number, answer_index, select, other = null) => {
        let answers1 = JSON.parse(JSON.stringify(answers));
        answers1[methodic_id][question_number][answer_index].selected = select;
        if(other !== null) {
            answers1[methodic_id][question_number][answer_index].other = other;
        }
        setAnswers(answers1);
        save(answers1);
    }

    const update_free_answer = (methodic_id ,question_number, answer_index, key, value) => {
        let answers1 = JSON.parse(JSON.stringify(answers));
        answers1[methodic_id][question_number][answer_index][key] = value;
        setAnswers(answers1);
        save(answers1);
    }

    const scale_answer = (methodic_id, question_number, value) => {
        let answers1 = JSON.parse(JSON.stringify(answers));
        answers1[methodic_id][question_number] = value;
        setAnswers(answers1);
        save(answers1);
    }

    const answerHandles = (methodic_id) => {
        return {
            one: (question_number, answer_index, select, other = null) => select_one_answer(methodic_id, question_number, answer_index, select, other),
            many: (question_number, answer_index, select, other = null) => select_many_answer(methodic_id, question_number, answer_index, select, other),
            free: (question_number, answer_index, key, value) => update_free_answer(methodic_id, question_number, answer_index, key, value),
            scale: (question_number, value) => scale_answer(methodic_id, question_number, value)
        }
    }

    const checkRequired = () => {
        const errorQuestionNumbers = [];
        const select = (methodic_id, question_number, required) => {
            let flag = required;
            answers[methodic_id][question_number].forEach(ans => {
                if(ans.selected) {
                    flag = false;
                }
            });
            errorQuestionNumbers.push(flag ? question_number : false);
        }
        const free = (methodic_id, question_number, required) => {
            let flag = true;
            answers[methodic_id][question_number].forEach(ans => {
                if(ans.text === null || ans.text.length === 0) {
                    flag = false;
                }
            });
            errorQuestionNumbers.push(flag || !required ? false : question_number);
        }
        const scale = (methodic_id, question_number, required) => {
            if(required && answers[methodic_id][question_number] === null) {
                errorQuestionNumbers.push(question_number);
            }
        }
        let methodic_id = null;
        let questions = [];
        data.pages[page-1].forEach(block => {
            if(block.type === BLOCK_TYPE.METHODIC) {
                methodic_id = block.id;
                block.questions.forEach(question => {
                    if(question.answer_type === ANSWER_TYPE.QUESTIONS) {
                        question.answers.forEach(sub => {
                            sub.required = question.required;
                            questions.push(sub)
                        });
                    }
                    else {
                        questions.push(question);
                    }
                })
            }
        });
        if(methodic_id !== null) {
            let callback;
            questions.forEach(question => {
                if(question.answer_type === ANSWER_TYPE.ONE || question.answer_type === ANSWER_TYPE.MANY) {
                    callback = select;
                }
                else if(question.answer_type === ANSWER_TYPE.SCALE) {
                    callback = scale;
                }
                else if(question.answer_type === ANSWER_TYPE.FREE) {
                    callback = free;
                }
                callback(methodic_id, question.number, question.required);
            });
        }
        const errs = errorQuestionNumbers.filter(Boolean);
        if(errs.length) {
            setError(`Вопрос${errs.length>1?"ы":""} ${errs.join(", ")} обязательны${errs.length>1?"е":"й"}!`);
        }
        return !Boolean(errs.length);
    }

    const {slug} = useParams();

    const save = (ans) => {
        localStorage.setItem(slug, JSON.stringify({answers: ans, page: page, version: data.version}));
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
            data.pages.forEach(page => {

                let block = page[0];

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
            setAnswers(ans);
        }
        const fetchData = () => {
            Api(API_ROUTES.RESEARCH_RESPONDENT)
            .get({slug})
            .callback(({ok, data}) => {
                if(ok) {
                    setData(data);
                    let draft = localStorage.getItem(slug);
                    if(draft === null) {
                        init_answers(data);
                        setPage(0);
                    }
                    else {
                        draft = JSON.parse(draft);
                        if(draft.version === data.version) {
                            setAnswers(draft.answers);
                            setPage(draft.page);
                        }
                        else {
                            localStorage.removeItem(slug);
                            init_answers(data);
                            setPage(0);
                        }
                    }
                }
                else {
                    setError("Ошибка загрузки исследования");
                }
            })
            .send();
        }
        if(slug) {
            fetchData();
        }
    }, [slug]);

    const paginationCallbacks = () => {
        const next = () => {
            if(!checkRequired()) return;
            setPage(p => p+1);
            window.scrollTo({top: 0, behavior: "smooth"});
        }
        const prev = () => {
            setPage(p => p-1);
        }
        const send = () => {
            if(!checkRequired()) return;
            setSending(true);
            Api(API_ROUTES.RESPONDENT_SEND)
            .post({
                research_id: data.id,
                answers: answers
            })
            .callback(({ok}) => {
                setSending(false);
                if(ok) {
                    setPage(Infinity);
                    localStorage.removeItem(slug);
                }
                else {
                    setError("Произошла ошибка, попробуйте обновить страницу");
                }
            })
            .send();

        }
        return {next, prev, send}
    }

    return <div className="research-page">
        <Alert onClose={setError} >{error}</Alert>
        <div className="research-container">
            {
                page === null ?
                <div className="research-loading-container">
                    <div className="research-loading-text">
                        Исследование загружается
                    </div>
                    <div className="research-loading-spinner">
                        <Spinner color={"var(--purple-form)"} />
                    </div>
                </div>
                :page === 0 || page === Infinity?
                <div className="research-meta-container">
                    <div className="research-name">
                        {data.public_name}
                    </div>
                    <div className="research-description">
                        {data.description}
                    </div>
                    <div className="research-begin-button">
                        <Button state={page===0?BUTTON_STATES.ENABLED:BUTTON_STATES.DISABLED} onClick={() => setPage(1)} type={BUTTON_TYPES.L}>
                            {page===0?"Начать":"Пройдено"}
                        </Button>
                    </div>
                </div>
                :data.pages[page-1].map((block, i) => 
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
            <div hidden={Number(page) === 0 || page === Infinity} className="research-pagination-container">
                <Pagination sending={sending} isFirst={page===1} isLast={page===data.pages.length} callbacks={paginationCallbacks()} />
            </div>
        </div>
    </div>
};