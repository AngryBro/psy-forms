import { useEffect, useState } from "react";
import { Answer } from "./Answer";
import { ANSWER_TYPE, BLOCK_TYPE } from "./MethodicForm";
import { Spoiler } from "./Spoiler"
import "./css/ScaleTableForm.css";
import { Input } from "./Input";

export const ScaleTableForm = ({data, changeData}) => {

    const SCALE_TYPE = {
        NOMINATIVE: "nominative",
        SCORE: "score"
    }

    const all_questions = () => {
        let questions = [];
        let question_counter = 0;
        data.questions.forEach((question, i) => {
            if(question.type === BLOCK_TYPE.QUESTION && question.answer_type !== ANSWER_TYPE.FREE) {
                question.index = i;
                question_counter++;
                if(question.answer_type === ANSWER_TYPE.QUESTIONS) {
                    let subquestion_counter = 0;
                    question.answers[ANSWER_TYPE.QUESTIONS].forEach(subquestion => {
                        subquestion_counter++;
                        subquestion.index = i;
                        subquestion.number = `${question_counter}.${subquestion_counter}`;
                        questions.push(subquestion);
                    });
                }
                else {
                    question.number = `${question_counter}`;
                    questions.push(question);
                }
            }
        });
        return questions;
    }


    const addQuestionToScale = (question_number, scale_index, question_index, e) => {
        let question = all_questions()[question_index];
        console.log(question);
        let scale = data.scales[scale_index];
        let nominative = isNominative(question);
        let score = isScore(question);
        let c1 = (nominative || score) && scale.type === null;
        let c2 = nominative && scale.type === SCALE_TYPE.NOMINATIVE;
        let c3 = score && scale.type === SCALE_TYPE.SCORE;
        console.log(c1,c2,c3, nominative, score)
        if(c1 || c2 || c3) {
            if(nominative) {
                changeData(["scales", scale_index, "questions", array => {array[question_number] = []}],
                ["scales", scale_index, "type", SCALE_TYPE.NOMINATIVE]);
                setQuestionIndexWithOpenedAnswers(question_index);
            }
            else {
                changeData(["scales", scale_index, "questions", array => {array[question_number] = null}],
                ["scales", scale_index, "type", SCALE_TYPE.SCORE]);
            }
        }
        else {
            console.log("попытка добавить вопрос с неверной шкалой");
            //выброс ошибки
        }

    }

    const removeQuestionFromScale = (question_number, scale_index) => {
        if(Object.keys(data.scales[scale_index].questions).length === 1) {
            changeData(["scales", scale_index, "questions", array => {delete array[question_number]}], [
                "scales", scale_index, "type", null
            ]);
        }
        else {
            changeData(["scales", scale_index, "questions", array => {delete array[question_number]}]);
        }
        setQuestionIndexWithOpenedAnswers(-1);
    }

    const answerHandles = (question_number, scale_index, question_index) => {

        return {
            select: (e) => addQuestionToScale(question_number, scale_index, question_index, e),
            deselect: () => removeQuestionFromScale(question_number, scale_index)
        };
    } 

    const removeScale = scale_index => {
        changeData(["scales", array => array.splice(scale_index, 1)]);
    }

    const editScale = (scale_index) => {
        if(edit === scale_index) {
            setEdit(-1);
        }
        else {
            setEdit(scale_index);
        }
    }

    const renameScale = (e, scale_index) => {
        let value = e.target.value;
        if(value.length === 0 || data.scales.find(scale => scale.name === value)) {
            setInvalidScale(scale_index);
        }
        else {
            setInvalidScale(-1);
        }
        changeData(["scales", scale_index, "name", value]);
    }

    const newScale = () => {
        return {
            name: "",
            id: null,
            questions: {},
            type: null
        }
    }

    const createScale = () => {
        setEdit(data.scales.length);
        changeData(["scales", array => array.push(newScale())]);
    }

    const isNominative = question => {
        let flag = false;
        if(question.answer_type === ANSWER_TYPE.MANY || question.answer_type === ANSWER_TYPE.ONE) {
            question.answers[question.answer_type].forEach(answer => {
                if(isNaN(answer.score) || answer.score === null || answer.score === "") {
                    flag = true;
                }
            });
        }
        return flag || question.answer_type === ANSWER_TYPE.SCALE;
    }

    const isScore = question => {
        let flag = true;
        if(question.answer_type === ANSWER_TYPE.MANY || question.answer_type === ANSWER_TYPE.ONE) {
            question.answers[question.answer_type].forEach(answer => {
                if(isNaN(answer.score) || answer.score === null || answer.score === "") {
                    flag = false;
                }
            });
        }
        return flag && [ANSWER_TYPE.MANY, ANSWER_TYPE.ONE].includes(question.answer_type);
    }

    const nominativeAnswers = (question) => {
        if(question.answer_type === ANSWER_TYPE.SCALE) {
            let array = [];
            for(let i = question.answers[ANSWER_TYPE.SCALE].min; i<= question.answers[ANSWER_TYPE.SCALE].max; i++) {
                array.push({text: i});
            }
            return array;
        }
        return question.answers[question.answer_type];
    }


    const handlesNominateAnswers = (scale_index, question_number, answer_index) => {
        const addAnswerToNominateScale = (scale_index, question_number, answer_index) => {
            changeData(["scales", scale_index, "questions", question_number, array => array.push(answer_index)]);
        }
        const removeAnswerFromNominateScale = (scale_index, question_number, answer_index) => {
            changeData(["scales", scale_index, "questions", question_number, array => array.splice(array.indexOf(answer_index), 1)]);
        }

        return {
            select: () => addAnswerToNominateScale(scale_index, question_number, answer_index),
            deselect: () => removeAnswerFromNominateScale(scale_index, question_number, answer_index)
        }
    }

    const [opened, setOpened] = useState(undefined);
    const [edit, setEdit] = useState(-1);
    const [invalidScale, setInvalidScale] = useState(-1);
    const [questionIndexWithOpenedAnswers, setQuestionIndexWithOpenedAnswers] = useState(-1);

    useEffect(() => {
        setQuestionIndexWithOpenedAnswers(-1);
    }, [opened]);
    
    return <div className="scale-table-form">
            <div>
                Шкалы:
            </div>
            <div className="scale-table-form-scales">
                {
                    data.scales.length === 0?
                    <div className="scale-table-form-noscales"><i>Отсутствуют</i></div>
                    :data.scales.map((scale, i) => 
                        <div key={i} className="scale-table-form-scale">
                            {
                            edit===i?
                            <div className={"scale-table-form-input"+(invalidScale===i?" invalid":"")} key={i}>
                                <Input value={scale.name} onChange={e => renameScale(e, i)} tip="Название шкалы" />
                            </div>:
                            <Spoiler text={`${i+1}. ${scale.name}`} hidden={opened !== i} setHidden={(h) => setOpened(h?undefined:i)}>
                                {
                                    all_questions().map((question,j) =>
                                        <div key={j} className="scale-table-form-question">
                                            <div className="scale-table-form-question-number">
                                                {question.number}{")"}
                                            </div>
                                            <div className="scale-table-form-answer">
                                                <Answer handles={answerHandles(question.number, i, j)} selected={question.number in scale.questions} checkbox={true}>
                                                    {question.text===null?"":question.text.slice(0,22)+(question.text.length>22?"...":"")}
                                                </Answer>
                                            </div>
                                            {
                                                questionIndexWithOpenedAnswers === j && isNominative(question)?
                                                <div className="scale-table-form-nominative">
                                                    <div><i>Ответы, относящиеся к шкале:</i></div>
                                                    {
                                                        nominativeAnswers(question).map((answer, k) => 
                                                            <div key={k}>
                                                                <Answer selected={scale.questions[question.number]!==undefined&&scale.questions[question.number].includes(k)} checkbox={true} handles={handlesNominateAnswers(i, question.number, k)}>
                                                                    {answer.text}
                                                                </Answer>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                                :<></>
                                            }
                                    
                                        </div>
                                    )
                                }
                            </Spoiler>
                            }   
                            <div onClick={() => editScale(i)} className="scale-table-form-button rename">{edit===i?"Сохранить":"Переименовать"}</div>
                            <div onClick={() => removeScale(i)} className="scale-table-form-button delete">Удалить</div>
                        </div>
                    )
                }
                <div onClick={createScale} className="scale-table-form-button create">Добавить шкалу</div>
            </div>
    </div>
}