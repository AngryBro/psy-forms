import { Answer } from "./Answer"

export const AnswerList = ({answers, many, handles}) => {
    return <div>
        {
            answers.map((answer, i) => 
                <div key={i}>
                    <Answer checkbox={many} handles={handles}>{answer.text}</Answer>
                </div>
            )
        }
    </div>
}