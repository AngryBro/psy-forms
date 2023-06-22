import { FreeAnswer } from "./FreeAnswer"
import { SlideFlag } from "./SlideFlag"
import "./css/FreeAnswerBlock.css";

export const FreeAnswerBlock = ({answers, handles = {}, edit = false, readOnly = false}) => {
    return <div className="free-answer-block">
        {
            answers.map((answer,i) => 
                <div key={i} className="free-answer-block-answer">
                    <div className={"free-answer-block-container"+(edit?"":" free-answer-block-container-view")}>
                        <FreeAnswer>
                            {{
                                number: answers.length === 1?null:i+1,
                                value: readOnly?null:handles.value(i),
                                setValue: readOnly?()=>1:(value) => handles.setValue(i, value),
                                // img: answer.img
                                readOnly
                            }}
                        </FreeAnswer>
                    </div>
                    {
                        edit?
                        <div className="free-answer-block-actions">
                            
                            <SlideFlag onClick={() => handles.img(i)} flag={answer.img}>Разрешить прикрепить картинку:</SlideFlag>
                            <div className="free-answer-block-add methodic-form-block-action" onClick={() => handles.remove(i)}>Удалить</div>
                        </div>
                        :<></>
                    }
                </div>    
            )
        }
        {
            edit?
            <div className="free-answer-block-add methodic-form-block-action" onClick={handles.add}>
                Добавить ответ
            </div>
            :<></>
        }
    </div>
}