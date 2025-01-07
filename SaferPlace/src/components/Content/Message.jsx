import React, { useState, useRef } from 'react';
import { Headphones, FileText, FileAudio } from 'lucide-react';
import styles from '../../assets/styles/Message.module.scss';

const FileInputPlayer = () => {
  const [text, setText] = useState('');
  const [audioSrc, setAudioSrc] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const textInputRef = useRef(null);
  const audioInputRef = useRef(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleFileUpload = (type) => (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === 'audio' && file.type.startsWith('audio/')) {
      const url = URL.createObjectURL(file);
      setAudioSrc(url);
    } else if (type === 'text' && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>
          Paste text or upload a file
        </label>
        
        <textarea
          value={text}
          onChange={handleTextChange}
          className={styles.textarea}
          placeholder="Paste your text here..."
        />

        <div className={styles.buttonGroup}>
          <input
            ref={textInputRef}
            type="file"
            accept=".txt"
            onChange={handleFileUpload('text')}
            className={styles.hiddenInput}
          />
          <input
            ref={audioInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileUpload('audio')}
            className={styles.hiddenInput}
          />
          
          <button
            onClick={() => textInputRef.current?.click()}
            className={`${styles.button} ${styles.textUpload}`}
          >
            <FileText size={20} />
            <span>Upload Text</span>
          </button>

          <button
            onClick={() => audioInputRef.current?.click()}
            className={`${styles.button} ${styles.audioUpload}`}
          >
            <FileAudio size={20} />
            <span>Upload Audio</span>
          </button>

          {audioSrc && (
            <button
              onClick={togglePlay}
              className={`${styles.button} ${styles.playButton}`}
            >
              <Headphones size={20} />
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
          )}
        </div>

        {audioSrc && (
          <audio
            ref={audioRef}
            src={audioSrc}
            onEnded={() => setIsPlaying(false)}
            className={styles.audioPlayer}
            controls
          />
        )}
      </div>
    </div>
  );
};

export default FileInputPlayer;