import React from 'react';
import styles from './Popup.module.css'; // Import your Popup CSS module

const Popup = ({ id, title, content, isOpen, onClose }) => {
  const handlePopupClose = () => {
    onClose(id); // Call the onClose function with the id to close the correct popup
  };

  const handleBackgroundClick = (event) => {
    if (event.target.classList.contains(styles.popupBackground)) {
      onClose(id);
    }
  };

  return (
    <div
      className={`popup ${isOpen ? styles.popupBackground : ''}`}
      id={id}
      onClick={handleBackgroundClick}
    >
      <div className={styles.popupContent}>
        <span className={styles.popupClose} onClick={handlePopupClose}>
          &#x2715;
        </span>
        <h2>{title}</h2>
        {content}
      </div>
    </div>
  );
};

export default Popup;
