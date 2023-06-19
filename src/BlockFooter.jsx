import { SlideFlag } from "./SlideFlag"


export const BlockFooter = ({handleDelete, handleChange, requiredFlag = false, question = {}, isActive}) => {
    return <div className={`methodic-form-block-footer${isActive?"":" hidden"}`}>
        <div className="methodic-form-block-line"></div>
        <div className="methodic-form-block-actions">
            <div onClick={handleDelete} className="methodic-form-block-bin">&#128465;</div>
            <div hidden={!requiredFlag} className="methodic-form-block-vline"></div>
            <div hidden={!requiredFlag}>
                <SlideFlag flag={question.required} onClick={() => handleChange("required", !question.required)}>
                    Обязательный вопрос:
                </SlideFlag>
            </div>
        </div>
    </div>
}