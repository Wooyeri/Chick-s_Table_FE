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
        setChatList([...chatList, {role, parts: [{ text }]}]);
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
                console.log(chatList);
                console.log(res)
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
        const userDisease = '고혈압, 땅콩 알레르기'
        const userHealthInfo = `내가 말해주는 요리의 레시피를 내 건강 상태에 맞추어 추천해줘. 나는 ${userDisease} 있어.`
        const userHealthInfoToShow = `나의 건강상태에 맞는 요리 레시피를 추천해줘. 나는 ${userDisease}이(가) 있어.`
        const initialChatList = [
            {role: 'prompt', parts: [{ text: userHealthInfo }]},
            {role: 'promptToShow', parts: [{ text: userHealthInfoToShow }]}
        ]
        setChatList(initialChatList);
        startChat(initialChatList
            .filter(chat => chat.role != 'promptToShow')
            .map(chat => {
                if (chat.role == 'prompt'){
                    const newChat = {...chat, role: 'user'};
                    return newChat;
                }
                else return chat;
            }))
    }, []);

    return(
        <div className="chatbot-page">
            <div className="chatbot-container">
                <ChatList chatList={chatList} onProgress={onProgress} />
                <div className="chat-input-area">
                    <form onSubmit={handleSubmit}>
                        <input placeholder="챗봇에게 보낼 메세지를 입력하세요." value={chatInput} onChange={handleChange}></input>
                        <button type="submit"><img src={arrowBtn} /></button>
                    </form>
                </div>
            </div>
        </div>
    )
}