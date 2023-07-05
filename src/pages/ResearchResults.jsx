import { useParams } from "react-router-dom"
import { Page } from "../Page"
import { useCallback, useEffect, useState } from "react";
import "../css/ResearchResults.css";
import { ResultsBlock } from "../ResultsBlock";
import { GroupCreate } from "../GroupCreate";
import { Api } from "../Api";
import { API_ROUTES } from "../enums/API_ROUTES";
import { Spinner } from "../Spinner";
import { Button } from "../Button";

export const ResearchResults = ({appState}) => {

    const {slug} = useParams();

    const [data, setData] = useState(null);
    const [openedModalCreateGroup, setOpenedModalCreateGroup] = useState(false);

    const removeGroup = id => {

    }

    const addTable = () => {
        let data1 = JSON.parse(JSON.stringify(data));
        data1.block_groups.push(data1.block_groups[data1.block_groups.length-1]);
        setData(data1);
    }

    const fetchData = useCallback(() => {
        // let d = {
        //     id,
        //     private_name: "нет", 
        //     public_name: "исследование",
        //     block_groups: [1,1, null],
        //     groups: [
        //         {
        //             id: 1,
        //             name: "Тревожные",
        //             conditions: [
        //                 {string: "тревога > 10", id: 1},
        //                 {string: "тревога < 50", id: 2}
        //             ]
        //         },
        //         {
        //             id: 2,
        //             name: "Нетревожные",
        //             conditions: [
        //                 {string: "тревога <= 10", id: 3}
        //             ]
        //         }
        //     ]
        // };
        Api(API_ROUTES.RESEARCH_GET)
        .auth()
        .get({slug})
        .callback(({ok, data}) => {
            if(ok) {
                setData({...data, block_groups:[null]});
            }
        })
        .send();
    }, [slug]);

    useEffect(fetchData, [fetchData]);

    return <Page appState={appState} title="Результаты">
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
                            groups={[]} />
                    </div>    
                )
            }
            <div className="research-results-button-container">
                <div className="research-results-button">
                    <Button onClick={addTable}>Добавить ещё одну таблицу респондентов</Button>
                </div>
            </div>
        </div>
        :
        <div className="research-results-loader"><Spinner color="var(--purple-form)" /></div>
        }
        {
            openedModalCreateGroup?
            <GroupCreate onClose={() => setOpenedModalCreateGroup(false)} />
            :<></>
        }
    </Page>
}