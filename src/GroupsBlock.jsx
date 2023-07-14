import { Spoiler } from "./Spoiler";
import { GROUPS } from "./enums/GROUPS";
import "./css/GroupsBlock.css";
import { Button } from "./Button";
import { BUTTON_STATES } from "./enums/BUTTON_STATES";

export const GroupsBlock = ({groups, removeGroup, deletingGroups, createGroup, setGroupId}) => {
    return <Spoiler text="Выделение подгрупп">
        <div className="groups-block-button __single">
            <Button onClick={() => setGroupId(0)}>{GROUPS.ALL}</Button>
        </div>
        {
            groups.map(group =>
                <div key={group.id} className="groups-block-buttons-container">
                    <div className="groups-block-button">
                        <Button onClick={() => setGroupId(group.id)}>
                        <div className="groups-block-button-row">{group.name}</div>
                        {
                            group.conditions.map((condition, i) => 
                                <div key={i} className="groups-block-button-row">{i===0?"(":""}{condition.string}{i===group.conditions.length-1?")":""}</div>    
                            )
                        }
                        </Button>
                    </div>
                    <div className="groups-block-button">
                        <Button className="groups-block-button-text" state={deletingGroups[group.id]?BUTTON_STATES.WAITING:BUTTON_STATES.ENABLED} onClick={() => removeGroup(group.id)}>Удалить</Button>
                    </div>
                </div>    
            )
        }
        <div onClick={createGroup} className="groups-block-button __single">
            <Button>
                {GROUPS.NEW}
            </Button>
        </div>
    </Spoiler>
}