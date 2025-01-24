import React, { useState, useRef } from 'react';
import { Headphones, FileText, FileAudio, Send } from 'lucide-react';
import styles from '../../assets/styles/Message.module.scss';
import ToxicityAlert from './Alert';

const FileInputPlayer = () => {
  const [text, setText] = useState('');
  const [audioSrc, setAudioSrc] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [files, setFiles] = useState(null);
  const [accuracy, setAccuracy] = useState(0)
  const [label, setLabel] = useState('')
  const [visible, setVisible] = useState(false)
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
      setFiles(file)
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

  const handleSubmit = async() => {
    //send text for verification
    if (text) {
      await fetch("https://toxicityrecognition.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setLabel(data.label);
          setAccuracy(data.accuracy);
          setVisible(true);
          setText('')
        })
        .catch((error) => console.error("Error:", error));
    }
    if (files) {
      //audi file verification
      console.log("File uploaded:", files.name);

        const formData = new FormData();

        //add file to form
        formData.append("file",files)
        try {
          const response = await fetch(
            "https://toxicityrecognition.onrender.com/audio_predict",
            {
              method: "POST",
              body: formData,
            }
          );

          const data = await response.json();
          console.log(data);

          if (response.ok) {
            setLabel(data.label);
            setAccuracy(data.accuracy);
            setVisible(true);
            setAudioSrc('')
            setIsPlaying(isPlaying)
          } else {
            // Handle errors from the backend
            console.error("Upload failed:", data.error);
            alert(`Error: ${data.error}`);
          }
        } catch (error) {
          console.error("Error uploading file:", error);
          console.error("Error uploading file:", error.message);
          alert("Failed to connect to the server. Please try again later.");
        }

  
    }
  }
  

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

          {(text || audioSrc) && (
            <button
              onClick={handleSubmit}
              className={`${styles.button} ${styles.submitButton}`}
            >
              <Send size={20} />
              <span>Submit</span>
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
      {visible &&
       <ToxicityAlert accuracy={accuracy} label={label}/>
      }
    </div>
  );
};

export default FileInputPlayer;