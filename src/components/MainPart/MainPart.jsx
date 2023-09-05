import React from 'react';
import styles from '../Calculator.module.css';
import Calculator from '../Calculator/Calculator';
import mainPartData from '../../data/mainPartData.json';

function MainPart( {openModal} ) {
  return (
    <div className={styles.containerMainPart}>
      <div className={styles.text}>
        {mainPartData.content.map((item, index) => (
          <React.Fragment key={index}>
            {item.header ? (
              <h2 className={styles.h2Style}>{item.text}</h2>
            ) : (
              <p>
                {item.italic ? <i>{item.text}</i> : item.text}
              </p>
            )}
          </React.Fragment>
        ))}
      </div>
      <Calculator 
        openModal={openModal}
      />
    </div>
  );
}

export default MainPart;
