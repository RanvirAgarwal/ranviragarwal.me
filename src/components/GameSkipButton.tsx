import React from 'react';
import styles from './GameSkipButton.module.css';

interface GameSkipButtonProps {
  onSkip: () => void;
}

export const GameSkipButton: React.FC<GameSkipButtonProps> = ({ onSkip }) => {
  return (
    <button 
      className={styles.skipButton} 
      onClick={(e) => {
        e.stopPropagation(); // prevent bubbling to folder clicks
        onSkip();
      }}
    >
      SKIP [&#x23E9;]
    </button>
  );
};

export default GameSkipButton;
