import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamationTriangle, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import styles from '../../assets/styles/Alert.module.scss';

const ToxicityAlert = ({ accuracy, label }) => {
    const roundedAccuracy = (accuracy * 100).toFixed(2);
  
    const renderAlert = () => {
      if (accuracy >= 0.80 && label === 'not_toxic') {
        return (
          <div className={styles.safeAlert}>
            <FontAwesomeIcon icon={faCheck} className={styles.icon} />
            <span>Message is safe ({roundedAccuracy}% confident)</span>
          </div>
        );
      }
  
      if (label === 'toxic') {
        if (accuracy >= 0.70) {
          return (
            <div className={styles.dangerAlert}>
              <FontAwesomeIcon icon={faExclamationTriangle} className={styles.icon} />
              <span>High toxicity detected ({roundedAccuracy}% confident)</span>
            </div>
          );
        }
  
        return (
          <div className={styles.warningAlert}>
            <FontAwesomeIcon icon={faShieldAlt} className={styles.icon} />
            <span>Message might contain toxic traits ({roundedAccuracy}% confident)</span>
          </div>
        );
      }
  
      return null;
    };
  
    return renderAlert();
  };
  
  export default ToxicityAlert;