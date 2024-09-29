import { useState } from 'react';
import PropTypes from 'prop-types';

import bookmark from "@/assets/images/bookmark.svg"
import bookmark_f from "@/assets/images/bookmark_filled.svg"
import './chats.css'

export default function Chat({ role, content }){
    const [saved, setSaved] = useState(false);
    const [hover, setHover] = useState(false);
    const handleSave = () => {
        //Todo: show modal and send message to the server
        setSaved(!saved);
    }
    return(
        <div className={`chat-container ${role === 'model' ?  "model" : "user"}`}>
            <div className={`bubble ${role === 'model' ?  "model" : "user"}`}>
                {content}
            </div>
            {role === 'model' ?
                <div className='save-btn'><img src={saved || hover ? bookmark_f : bookmark} onMouseEnter={() => {setHover(true)}} onMouseLeave={() => {setHover(false)}} onClick={handleSave} alt='저장 버튼' /></div>
            : <></>}
        </div>
    )
}
Chat.propTypes = {
    role: PropTypes.string,
    content: PropTypes.string
};