import React, { useState, useContext } from "react";
import Style from "./signUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import LayOut from "../../components/layOut/LayOut";
import { auth } from "../../Utility/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { DataContext } from "../../components/dataProvider/DataProvider.jsx";
import { type } from "../../Utility/actionType.js";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [, dispatch] = useContext(DataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const userInfo = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      dispatch({
        type: type.SET_USER,
        user: userInfo.user,
      });

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
          <h1>Create Account</h1>

          <form onSubmit={handleSubmit}>
            {error && <p className={Style.error_message}>{error}</p>}

            <div className={Style.input_group}>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className={Style.input_group}>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
              />
            </div>

            <div className={Style.input_group}>
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>

            <button
              type="submit"
              className={Style.login_button}
              disabled={loading}
            >
              {loading ? (
                <FadeLoader color="#fff" height={8} width={3} size={15} />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className={Style.signup_text}>
            Already have an account?
            <Link to="/Auth" className={Style.signup_link}>
              Sign In
            </Link>
          </p>
        </div>
      </section>
    </LayOut>
  );
}

export default SignUp;
