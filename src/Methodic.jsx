import { Answer } from "./Answer";
import { Scale } from "./Scale";
import { ANSWER_TYPE } from "./enums/ANSWER_TYPE";
import "./css/Methodic.css";
import { FreeAnswerBlock } from "./FreeAnswerBlock";

export const Methodic = ({data = {}, readOnly = false, handles, answers = {}}) => {
    

    return <div className="methodic-container">
            <div className="methodic-block">
                <div className="methodic-name">{data.public_name}</div>
                <div className="methodic-instruction">{data.instruction}</div>
            </div>
            {
               data.questions.map((question, i) =>
                    <div className="methodic-block-container" key={i}>
                        {
                            <Block readOnly={readOnly} question={question} handles={handles} answers={answers} />
                        }
                    </div>
                )
            }
        </div>
}

const Block = ({question, handles, sub = false, answers, readOnly}) => {

    const handles_select = (answer_index, many) => {
        if(many) {
            return {
                select: () => handles.many(question.number, answer_index, true),
                deselect: () => handles.many(question.number, answer_index, false),
                updateText: (value) => handles.many(question.number, answer_index, true, value)
            }
        }
        return {
            select: () => handles.one(question.number, answer_index, true),
            deselect: () => handles.one(question.number, answer_index, false),
            updateText: (value) => handles.one(question.number, answer_index, true, value)
        }
    }

    const free_answers = () => {
        return {
            setValue: (answer_index, value) => handles.free(question.number, answer_index, "text", value),
            value: (answer_index) => answers[question.number][answer_index].text
        }
    }


    return <div className="methodic-block">
        <div className="methodic-question-header">
            <div className="methodic-question-text">{question.number}{sub?")":"."}</div>
            <div className={"methodic-question-required"+(question.required && !sub?" active":"")}>*</div>
            <div className="methodic-question-text">{question.text}</div>
        </div>
        {
            question.answer_type === ANSWER_TYPE.ONE || question.answer_type === ANSWER_TYPE.MANY?
            <div>
                {
                    question.answers.map((answer, i) => 
                        <div key={i}>
                            <Answer tip={answer.other?"Другое...":""} other={answer.other} handles={readOnly?{}:handles_select(i, question.answer_type === ANSWER_TYPE.MANY)} selected={readOnly?false:answers[question.number][i].selected} checkbox={question.answer_type === ANSWER_TYPE.MANY}>
                                {answer.other?answers[question.number][i].other:answer.text}
                            </Answer>
                        </div>
                    )
                }
            </div>
            :question.answer_type === ANSWER_TYPE.SCALE?
            <div>
                <Scale onSelect={readOnly?()=>1:value => handles.scale(question.number, value)} value={answers[question.number]===null||readOnly?question.answers.min-1:answers[question.number]} min={question.answers.min} max={question.answers.max} minText={question.answers.min_text} maxText={question.answers.max_text} />
            </div>
            :question.answer_type === ANSWER_TYPE.FREE?
            <div style={{marginTop:"15px"}}>
                {
                    <FreeAnswerBlock readOnly={readOnly} answers={question.answers} handles={free_answers()} />
                }
            </div>
            :question.answer_type === ANSWER_TYPE.QUESTIONS?
            question.answers.map((subquestion, i) => 
                <div key={i}>
                    <Block question={subquestion} sub={true} handles={handles} answers={answers} readOnly={readOnly} />
                </div>
            )
            :<></>
        }
    </div>
}