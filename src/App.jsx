import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./Test";
import './css/index.css';
import { Research } from "./Research";
import { Cabinet } from "./pages/Cabinet";
import { ResearchConstructorPage } from "./pages/ResearchConstructorPage";
import { MethodicConstructor } from "./pages/MethodicConstructor";
import { ResearchResults } from "./pages/ResearchResults";
import { useState } from "react";
import { Main } from "./pages/Main";
import { ROUTES } from "./enums/ROUTES";
import { Publish } from "./pages/Publish";
import { Statistic } from "./pages/Statistic";

const App = () => {

    const [auth, setAuth] = useState(undefined);
    const [email, setEmail] = useState(null);
    const [openedAuthModal, setOpenedAuthModal] = useState(false);
    const appState = {auth, setAuth, email, setEmail, openedAuthModal, setOpenedAuthModal};

    return <BrowserRouter>
            <Routes>
                <Route path={ROUTES.METHODIC_CONSTRUCTOR(":id")} element={<MethodicConstructor appState={appState} />} />
                <Route path={ROUTES.METHODIC(":id")} element={<></>}/>
                <Route path={ROUTES.RESEARCH_CONSTRUCTOR(":slug")} element={<ResearchConstructorPage appState={appState}/>}/>
                <Route path={ROUTES.RESEARCH(":slug")} element={<Research appState={appState}/>} />
                <Route path={ROUTES.RESULTS(":slug")} element={<ResearchResults appState={appState}/>} />
                <Route path="/my" element={<Cabinet appState={appState}/>} />
                <Route path="/" element={<Main appState={appState} />}/>
                <Route path={ROUTES.PUBLISHED(":slug")} element={<Publish appState={appState} />} />
                <Route path={ROUTES.STATISTIC(":slug")} element={<Statistic appState={appState} />} />
                <Route path="/test" element={<Test/>}/>
            </Routes>
        </BrowserRouter>
};

export default App;