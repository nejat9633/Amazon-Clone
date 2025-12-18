import React, { useContext, useState } from "react";
import style from "./Signup.module.css";
import { Link,  } from "react-router-dom";
import { auth } from "../../Utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../../Utils/action.type";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });
  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();

  const authHandler = async (e) => {
    e.preventDefault();

    if (e.target.name == "signin") {

      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false })
          navigate('/')
        })
        .catch((err) => {
          setError(err.message)
          setLoading({ ...loading, signIn: false });
        })
    } else {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate("/");

        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };

  return (
    <section className={style.card__container}>
      {/* amazon logo */}
      <Link to="/">
        <img
          src="
           https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png "
          alt="Amazon logo"
        />
      </Link>

      {/* form */}

      <div className={style.login_form}>
        <h1>Sign-in</h1>
        <form action="">
          <div className={style.login_details}>
            <label htmlFor="email">E-mail</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div className={style.login_details}>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            name="signin"
            onClick={authHandler}
            className={style.loginForm__btn}
          >
            {loading.signIn ? (<ClipLoader color="#000" size={15}/>) :("Sign In ")}
          
          
          </button>
        </form>
        <p>
          By signing-in you agree to the AMAZON CLONE conditions of use & sale.
          Please see our Privacy Notice, our Cookie Notice and our
          Interest-Based Ads Notice.
        </p>

        <button
          type="submit"
          name="signup"
          onClick={authHandler}
          className={style.card__btn}
        >
          {loading.signUp ?  (<ClipLoader size={15} color="#000"/>) : (" Create your Amazon Account")}
         
        </button>

        {error && <small style={{ color: "red" }}>{error}</small>}
      </div>
    </section>
  );
}

export default Signup;
