import { Spoiler } from "./Spoiler";
import { GROUPS } from "./enums/GROUPS";
import "./css/GroupsBlock.css";

export const GroupsBlock = ({groups, removeGroup, createGroup, setGroupId}) => {
    return <Spoiler text="Управление группами">
        <div className="groups-block-button __single">{GROUPS.ALL}</div>
        {
            groups.map(group =>
                <div key={group.id} className="groups-block-buttons-container">
                    <div onClick={() => setGroupId(group.id)} className="groups-block-button">
                        <div className="groups-block-button-row">{group.name}</div>
                        {
                            group.conditions.map((condition, i) => 
                                <div key={condition.id} className="groups-block-button-row">{i===0?"(":""}{condition.string}{i===group.conditions.length-1?")":""}</div>    
                            )
                        }
                    </div>
                    <div className="groups-block-button" onClick={() => removeGroup(group.id)}>Удалить</div>
                </div>    
            )
        }
        <div onClick={createGroup} className="groups-block-button __single">{GROUPS.NEW}</div>
    </Spoiler>
}