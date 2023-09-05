import React, { useState } from 'react';
import styles from './Modal.module.css'; // Import your CSS module

function Modal({ modalId, isOpen, onClose, modalData}) {
  const { title, content } = modalData[modalId];

  return (
    <div data-testid={`modal-${modalId}`} className={`${styles.modal} ${isOpen ? styles.open : ''}`}>      
      <div className={styles.modalContent}>
        <span className={styles.closeButton} onClick={onClose}>
          x
        </span>
        <h2>{title}</h2>
        {content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

export default Modal;