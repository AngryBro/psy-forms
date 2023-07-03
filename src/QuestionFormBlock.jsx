import "./css/QuestionFormBlock.css";
import { Select } from "./Select";
import { Block } from "./MethodicForm";
import { Scale } from "./Scale";
import { ScaleFormBlock } from "./ScaleFormBlock";
import { AnswerListFormBlock } from "./AnswerListFormBlock";
import { ANSWER_TYPE } from "./enums/ANSWER_TYPE";
import { useEffect, useState } from "react";
import { FreeAnswerBlock } from "./FreeAnswerBlock";
import { BlockFooter } from "./BlockFooter";
import { Inputarea } from "./Inputarea";
import { Button } from "./Button";
import { BUTTON_TYPES } from "./enums/BUTTON_TYPES";


export const QuestionFormBlock = ({handlesNew, isFirst, handleActive, handleDelete, isActive, handleChange, question, number, handlesAnswer, sub = false}) => {

    const [activeSubBlock, setActiveSubBlock] = useState(-1);

    useEffect(() => {if(!isActive) setActiveSubBlock(-1)}, [isActive]);

    const checkDelete = (i) => {
        if(i === question.answers[ANSWER_TYPE.QUESTIONS].length-1) {
            setActiveSubBlock(i-1);
        }
        if(question.answers[ANSWER_TYPE.QUESTIONS].length === 1) {
            handlesAnswer.sub.handlesAnswer.reset();
        }
        else {
            handlesAnswer.sub.handleDelete(i);
        }
    }

    const addSubQuestion = (i) => {
        handlesAnswer.sub.handleNew(i);
        setActiveSubBlock(i+1);
    };

    const reverseActive = () => (
        [ANSWER_TYPE.ONE, ANSWER_TYPE.MANY].includes(question.answer_type) 
        &&
        question.answers[question.answer_type].find(answer => answer.score !== null) !== undefined
    );

    const subHandlesAnswer = (i) => ({
        select: {
            create: (other = false) => handlesAnswer.sub.handlesAnswer.select.create(i, other),
            update: (answer_index, key, value) => handlesAnswer.sub.handlesAnswer.select.update(i, answer_index, key, value),
            remove: (answer_index) => handlesAnswer.sub.handlesAnswer.select.remove(i, answer_index),
            reverse: () => handlesAnswer.sub.handlesAnswer.select.reverse(i)
        },
        scale: (key, value) => handlesAnswer.sub.handlesAnswer.scale(i, key, value),
        copy: () => handlesAnswer.sub.handlesAnswer.copy(i),
        free: {
            add: () => handlesAnswer.sub.handlesAnswer.free.add(i),
            remove: index => handlesAnswer.sub.handlesAnswer.free.remove(i, index),
            img: (index) => handlesAnswer.sub.handlesAnswer.free.img(i, index)
        }
    });


    return <Block isActive={isActive} handleActive={handleActive} handlesNew={handlesNew}>
        <div className="question-form-input">
            <div className="question-form-number">{number} <span className="question-form-required" style={{opacity:Number(question.required)}}>*</span> </div>
            <Inputarea key={isActive} className="question-form-inputarea" readOnly={!isActive} tip="Текст вопроса" value={question.text} onChange={e => handleChange("text", e.target.innerText)}/>
        </div>
        <div className={isActive?"question-form-constructor-active":"question-form-constructor"}>
            <div className="question-form-flex">
                    <div className="question-form-answer-type-select">
                        <Select value={question.answer_type} onSelect={key => key===ANSWER_TYPE.PREVIOUS?handlesAnswer.copy():handleChange("answer_type", key)}>
                            {[
                                {key: null, value: "Выбрать тип ответа", display: false},
                                {key: ANSWER_TYPE.PREVIOUS, value: "Копировать у предыдущего", display: !isFirst},
                                {key: ANSWER_TYPE.ONE, value: "Один из списка"},
                                {key: ANSWER_TYPE.MANY, value: "Множественный выбор"},
                                {key: ANSWER_TYPE.SCALE, value: "Шкала"},
                                {key: ANSWER_TYPE.FREE, value: "Свободные ответы"},
                                {key: ANSWER_TYPE.QUESTIONS, value: "Вложенные вопросы", display: !sub}
                            ]}
                        </Select>
                    </div>
                    {
                        reverseActive()?
                        <div className="question-form-block-reverse">
                            <Button onClick={handlesAnswer.select.reverse} type={BUTTON_TYPES.EDIT}>Обратный порядок баллов</Button>
                        </div>
                        :<></>
                    }
            </div>
            {
                question.answer_type === ANSWER_TYPE.SCALE?
                <div>
                    <ScaleFormBlock handleUpdate={handlesAnswer.scale}  data={question.answers[ANSWER_TYPE.SCALE]}/>
                </div>
                :
                (question.answer_type === ANSWER_TYPE.ONE || question.answer_type === ANSWER_TYPE.MANY)?
                <div>
                    <AnswerListFormBlock answers={question.answers[question.answer_type]} edit={true} 
                        handles={handlesAnswer.select}
                        many={question.answer_type === ANSWER_TYPE.MANY}
                    />
                </div>
                :question.answer_type === ANSWER_TYPE.QUESTIONS?
                <div>
                    {
                        question.answers[question.answer_type].map((subquestion, i) => 
                            <div key={i}>
                                <QuestionFormBlock
                                    sub={true}
                                    question={subquestion}
                                    handlesNew={[{text: "Добавить вопрос", f: () => addSubQuestion(i)}]}
                                    handleActive={() => setActiveSubBlock(i)}
                                    handleChange={(key, value) => handlesAnswer.sub.handleChange(i, key, value)}
                                    isActive={i===activeSubBlock}
                                    number={`${number}${i+1})`}
                                    handleDelete={() => checkDelete(i)}
                                    isFirst={i === 0}
                                    handlesAnswer={subHandlesAnswer(i)}
                                />
                            </div>
                        )
                    }
                </div>
                :question.answer_type === ANSWER_TYPE.FREE?
                <div>
                    <FreeAnswerBlock handles={handlesAnswer.free} answers={question.answers[ANSWER_TYPE.FREE]} edit={true} readOnly={true} />
                </div>
                :<></>
            }
        </div>
        {isActive?<></>:
        <div className="question-form-answer-block-view">
            {
                question.answer_type === ANSWER_TYPE.SCALE?
                <div>
                    <Scale
                        min={question.answers[question.answer_type].min}
                        max = {question.answers[question.answer_type].max}
                        minText={question.answers[question.answer_type].min_text}
                        maxText={question.answers[question.answer_type].max_text}
                        value={question.answers[question.answer_type].min-1}
                    />
                </div>
                :(question.answer_type === ANSWER_TYPE.ONE || question.answer_type === ANSWER_TYPE.MANY)?
                <div>
                    <AnswerListFormBlock answers={question.answers[question.answer_type]} many={question.answer_type === ANSWER_TYPE.MANY}/>
                </div>
                :question.answer_type === ANSWER_TYPE.QUESTIONS?
                <div>
                    {
                        question.answers[question.answer_type].map((subquestion, i) => 
                            <div key={i}>
                                <QuestionFormBlock
                                    sub={true}
                                    question={subquestion}
                                    handlesNew={[]}
                                    handleActive={() => setActiveSubBlock(i)}
                                    handleChange={() => 1}
                                    isActive={false}
                                    number={`${number}${i+1})`}
                                    handleDelete={() => 1}
                                    isFirst={false}
                                    handlesAnswer={{}}
                                />
                            </div>
                        )
                    }
                </div>
                :question.answer_type === ANSWER_TYPE.FREE?
                <div>
                    <FreeAnswerBlock answers={question.answers[ANSWER_TYPE.FREE]} edit={false} readOnly={true} />
                </div>
                :<></>
            }
        </div>
        }
        <BlockFooter isActive={isActive} handleChange={handleChange} requiredFlag={!sub} question={question} handleDelete={handleDelete}/>
        {/* {
            isActive?
            <BlockFooter handleChange={handleChange} requiredFlag={!sub} question={question} handleDelete={handleDelete}/>
            // <div className="question-form-block-footer">
            //     <div className="question-form-block-line"></div>
            //     <div className="question-form-block-actions">
            //         <div onClick={handleDelete} className="question-form-block-bin">&#128465;</div>
            //         <div hidden={sub} className="question-form-block-vline"></div>
            //         <div hidden={sub}>
            //         <SlideFlag flag={question.required} onClick={() => handleChange("required", !question.required)}>
            //             Обязательный вопрос:
            //         </SlideFlag>
            //         </div>
            //     </div>
            // </div>
            :<></>
        } */}
    </Block>
};