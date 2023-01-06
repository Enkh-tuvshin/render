import style from "../styles/Login.module.css";
import Button from "react-bootstrap/Button";
import { AiFillFacebook, AiFillApple } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
// import { useAuth } from "../contexts/AuthContext";
import { auth } from "../config/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

export const Login = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  // const { login } = useAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(uid);
        navigate("/");
      } else {
        // User is signed out
        // ...
        navigate("/login");
      }
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const password = formData.get("password");

    signInWithEmailAndPassword(auth, name, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.errorMessage;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className={style.main}>
      <div class={style.box}>
        <form
          onSubmit={(e) => {
            onSubmit(e);
          }}
          autocomplete={style.off}
        >
          <h2>Log in</h2>
          <div class={style.inputBox}>
            <input
              fullWidth
              name="name"
              label="Name"
              type="text"
              required="required"
            />
            <span>Email</span>
            <i></i>
          </div>
          <div class={style.inputBox}>
            <input
              fullWidth
              name="password"
              label="Password"
              type="password"
              required="required"
            />
            <span>Password</span>
            <i></i>
          </div>
          <div class={style.links}>
            <a>Forgot Password ?</a>
            <a>Log up</a>
          </div>
          <Button type="submit" style={{ width: "100px" }}>Log in</Button>
        </form>
      </div>
      <Button
        onClick={() => {
          //
        }}
        style={{
          backgroundColor: "rgb(24, 119, 242)",
          color: "#fff",
          border: "1px solid black",
          borderRadius: "30px",
          cursor: "pointer",
        }}
      >
        <AiFillFacebook />
        Continue With Facebook
      </Button>
      <Button
        style={{
          backgroundColor: "rgb(0,0,0, 0.9)",
          color: "#fff",
          border: "1px solid black",
          borderRadius: "30px",
          cursor: "pointer",
        }}
      >
        <AiFillApple />
        Continue With Apple
      </Button>
      <Button
        onClick={() => {
          signInWithPopup(auth, provider)
            .then((result) => {
              // This gives you a Google Access Token. You can use it to access the Google API.
              const credential =
                GoogleAuthProvider.credentialFromResult(result);
              const token = credential.accessToken;
              // The signed-in user info.
              const user = result.user;
              // ...
              navigate("/");
            })
            .catch((error) => {
              // Handle Errors here.
              const errorCode = error.code;
              const errorMessage = error.message;
              // The email of the user's account used.
              const email = error.customData.email;
              // The AuthCredential type that was used.
              const credential = GoogleAuthProvider.credentialFromError(error);
              // ...
            });
        }}
        style={{
          color: "#808080",
          border: "1px solid black",
          borderRadius: "30px",
          cursor: "pointer",
        }}
      >
        <FcGoogle />
        Contiune With Google
      </Button>
    </div>
  );
};

export default Login;
