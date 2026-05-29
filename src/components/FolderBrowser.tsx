import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SceneBackground from './SceneBackground';
import styles from './FolderBrowser.module.css';
import MarioTransition from './MarioTransition';
import { SectionState } from '../hooks/usePortfolioNavigation';
import { useSound } from '../contexts/SoundContext';

interface FolderBrowserProps {
  onNavigate: (id: SectionState) => void;
  onTransitionComplete: () => void;
  onHome: () => void;
}

const folders: { id: SectionState; label: string }[] = [
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'education', label: 'EDUCATION' },
  { id: 'research', label: 'RESEARCH' },
  { id: 'awards', label: 'AWARDS' },
  { id: 'about', label: 'ABOUT' },
  { id: 'contact', label: 'CONTACT' }
];

export const FolderBrowser: React.FC<FolderBrowserProps> = ({ onNavigate, onTransitionComplete, onHome }) => {
  const [activeFolder, setActiveFolder] = useState<SectionState>(null);
  const { playClick, playHover } = useSound();

  const handleFolderClick = (id: SectionState) => {
    if (activeFolder) return; // Prevent multiple clicks
    playClick();
    setActiveFolder(id);
    onNavigate(id);
  };

  return (
    <SceneBackground>
      <div className={styles.container}>
        {!activeFolder && (
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            SELECT LEVEL
          </motion.h1>
        )}

        {!activeFolder && (
          <div className={styles.grid}>
            {folders.map((folder, index) => {
              const isActive = activeFolder === folder.id;
              
              return (
                <motion.div
                  key={folder.id}
                  className={styles.folderWrapper}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => handleFolderClick(folder.id)}
                  onMouseEnter={() => playHover()}
                >
                  <div className={styles.folderIcon}>
                    {isActive ? '📂' : '📁'}
                  </div>
                  <div className={styles.folderName}>
                    {folder.label}
                  </div>
                  
                  {/* Pipe that appears when clicked */}
                  <div className={`${styles.pipeContainer} ${isActive ? styles.active : ''}`}>
                    <div className={styles.pipeTop}></div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        )}

        {!activeFolder && (
          <button 
            className={styles.homeBtn} 
            onClick={() => { playClick(); onHome(); }}
          >
            &#x2190; HOME
          </button>
        )}

        {activeFolder && (
          <MarioTransition 
            targetFolderName={folders.find(f => f.id === activeFolder)?.label || 'UNKNOWN'}
            onComplete={onTransitionComplete} 
            onSkip={onTransitionComplete}
            onHome={onHome}
          />
        )}
      </div>
    </SceneBackground>
  );
};

export default FolderBrowser;
