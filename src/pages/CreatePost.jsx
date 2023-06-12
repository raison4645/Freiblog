import { useState, useEffect } from "react";
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import '../styles/CreatePost.css'

export default function CreatePost({isAuth}) {
  const[title, setTitle] = useState("");
  const[postText, setPostText] = useState("");

  //submit post to store in the firebase
  const postCollectionRef =  collection(db, "posts");
  
  let navigate = useNavigate();
  
  const createPost = async () => {
    await addDoc(postCollectionRef, {
      title, 
      postText, 
      author: {name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  }

  useEffect(() => {
    if (!isAuth ) {
      navigate("/login");
    }
  }, [])

  return(
    <div className="create-post-page">
      <div className="cp-container">
        <h1 className="cp-title">Create Post</h1>
        <div className="inputGp">
          <input className="title-area" placeholder="Title" onChange={(event) => {setTitle(event.target.value)}} />
        </div>
        <div className="inputGp">
          <textarea className="post-area" placeholder="Post" onChange={(event) => {setPostText(event.target.value)}}/>
        </div>
        <button className="submit-post" onClick={createPost}>Submit Post</button>
      </div>
    </div>
  )
};