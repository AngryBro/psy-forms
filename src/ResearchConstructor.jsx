import { useState } from "react";
import { Input } from "./Input";
import { Block } from "./MethodicForm";
import { Textarea } from "./Textarea";
import { BLOCK_TYPE } from "./enums/BLOCK_TYPE";
import { Spoiler } from "./Spoiler";
import { TextFormBlock } from "./TextFormBlock";
import { ImgFormBlock } from "./ImgFormBlock";
import { Methodic } from "./Methodic";
import { ANSWER_TYPE } from "./enums/ANSWER_TYPE";
import "./css/ResearchConstructor.css";
import { Select } from "./Select";

export const ResearchConstructor = () => {
    
    const research1 = {
        public_name: null,
        private_name: null,
        description: null,
        blocks: [
            {
                public_name: "Тестовая методика",
                private_name: "Тестовая методика (скрытое)",
                instruction: "Инструкция по выполнению",
                type: BLOCK_TYPE.METHODIC,
                time: null,
                questions: [
                    {
                        id: null,
                        type: "q",
                        text: "Насколько вы боитесь:",
                        answer_type: ANSWER_TYPE.QUESTIONS,
                        number: "1",
                        required: true,
                        answers: 
                                [
                                {
                                    id: null,
                                    type: "q",
                                    text: "Мать",
                                    number: "1.1",
                                    required: false,
                                    answer_type: ANSWER_TYPE.SCALE,
                                    answers: {
                                            min: 0,
                                            max: 3,
                                            min_text: "Не боюсь",
                                            max_text: "Очень\nбоюсь",
                                            min_score: 0,
                                            max_score: 3
                                        },
                                },
                                {
                                    id: null,
                                    type: "q",
                                    text: "Отца",
                                    number: "1.2",
                                    required: false,
                                    subquestions: null,
                                    answer_type: ANSWER_TYPE.SCALE,
                                    answers: {
                                            min: 0,
                                            max: 3,
                                            min_text: "Не боюсь",
                                            max_text: "Очень\nбоюсь",
                                            min_score: 0,
                                            max_score: 3
                                    }
                                }
                            ],
                    },
                    {
                        id: null,
                        text: "Насколько сложно делать это приложение?",
                        type: "q",
                        number: "2",
                        required: false,
                        subquestions: [],
                        answer_type: ANSWER_TYPE.ONE,
                        answers:
                            [
                                {id: 1, text: "Изипизи", score: 1},
                                {id: 2, text: "Норм", score: 2},
                                {id: 3, text: "Хардово", score: 3}
                            ],
                    },
                    {
                        id: null,
                        text: "Кто такая бока?",
                        type: "q",
                        number: "3",
                        required: true,
                        answer_type: ANSWER_TYPE.MANY,
                        answers:  [
                                {id: null, text: "Киса", score: null},
                                {id: null, text: "Собачка", score: null},
                                {id: null, text: "Змейка", score: null},
                                {id: null, text: "Черепашка", score: null}
                            ]
                    }
                ],
                scales: [
                    {name: "Страх", questions: {"1.1": [], "1.2": []}, type: "score"},
                    {name: "Бока", questions: {"3": []}, type:"nominative"},
                    {name: "Остальное", questions: {}, type: null}
                ]
            },
            {
                id: null,
                title: "Устал проходить?",
                text: "Надо как-то, ещё один вопрос.\nПосмотри на котиков.",
                type: BLOCK_TYPE.TEXT
            },
            {
                id: null,
                type: BLOCK_TYPE.IMG,
                url: "https://img3.goodfon.ru/original/2560x1440/c/87/regdoll-koshki-mordochki.jpg"
            },
            {
                public_name: "Вторая методика",
                private_name: "Вторая методика (скрытое)",
                instruction: "Инструкция по выполнению",
                type: BLOCK_TYPE.METHODIC,
                time: null,
                questions: [
                    {
                        id: null,
                        type: "q",
                        text: "Насколько вы боитесь:",
                        number: "1",
                        answer_type: ANSWER_TYPE.QUESTIONS,
                        required: true,
                        answers: 
                                [
                                {
                                    id: null,
                                    type: "q",
                                    text: "Мать",
                                    number: "1.1",
                                    required: false,
                                    answer_type: ANSWER_TYPE.SCALE,
                                    answers: {
                                            min: 0,
                                            max: 3,
                                            min_text: "Не боюсь",
                                            max_text: "Очень\nбоюсь",
                                            min_score: 0,
                                            max_score: 3
                                        },
                                },
                                {
                                    id: null,
                                    type: "q",
                                    text: "Отца",
                                    number: "1.2",
                                    required: false,
                                    subquestions: null,
                                    answer_type: ANSWER_TYPE.SCALE,
                                    answers: {
                                            min: 0,
                                            max: 3,
                                            min_text: "Не боюсь",
                                            max_text: "Очень\nбоюсь",
                                            min_score: 0,
                                            max_score: 3
                                    }
                                }
                            ],
                    },
                    {
                        id: null,
                        text: "Насколько сложно делать это приложение?",
                        type: "q",
                        number: "2",
                        required: false,
                        subquestions: [],
                        answer_type: ANSWER_TYPE.ONE,
                        answers:
                            [
                                {id: 1, text: "Изипизи", score: 1},
                                {id: 2, text: "Норм", score: 2},
                                {id: 3, text: "Хардово", score: 3}
                            ],
                    },
                    {
                        id: null,
                        text: "Кто такая бока?",
                        type: "q",
                        number: "3",
                        required: true,
                        answer_type: ANSWER_TYPE.MANY,
                        answers:  [
                                {id: null, text: "Киса", score: null},
                                {id: null, text: "Собачка", score: null},
                                {id: null, text: "Змейка", score: null},
                                {id: null, text: "Черепашка", score: null}
                            ]
                    }
                ],
                scales: [
                    {name: "Страх", questions: {"1.1": [], "1.2": []}, type: "score"},
                    {name: "Бока", questions: {"3": []}, type:"nominative"},
                    {name: "Остальное", questions: {}, type: null}
                ]
            },
        ]
    }

    const methodics1 = [
        {id: 1, public_name: "Методика 1", private_name: "Методика one"},
        {id: 2, public_name: "Методика 2", private_name: "Методика two"}
    ]

    const [research, setResearch] = useState(research1);
    // eslint-disable-next-line
    const [methodics, setMethodics] = useState(methodics1);

    const [activeBlock, setActiveBlock] = useState(undefined);

    const updatePublicName = (name) => {
        // let temp = JSON.parse(JSON.stringify(research));
        // let temp = Object.assign(research);
        // temp.public_name = name;
        // setResearch(temp);
        // setResearch(r => {r.public_name = name; return r});
        setResearch({...research, public_name: name});
    }

    const updatePrivateName = name => {
        setResearch({...research, private_name: name});
    }

    const updateDescription = text => {
        setResearch({...research, description: text});
    }

    const updateTextBlock = (block_index, key, value) => {
        let research1 = JSON.parse(JSON.stringify(research));
        research1.blocks[block_index][key] = value;
        setResearch(research1);
    }

    const removeBlock = index => {
        setActiveBlock(null);
        let research1 = JSON.parse(JSON.stringify(research));
        research1.blocks.splice(index, 1);
        setResearch(research1);
    }

    const createBlock = (index_before) => {
        const createImg = () => {
            const newImg = () => {
                return {url: null, type: BLOCK_TYPE.IMG, id: null}
            }
            let research1 = JSON.parse(JSON.stringify(research));
            research1.blocks.splice(index_before+1, 0, newImg());
            setResearch(research1);
        }
        const createText = (index_before) => {
            const newText = () => {
                return {title: null, text: null, type: BLOCK_TYPE.TEXT, id: null}
            }
            let research1 = JSON.parse(JSON.stringify(research));
            research1.blocks.splice(index_before+1, 0, newText());
            setResearch(research1);
        }
        const addMethodic = (methodic_id) => {
            //получается с сервера и добавляется

        }
        return {
            createText: () => createText(index_before),
            createImg: () => createImg(index_before),
            addMethodic
        }
    }   
    
    return <div className="research-constructor">
        <div className="research-constructor-methodic-container">
        <Block isActive={activeBlock === -1} handleActive={() => setActiveBlock(-1)}>
            <div><Input font={20} tip="Открытое название" value={research.public_name} onChange={e => updatePublicName(e.target.value)} /></div>
            <div className="research-constructor-private-name" style={{maxHeight: activeBlock===-1?"100px":"0px"}}><Input font={20} tip="Скрытое название" onChange={e => updatePrivateName(e.target.value)} value={research.private_name} /></div>
            <div><Textarea onChangeValue={updateDescription} font={18} value={research.description} tip="Описание" /></div>
        </Block>
        <AddButtons methodics={methodics} handles={createBlock(-1)} />
        {
            research.blocks.map((block, i) => 
                <div key={i}>
                    {
                        block.type === BLOCK_TYPE.METHODIC?
                        <div onClick={() => i===activeBlock?1:setActiveBlock(i)} className="research-constructor-methodic-spoiler">
                            <Spoiler setHidden={h => h?setActiveBlock(undefined):1} hidden={i !== activeBlock} text={`${block.public_name}(${block.private_name})`}>
                                <Methodic data={block} readOnly={true} />
                            </Spoiler>
                            <div className="research-constructor-methodic-buttons-container">
                                <div onClick={() => 1} className="research-constructor-methodic-button">Редактировать</div>
                                <div onClick={() => removeBlock(i)} className="research-constructor-methodic-button">Удалить</div>
                            </div>
                        </div>
                        :block.type === BLOCK_TYPE.TEXT?
                        <TextFormBlock handleChange={(key, value) => updateTextBlock(i, key, value)} handleDelete={() => removeBlock(i)} handleActive={() => setActiveBlock(i)} data={block} isActive={i === activeBlock} />
                        :block.type === BLOCK_TYPE.IMG?
                        <ImgFormBlock handleDelete={() => removeBlock(i)} handleActive={() => setActiveBlock(i)} data={block} isActive={i === activeBlock} />
                        :<></>
                    }
                    <AddButtons methodics={methodics} handles={createBlock(i)} />
                </div>
            )
        }
        <div className="research-constructor-publish-button">Опубликовать исследование</div>
        </div>
    </div>
};

const AddButtons = ({handles, methodics = []}) => {
    
    const [hidden, setHidden] = useState(true);
    
    return <div  onMouseEnter={() => setHidden(false)} onMouseLeave={() => setHidden(true)} className="research-constructor-addbuttons-container">
        <div className="research-constructor-addbuttons" style={{opacity: Number(!hidden)}}>
            {/* <div onClick={handles.addMethodic} className={"research-constructor-addbuttons-button"}>Добавить методику</div> */}
            
            <div className="research-constructor-methodic-list">
                <Select onSelect={handles.addMethodic} value={null}>
                    {[{key: null, value: "Выберите методику", display: false}].concat(methodics.map(methodic => ({key: methodic.id, value: methodic.private_name})))}
                </Select>
            </div>
            
            <div onClick={handles.createText} className={"research-constructor-addbuttons-button"}>Добавить текст</div>
            <div onClick={handles.createImg} className={"research-constructor-addbuttons-button"}>Добавить картинку</div>
            
        </div>
    </div>
}