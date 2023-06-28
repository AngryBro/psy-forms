import { useCallback, useEffect, useState } from "react"
import { Header } from "./Header";
import "./css/Page.css";
import { Auth } from "./Auth";
import { useNavigate } from "react-router-dom";
import {ROUTES} from "./enums/ROUTES";
import { Api } from "./Api";

export const Page = ({children, title, appState}) => {

    const {auth, setAuth, email, setEmail} = appState;

    const nav = useNavigate();

    const [openedAuthModal, setOpenedAuthModal] = useState(false);

    const header_onclicks = useCallback(() => {
        
        const logout = () => {
            setAuth(false); 
            setEmail(null); 
            localStorage.removeItem("Authorization")
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
            Api("myData").auth().get().callback(response => {
                if(response.ok) {
                    setAuth(true);
                    setEmail(response.array.email);
                }
                else {
                    setAuth(false);
                    localStorage.removeItem("Authorization");
                }
            }).send();
        }
        fetchData();
    }, [setAuth, setEmail]);

    return <div className="page">
        <div className="page-header-container">
            <Header email={email} auth={auth} onClicks={header_onclicks()} />
        </div>
        <div>{String(auth)}</div>
        <div className="page-container">
            {children}
        </div>
        {
            openedAuthModal?
            <Auth setAuth={setAuth} setPageEmail={setEmail} onClose={() => setOpenedAuthModal(false)} />
            :<></>
        }
    </div>

}