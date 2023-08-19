import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useEffect } from "react";
import ReactDOM from 'react-dom';
import ModalOverlay from './ModalOverlay';
import styles from './Modal.module.css';

const modalNode = document.getElementById("modals");

type TModalProps = {
  header?: string;
  onClose: () => void;
  children: React.ReactNode
}

const Modal: FC<TModalProps> = ({ children, header, onClose }) => {

  const closeOnEsc = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      onClose();
    }
  }

  function removeCloseOnEsc(): void {
    document.removeEventListener('keydown', closeOnEsc);
  }

  useEffect(() => {
    document.addEventListener('keydown', closeOnEsc);

    return (() => {
      removeCloseOnEsc();
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (modalNode)
   return ReactDOM.createPortal(
    (
      <div className={styles.wrapper}>
        <div className={styles.modal}>
          <button className={styles.close_button} onClick={
            e => {
              e.stopPropagation();
              onClose();
            }
          }>
            <CloseIcon type="primary" />
          </button>
          {header &&
            <h2 className={`${styles.header} text text_type_main-medium`}>
              {header}
            </h2>
          }
          {children}
        </div>
        <ModalOverlay onClose={onClose} />
      </div>
    ), modalNode)
  else return null
};

export default Modal;