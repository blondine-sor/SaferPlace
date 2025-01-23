import React, { useState } from 'react';
import { X } from 'lucide-react';
import styles from '../../assets/styles/Tutorial.module.scss';

// guide de l'utilisateur
const TutorialGuide = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      target: '#header',
      title: 'Welcome!',
      content: 'This is a quick tour of our application. Click Next to continue.',
      position: 'bottom'
    },
    {
      target: '#sidebar',
      title: 'Navigation',
      content: 'Use the sidebar to access different sections of the app.',
      position: 'right'
    },
    {
      target: '#main-content',
      title: 'Main Content',
      content: 'This is where your content will appear.',
      position: 'left'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsActive(false);
      setCurrentStep(0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setIsActive(false);
    setCurrentStep(0);
  };

  if (!isActive) {
    return (
      <button
        onClick={() => setIsActive(true)}
        className={styles.startButton}
      >
        Start Tutorial
      </button>
    );
  }

  const currentTutorialStep = steps[currentStep];

  return (
    <div className={styles.container}>
      <div className={styles.overlay} />
      
      <div className={`${styles.tooltip} ${styles[`tooltip${currentTutorialStep.position.charAt(0).toUpperCase() + currentTutorialStep.position.slice(1)}`]}`}>
        <button
          onClick={handleClose}
          className={styles.closeButton}
        >
          <X size={20} />
        </button>

        <div className={styles.content}>
          <h3 className={styles.title}>{currentTutorialStep.title}</h3>
          <p className={styles.description}>{currentTutorialStep.content}</p>
        </div>

        <div className={styles.navigation}>
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`${styles.button} ${currentStep === 0 ? styles.buttonDisabled : ''}`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className={styles.button}
          >
            {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>

        <div className={styles.progress}>
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>
    </div>
  );
};

export default TutorialGuide;
