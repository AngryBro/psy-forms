import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./Test";
import './css/index.css';

const App = () => {

    return <BrowserRouter>
            <Routes>
                <Route path="/test" element={<Test/>} />
                <Route/>
                <Route/>
            </Routes>
        </BrowserRouter>
};

export default App;