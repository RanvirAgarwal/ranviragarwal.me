import React from 'react';
import { motion } from 'framer-motion';
import SceneBackground from './SceneBackground';
import styles from './SectionPage.module.css';

interface SectionPageProps {
  title: string;
  level: string;
  children: React.ReactNode;
  onBack: () => void;
}

export const SectionPage: React.FC<SectionPageProps> = ({ title, level, children, onBack }) => {
  return (
    <SceneBackground showBushes={false}>
      <motion.div 
        className={styles.pageContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <header className={styles.header}>
          <div className={styles.breadcrumb}>LEVEL {level}</div>
          <h1 className={styles.title}>{title}</h1>
          <div style={{ width: 100 }}>{/* Spacer for flex alignment */}</div>
        </header>

        <main className={styles.contentArea}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {children}
          </motion.div>
        </main>

        <footer className={styles.footer}>
          <button className={styles.backBtn} onClick={onBack}>
            BACK TO FOLDERS
          </button>
        </footer>
      </motion.div>
    </SceneBackground>
  );
};

export default SectionPage;
