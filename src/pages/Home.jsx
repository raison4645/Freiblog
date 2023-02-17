import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore'
import { auth, db } from "../firebase-config"
import React, { useState, useEffect } from "react";


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
    <div>
      <div className="imageBox">
       <img className="headerImg" src="./src/assets/Home-Kant.webp" />
      </div>
      {!isAuth && <div className="loginReminder">Login to start using MyBlog</div>}
      <div>{postLists.map((post) => {
        return (
        
          <div className="post">
            <div className="postHeader">
              <div className="title">
                <h1>{post.title}</h1>
              </div>
                <div className='deletePost'>
                  {isAuth && post.author.id === auth.currentUser.uid && (
                  <button className="deleteButton"onClick={() => {deletePost(post.id)}}> 
                    {" "}
                    &#128465; 
                  </button>
                  )}
                </div>
            </div>
            <div className="postContainer">{post.postText}</div>
            <h3 className="authorName">@{post.author.name}</h3>
          </div>
        )
      })}</div>
    </div>
  )
};
