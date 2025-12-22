import React, { useState, useContext } from "react";
import Style from "./signUp.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import LayOut from "../../components/layOut/LayOut";
import { auth } from "../../Utility/firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../components/dataProvider/DataProvider.jsx";
import { type } from "../../Utility/actionType.js";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({ signIn: false, signUp: false });

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();
  const msg = location.state?.msg;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const action = e.nativeEvent.submitter.name;

    try {
      if (action === "signin") {
        setLoading({ signIn: true, signUp: false });

        const userInfo = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        dispatch({
          type: type.SET_USER,
          user: userInfo.user,
        });
        navigate(location?.state?.redirect || "/");
      } else {
        setLoading({ signIn: false, signUp: true });

        const userInfo = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        dispatch({
          type: type.SET_USER,
          user: userInfo.user,
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading({ signIn: false, signUp: false });
    }
  };

  return (
    <LayOut>
      <section className={Style.login}>
        <Link to="/">
          <img
            src="/amazon-logo.png"
            alt="Amazon-logo"
            className={Style.logo}
          />
        </Link>

        <div className={Style.login_container}>
          <h1>Sign In</h1>

          <form onSubmit={handleSubmit}>
            {error ? (
              <p className={Style.error_message}>{error}</p>
            ) : (
              msg && <p className={Style.error_message}>{msg}</p>
            )}
            <div className={Style.input_group}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className={Style.input_group}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              name="signin"
              className={Style.login_button}
              disabled={loading.signIn}
            >
              {loading.signIn ? (
                <FadeLoader color="#fff" height={8} width={3} />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className={Style.signup_text}>
            By signing in you agree to the AMAZON CLONE Conditions of Use &
            Sale.
            <br />
            New to the site?
            <Link to="/signup" className={Style.signup_link}>
              Create your account
            </Link>
          </p>
        </div>
      </section>
    </LayOut>
  );
}

export default Auth;
