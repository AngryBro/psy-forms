import { useState } from "react";
import SlideFlag from "./SlideFlag";

const Test = () => {

    const [flag, setFlag] = useState(false);

    return <div>
        <SlideFlag flag={flag} handleClick={() => setFlag(f => !f)}>
            Обязательный вопрос
        </SlideFlag>
    </div>
};

export default Test;