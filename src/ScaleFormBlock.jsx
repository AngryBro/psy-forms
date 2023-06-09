import { Input } from "./Input";
import "./css/ScaleFormBlock.css";

export const ScaleFormBlock = ({data, handleUpdate}) => {

    const update = (key, value) => {
        if((key === "min" || key === "max") && value !== "") {
            value = Number(value);
            if(!isNaN(value)) {
                handleUpdate(key, value);
            }
        }
        else {
            handleUpdate(key, value);
        }
    };

    return <div className="scale-form-block-container">
            <div className="scale-form-block-row">
                <div className="scale-form-block-element">Мин:</div>
                <div className="scale-form-block-input"><Input value={data.min} onChange={e => update("min", e.target.value)} /></div>
                <div className="scale-form-block-element">Текст:</div>
                <Input value={data.min_text} onChange={e => update("min_text", e.target.value)} tip="Без текста" />
            </div>
            <div className="scale-form-block-row">
                <div className="scale-form-block-element">Макс:</div>
                <div className="scale-form-block-input"><Input value={data.max} onChange={e => update("max", e.target.value)} /></div>
                <div className="scale-form-block-element">Текст:</div>
                <Input value={data.max_text} onChange={e => update("max_text", e.target.value)} tip="Без текста" />
            </div>
    </div>
};