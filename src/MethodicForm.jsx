import { useCallback, useEffect, useState } from "react";
import { Input } from "./Input";
import "./css/MethodicForm.css";
import { Textarea } from "./Textarea";
import { QuestionFormBlock } from "./QuestionFormBlock";
import { ScaleTableForm } from "./ScaleTableForm";
import { BLOCK_TYPE } from "./enums/BLOCK_TYPE";
import { ANSWER_TYPE } from "./enums/ANSWER_TYPE";
import { Api } from "./Api";
import { API_ROUTES } from "./enums/API_ROUTES";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "./enums/ROUTES";
import { ALERTS } from "./enums/ALERTS";
import { Alert } from "./Alert";
import { SavingButton } from './SavingButton';

export const MethodicForm = ({id}) => {

    const newMethodic = () => {
        return {
            id: null,
            public_name: null,//"Тестовая методика",
            private_name: null,//"Тестовая методика (скрытое)",
            instruction: null,//"Инструкция по выполнению",
            questions: [],
            scales: []
        }
    }
    
    const [data, setData] = useState(newMethodic());
    const [activeBlock, setActiveBlock] = useState(undefined);
    const [saved, setSaved] = useState(false);
    const [saving, setSaving] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const [fetching, setFetching] = useState(false);

    const nav = useNavigate();

    const newSelectAnswer = (other = false) => ({text: other?null:"", score: null});

    const newFreeAnswer = () => {
        return {img: false}
    }

    const newScaleAnswer = () => {
        return {
            min: 1,
            max: 3,
            min_text: null,
            max_text: null,
            min_score: 1,
            max_score: 3
        }
    }

    const newQuestion = useCallback((sub = false) => {
        return {
        text: null,
        type: BLOCK_TYPE.QUESTION,
        required: !sub,
        answer_type: null,
        answers: {
            "one": [
                newSelectAnswer()
            ],
            "many": [
                newSelectAnswer()
            ],
            "scale": newScaleAnswer(),
            "questions": [
                {
                    text: null,
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
                        "scale": newScaleAnswer(),
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
    }}, []);

    const newSubQuestions = useCallback(() => {
            let question = newQuestion(true);
            delete question.answers[ANSWER_TYPE.QUESTIONS];
            return [question];
        }, [newQuestion]);

        
    useEffect(() => {
        const fetchData = (id) => {
            setFetching(true);
            Api(API_ROUTES.METHODIC_GET)
            .auth()
            .get({id})
            .timeout(() => setAlertMessage("Получение данных методики, подождите"), 0)
            .callback(({ok, data}) => {
                setFetching(false);
                setAlertMessage(null);
                if(ok) {
                    data.questions.forEach((question, i) => {
                        let answers = JSON.parse(JSON.stringify(question.answers));
                        let type = question.answer_type;
                        data.questions[i].answers = {
                            [ANSWER_TYPE.FREE]: newFreeAnswer(),
                            [ANSWER_TYPE.MANY]: newSelectAnswer(),
                            [ANSWER_TYPE.ONE]: newSelectAnswer(),
                            [ANSWER_TYPE.QUESTIONS]: newSubQuestions(),
                            [ANSWER_TYPE.SCALE]: newScaleAnswer()
                        };
                        data.questions[i].answers[type] = answers;
                        if(type === ANSWER_TYPE.QUESTIONS) {
                            data.questions[i].answers[type].forEach((subquestion, j) => {
                                let answers = JSON.parse(JSON.stringify(subquestion.answers));
                                let type1 = subquestion.answer_type;
                                data.questions[i].answers[type][j].answers = {
                                    [ANSWER_TYPE.FREE]: newFreeAnswer(),
                                    [ANSWER_TYPE.MANY]: newSelectAnswer(),
                                    [ANSWER_TYPE.ONE]: newSelectAnswer(),
                                    [ANSWER_TYPE.SCALE]: newScaleAnswer()
                                };
                                data.questions[i].answers[type][j].answers[type1] = answers;
                            });
                        }
                        
                    });
                    setData(data);
                    setSaved(true);
                }
                else {
                    setAlertMessage(ALERTS.ERROR);
                }
            }).send();
        }
        if(id !== null) {
            fetchData(id);
        }
    }, [id, newSubQuestions]);


    const save = () => {
        let data_to_send = JSON.parse(JSON.stringify(data));
        data_to_send.questions.forEach((question, i) => {
            data_to_send.questions[i].answers = question.answer_type===null?[]:question.answers[question.answer_type];
            if(question.answer_type === ANSWER_TYPE.QUESTIONS) {
                data_to_send.questions[i].answers.forEach((subquestion, j) => {
                    data_to_send.questions[i].answers[j].answers = subquestion.answers[subquestion.answer_type];
                    data_to_send.questions[i].answers[j].number = `${i+1}.${j+1}`;
                })
            }
            data_to_send.questions[i].number = String(i+1);
        });
        setSaving(true);
        Api(API_ROUTES.METHODIC_SAVE).auth().post(data_to_send).callback(({ok, data}) => {
            setSaving(false);
            if(ok) {
                if(data_to_send.id === null) {
                    nav(ROUTES.METHODIC_CONSTRUCTOR(data.id));
                }
                else {
                    setSaved(true);
                    setActiveBlock(undefined);
                }
            }
            else {
                setAlertMessage(ALERTS.ERROR);
            }
        }).send();
    }


    const setActiveWithScroll = (i) => {
        setActiveBlock(i);
        // if(activeBlockRef.current!==undefined) activeBlockRef.current.scrollIntoView();
    }

    const blocks = () => {
        let question_blocks = JSON.parse(JSON.stringify(data.questions));
        for(let i = 0; i < question_blocks.length; i++) {
            if(question_blocks[i].answer_type === ANSWER_TYPE.QUESTIONS) {
                for(let j = 0; j < question_blocks[i].answers.length; j++) {
                    question_blocks[i].answers[j].number = `${i+1}.${j+1}`;
                }
            }
            question_blocks[i].number = String(i+1);
        }
        return question_blocks;
    }


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
        setSaved(false);
        setData(temp);
    };

    
    const handlesNew = (block_id) => {
        var question = () => {
            addQuestion(block_id);
        };
        return [
            {f: question, text: "Добавить вопрос"}
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

    const reverse_score_array = (array) => {
        let len = array.length;
        for(let i = 0; i < len; i++) {
            if(array[i].text === null) {
                return;
            }
        }
        if(len > 1) {
            for(let i = 0; i < Math.floor(len / 2); i++) {
                let temp = array[i].score;
                array[i].score = array[len-1-i].score;
                array[len-1-i].score = temp;
            }
        }
    }

    const reverseScores = (question_index) => {
        
        changeData(["questions", question_index, "answers", data.questions[question_index].answer_type, reverse_score_array]);
    }

    const reverseSubScores = (question_index, subquestion_index, question) => {
        changeData(["questions", question_index, "answers", ANSWER_TYPE.QUESTIONS, subquestion_index, "answers", question.answers[ANSWER_TYPE.QUESTIONS][subquestion_index].answer_type, reverse_score_array]);
    }

    const handlesAnswer = (question, i) => {
        const scale = (key, value) => {
            changeData(["questions", i, "answers", ANSWER_TYPE.SCALE, key, value]);
        }
        const select = {
            create: (other = false) => changeData(["questions", i, "answers", question.answer_type, array => array.push(newSelectAnswer(other))]),
            update: (answer_index, key, value) => changeData(["questions", i, "answers", question.answer_type, answer_index, key, value]),
            remove: (answer_index) => changeData(["questions", i, "answers", question.answer_type, array => array.splice(answer_index, 1)]),
            reverse: () => reverseScores(i)
        }
        const copy = () => copyPrevAnswers(i);
        const free = {
            add: () => changeData(["questions", i, "answers", ANSWER_TYPE.FREE, array => array.push(newFreeAnswer())]),
            remove: index => changeData(["questions", i, "answers", ANSWER_TYPE.FREE, array => array.splice(index, 1)]),
            img: (index) => changeData(["questions", i, "answers", ANSWER_TYPE.FREE, index, "img", !question.answers[ANSWER_TYPE.FREE][index].img])
        }
        const sub = {
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
                    reverse: (question_index) => reverseSubScores(i, question_index, question)
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
            handleNew: (index) => changeData(["questions",i,"answers", ANSWER_TYPE.QUESTIONS, array => array.splice(index+1, 0, newQuestion(true))])
        };
        return {select, scale, free, sub, copy};
    }

    return <div className="methodic-form">
        <Alert waiting={fetching} onClose={() => setAlertMessage(null)}>{alertMessage}</Alert>
        <div className="methodic-form-container" hidden={fetching}>
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
                            handlesAnswer={handlesAnswer(question, i)}
                        />
                    </div>               
                )
            }
            <div>
                <ScaleTableForm data={data} changeData={changeData} />
            </div>
            <div className="methodic-form-save-button" hidden={fetching}>
                <SavingButton save={save} saving={saving} saved={saved}/>
            </div>
        </div>
        <div style={{height:"500px"}}></div>
    </div>
};

export const Block = ({children, isActive, handleActive = () => 1, handlesNew = []}) => {


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
        <div className={"methodic-form-name-container" + (isActive?"":" __hidden")}>
            <Input font={25} readOnly={!isActive} onChange={e => handleChange("private_name", e.target.value)} tip={data.public_name===null||data.public_name===""?"Скрытое название":data.public_name} value={data.private_name}/>
        </div>
        <div className="methodic-form-instruction">
            <Textarea readOnly={!isActive} tip="Инструкция" font={16} onChangeValue={value => handleChange("instruction", value)} value={data.instruction} />
        </div>
    </Block>
};