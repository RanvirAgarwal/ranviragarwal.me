import React from 'react';
import { motion } from 'framer-motion';
import styles from './Timeline.module.css';

interface TimelineProps {
  children: React.ReactNode;
}

export const Timeline: React.FC<TimelineProps> = ({ children }) => {
  return (
    <div className={styles.timeline}>
      {children}
    </div>
  );
};

export const TimelineItem: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = '#3b82f6' }) => {
  return (
    <motion.div 
      className={styles.timelineItem} 
      style={{ '--timeline-color': color } as React.CSSProperties}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
    >
      <motion.div 
        className={styles.timelineDot}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
      />
      <div className={styles.timelineContent}>
        {children}
      </div>
    </motion.div>
  );
};
