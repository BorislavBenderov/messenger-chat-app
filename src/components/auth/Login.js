import {
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
} from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useState } from "react";

export const Login = () => {
  const [err, setErr] = useState("");
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onLogin = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    if (email === "" || password === "") {
      setErr("Please fill all the fields!");
      return;
    }

    setLoading(true);
    setPersistence(auth, browserSessionPersistence).then(() => {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/chat");
          setLoading(false);
        })
        .catch((err) => {
          setErr(err.message);
          setLoading(false);
        });
    });
  };

  return (
    <form className="auth" onSubmit={onLogin}>
      <h3>Chat App</h3>
      <label htmlFor="email">Username</label>
      <input type="text" placeholder="Email" id="email" name="email" />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        placeholder="Password"
        id="password"
        name="password"
      />
      <div className="log-reg">
        <p>No account?</p>
        <Link className="link" to="/register">
          Create one
        </Link>
      </div>
      <button type="submit">{loading ? "Loading..." : "Log In"}</button>
      <p className="errors">{err}</p>
    </form>
  );
};
