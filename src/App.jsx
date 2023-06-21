import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./Test";
import './css/index.css';
import { MethodicForm } from "./MethodicForm";

const App = () => {

    return <BrowserRouter>
            <Routes>
                <Route path="/form/methodic" element={<MethodicForm/>} />
                <Route/>
                <Route path="/" element={<Test/>}/>
            </Routes>
        </BrowserRouter>
};

export default App;