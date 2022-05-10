import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getUserName } from "../firebase/firebase";
import { useEffect, useState } from "react";
import styles from "../styles/Layout.module.css";


const Layout = () => {
  const [ user, loading ] = useAuthState(auth);
  const [ name, setName ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
    if (user) getUserName(user?.uid, setName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return (
    <div className={styles.pageContainer}>
      {user && // Show when user is logged in
      <div className={styles.contentContainer}>
        <Header name={name}/>
        <Navbar />
        <Outlet />
      </div>
      }
    </div>
  )  
};

export default Layout;