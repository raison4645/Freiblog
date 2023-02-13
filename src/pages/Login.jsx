import { auth, provider } from "../firebase-config"
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom";

export default function Login({setIsAuth}) {

  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
      //use React Router's navigate function can redirect to your desided pages
    });
  }

  return (
    <div className="loginPage">
      <div className="loginCard">
        <p style={{fontSize: "24px"}} className="loginSign">Login to MyBlog</p>
        <button className="login-with-google-btn" onClick={signInWithGoogle}>
          <div className="iconWrapper">
          </div>
          <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
          Login with Google
        </button>
      </div>
    </div>
  )
}