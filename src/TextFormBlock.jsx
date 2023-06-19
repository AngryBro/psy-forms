import { BlockFooter } from "./BlockFooter";
import { Input } from "./Input";
import { Block } from "./MethodicForm";
import { Textarea } from "./Textarea";
import "./css/TextFormBlock.css";

export const TextFormBlock = ({data, isActive, handleActive, handlesNew, handleChange, handleDelete}) => {
    return <Block isActive={isActive} handlesNew={handlesNew} handleActive={handleActive} handleDelete={handleDelete}>
        {
            <div style={{maxHeight: (isActive || (data.title !== null && data.title.length))?"50px":"0px"}} className="text-form-block-input">
                <Input readOnly={!isActive} tip="Заголовок" value={data.title} onChange={e => handleChange("title", e.target.value)} font={20} />
            </div>
        }
        {
            <div style={{maxHeight: (isActive || (data.text !== null && data.text.length))?"500px":"0px"}} className="text-form-block-textarea">
                <Textarea readOnly={!isActive} tip="Текст" value={data.text} onChangeValue={value => handleChange("text", value)} />
            </div>
        }
        <BlockFooter isActive={isActive} handleDelete={handleDelete} />
    </Block>
}