import { useEffect, useState } from "react"
import ChatList from "@/components/chat/ChatList";
import { getModelResponse } from "@/utils/chat";

import arrowBtn from "@/assets/images/arrowButton.svg"
import "./ChatbotPage.css"

export default function ChatbotPage(){
    const [chatList, setChatList] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const [onProgress, setOnProgress] = useState(false);
    const addChat = (role, content) => {
        setChatList([...chatList, {role, content}]);
    }
    const handleChange = (e) =>{
        setChatInput(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const userInput = chatInput.trim();
        setChatInput('');
        console.log(chatInput)
        if(userInput) {
            setOnProgress(true);
            getModelResponse(chatList).then(res =>{
                addChat("user", userInput);
                addChat("assistant", res.message.content);
                setOnProgress(false);
            })
            .catch(choice => {
                console.log(choice);
                setOnProgress(false);
            })
        }
    }
    useEffect(()=>{
        //Todo: Get user information from the server and refine it
        const userHealthInfo = "당신은 사용자의 건강 상태에 맞는 음식 레시피를 추천해주는 어시스턴트입니다. 사용자는 고혈압이 있습니다.";
        const userHealthInfoToShow = "나의 건강상태에 맞는 레시피를 추천해줘. 나는 고혈압이 있어."
        addChat('system', userHealthInfo);
        addChat('systemToShow', userHealthInfoToShow);
    }, [])

    return(
        <div className="chatbot-page">
            <div className="chatbot-container">
                <ChatList chatList={chatList} onProgress={onProgress} />
                <div className="chat-input-area">
                    <form onSubmit={handleSubmit}>
                        <input placeholder="챗봇에게 보낼 메세지를 입력하세요." onChange={handleChange}></input>
                        <button type="submit"><img src={arrowBtn} /></button>
                    </form>
                </div>
            </div>
        </div>
    )
}