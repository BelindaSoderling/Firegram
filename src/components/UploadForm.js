import React, { useState, useEffect } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage, db, auth, getImagesByUser } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import styles from "../styles/UploadForm.module.css";


const UploadForm = ({ setImages }) => {
  const [ user ] = useAuthState(auth);
  const [ file, setFile ] = useState(null);
  const [ error, setError ] = useState("");
  const [ imageURL, setImageURL ] = useState(null);
  const [ progress, setProgress ] = useState(0);

  const types = ['image/png', 'image/jpeg'];

  useEffect(() => {
    // Saving the project caused images to be saved again.
    setFile(null);
    setImageURL(null);
  }, [])

  useEffect(() => {
    addImageToStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ file ]);

  useEffect(() => {
    addImageToDb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ imageURL ]);

  const onChangeHandler = e => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image (png or jpeg)");
    }
  };

  const addImageToStorage = e => {
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
  
    uploadTask.on("state_changed",
      snapshot => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      err => alert(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(downloadURL => setImageURL(downloadURL))
      });
  };

  const addImageToDb = async () => {
    if (!imageURL) return;
    
    try {
      await addDoc(collection(db, "images"), {
        userId: user.uid,
        url: imageURL,
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      getImagesByUser(user?.uid, setImages);
    }
  };

  return (
    <form className={styles.uploadForm}>
      <label>
        <input type="file" accept="image/*" onChange={onChangeHandler} />
        <span className={styles.buttonText}>Upload Image</span>
      </label>
        {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};

export default UploadForm;