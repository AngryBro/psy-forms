// import { Cabinet } from "./pages/Cabinet";

import { ResultsBlock } from "./ResultsBlock";

// import { Respondents } from "./Respondents";




const Test = () => {

    const groups = [
        {
            id: 1,
            name: "Тревожные",
            conditions: [
                {string: "тревога > 10", id: 1},
                {string: "тревога < 50", id: 2}
            ]
        },
        {
            id: 2,
            name: "Нетревожные",
            conditions: [
                {string: "тревога <= 10", id: 3}
            ]
        }
    ]
    
    return <div style={{width: "100%", height: "100%"}}>
        <ResultsBlock groups={groups} researchName={"Привязанность"} />
    </div>
};

export default Test;