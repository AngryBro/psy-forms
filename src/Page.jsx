import { useCallback, useEffect, useState } from "react"
import { Header } from "./Header";
import "./css/Page.css";
import { Auth } from "./Auth";
import { useNavigate } from "react-router-dom";
import {ROUTES} from "./enums/ROUTES";
import { Api } from "./Api";
import { API_ROUTES } from "./enums/API_ROUTES";
import { Alert } from "./Alert";
import { ALERTS } from "./enums/ALERTS";

export const Page = ({children, title, appState}) => {

    const {auth, setAuth, email, setEmail} = appState;

    const nav = useNavigate();

    const [openedAuthModal, setOpenedAuthModal] = useState(false);
    const [btnWaiting, setBtnWaiting] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);

    const header_onclicks = useCallback(() => {
        
        const logout = () => {
            setBtnWaiting(true);
            Api(API_ROUTES.LOGOUT).auth().callback(({ok, status}) => {
                setBtnWaiting(false);
                if(ok) {
                    setAuth(false); 
                    setEmail(null); 
                    localStorage.removeItem("Authorization");
                    nav(ROUTES.MAIN);
                    return;
                }
                setAlertMessage(ALERTS.ERROR);
            }).post().send();
        }
        
        return {
            login: () => setOpenedAuthModal(true),
            cabinet: () => nav(ROUTES.CABINET),
            logout 
        }
    }, [nav, setAuth, setEmail]);

    useEffect(() => {
        document.title = title;
    }, [title]);

    useEffect(() => {
        const fetchData = () => {
            Api(API_ROUTES.MYDATA).auth().get().callback(response => {
                if(response.ok) {
                    setAuth(true);
                    setEmail(response.data.email);
                }
                else {
                    setAuth(false);
                }
            }).send();
        }
        if(!auth && localStorage.getItem("Authorization") !== null) {
            setAuth(undefined);
            fetchData();
        }
    }, [setAuth, setEmail, auth]);

    return <div className="page">
        <div className="page-header-container">
            <Header btnWaiting={btnWaiting} email={email} auth={auth} onClicks={header_onclicks()} />
        </div>
        <div className="page-container">
            {children}
        </div>
        {
            openedAuthModal?
            <Auth setAuth={setAuth} setPageEmail={setEmail} onClose={() => setOpenedAuthModal(false)} />
            :<></>
        }
        <Alert onClose={setAlertMessage}>{alertMessage}</Alert>
    </div>

}