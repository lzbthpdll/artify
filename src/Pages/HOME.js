import React, {useState, useEffect, useRef} from 'react'
import firebase, {fires, auth} from "../Utils/firebase";
import SENTM from "./SentM";
import Navigation from "../Component/Navigation";
import "./Pages.css";
import LOGO from "./logo.png";
export default function HOME() {
const scroll = useRef();
const [messages, setMessages] = useState([]);

useEffect(() => {
    fires.collection("messages").orderBy("createdAt").limit(50).onSnapshot(snapshot =>{
        setMessages(snapshot.docs.map(doc => doc.data()))
    });
},[]) 

const mail = firebase.auth().currentUser.email;
    return (
        <div>
            <Navigation/> 
                <div class="chatbox">  
                    {messages.map(({id, email, text, uid})=>(
                        <div key={id} class={`msg ${ uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                            <p><font color="white"><em><small><u>{email}</u></small></em></font><br></br>{text}</p>    
                        
                            <div ref={scroll}></div>
                        </div>   
                           
                    ))}
                               
                </div>
                    <SENTM scroll={scroll}/> 
                    
                <div>
                           <img src={LOGO} width="500px" height="500px" alt="logo" class="logo" />
                            <p class="hd"><font color="blue"><b>Welcome <i>{mail}</i>!</b></font></p>
                                         
                </div>
        </div>
    )
}
