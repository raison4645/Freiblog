import "./App.css";
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
      window.location.pathname = "/login";
    });
  };

  return (
    <Router>
      <nav>
        <Link to="/">HOME</Link>
        {!isAuth ? (<Link to="/login">LOGIN</Link>) :
         (<>
            <Link to="/createpost">CREATE POST</Link>
            <Link onClick={signUserOut}>LOGOUT</Link>
          </>)
         }
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth}/>} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth}/>} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth}/>} />
      </Routes>
      <footer>
        <p className="footerDeclaration">
          Created by Raison. All rights reserved
        </p> 
      </footer>
    </Router>
  )
}
