import PropTypes from 'prop-types';

export default function Chat({ role, content }){
    const containerStyles = {
        display: "flex",
        width: "100%",
        paddingBottom: "1.5rem",
        justifyContent: role === 'model' ?  "left" : "right"
    }
    const bubbleStyles = {
        'promptToShow': {
            width: 'fit-content',
            padding: '2rem',
            background: '#21978B',
            border: '1px solid rgba(112, 124, 151, 0.25)',
            borderRadius: '16px 16px 0px 16px',
            color: '#FFFFFF'
        },
        'user': {
            width: 'fit-content',
            padding: '2rem',
            background: '#21978B',
            border: '1px solid rgba(112, 124, 151, 0.25)',
            borderRadius: '16px 16px 0px 16px',
            color: '#FFFFFF'
        },
        'model': {
            width: 'fit-content',
            padding: '2rem',
            background: '#c8d6d5',
            border: '1px solid rgba(112, 124, 151, 0.2)',
            borderRadius: '16px 16px 16px 0px',
        }
    }

    return(
        <div style={containerStyles}>
            <div style={{...bubbleStyles[role]}}>
                {content}
            </div>
        </div>
    )
}
Chat.propTypes = {
    role: PropTypes.string,
    content: PropTypes.string
};