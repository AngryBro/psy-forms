import { useParams } from "react-router-dom"
import { MethodicForm } from "../MethodicForm"
import { Page } from "../Page"

export const MethodicConstructor = ({appState}) => {

    const {id} = useParams();

    return <Page title="Конструктор методики" appState={appState}>
        <div className="cabinet-header">Конструктор методики</div>
        <MethodicForm id={isNaN(id)?null:id}/>
    </Page>
}