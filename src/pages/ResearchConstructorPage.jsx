import { Page } from "../Page"
import { ResearchConstructor } from "../ResearchConstructor";

export const ResearchConstructorPage = ({appState}) => {
    return <Page title="Конструктор исследования" appState={appState}>
        <div className="cabinet-header">Конструктор исследования</div>
        <ResearchConstructor/>
    </Page>
}