import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./Test";
import './css/index.css';
import { Research } from "./Research";
import { Cabinet } from "./pages/Cabinet";
import { ResearchConstructorPage } from "./pages/ResearchConstructorPage";
import { MethodicConstructor } from "./pages/MethodicConstructor";
import { ResearchResults } from "./pages/ResearchResults";

const App = () => {

    return <BrowserRouter>
            <Routes>
                <Route path="/form/methodic/:id" element={<MethodicConstructor/>} />
                <Route path="/form/research/:id" element={<ResearchConstructorPage/>}/>
                <Route path="/research/:id" element={<Research/>} />
                <Route path="/research/:id/results" element={<ResearchResults/>} />
                <Route path="/my" element={<Cabinet/>} />
                <Route path="/" element={<Test/>}/>
            </Routes>
        </BrowserRouter>
};

export default App;