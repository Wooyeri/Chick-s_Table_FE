export default function LoadingChat(){
    const containerStyles = {
        display: "flex",
        width: "100%",
        paddingBottom: "1.5rem",
        justifyContent: "left"
    }
    const bubbleStyle = {
        width: 'fit-content',
        padding: '2rem',
        background: '#6AACA5',
        border: '1px solid rgba(112, 124, 151, 0.25)',
        borderRadius: '16px 16px 16px 0px',
    }
    return(
        <div style={containerStyles}>
            <div style={bubbleStyle}>
                불러오는 중..
            </div>
        </div>
    )
}