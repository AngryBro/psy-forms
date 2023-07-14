import "./css/Phisher.css";

export const Phisher = ({effect, n, m, phi, zone, criteria, groups}) => {


    return <div className="phisher-container">
        <table className="phisher-table">
            <tbody>
                <tr>
                    <th className="phisher-table-th">Критерий:</th>
                    <td className="phisher-table-td">{criteria}</td>
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
                        [0, 1].map(i =>
                            <td className="phisher-table-td" key={i}>
                                Всего: {n[i]}, Эффект: {m[i]}
                            </td>
                        )
                    }
                    <td className="phisher-table-td">{phi}</td>
                    <td className="phisher-table-td">{zone}</td>
                </tr>
            </tbody>
        </table>
    </div>
}