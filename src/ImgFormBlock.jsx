import { BlockFooter } from "./BlockFooter";
import { Block } from "./MethodicForm"
import "./css/ImgFormBlock.css";

export const ImgFormBlock = ({data, handlesNew, handleDelete, handleActive, handleChange, isActive}) => {
    return <Block handlesNew={handlesNew} handleActive={handleActive} isActive={isActive} handleDelete={handleDelete}>
        <div className="img-form-block-img-container">
            <img className="img-form-block-img" src={data.url} alt={`Изображение по ссылке ${data.url}`} />
        </div>
        <BlockFooter isActive={isActive} handleDelete={handleDelete} />
    </Block>
}