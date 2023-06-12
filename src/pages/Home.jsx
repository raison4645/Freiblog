import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore'
import { auth, db } from "../firebase-config"
import React, { useState, useEffect } from "react";
import "../styles/Home.css"


export default function Home({isAuth}) {
  const [postLists, setPostLists] = useState([]);
  const postCollectionRef =  collection(db, "posts");

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id)
    await deleteDoc(postDoc);
    window.location.reload();
  }

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      setPostLists(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };
    getPosts();
  }, []);

  return (
    <div className="home">
        <img className="header-img" src="../../assets/Home-Kant.webp" />
      {!isAuth && 
      <div className="login-reminder">
        <div className="text-bar"></div>
        <div className='reminder-text'>
          <p className="first-reminder">Publish your passions, your way</p>
          <p className="second-reminder">Create a unique and beautiful blog easily.</p>
        </div>
      </div>
      }
      <div>{postLists.map((post) => {
        return (
        
          <div className="post">
            <div className="post-header">
              <div className="title">
                <h1>{post.title}</h1>
              </div>
                <div className='delete-post'>
                  {isAuth && post.author.id === auth.currentUser.uid && (
                  <button className="delete-button"onClick={() => {deletePost(post.id)}}> 
                    {" "}
                    &#128465; 
                  </button>
                  )}
                </div>
            </div>
            <div className="post-container">{post.postText}</div>
            <h3 className="author-name">@{post.author.name}</h3>
          </div>
        )
      })}</div>
    </div>
  )
};
