import React from 'react';
import SectionPage from '../SectionPage';
import { portfolioData } from '../../data/portfolioData';
import { Card } from '../Card';
import { Timeline, TimelineItem } from '../Timeline';
import styles from './Section.module.css';

interface Props { onBack: () => void; }

export const ResearchSection: React.FC<Props> = ({ onBack }) => {
  return (
    <SectionPage title="Research" level="1-6" onBack={onBack}>
      <Timeline>
        {portfolioData.research.map(res => (
          <TimelineItem key={res.id} color={res.color}>
            <Card 
              title={res.title}
              subtitle={`${res.organization} | ${res.period}`}
              accentColor={res.color}
              shortDescription={res.expandedDetails.background}
              icon="🔬"
              defaultExpanded={true}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '4px' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: res.color, textTransform: 'uppercase', marginBottom: '4px' }}>Mentor</div>
                  <div style={{ fontWeight: 'bold', color: 'white' }}>{res.mentor}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: res.color, textTransform: 'uppercase', marginBottom: '4px' }}>Type</div>
                  <div style={{ fontWeight: 'bold', color: 'white' }}>{res.type}</div>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: '#e2e8f0' }}>Focus Areas:</strong>
                <ul className={styles.list}>
                  {res.focus.map((f, i) => <li key={i} className={styles.listItem}>{f}</li>)}
                </ul>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: '#e2e8f0' }}>Objectives:</strong>
                <ul className={styles.list}>
                  {res.expandedDetails.objectives.map((o, i) => <li key={i} className={styles.listItem}>{o}</li>)}
                </ul>
              </div>
            </Card>
          </TimelineItem>
        ))}
      </Timeline>
    </SectionPage>
  );
};
export default ResearchSection;
