import React, {useState} from 'react';
import firebase,{fires,auth} from "../Utils/firebase";
import "./Pages.css";
export default function SentM({scroll}) {
    const [msg, setMsg] = useState("");

    async function SentM(e){
        e.preventDefault();
        if (msg === ""){

        }else{
            const {uid} = auth.currentUser;
            const email = firebase.auth().currentUser.email;
            await fires.collection("messages").add({
                text: msg,email,uid,createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            setMsg("");
            scroll.current.scrollIntoView({behavior: "smooth"});
        }
    }

    return (
        <div>
            <form onSubmit={SentM}>
                <div class="ts">
                    <textarea class="txtarea" value= {msg} onChange={(e)=> setMsg(e.target.value)} placeholder="Message..."/>
                    <br></br>
                  <center>  <button class="submitbtn" type="submit">Send</button> </center>
                </div>
            </form>
        </div>
    )
}
