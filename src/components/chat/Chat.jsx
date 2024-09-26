import PropTypes from 'prop-types';

export default function Chat({ role, content }){
    const styles = {
        'systemToShow': {
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
        'assistant': {
            width: 'fit-content',
            padding: '2rem',
            background: '#6AACA5',
            border: '1px solid rgba(112, 124, 151, 0.25)',
            borderRadius: '16px 16px 16px 0px',
        }
    }

    return(
        <div style={styles[role]}>
            {content}
        </div>
    )
}
Chat.propTypes = {
    role: PropTypes.string,
    content: PropTypes.string
};