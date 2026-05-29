import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Card.module.css';
import { useSound } from '../contexts/SoundContext';

interface CardProps {
  title: string;
  subtitle?: string;
  shortDescription: string | React.ReactNode;
  accentColor?: string;
  defaultExpanded?: boolean;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  delay?: number;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  shortDescription,
  accentColor = '#3b82f6',
  defaultExpanded = false,
  children,
  icon,
  delay = 0
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const { playClick, playHover } = useSound();

  const handleToggle = () => {
    playClick();
    setExpanded(!expanded);
  };

  return (
    <motion.div 
      className={`${styles.card} ${expanded ? styles.expanded : ''}`}
      style={{ '--accent-color': accentColor } as React.CSSProperties}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ scale: 1.01 }}
      onMouseEnter={playHover}
    >
      <div className={styles.header} onClick={handleToggle}>
        <div className={styles.headerContent}>
          {icon && <div className={styles.icon}>{icon}</div>}
          <div>
            <h3 className={styles.title} style={{ color: accentColor }}>{title}</h3>
            {subtitle && <h4 className={styles.subtitle}>{subtitle}</h4>}
          </div>
        </div>
        {children && (
          <div className={styles.expandIcon} style={{ color: accentColor }}>
            {expanded ? '▼' : '▶'}
          </div>
        )}
      </div>
      
      <div className={styles.shortDescription} onClick={children ? handleToggle : undefined}>
        {shortDescription}
      </div>

      <AnimatePresence>
        {expanded && children && (
          <motion.div
            className={styles.expandedContent}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.expandedContentInner}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
