import "./styles/App.css"
import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config"

export default function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
    });
  };
  window.addEventListener("scroll", function() {
    const navbar = document.getElementsById("navbar");
    if (window.scrollY > 0) {
      navbar.classList.add("transparent");
    } else {
      navbar.classList.remove("transparent")
    }
  })
  return (
    <Router>
      <nav id="navbar">
        <div className="nav-items">
          <Link to="/" className="logo">FREIBLOG</Link>
          <div className="nav-right-wrapper">
            {
              !isAuth ? (<Link to="/login" className="loginNav">LOGIN</Link>) :
              (<>
                <Link className="createpost-nav" to="/createpost">CREATE POST</Link>
                <Link onClick={signUserOut} className="loginNav">LOGOUT</Link>
              </>)
            }
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth}/>} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth}/>} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth}/>} />
      </Routes>
      <footer>
        <p className="footer-declaration">
          Created by Raison. All rights reserved
        </p> 
      </footer>
    </Router>
  )
}
