import { Block } from "./MethodicForm"

export const Question = ({data, number, answer, handles}) => {
    return <Block>
        <div>
            <div>{number}.</div>
            <div>*</div>
            <div>{data.text}</div>
        </div>
        <div>
            
        </div>
        <div>
            <div>Отменить выбор</div>
        </div>
    </Block>
}