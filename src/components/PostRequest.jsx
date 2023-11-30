import axios from "axios";
import { useEffect, useState } from "react";

function PostRequest(){
    const [user, setUser] = useState("No User Yet")
    const [message, setMessage] = useState([])
    const [ourMessage, setOurMessage] = useState("")

    useEffect(() => {
        axios.post("http://165.120.188.147:2514/createAccount").then((res) => {
            setUser(res.data.user)
        }).catch(console.log)
    }, [])

    function getMessages(){
        axios.get("http://165.120.188.147:2514/getMessages").then((res) => setMessage(res.data)).catch(console.log)
    }

    const htmlMessages = []
    for (let m of message){
        htmlMessages.push(<p>Name: {m.user}<br/>Message: {m.message}</p>)
    }

    function sendMessage(){
        axios.post("http://165.120.188.147:2514/sendMessage", {user:user, message:ourMessage}).then( () => {
            getMessages()
        }).catch(console.log)
    }

    return(<div>

        <h1> My message board: {user} </h1>
        <button onClick={() => getMessages()}> Refresh </button><br/>
        <input value={ourMessage} onChange={(e) => setOurMessage(e.target.value)}></input>
        <button onClick={() => sendMessage()}> SEND </button>
        {htmlMessages}

    </div>)

}

export default PostRequest;