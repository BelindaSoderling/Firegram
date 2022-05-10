import { logout } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import styles from "../styles/LogoutButton.module.css";


const LogoutButton = () => {
  const navigate = useNavigate();

  const signOut = () => {
    logout();
    navigate("/logout", { replace: true });
  };

  return (
    <button className={styles.logoutButton} onClick={signOut}>Logout</button>
  )
};

export default LogoutButton;