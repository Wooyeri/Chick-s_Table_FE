import { useState } from "react"

export default function ChatbotPage(){
    const [chatList, setChatList] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const addChat = (type, content) => {
        setChatList([...chatList, {type, content}]);
    }
    const handleChange = (e) =>{
        setChatInput(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setChatInput(chatInput.trim())
        if(chatInput) addChat(chatInput);
    }
    return(
        <div>
            <div className="chat-area"></div>
            <div className="chat-input-area">
                <form onSubmit={handleSubmit}>
                    <input placeholder="챗봇에게 보낼 메세지를 입력하세요." onChange={handleChange}></input>
                    <button type="submit">&lt;-</button>
                </form>
            </div>
        </div>
    )
}