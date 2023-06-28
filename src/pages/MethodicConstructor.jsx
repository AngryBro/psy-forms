import { MethodicForm } from "../MethodicForm"
import { Page } from "../Page"

export const MethodicConstructor = ({appState}) => {
    return <Page title="Конструктор методики" appState={appState}>
        <div className="cabinet-header">Конструктор методики</div>
        <MethodicForm/>
    </Page>
}