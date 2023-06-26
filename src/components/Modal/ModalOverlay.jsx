import styles from './Modal.module.css';

const ModalOverlay = ({children, onClose}) => {
    return (
        <div className={styles.overlay} onClick={(e) => 
            {
                e.stopPropagation();
                onClose();
            }}> 
            {children}   
        </div>
    )
}

export default ModalOverlay;