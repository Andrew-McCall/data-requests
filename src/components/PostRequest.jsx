import axios from "axios";
import { useEffect, useState } from "react";

function PostRequest(){
    // Each use state for local variables which will require the page to rerender
    const [user, setUser] = useState({userName: "", isValid:false})
    const [message, setMessage] = useState([])
    const [ourMessage, setOurMessage] = useState("")

    // Upon page load, post for a new user and save to user useState
    useEffect(() => {
        getMessages();
    }, [])

    // Function to get all messages
    function getMessages(){
        axios.get("http://165.120.188.147:2514/getMessages").then((res) => setMessage(res.data)).catch(console.log)
    }

    // Turn all messages into html
    const htmlMessages = []
    message.sort((a,b)=> b.time - a.time)
    for (let m of message){
        htmlMessages.push(<p>Name: {m.user}<br/>Message: {m.message}</p>)
    }

    // Send a message. Axios post, with a data object
    function sendMessage(){
        axios.post("http://165.120.188.147:2514/sendMessage", {user:user.userName, message:ourMessage}).then( () => {
            getMessages()
        }).catch(console.log)
        setOurMessage("")
    }

    // Create a new user. Axios post, with a data object
    function login(){
        axios.post("http://165.120.188.147:2514/createAccount", {user:user.userName})
            .then( (res) => {
                setUser({userName:user.userName, isValid:true})
            }).catch(console.log)
    }

    // Final html for page. user header, refresh button to load messages, input value for new messages, send button to send input data, html messages to view older messages
    return(<div>

        <h1> My message board:
            <input disabled={user.isValid} value={user.userName} onChange={(e) => setUser({userName:e.target.value})}></input>
            { !user.isValid && <button onClick={() => login()}> Login </button>}
        </h1>
        <div hidden={!user.isValid}>
            <button onClick={() => getMessages()}> Refresh </button><br/>
            <input value={ourMessage} onChange={(e) => setOurMessage(e.target.value)}></input>
            <button onClick={() => sendMessage()}> SEND </button>
        </div>
        {htmlMessages}

    </div>)

}

export default PostRequest;