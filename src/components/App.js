import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import Home from "./Home";
import Logout from "./Logout";
import Layout from "./Layout";
import Users from "./Users";
import User from "./User";
import styles from '../styles/App.module.css';


const App = () => {
  return (
    <div className={styles.app}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} /> {/* Home page, shows recent pictures */}
          <Route exact path="/profile" element={<Profile />} /> {/* User page */}
          <Route exact path="/users/:id" element={<User />} /> {/* Other users page */}
          <Route exact path="/users" element={<Users />} /> {/* All users page */}
        </Route>
        <Route exact path="/login" element={<Login />} /> {/* Login page */}
        <Route exact path="/logout" element={<Logout />} /> {/* Logout page */}
        <Route exact path="/register" element={<Register />} /> {/* Register page */}
      </Routes>
    </div>
  )
}

export default App;