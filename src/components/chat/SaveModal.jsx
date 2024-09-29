import { useContext, useEffect, useState } from "react";
import { SaveContext } from "@/common/saveContext";
import ReactMarkdown from 'react-markdown';

import "./SaveModal.css"
import check from "@/assets/images/check.svg";
import cancel from "@/assets/images/cancel.svg";

export default function SaveModal() {
    const { setShowSaveModal, saveModalContent, setSaveModalContent } = useContext(SaveContext);
    const [preview, setPreview] = useState('');
    const [input, setInput] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        //Todo: send this content to the user's database.
        setSaveModalContent('');
    }

    useEffect(() => {
        if(saveModalContent.length > 100) {
            const lines = saveModalContent.split('\n');
            const firstFour = lines.slice(0, 8);
            setPreview(firstFour.join('\n') + "\n\n...");
        }
    }, []);
    return (
        <div className="chat-save-modal-back">
            <div className="chat-save-modal">
                <div className="close btn-container"><button onClick={() => setShowSaveModal(false)}><img src={cancel} alt="취소 버튼" /></button></div>
                <h2>내 레시피로 저장하기</h2>
                <form onSubmit={handleSubmit}>
                    <div className="title">
                        <label>이름:</label>
                        <input type="text" value={input} onChange={(e) => {setInput(e.target.value)}}></input>
                    </div>
                    <div className="save-modal-content"><ReactMarkdown>{preview}</ReactMarkdown></div>
                    <div className="save btn-container"><button type="submit"><img src={check} alt="확인 버튼" /></button></div>
                </form>
            </div>
        </div>
    )
}