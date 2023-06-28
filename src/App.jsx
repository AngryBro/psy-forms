import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./Test";
import './css/index.css';
import { Research } from "./Research";
import { Cabinet } from "./pages/Cabinet";
import { ResearchConstructorPage } from "./pages/ResearchConstructorPage";
import { MethodicConstructor } from "./pages/MethodicConstructor";
import { ResearchResults } from "./pages/ResearchResults";
import { useState } from "react";

const App = () => {

    const [auth, setAuth] = useState(undefined);
    const [email, setEmail] = useState(null);

    const appState = {auth, setAuth, email, setEmail};

    return <BrowserRouter>
            <Routes>
                <Route path="/form/methodic/:id" element={<MethodicConstructor appState={appState} />} />
                <Route path="/form/research/:id" element={<ResearchConstructorPage appState={appState}/>}/>
                <Route path="/research/:id" element={<Research appState={appState}/>} />
                <Route path="/research/:id/results" element={<ResearchResults appState={appState}/>} />
                <Route path="/my" element={<Cabinet appState={appState}/>} />
                <Route path="/" element={<Test/>}/>
            </Routes>
        </BrowserRouter>
};

export default App;