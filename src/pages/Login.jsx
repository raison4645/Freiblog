import { auth, provider } from "../firebase-config"
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom";
import '../styles/Login.css'

export default function Login({setIsAuth}) {

  let navigate = useNavigate();

  const signInWithGoogle = async () => {
    // const result = await signInWithPopup(auth, provider).then((result) => {
    //   localStorage.setItem("isAuth", true);
    //   setIsAuth(true);
    //   navigate("/");
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
      //use React Router's navigate function can redirect to your desided pages
    });
  }

  return (
    <div className="login-page">
      <div className="loginCard">
        <p style={{fontSize: "24px"}} className="loginSign">Login to FREIBLOG</p>
        <button className="login-with-google-btn" onClick={signInWithGoogle}>
            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
            <p>Login with Google</p>
        </button>
      </div>
      <div className="login-image-wrapper">
        <img className="login-image" src="../../assets/logincard.jpeg" />

      </div>
    </div>
  )
}