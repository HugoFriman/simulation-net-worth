import React from 'react';
import styles from '../Calculator.module.css'; // Import your main CSS file

function Title() {
  return (
      <div className={styles.containerTitle}>
        <div className={styles.text}>
          <h1 className={styles.h1Style}>Find out your ability to bear losses</h1>
          <h1 className={styles.h1StyleBlue}>With just a few clicks</h1>
        </div>
      </div>
    );
  }

export default Title;
