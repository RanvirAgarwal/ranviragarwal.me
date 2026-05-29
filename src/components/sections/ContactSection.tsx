import React from 'react';
import SectionPage from '../SectionPage';
import { portfolioData } from '../../data/portfolioData';
import styles from './Section.module.css';

interface Props {
  onBack: () => void;
}

export const ContactSection: React.FC<Props> = ({ onBack }) => {
  return (
    <SectionPage title="Contact" level="1-5" onBack={onBack}>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Transmission Received?</h2>
        <div className={styles.cardBody}>
          <p>If you're looking to team up for co-op development or just want to say hi, feel free to reach out through any of these channels:</p>
          
          <ul className={styles.list} style={{ marginTop: '24px' }}>
            <li className={styles.listItem}>
              <strong>EMAIL:</strong> <a href={`mailto:${portfolioData.contact.email}`} className={styles.link}>{portfolioData.contact.email}</a>
            </li>
            <li className={styles.listItem}>
              <strong>GITHUB:</strong> <a href={portfolioData.contact.github} target="_blank" rel="noreferrer" className={styles.link}>{portfolioData.contact.github}</a>
            </li>
            <li className={styles.listItem}>
              <strong>LINKEDIN:</strong> <a href={portfolioData.contact.linkedin} target="_blank" rel="noreferrer" className={styles.link}>{portfolioData.contact.linkedin}</a>
            </li>
          </ul>
        </div>
      </div>
    </SectionPage>
  );
};

export default ContactSection;
