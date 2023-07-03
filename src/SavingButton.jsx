import { Button } from "./Button";
import { BUTTON_STATES } from "./enums/BUTTON_STATES";
import { BUTTON_TYPES } from "./enums/BUTTON_TYPES";


export const SavingButton = ({saved, saving, save}) => 
        saved?
        <Button state={BUTTON_STATES.DISABLED} type={BUTTON_TYPES.M}>Сохранено</Button>
        :
        <Button onClick={save} state={saving?BUTTON_STATES.WAITING:BUTTON_STATES.ENABLED} type={BUTTON_TYPES.M}>Сохранить</Button>

