// import { useParams } from "react-router-dom"
import { Page } from "../Page"
import { useCallback, useEffect, useState } from "react";
import "../css/ResearchResults.css";

export const ResearchResults = () => {

    // const {id} = useParams();

    const [data, setData] = useState(null);

    const fetchData = useCallback(() => {
        let d = {private_name: "нет", public_name: "исследование"};
        setData(d);
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return <Page title="Результаты">
        <div className="research-results-header">Результаты исследования &laquo;{data !== null?`${data.public_name} (${data.private_name})`:""}&raquo;</div>
        {
        data !== null?
        <div className="research-results-container">

        </div>
        :
        <div className="research-results-loader">Загрузка</div>
        }
    </Page>
}