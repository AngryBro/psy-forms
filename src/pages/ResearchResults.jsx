import { useParams } from "react-router-dom"
import { Page } from "../Page"
import { useCallback, useEffect, useState } from "react";
import "../css/ResearchResults.css";
import { ResultsBlock } from "../ResultsBlock";
import { GroupCreate } from "../GroupCreate";

export const ResearchResults = () => {

    const {id} = useParams();

    const [data, setData] = useState(null);
    const [openedModalCreateGroup, setOpenedModalCreateGroup] = useState(false);

    const removeGroup = id => {

    }

    const fetchData = useCallback(() => {
        let d = {
            id,
            private_name: "нет", 
            public_name: "исследование",
            block_groups: [1,1, null],
            groups: [
                {
                    id: 1,
                    name: "Тревожные",
                    conditions: [
                        {string: "тревога > 10", id: 1},
                        {string: "тревога < 50", id: 2}
                    ]
                },
                {
                    id: 2,
                    name: "Нетревожные",
                    conditions: [
                        {string: "тревога <= 10", id: 3}
                    ]
                }
            ]
        };
        setData(d);
    }, [id]);

    useEffect(fetchData, [fetchData]);

    return <Page title="Результаты">
        <div className="research-results-header">Результаты исследования &laquo;{data !== null?`${data.public_name} (${data.private_name})`:""}&raquo;</div>
        {
        data !== null?
        <div className="research-results-container">
            {
                data.block_groups.map((group_id, i) => 
                    <div key={i} className="research-results-block">
                        <ResultsBlock 
                            setOpenedModalCreateGroup={setOpenedModalCreateGroup}
                            removeGroup={removeGroup} 
                            researchName={data.private_name} 
                            setGroupId={()=>1} 
                            groupId={group_id} 
                            groups={data.groups} />
                    </div>    
                )
            }
            <div className="research-results-button-container">
                <div className="research-results-button __button1">
                    Добавить ещё одну таблицу с респондентами
                </div>
            </div>
        </div>
        :
        <div className="research-results-loader">Загрузка</div>
        }
        {
            openedModalCreateGroup?
            <GroupCreate onClose={() => setOpenedModalCreateGroup(false)} />
            :<></>
        }
    </Page>
}