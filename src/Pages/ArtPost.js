import React, { useEffect, useRef} from 'react'

import firebase, {fires,auth} from "../Utils/firebase";

import NAV from "../Component/Navigation";
import SENTC from "./SentC";  
import "./Pages.css";

const stor = firebase.storage();
const db=firebase.firestore();

export default function ArtPost() {
  const [fileUrl, setFileUrl] = React.useState(null);
  const [users, setUsers] = React.useState([]);
  const email = firebase.auth().currentUser.email;
  
  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = stor.ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const tags = e.target.tags.value;
    if (!fileUrl) {
      alert("Complete the information");
      return;
    }
    await db.collection("users").doc(email).set({
      name: email,
      avatar: fileUrl,
      tag: tags,
    });
    alert("Upload Successfully");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = await db.collection("users").get();
      setUsers(
        usersCollection.docs.map((doc) => {
          return doc.data();
        })
      );
    };
    fetchUsers();
  }, []);

  const scrol = useRef();
  const [comment, setComment] = React.useState([]);

  useEffect(() => {
          fires.collection("comments").orderBy("createdAt").limit(50).onSnapshot(snapshot =>{
            setComment(snapshot.docs.map(doc => doc.data()))
        }); 
  },[])
  return (
    <>
    <NAV />
      <form onSubmit={onSubmit} class="upload">
        <input type="file" class="fls" onChange={onFileChange} /> <input type="text" class="tgs" name="tags" placeholder="Caption..." /> <button class="btns">Submit</button>
      </form>
      <div class="phtup">
      <center><ul>
          {users.map((user) => {
            return (
              <li key={user.name}>
              <p><font color="red">Submitted by: {user.name}</font></p>
               <img src={user.avatar} alt={user.name} />
               <p>{user.tag}</p>

               <div class="cmtbox">  
                    {comment.map(({id, email, coment, uid})=>(
                        <div key={id} class={`cmt ${ uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                            <p><font color="white"><em><small><u>{email}: </u></small></em></font><br></br>{coment}</p>    
                        
                            <div ref={scrol}></div>
                        </div>   
                           
                    ))}           
                </div>
                <SENTC scrol={scrol} />
              </li>
            );
          })}
        </ul></center> 
      </div>
      
    </>
  );
}
