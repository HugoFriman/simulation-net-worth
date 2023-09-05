import React from 'react';
import styles from '../Calculator.module.css';

function MoreInformation({ openModal }) {
  const moreInformationData = require('../../data/moreInformationData.json'); // Import your JSON data

  return (
    <div className={styles.containerMoreInformation}>
      {/* More Information Section */}
      <div className={styles.containerMoreInformationPart}>
        <div className={styles.text}>
          <div className={styles.dividerMoreInformation}></div>
          <h2 className={styles.h2StyleBlue}>More information</h2>
        </div>
      </div>

      {/* Information Sections */}
      <div className={styles.containerMoreInformationPart}>
        {moreInformationData.sections.map((section, index) => (
          <div key={index} className={styles.textMoreInformation}>
            <h2 className={styles.h2Style}>{section.title}</h2>
            <p>{section.text}</p>
            {section.modalId && (
              <label className={styles.popupText} onClick={() => openModal(section.modalId)}>
                <b>Read more →</b>
              </label>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoreInformation;

