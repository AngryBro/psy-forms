import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./Test";
import './css/index.css';
import { MethodicForm } from "./MethodicForm";
import { ResearchConstructor } from "./ResearchConstructor";
import { Research } from "./Research";

const App = () => {

    return <BrowserRouter>
            <Routes>
                <Route path="/form/methodic" element={<MethodicForm/>} />
                <Route path="/form/research" element={<ResearchConstructor/>}/>
                <Route path="/research/:slug" element={<Research/>} />
                <Route path="/" element={<Test/>}/>
            </Routes>
        </BrowserRouter>
};

export default App;