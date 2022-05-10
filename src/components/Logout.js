import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Logout.module.css";


const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000)
  }, []);

  return (
    <div className={styles.logoutPage}>
      <div className={styles.logoutContainer}>
        <h2>Logout</h2>
        <div className={styles.textArea}>
          <p>You have been successfully logged out.</p>
        </div>
      </div>
    </div>
  )
};

export default Logout;