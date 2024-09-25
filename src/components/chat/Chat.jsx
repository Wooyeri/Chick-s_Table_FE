import PropTypes from 'prop-types';

export default function Chat({ type, content }){
    const styles = {
        'user': {
            width: 'fit-content',
            padding: '2rem',
            background: '#21978B',
            border: '1px solid rgba(112, 124, 151, 0.25)',
            borderRadius: '16px 16px 0px 16px',
            color: '#FFFFFF'
        },
        'bot': {
            width: 'fit-content',
            padding: '2rem',
            background: '#6AACA5',
            border: '1px solid rgba(112, 124, 151, 0.25)',
            borderRadius: '16px 16px 16px 0px',
        }
    }

    return(
        <div style={styles[type]}>
            {content}
        </div>
    )
}
Chat.propTypes = {
    type: PropTypes.string,
    content: PropTypes.string
}