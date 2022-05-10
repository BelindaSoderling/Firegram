import { Link } from "react-router-dom";
import styles from "../styles/Header.module.css";


const Header = ({ name }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}><Link to="/">Firegram</Link></h1>
      <p className={styles.loggedInAs}>Logged in as: {name}</p>
    </header>
  )
};

export default Header;