import { useNavigate, useParams } from "react-router-dom"
import { Alert } from "../Alert"
import { Page } from "../Page"
import { ROUTES } from "../enums/ROUTES"
import { Api } from "../Api"
import { API_ROUTES } from "../enums/API_ROUTES"
import { useState } from "react"

export const Publish = ({appState}) => {

    const {slug} = useParams();

    const [unpublishing, setUnpublishing] = useState(false);
    const [error, setError] = useState(null);

    const nav = useNavigate();

    const unpublish = () => {
        setUnpublishing(true);
        Api(API_ROUTES.RESEARCH_UNPUBLISH)
        .auth()
        .post({slug})
        .callback(({ok}) => {
            setUnpublishing(false);
            if(ok) {
                nav(ROUTES.CABINET);
            }
            else {
                setError("Возникла ошибка");
            }
        })
        .send();
    }

    return <Page title="Публикация" appState={appState}>
        <Alert onClose={() => nav(ROUTES.CABINET)} onConfirm={unpublish} waiting={unpublishing} text="Отменить публикацию">
            Исследование доступно по ссылке: {ROUTES.RESEARCH_RESPONDENT(slug)}
        </Alert>
        <Alert onClose={setError}>
            {error}
        </Alert>
    </Page>
}