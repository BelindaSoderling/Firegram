import styles from "../styles/Modal.module.css";


const Modal = ({ image, setImage }) => {
  return (
    <div className={styles.modalBackground} onClick={() => setImage('')}>
      <div className={styles.modal}>
        <img src={image} alt="enlarged"/>
      </div>
    </div> 
  )
};

export default Modal;