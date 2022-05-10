import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../firebase/firebase";
import styles from "../styles/Register.module.css";


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading ] = useAuthState(auth);
  const navigate = useNavigate();

  const register = e => {
    e.preventDefault();
    if (!name) alert("Please enter your name.");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/", { replace: true });
  }, [user, loading]);

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerContainer}>
        <h1 className={styles.logo}>Firegram</h1>
        <p>Register your account</p>
        <form className={styles.registerForm} onSubmit={register}>
          <input type="text" className={styles.userInput} value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
          <input type="text" className={styles.userInput} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail Address" />
          <input type="password" className={styles.userInput} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button className={styles.registerBtn} type="submit">Register</button>
        </form>
        <p className={styles.loginLink}>Already have an account? <Link to="/login">Login</Link> now.</p>
      </div>
    </div>
  );
}

export default Register;