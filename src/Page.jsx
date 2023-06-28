import { useEffect, useState } from "react"
import { Header } from "./Header";
import "./css/Page.css";
import { Auth } from "./Auth";
import { useNavigate } from "react-router-dom";
import {ROUTES} from "./enums/ROUTES";

export const Page = ({children, title}) => {

    const [auth] = useState(false);
    const [email] = useState("example@mail.ru");

    const nav = useNavigate();

    const [openedAuthModal, setOpenedAuthModal] = useState(false);

    const header_onclicks = () => (
        {
            login: () => setOpenedAuthModal(true),
            cabinet: () => nav(ROUTES.CABINET)
        }
    )

    useEffect(() => {
        document.title = title;
    }, [title]);

    return <div className="page">
        <div className="page-header-container">
            <Header email={email} auth={auth} onClicks={header_onclicks()} />
        </div>
        <div className="page-container">
            {children}
        </div>
        {
            openedAuthModal?
            <Auth onClose={() => setOpenedAuthModal(false)} />
            :<></>
        }
    </div>

}