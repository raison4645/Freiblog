import { auth, provider } from "../firebase-config"
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom";
import '../styles/Login.css'

export default function Login({setIsAuth}) {

  let navigate = useNavigate();

  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
      //use React Router's navigate function can redirect to your decided pages
    });
  }

  const authType = [
    {
      name: "Google",
      method: signInWithGoogle,
      icon: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
    },
    {
      name: "Github",
      method: signInWithGoogle,
      icon: "../../assets/icons/github.svg",
    },
    {
      name: "Bitbucket",
      method: signInWithGoogle,
      icon: "../../assets/icons/bitbucket.svg",
    },

  ]

  return (
    <div className="login-page">
      <div className="login-card">
        <p style={{fontSize: "24px"}} className="loginSign">Login to FREIBLOG</p>
        <form action="submit" className="login-form">
          <label className="login-label">Username</label>
          <input type="text" className="login-field" />
          <label className="login-label">Password</label>
          <input type="password" className="login-field" />
          <div className="signup-login">
            <button className="signup-login-btn">Sign Up</button>
            <button className="signup-login-btn">Login</button>
          </div>
        </form>
        {authType.map(item => 
          <button className="oauth-btn" onClick={item.method}>
              <img className="oauth-icon" src={item.icon} />
              <p>Login with {item.name}</p>
          </button>
        )}
      </div>
      <div className="login-image-wrapper">
        <img className="login-image" src="../../assets/logincard.webp" />
      </div>
    </div>
  )
}