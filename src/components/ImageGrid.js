import React, { useState } from 'react';
import Modal from './Modal';
import styles from "../styles/ImageGrid.module.css";


const ImageGrid = (props) => {
  const docs = props.images;
  const [ selectedImage, setSelectedImage ] = useState('');
  
  return (
    <div className={styles.imageGrid}>
      {docs && docs.map(doc => <div key={doc.url} className={styles.imageGridItem}><img src={doc.url} alt="Upload from user" onClick={() => setSelectedImage(doc.url)}/></div>)}
      {selectedImage &&  <Modal image={selectedImage} setImage={setSelectedImage} onClick/>}
    </div>
  );
};

export default ImageGrid;