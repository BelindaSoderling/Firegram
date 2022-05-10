import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getImagesByUser, getUserName } from "../firebase/firebase";
import UploadForm from "./UploadForm";
import ImageGrid from "./ImageGrid";
import styles from "../styles/Profile.module.css";


const Profile = () => {
  const [ user, loading ] = useAuthState(auth);
  const [ name, setName ] = useState("");
  const [ images, setImages ] = useState(null);

  useEffect(() => {
    getUserName(user.uid, setName);
    getImagesByUser(user?.uid, setImages);
  }, [user, loading]);
  
  return (
    <div className={styles.profilePage}>
      <div className={styles.userSide}>
        <p className={styles.welcome}>Hi, {name}!</p>
        <UploadForm setImages={setImages}/>
      </div>
      <div className={styles.gallerySide}>
        {images && <ImageGrid images={images} />}
      </div>
    </div>
  );
}
export default Profile;