import React from 'react';
import { motion } from 'framer-motion';
import styles from './SkillBar.module.css';

interface SkillBarProps {
  name: string;
  proficiency: number;
  color?: string;
  certified?: boolean;
}

export const SkillBar: React.FC<SkillBarProps> = ({ 
  name, 
  proficiency, 
  color = '#3b82f6',
  certified = false 
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.labelGroup}>
        <span className={styles.name}>{name}</span>
        <div className={styles.badges}>
          {certified && <span className={styles.certifiedBadge} title="Certified">🏆</span>}
          <span className={styles.percent}>{proficiency}%</span>
        </div>
      </div>
      <div className={styles.track}>
        <motion.div 
          className={styles.fill}
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${proficiency}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};
