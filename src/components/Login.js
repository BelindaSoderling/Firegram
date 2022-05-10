import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from '../firebase/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import styles from '../styles/Login.module.css';


const Login = () => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ user, loading ] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/profile");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  const onFormSubmit = e => {
    e.preventDefault();
    logInWithEmailAndPassword(email, password);
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <h1 className={styles.logo}>Firegram</h1>
        <p>Log in to your account</p>
        <form className={styles.loginForm} onSubmit={onFormSubmit}>
          <input type="text" className={styles.userInput} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail Address" />
          <input type="password" className={styles.userInput} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button type="submit" className={styles.loginBtn}>Login</button>
        </form>
        <p className={styles.registerLink}>Don't have an account? <Link to="/register">Register</Link> now.</p>
      </div>
    </div>
  );
}

export default Login;