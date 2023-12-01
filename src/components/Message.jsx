function TimestampToTime(timestamp){
    const d = new Date(timestamp);
    let min = d.getMinutes();
    if (min < 10){
        min = "0" + min;
    }
    return d.getHours() + ":" + min + " " + d.getSeconds();
}

function Message({message, time, user}){
    return(
        <div className="message-card">
            <h3>{user}</h3>
            <p>{message}</p>
            <span className="small">{TimestampToTime(time)}</span>
        </div>
    )
}

export default Message;