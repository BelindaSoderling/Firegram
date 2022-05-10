import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, getUsers } from '../firebase/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "../styles/Users.module.css";


const Users = () => {
  const [user, loading] = useAuthState(auth);
  const [ users, setUsers] = useState([]);

  useEffect(() => {
    getUsers(setUsers);
  }, [user, loading]);

  return (
    <div className={styles.usersPage}>
      <p>Browse through our users</p>
      <ul className={styles.usersList}>
        {users.map(user => <li className={styles.userItems} key={user.uid}><Link to={"/users/" + user.uid}>{user.name}</Link></li>)}
      </ul>
    </div>
  )
};

export default Users;