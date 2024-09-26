import { useEffect, useState } from "react"
import ChatList from "@/chat/ChatList";

export default function ChatbotPage(){
    const [chatList, setChatList] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const addChat = (role, content) => {
        setChatList([...chatList, {role, content}]);
    }
    const handleChange = (e) =>{
        setChatInput(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setChatInput(chatInput.trim());
        if(chatInput) addChat(chatInput);
        //Todo: 
    }
    useEffect(()=>{
        //Todo: Get user information from the server and refine it
        const userHealthInfo = "당신은 사용자의 건강 상태에 맞는 음식 레시피를 추천해주는 어시스턴트입니다. 사용자는 고혈압이 있습니다.";
        const userHealthInfoToShow = "나의 건강상태에 맞는 레시피를 추천해줘. 나는 고혈압이 있어."
        addChat('system', userHealthInfo);
        addChat('systemToShow', userHealthInfoToShow);
    })

    return(
        <div>
            <ChatList chatList={chatList} />
            <div className="chat-input-area">
                <form onSubmit={handleSubmit}>
                    <input placeholder="챗봇에게 보낼 메세지를 입력하세요." onChange={handleChange}></input>
                    <button type="submit">&lt;-</button>
                </form>
            </div>
        </div>
    )
}