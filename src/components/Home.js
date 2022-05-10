import React, { useEffect, useState } from "react";
import { auth, getAllImages } from '../firebase/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import ImageGrid from "./ImageGrid";
import styles from "../styles/Home.module.css";


const Home = () => {
  const [ user ] = useAuthState(auth)
  const [ images, setImages ] = useState(null);

  useEffect(() => {
    getAllImages(setImages);
  }, [ user ]);

  return (
    <div className={styles.homePage}>
      {images && <ImageGrid images={images}/>}
    </div>
  );
};

export default Home;