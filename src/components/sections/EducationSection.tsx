import React from 'react';
import SectionPage from '../SectionPage';
import { portfolioData } from '../../data/portfolioData';
import { Card } from '../Card';
import { Timeline, TimelineItem } from '../Timeline';
import styles from './Section.module.css';

interface Props { onBack: () => void; }

export const EducationSection: React.FC<Props> = ({ onBack }) => {
  return (
    <SectionPage title="Education" level="1-5" onBack={onBack}>
      <Timeline>
        {portfolioData.education.map(edu => (
          <TimelineItem key={edu.id} color={edu.color}>
            <Card 
              title={edu.school}
              subtitle={`${edu.degree} | ${edu.expectedGraduation || edu.graduation}`}
              accentColor={edu.color}
              shortDescription={edu.location}
              icon="🎓"
              defaultExpanded={true}
            >
              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: '#e2e8f0' }}>Relevant Coursework:</strong>
                <div className={styles.tagContainer}>
                  {edu.relevantCoursework.map(c => <span key={c} className={styles.tag} style={{ borderColor: edu.color, color: edu.color }}>{c}</span>)}
                </div>
              </div>

              {edu.testScores && (
                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '4px' }}>
                  {Object.entries(edu.testScores).map(([k, v]) => (
                    <div key={k}>
                      <div style={{ fontSize: '0.8rem', color: edu.color, textTransform: 'uppercase', marginBottom: '4px' }}>{k.replace(/([A-Z])/g, ' $1').trim()}</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>{v as React.ReactNode}</div>
                    </div>
                  ))}
                </div>
              )}

              {edu.honors && (
                <div style={{ marginBottom: '1rem' }}>
                  <strong style={{ color: '#e2e8f0' }}>Honors:</strong>
                  <ul className={styles.list}>
                    {edu.honors.map((h, i) => <li key={i} className={styles.listItem}>{h}</li>)}
                  </ul>
                </div>
              )}
            </Card>
          </TimelineItem>
        ))}
      </Timeline>
    </SectionPage>
  );
};
export default EducationSection;
