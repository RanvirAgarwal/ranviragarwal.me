import React from 'react';
import SectionPage from '../SectionPage';
import { portfolioData } from '../../data/portfolioData';
import { SkillBar } from '../SkillBar';
import { motion } from 'framer-motion';
import styles from './Section.module.css';

interface Props { onBack: () => void; }

export const SkillsSection: React.FC<Props> = ({ onBack }) => {
  return (
    <SectionPage title="Skills" level="1-3" onBack={onBack}>
      <div className={styles.grid}>
        {portfolioData.skills.categories.map((category, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, type: 'spring', stiffness: 100 }}
            whileHover={{ scale: 1.02 }}
            style={{ background: 'rgba(0, 26, 51, 0.9)', padding: '1.5rem', borderRadius: '8px', border: '2px solid #1a365d' }}
          >
            <h3 style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '1rem', marginBottom: '1.5rem', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>{category.icon}</span> {category.name}
            </h3>
            <div>
              {category.skills.map(skill => (
                <SkillBar 
                  key={skill.name} 
                  name={skill.name} 
                  proficiency={skill.proficiency} 
                  certified={'certified' in skill ? skill.certified : false}
                  color={skill.proficiency > 85 ? '#22c55e' : (skill.proficiency > 75 ? '#3b82f6' : '#f59e0b')}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionPage>
  );
};
export default SkillsSection;
