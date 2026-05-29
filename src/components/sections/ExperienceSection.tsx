import React from 'react';
import SectionPage from '../SectionPage';
import { portfolioData } from '../../data/portfolioData';
import { Card } from '../Card';
import { Timeline, TimelineItem } from '../Timeline';
import styles from './Section.module.css';

interface Props { onBack: () => void; }

export const ExperienceSection: React.FC<Props> = ({ onBack }) => {
  return (
    <SectionPage title="Experience" level="1-1" onBack={onBack}>
      <Timeline>
        {portfolioData.experience.map(exp => (
          <TimelineItem key={exp.id} color={exp.color}>
            <Card 
              title={exp.company}
              subtitle={`${exp.role} | ${exp.period}`}
              accentColor={exp.color}
              shortDescription={exp.description}
              icon="💼"
            >
              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: '#e2e8f0' }}>Overview:</strong>
                <p style={{ marginTop: '0.5rem' }}>{exp.expandedDetails.overview}</p>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: '#e2e8f0' }}>Key Responsibilities:</strong>
                <ul className={styles.list}>
                  {exp.expandedDetails.responsibilities.map((r, i) => <li key={i} className={styles.listItem}>{r}</li>)}
                </ul>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: '#e2e8f0' }}>Achievements:</strong>
                <ul className={styles.list}>
                  {exp.expandedDetails.achievements.map((a, i) => <li key={i} className={styles.listItem}>{a}</li>)}
                </ul>
              </div>

              {exp.expandedDetails.metrics && (
                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '4px' }}>
                  {Object.entries(exp.expandedDetails.metrics).map(([k, v]) => (
                    <div key={k}>
                      <div style={{ fontSize: '0.8rem', color: exp.color, textTransform: 'uppercase', marginBottom: '4px' }}>{k.replace('_', ' ')}</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>{v}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className={styles.tagContainer}>
                {exp.tech.map(t => <span key={t} className={styles.tag}>{t}</span>)}
              </div>
            </Card>
          </TimelineItem>
        ))}
      </Timeline>
    </SectionPage>
  );
};
export default ExperienceSection;
