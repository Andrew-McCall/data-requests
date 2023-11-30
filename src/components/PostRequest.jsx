import axios from "axios";
import { useEffect, useState } from "react";

function PostRequest(){
    // Each use state for local variables which will require the page to rerender
    const [user, setUser] = useState("No User Yet")
    const [message, setMessage] = useState([])
    const [ourMessage, setOurMessage] = useState("")

    // Upon page load, post for a new user and save to user useState
    useEffect(() => {
        axios.post("http://165.120.188.147:2514/createAccount").then((res) => {
            setUser(res.data.user)
        }).catch(console.log)
    }, [])

    // Function to get all messages
    function getMessages(){
        axios.get("http://165.120.188.147:2514/getMessages").then((res) => setMessage(res.data)).catch(console.log)
    }

    // Turn all messages into html
    const htmlMessages = []
    message.reverse()
    for (let m of message){
        htmlMessages.push(<p>Name: {m.user}<br/>Message: {m.message}</p>)
    }

    // Send a message. Axios post, with a data object
    function sendMessage(){
        axios.post("http://165.120.188.147:2514/sendMessage", {user:user, message:ourMessage}).then( () => {
            getMessages()
        }).catch(console.log)
    }


    // Final html for page. user header, refresh button to load messages, input value for new messages, send button to send input data, html messages to view older messages
    return(<div>

        <h1> My message board: {user} </h1>
        <button onClick={() => getMessages()}> Refresh </button><br/>
        <input value={ourMessage} onChange={(e) => setOurMessage(e.target.value)}></input>
        <button onClick={() => sendMessage()}> SEND </button>
        {htmlMessages}

    </div>)

}

export default PostRequest;