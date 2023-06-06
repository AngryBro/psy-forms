import { useState } from "react";
import Answer from "./Answer";
import "./css/QuestionForm.css";

const QuestionForm = ({number}) => {
    return <div>

    </div>
};

const Subquestion = ({number, text, answer_type, answers}) => {

    const [newAnswers, setNewAnswers] = useState(true);

    return <div>
        <div className="question-form-sub-header">
            <div className="question-form-sub-number">{number}</div>
            <div className="question-form-sub-text">{text}</div>
            <div className="question-form-sub-select-ans-mode">
                <Answer selected={newAnswers} handle={{select: () => setNewAnswers(true)}}>Создать ответы</Answer>
                <Answer selected={!newAnswers} handle={{select: () => setNewAnswers(false)}}>Добавить сохранённые</Answer>
            </div>
        </div>
        <div>
            
        </div>
    </div>
}

const SelectAnswerBlock = ({many=false, answers, handle}) => {

    const [editingId, setEditingId] = useState(0);

    return <div>
        <div>
            {
                answers.map((answer, i) =>
                    <div onClick={() => setEditingId(answer.id)}>
                        <div>{i+1}.</div>
                        <Answer checkbox={many} edit={answer.id === editingId} handle={handle} >{answer.text}</Answer>
                    </div>
                )
            }
        </div>
    </div>
};

export default QuestionForm;