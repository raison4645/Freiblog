import { useState, useEffect } from "react";
import { addDoc, collection } from 'firebase/firestore'
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";

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
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create Post</h1>
        <div className="inputGp">
          <input className="titleArea" placeholder="Title..." onChange={(event) => {setTitle(event.target.value)}} />
        </div>
        <div className="inputGp">
          <textarea className="postArea" placeholder="Post..." onChange={(event) => {setPostText(event.target.value)}}/>
        </div>
        <button className="submitPost" onClick={createPost}>Submit Post</button>
      </div>
    </div>
  )
};