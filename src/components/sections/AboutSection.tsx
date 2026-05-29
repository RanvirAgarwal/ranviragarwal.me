import React from 'react';
import SectionPage from '../SectionPage';
import { portfolioData } from '../../data/portfolioData';
import styles from './Section.module.css';

interface Props {
  onBack: () => void;
}

export const AboutSection: React.FC<Props> = ({ onBack }) => {
  return (
    <SectionPage title="About" level="1-4" onBack={onBack}>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Ranvir Agarwal</h2>
        <div className={styles.cardBody}>
          <p>{portfolioData.about.bio}</p>
        </div>
      </div>
      
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Main Quests (Goals)</h2>
        <div className={styles.cardBody}>
          <ul className={styles.list}>
            {portfolioData.about.goals.map((goal, idx) => (
              <li key={idx} className={styles.listItem}>{goal}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Fun Facts / Easter Eggs</h2>
        <div className={styles.cardBody}>
          <ul className={styles.list}>
            {portfolioData.about.fun.map((funFact, idx) => (
              <li key={idx} className={styles.listItem}>{funFact}</li>
            ))}
          </ul>
        </div>
      </div>
    </SectionPage>
  );
};

export default AboutSection;
