import { FC } from 'react';
import styles from './Modal.module.css';

const ModalOverlay: FC<{onClose: () => void}> = ({ onClose }) => {
  return (
    <div className={styles.overlay} onClick={(e) => {
      e.stopPropagation();
      onClose();
    }}>
    </div>
  )
}

export default ModalOverlay;