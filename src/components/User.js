import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getImagesByUser, getUserName } from '../firebase/firebase';
import ImageGrid from "./ImageGrid";
import styles from "../styles/Profile.module.css";


const User = () => {
  let { id } = useParams();
  const [ images, setImages ] = useState(null);
  const [ name, setName ] = useState(null);

  useEffect(() => {
    getUserName(id, setName);
    getImagesByUser(id, setImages);
  }, [ id ]);

  return (
    <div className={styles.profilePage}>
      <div className={styles.userSide}>
        <h2>{name}</h2>
      </div>
      <div className={styles.gallerySide}>
        {images && <ImageGrid images={images}/>}
      </div>
    </div>
  );
};

export default User;