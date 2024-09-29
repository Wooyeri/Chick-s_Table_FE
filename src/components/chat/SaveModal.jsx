import { useContext, useEffect, useState } from "react";
import { SaveContext } from "@/common/saveContext";

import "./SaveModal.css"
import check from "@/assets/images/check.svg";
import cancel from "@/assets/images/cancel.svg";

export default function SaveModal() {
    const { setShowSaveModal, saveModalContent, setSaveModalContent } = useContext(SaveContext);
    const [titleInput, setTitleInput] = useState('');
    const [contentInput, setContentInput] = useState(saveModalContent);
    const handleSubmit = (e) => {
        e.preventDefault();
        //Todo: send this content to the user's database.
        setSaveModalContent('');
    }

    useEffect(() => {
    }, []);
    return (
        <div className="chat-save-modal-back">
            <div className="chat-save-modal">
                <div className="close btn-container"><button onClick={() => setShowSaveModal(false)}><img src={cancel} alt="취소 버튼" /></button></div>
                <h2>내 레시피로 저장하기</h2>
                <form onSubmit={handleSubmit}>
                    <div className="title">
                        <label>이름:</label>
                        <input type="text" value={titleInput} onChange={(e) => {setTitleInput(e.target.value)}}></input>
                    </div>
                    <div className="save-modal-content"><textarea value={contentInput} onChange={(e) => {setContentInput(e.target.value)}}></textarea></div>
                    <div className="save btn-container"><button type="submit"><img src={check} alt="확인 버튼" /></button></div>
                </form>
            </div>
        </div>
    )
}