import { useParams } from "react-router-dom";
import { Page } from "../Page"
import { ResearchConstructor } from "../ResearchConstructor";

export const ResearchConstructorPage = ({appState}) => {

    const {slug} = useParams();

    return <Page title="Конструктор исследования" appState={appState}>
        <div className="cabinet-header">Конструктор исследования</div>
        <ResearchConstructor slug={slug} />
    </Page>
}