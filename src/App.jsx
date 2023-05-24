import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./Test";
import './css/index.css';

const App = () => {
    return <div>
        <BrowserRouter>
            <Routes>
                <Route path="/test" element={<Test/>} />
                <Route/>
                <Route/>
            </Routes>
        </BrowserRouter>
    </div>
};

export default App;