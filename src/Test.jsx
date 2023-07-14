import { Select } from "./Select";

const Test = () => {

    
    return <div style={{width: "300px", height: "100px", backgroundColor:"red"}}>
        <div style={{backgroundColor:"red", height:"100px"}}></div>
        <div style={{opacity:0.5}}>
        <Select value={null} onSelect={() => 1}>{
            [{key: null, value: "header"}]
            .concat([
                {key: 1, value: "elem ent1"},
                {key: 2, value: "elem ent2"},
                {key: 3, value: "elem ent3"},
                {key: 4, value: "elem ent4"},
                {key: 5, value: "elem ent5"}
            ])
        }</Select>
        </div>
        <div style={{backgroundColor:"green", height:"100px"}}></div>
    </div>
};

export default Test;