import { useEffect, useState } from "react";
import { Block } from "./MethodicForm";
import { Textarea } from "./Textarea";
import { BLOCK_TYPE } from "./enums/BLOCK_TYPE";
import { Spoiler } from "./Spoiler";
import { TextFormBlock } from "./TextFormBlock";
import { ImgFormBlock } from "./ImgFormBlock";
import { Methodic } from "./Methodic";
import "./css/ResearchConstructor.css";
import { Select } from "./Select";
import { Api } from "./Api";
import { API_ROUTES } from "./enums/API_ROUTES";
import { Button } from "./Button";
import { BUTTON_TYPES } from "./enums/BUTTON_TYPES";
import { SavingButton } from "./SavingButton";
import { Alert } from "./Alert";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "./enums/ROUTES";
import { Inputarea } from "./Inputarea";
import { BUTTON_STATES } from "./enums/BUTTON_STATES";

export const ResearchConstructor = ({slug}) => {
    

    const newResearch = () => ({
        id: null,
        slug: null,
        private_name: null,
        public_name: null,
        description: null,
        blocks: []
    });

    const [research, setResearch] = useState(newResearch());
    const [methodics, setMethodics] = useState([]);
    const [alertLoad, setAlertLoad] = useState(null);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(true);
    const [publishWindow, setPublishWindow] = useState(null);

    const publishText = `Опубликованное исследование нельзя будет отредактировать, но можно будет снять с публикации. Опубликовать?`;

    useEffect(() => {
        Api(API_ROUTES.METHODICS_ALL).auth().callback(({ok, data}) => {
            if(ok) {
                setMethodics(data);
            }
            else {
                setError("Не удалось загрузить методики");
            }
        }).send();
    }, []);

    useEffect(() => {
        if(slug !== "new") {
            setSaving(false);
            setAlertLoad("Загрузка данных исследования");
            Api(API_ROUTES.RESEARCH_GET)
            .auth()
            .get({slug})
            .callback(({ok, data}) => {
                setAlertLoad(null);
                if(ok) {
                    setResearch(data);
                    setSaved(true);
                }
                else {
                    setError("Ошибка загрузки данных");
                }
            })
            .send();
        }
    }, [slug]);

    const nav = useNavigate();

    const save = (callback = () => 1) => {
        setSaving(true);
        Api(API_ROUTES.RESEARCH_SAVE)
        .auth()
        .post(research)
        .callback(({ok, data}) => {
            setSaving(false);
            if(ok) {
                callback();
                if(research.id === null) {
                    nav(ROUTES.RESEARCH_CONSTRUCTOR(data.slug));
                }
                else {
                    setSaved(true);
                    setActiveBlock(null);
                }
            }
        }).send();
    }


    const [activeBlock, setActiveBlock] = useState(undefined);

    const updatePublicName = (name) => {
        setResearch({...research, public_name: name});
        setSaved(false);
    }

    const updatePrivateName = name => {
        setResearch({...research, private_name: name});
        setSaved(false);
    }

    const updateDescription = text => {
        setResearch({...research, description: text});
        setSaved(false);
    }

    const updateImgBlock = (block_index, url) => {
        let blocks = JSON.parse(JSON.stringify(research.blocks));
        blocks[block_index].url = url;
        setResearch({...research, blocks: blocks});
        setSaved(false);
    }

    const updateTextBlock = (block_index, key, value) => {
        let research1 = JSON.parse(JSON.stringify(research));
        research1.blocks[block_index][key] = value;
        setResearch(research1);
        setSaved(false);
    }

    const removeBlock = index => {
        setActiveBlock(index === research.blocks.length-1?index-1:index);
        let research1 = JSON.parse(JSON.stringify(research));
        research1.blocks.splice(index, 1);
        setResearch(research1);
        setSaved(false);
    }

    const editMethodic = (id) => {
        let callback = () => nav(ROUTES.METHODIC_CONSTRUCTOR(id));
        if(saved) {
            return callback();
        }
        save(callback);
    }

    const createBlock = (index_before) => {
        const createImg = () => {
            const newImg = () => {
                return {url: null, type: BLOCK_TYPE.IMG}
            }
            let research1 = JSON.parse(JSON.stringify(research));
            research1.blocks.splice(index_before+1, 0, newImg());
            setResearch(research1);
            setSaved(false);
            setActiveBlock(index_before+1);
        }
        const createText = (index_before) => {
            const newText = () => {
                return {title: null, text: null, type: BLOCK_TYPE.TEXT}
            }
            let research1 = JSON.parse(JSON.stringify(research));
            research1.blocks.splice(index_before+1, 0, newText());
            setResearch(research1);
            setSaved(false);
            setActiveBlock(index_before+1);
        }
        const addMethodic = (methodic_id) => {
            let methodic = methodics.find(m => m.id === methodic_id);
            setAlertLoad(`Загрузка методики "${methodic.private_name}"`);
            Api(API_ROUTES.METHODIC_GET)
            .auth()
            .get({id: methodic_id})
            .callback(({ok, data}) => {
                setAlertLoad(null);
                if(ok) {
                    setSaved(false);
                    let research1 = JSON.parse(JSON.stringify(research));
                    data.type = BLOCK_TYPE.METHODIC;
                    research1.blocks.splice(index_before+1, 0, data);
                    setResearch(research1);
                    setActiveBlock(index_before+1);
                }
                else {
                    setError(`Методику "${methodic.private_name}" не удалось загрузить.`);
                }
            })
            .send();

        }
        return {
            createText: () => createText(index_before),
            createImg: () => createImg(index_before),
            addMethodic
        }
    }   

    const publish = () => {
        setAlertLoad(publishText);
        Api(API_ROUTES.RESEARCH_PUBLISH)
        .auth()
        .post({id: research.id})
        .callback(({ok}) => {
            setAlertLoad(null);
            if(ok) {
                nav(ROUTES.PUBLISHED(slug));
            }
            else {
                setError("Исследование не опубликовано из-за неизвестной ошибки");
            }
        })
        .send();
    }

    const canPublish = () => {
        return research.id !== null && saved;
    }
    
    return <div className="research-constructor">
        <Alert onClose={setError} onConfirm={() => window.location.reload()} text="Обновить страницу" >{error}</Alert>
        <Alert onClose={setAlertLoad} waiting={true}>{alertLoad}</Alert>
        <Alert onConfirm={publish} onClose={setPublishWindow} text="Опубликовать" >{publishWindow}</Alert>
        <div className="research-constructor-methodic-container">
        <Block isActive={activeBlock === -1} handleActive={() => setActiveBlock(-1)}>
            <div className="research-constructor-name">
                <Inputarea tip="Открытое название" value={research.public_name} onChange={e => updatePublicName(e.target.innerText)} />
            </div>
            <div className={"research-constructor-name "+(activeBlock===-1?"":"__hidden")}>
                <Inputarea tip={research.public_name===null || research.public_name===""?"Скрытое название":research.public_name} onChange={e => updatePrivateName(e.target.innerText)} value={research.private_name} />
            </div>
            <div><Textarea onChangeValue={updateDescription} font={18} value={research.description} tip="Описание" /></div>
        </Block>
        <AddButtons methodics={methodics} handles={createBlock(-1)} />
        {
            research.blocks.map((block, i) => 
                <div key={i}>
                    {
                        block.type === BLOCK_TYPE.METHODIC?
                        <div onClick={() => i===activeBlock?setActiveBlock(undefined):setActiveBlock(i)} className="research-constructor-methodic-spoiler">
                            <Spoiler controlled={true} setHidden={()=>1} hidden={i !== activeBlock} text={`${block.public_name} (${block.private_name})`}>
                                <Methodic data={block} readOnly={true} />
                            </Spoiler>
                            <div className="research-constructor-methodic-buttons-container">
                                <div className="research-constructor-methodic-button"><Button state={i===activeBlock && saving ? BUTTON_STATES.WAITING:BUTTON_STATES.ENABLED} onClick={() => editMethodic(block.id)} type={BUTTON_TYPES.EDIT}  >Редактировать</Button></div>
                                <div className="research-constructor-methodic-button"><Button onClick={() => removeBlock(i)} type={BUTTON_TYPES.DELETE}>Удалить</Button></div>
                            </div>
                        </div>
                        :block.type === BLOCK_TYPE.TEXT?
                        <TextFormBlock handleChange={(key, value) => updateTextBlock(i, key, value)} handleDelete={() => removeBlock(i)} handleActive={() => setActiveBlock(i)} data={block} isActive={i === activeBlock} />
                        :block.type === BLOCK_TYPE.IMG?
                        <ImgFormBlock handleChange={url => updateImgBlock(i, url)} handleDelete={() => removeBlock(i)} handleActive={() => setActiveBlock(i)} data={block} isActive={i === activeBlock} />
                        :<></>
                    }
                    <AddButtons methodics={methodics} handles={createBlock(i)} />
                </div>
            )
        }
        <div className="research-constructor-save-button">
            <SavingButton save={() => save()} saved={saved} saving={saving} />
        </div>
        <div style={{opacity: Number(canPublish())}} className="research-constructor-publish-button">
            <Button onClick={() => setPublishWindow(publishText)} type={BUTTON_TYPES.L} state={canPublish()?BUTTON_STATES.ENABLED:BUTTON_STATES.DISABLED}>
                Опубликовать исследование
            </Button>
        </div>
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