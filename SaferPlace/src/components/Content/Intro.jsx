import React,{useState,useEffect, useCallback} from "react";
import { messages } from "../../data/messages";
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import styles from "../../assets/styles/Introduction.module.scss";


function Introduction(){
   //shows an array of messages to convince the users
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const [direction, setDirection] = useState('next'); // 'next' or 'prev' for animation
  
    const goToNext = useCallback(() => {
      setIsVisible(false);
      setDirection('next');
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === messages.length - 1 ? 0 : prevIndex + 1
        );
        setIsVisible(true);
      }, 500);
    }, []);
  
    const goToPrevious = useCallback(() => {
      setIsVisible(false);
      setDirection('prev');
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === 0 ? messages.length - 1 : prevIndex - 1
        );
        setIsVisible(true);
      }, 500);
    }, []);
  
    const togglePlayPause = () => {
      setIsPlaying(!isPlaying);
    };
  
    useEffect(() => {
      let interval;
      if (isPlaying) {
        interval = setInterval(goToNext, 10000);
      }
      return () => clearInterval(interval);
    }, [isPlaying, goToNext]);
  
    return (
      <div className={styles.cardContainer}>
        <div className={`${styles.card} ${isVisible ? styles.visible : styles.hidden} ${styles[direction]}`}>
          <h2 className={styles.title}>{messages[currentIndex].title}</h2>
          <p className={styles.content}>{messages[currentIndex].content}</p>
          
          <div className={styles.controls}>
            <button 
              className={styles.controlButton} 
              onClick={goToPrevious}
              aria-label="Previous message"
            >
              <ChevronLeft size={20} />
            </button>
  
            <button 
              className={styles.controlButton} 
              onClick={togglePlayPause}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
  
            <button 
              className={styles.controlButton} 
              onClick={goToNext}
              aria-label="Next message"
            >
              <ChevronRight size={20} />
            </button>
          </div>
  
          <div className={styles.indicators}>
            {messages.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${
                  index === currentIndex ? styles.active : ''
                }`}
                onClick={() => {
                  setDirection(index > currentIndex ? 'next' : 'prev');
                  setIsVisible(false);
                  setTimeout(() => {
                    setCurrentIndex(index);
                    setIsVisible(true);
                  }, 500);
                }}
                aria-label={`Go to message ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    );
   
}

export default Introduction