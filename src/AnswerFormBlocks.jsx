import { Input } from "./Input";
import "./css/ScaleFormBlock.css";

export const ScaleFormBlock = ({scale_data_get, scale_data_set}) => {
    return <div className="scale-form-block-container">
            <div className="scale-form-block-row">
                <div className="scale-form-block-element">Мин:</div>
                <div className="scale-form-block-input"><Input value={scale_data_get("min")} onChange={scale_data_set("min")} /></div>
                <div className="scale-form-block-element">Текст:</div>
                <Input value={scale_data_get("min_text")} onChange={scale_data_set("min_text")} tip="Без текста" />
            </div>
            <div className="scale-form-block-row">
                <div className="scale-form-block-element">Макс:</div>
                <div className="scale-form-block-input"><Input value={scale_data_get("max")} onChange={scale_data_set("max")} /></div>
                <div className="scale-form-block-element">Текст:</div>
                <Input value={scale_data_get("max_text")} onChange={scale_data_set("max_text")} tip="Без текста" />
            </div>
    </div>
};