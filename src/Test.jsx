// import { useState } from "react";

import { useState } from "react";
import Answer from "./Answer";
import Select from "./Select";


const Test = () => {

    const [text, setText] = useState('Вариант 1');
    const [selected, setSelected] = useState(true);

    return <div style={{width: '400px'}}>
        <Answer checkbox={true} selected={selected} handle={{select: () => setSelected(t => !t), edit: e => setText(e.target.value)}} edit={0}>
            {text}
        </Answer>
        <Select value={{get: 2, set: () => 1}}>
            {['одиночный', 'множ выбор','шкала', 'свободный']}
        </Select>
    </div>
};

export default Test;