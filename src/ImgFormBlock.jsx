import { BlockFooter } from "./BlockFooter";
import { Input } from "./Input";
import { Block } from "./MethodicForm"
import "./css/ImgFormBlock.css";

export const ImgFormBlock = ({data, handlesNew, handleDelete, handleActive, handleChange, isActive}) => {
    return <Block handlesNew={handlesNew} handleActive={handleActive} isActive={isActive} handleDelete={handleDelete}>
        <div className="img-form-block-img-container">
            <div className={"img-form-block-input" + (isActive?"":" __hidden")}>
                <Input value={data.url} tip="Ссылка на изображение" onChange={e => handleChange(e.target.value)} />
            </div>
            <img hidden={data.url === null} className="img-form-block-img" src={data.url} alt={`Изображение по ссылке ${data.url}`} />
        </div>
        <BlockFooter isActive={isActive} handleDelete={handleDelete} />
    </Block>
}