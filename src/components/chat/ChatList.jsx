import PropTypes from 'prop-types';
import Chat from './Chat';
import LoadingChat from './LoadingChat';

export default function ChatList({ chatList, onProgress }){
    return(
        <div className='chat-list'>
            {chatList.map((chat, idx) => {
                // 'prompt' 내용은 보여주지 않습니다.
                if (chat.role == 'prompt') return;
                return <Chat key={idx} role={chat.role} content={chat.parts[0].text} />
                })}
            {onProgress? <LoadingChat /> : <></>}
        </div>
    )
}
ChatList.propTypes = {
    chatList: PropTypes.array,
    onProgress: PropTypes.bool
};