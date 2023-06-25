import { MethodicForm } from "../MethodicForm"
import { Page } from "../Page"

export const MethodicConstructor = () => {
    return <Page title="Конструктор методики">
        <div className="cabinet-header">Конструктор методики</div>
        <MethodicForm/>
    </Page>
}