import "./css/Phisher.css";
import { Button } from "./Button";
import { BUTTON_TYPES } from "./enums/BUTTON_TYPES";

export const Phisher = ({effect, groups, phi, remove, waiting, zone}) => {


    return <div className="phisher-container">
        <table className="phisher-table">
            <tbody>
                <tr>
                    <th className="phisher-table-th">Критерий:</th>
                    <td className="phisher-table-td">Фишера</td>
                </tr>
            </tbody>
        </table>
        <table className="phisher-table">
            <tbody>
                <tr className="phisher-table-tr">
                    <th className="phisher-table-th">Исследуемый эффект</th>
                    {
                        groups.map((group, i) =>
                            <th className="phisher-table-th" key={i}>Количество в группе "{group.name}"</th>    
                        )
                    }
                    <th className="phisher-table-th">Значение критерия</th>
                    <th className="phisher-table-th">Зона</th>
                </tr>
                <tr className="phisher-table-tr">
                    <td className="phisher-table-td">{effect}</td>
                    {
                        groups.map((group, i) =>
                            <td className="phisher-table-td" key={i}>
                                {group.effect}
                            </td>
                        )
                    }
                    <td className="phisher-table-td">{phi}</td>
                    <td className="phisher-table-td">{zone}</td>
                </tr>
            </tbody>
        </table>
        <div className="phisher-remove">
            <Button type={BUTTON_TYPES.DELETE} onClick={remove}>Удалить обработку</Button>
        </div>
    </div>
}