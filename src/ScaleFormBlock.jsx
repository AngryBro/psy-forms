import { Input } from "./Input";
import { Scale } from "./Scale";
import "./css/ScaleFormBlock.css";

export const ScaleFormBlock = ({data, handleUpdate}) => {

    const update = (key, value) => {
        if(value !== "" && ["max", "min", "min_score", "max_score"].includes(key) && isNaN(value)) {
            return;
        }
        if((key === "min" || key === "max") && value !== "") {
            value = Number(value);
            handleUpdate(key, value);
        }
        else if(key === "min_score" && value !== "") {
            value = Number(value);
            handleUpdate(key, value);
        }
        else if(key === "max_score" && value !== "") {
            value = Number(value);
            handleUpdate(key, value);
        }  
        else {
            handleUpdate(key, value);
        }
    };

    return <div className="scale-form-block-container">
            <div className="scale-form-block-row">
                <div className="scale-form-block-element">Мин:</div>
                <div className="scale-form-block-input"><Input value={data.min} onChange={e => update("min", e.target.value)} /></div>
                <div className="scale-form-block-element">Балл:</div>
                <div className="scale-form-block-input"><Input tip="Нет" value={data.min_score} onChange={e => update("min_score", e.target.value)} /></div>
                <div className="scale-form-block-element">Текст:</div>
                <div className="scale-form-block-text-input">
                    <Input value={data.min_text} onChange={e => update("min_text", e.target.value)} tip="Без текста" />
                </div>
            </div>
            <div className="scale-form-block-row">
                <div className="scale-form-block-element">Макс:</div>
                <div className="scale-form-block-input"><Input value={data.max} onChange={e => update("max", e.target.value)} /></div>
                <div className="scale-form-block-element">Балл:</div>
                <div className="scale-form-block-input"><Input tip="Нет" value={data.max_score} onChange={e => update("max_score", e.target.value)} /></div>
                <div className="scale-form-block-element">Текст:</div>
                <div className="scale-form-block-text-input">
                    <Input value={data.max_text} onChange={e => update("max_text", e.target.value)} tip="Без текста" />
                </div>
            </div>
            <Scale min={data.min} max={data.max} minText={data.min_text} maxText={data.max_text} value={data.min-1} />
    </div>
};