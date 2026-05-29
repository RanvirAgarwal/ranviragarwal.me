import React, { createContext, useContext, useState, useEffect } from 'react';
import { soundManager } from '../utils/soundManager';

interface SoundContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playClick: () => void;
  playHover: () => void;
}

const SoundContext = createContext<SoundContextType>({
  soundEnabled: true,
  toggleSound: () => {},
  playClick: () => {},
  playHover: () => {},
});

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(soundManager.settings.soundEnabled);

  const toggleSound = () => {
    const isMuted = soundManager.toggleMute();
    setSoundEnabled(!isMuted);
  };

  const playClick = () => soundManager.playClick();
  const playHover = () => soundManager.playHover();

  // Initialize AudioContext on first user interaction to bypass autoplay restrictions
  useEffect(() => {
    const initAudio = () => {
      soundManager.init();
      window.removeEventListener('click', initAudio);
      window.removeEventListener('keydown', initAudio);
    };
    window.addEventListener('click', initAudio);
    window.addEventListener('keydown', initAudio);
    return () => {
      window.removeEventListener('click', initAudio);
      window.removeEventListener('keydown', initAudio);
    };
  }, []);

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound, playClick, playHover }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
