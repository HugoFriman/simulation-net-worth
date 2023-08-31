import React from 'react';
import styles from './Modal.module.css'; // Import your CSS module

function Modal({ isOpen, onClose, children }) {
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`${styles.modal} ${isOpen ? styles.open : ''}`} onClick={handleBackgroundClick}>
      <div className={styles.modalContent}>
        <span className={styles.closeButton} onClick={onClose}>
          x
        </span>
        {children}
      </div>
    </div>
  );
}

export default Modal;