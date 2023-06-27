import styles from './Modal.module.css';

const ModalOverlay = ({ onClose }) => {
  return (
    <div className={styles.overlay} onClick={(e) => {
      e.stopPropagation();
      onClose();
    }}>
    </div>
  )
}

export default ModalOverlay;