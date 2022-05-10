import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import styles from "../styles/Navbar.module.css";


const Navbar = () => {
  return (
    <nav className={styles.navBar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}><Link to="/">Home</Link></li>
        <li className={styles.navItem}><Link to="/profile">Profile</Link></li>
        <li className={styles.navItem}><Link to="/users">Users</Link></li>
      </ul>
      <LogoutButton />
    </nav>
  )
};

export default Navbar;