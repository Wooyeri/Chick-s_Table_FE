import PropTypes from 'prop-types';
import './chats.css'

export default function Chat({ role, content }){
    return(
        <div className={`chat-container ${role === 'model' ?  "model" : "user"}`}>
            <div className={`bubble ${role === 'model' ?  "model" : "user"}`}>
                {content}
            </div>
        </div>
    )
}
Chat.propTypes = {
    role: PropTypes.string,
    content: PropTypes.string
};