import React, {useState} from 'react';
import firebase,{fires,auth} from "../Utils/firebase";
import "./Pages.css";
export default function SentC({scrol}) {
    const [cmt, setCmt] = useState("");

    async function SentC(e){
        e.preventDefault();
        if (cmt === ""){
        }else{
            const {uid} = auth.currentUser;
            const email = firebase.auth().currentUser.email;        
                    await fires.collection("comments").add({
                        coment: cmt,email,uid,createdAt: firebase.firestore.FieldValue.serverTimestamp()                           
                    })
                    setCmt("");
                    scrol.current.scrollIntoView({behavior: "smooth"});
        }
    }

    return (
        <div>
            <form onSubmit={SentC}>
                <div class="cts">
                    <textarea class="ctxtarea" value= {cmt} onChange={(e)=> setCmt(e.target.value)} placeholder="Comment..."/><center>  <button class="csubmitbtn" type="submit">Send</button> </center>
                </div>
            </form>
        </div>
    )
}
