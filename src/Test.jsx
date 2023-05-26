// import { useState } from "react";

import { useState } from "react";
import AnswerOne from "./AnswerOne";
import Select from "./Select";


const Test = () => {

    const [text, setText] = useState('var 1');

    return <div style={{width: '400px'}}>
        <AnswerOne selected={true} handleSelect={() => 1} edit={1} handleEdit={e => setText(e.target.value)}>
            {text}
        </AnswerOne>
        <Select value={{get: 2, set: () => 1}}>
            {['одиночный', 'множ выбор','шкала', 'свободный']}
        </Select>
    </div>
};

export default Test;