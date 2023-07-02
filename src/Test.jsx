import { useEffect, useState } from "react";
import { Inputarea } from "./Inputarea";




const Test = () => {

    const [v, setV] = useState("default");

    useEffect(() => console.log("Изменение "+v.length), [v]);
    
    return <div style={{width: "300px", height: "100px", backgroundColor:"red"}}>
        <Inputarea  value={v} onChange={e => setV(e.target.innerText)}/>
    </div>
};

export default Test;