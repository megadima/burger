import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import ReactDOM from 'react-dom';
import ModalOverlay from './ModalOverlay';
import styles from './Modal.module.css';
import PropTypes from "prop-types";

const modalNode = document.getElementById("modals");

const Modal = ({ children, header, onClose }) => {

  const closeOnEsc = (e) => {
    if (e.keyCode === 27) {
      onClose();
    }
  }

  function removeCloseOnEsc() {
    document.removeEventListener('keydown', closeOnEsc);
  }

  useEffect(() => {
    document.addEventListener('keydown', closeOnEsc);

    return (() => {
      removeCloseOnEsc();
    })
  }, []);

  return ReactDOM.createPortal(
    (
      <div className={styles.wrapper}>
        <div className={styles.modal}>
          <button className={styles.close_button} onClick={
            (e) => {
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
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  header: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Modal;