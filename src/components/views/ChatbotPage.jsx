import { useEffect, useState } from "react"
import ChatList from "@/components/chat/ChatList";
import { startChat, getModelResponse } from "@/utils/chat";

import arrowBtn from "@/assets/images/arrowButton.svg"
import "./ChatbotPage.css"

export default function ChatbotPage(){
    const [chatList, setChatList] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const [onProgress, setOnProgress] = useState(false);
    const addChat = (role, text) => {
        console.log(chatList)
        setChatList([...chatList, {role, parts: [{ text }]}]);
        console.log(chatList)
    }
    const handleChange = (e) =>{
        setChatInput(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const userInput = chatInput.trim();
        setChatInput('');
        if(userInput) {
            setOnProgress(true);
            addChat("user", userInput);
            getModelResponse(userInput).then(res =>{
                addChat("model", res);
                setOnProgress(false);
            })
            .catch(err => {
                console.log(err);
                setOnProgress(false);
            });
        }
    }
    useEffect(()=>{
        //Todo: Get user information from the server and refine it
        const userHealthInfo = "나의 건강상태에 맞추어 내가 원하는 요리 레시피를 추천해줘. 나는 고혈압이 있어."
        const initialChatList = [
            {role: 'user', parts: [{ text: userHealthInfo }]},
        ]
        setChatList(initialChatList);
        startChat(initialChatList);
    }, [])
    useEffect(()=> {
        console.log(chatList);
    }, [chatList]);

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