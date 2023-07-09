
const Notification = ({message}) => {
    const notificationStyle = {
        backgroundColor: "silver",
        color: "lime",
        borderRadius: 5,
        border: "5px solid",
        borderColor: "lime",
        fontSize: "2rem",
        padding: "1rem",
    }
    if(message === '') return null;
    return(
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification;