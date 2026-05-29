import React from 'react';
import SectionPage from '../SectionPage';
import { portfolioData } from '../../data/portfolioData';
import { Card } from '../Card';
import { Timeline, TimelineItem } from '../Timeline';

interface Props { onBack: () => void; }

export const AwardsSection: React.FC<Props> = ({ onBack }) => {
  return (
    <SectionPage title="Awards" level="1-4" onBack={onBack}>
      <Timeline>
        {portfolioData.awards.map(award => (
          <TimelineItem key={award.id} color={award.color}>
            <Card 
              title={award.title}
              subtitle={`${award.organization} | ${award.date}`}
              accentColor={award.color}
              shortDescription={award.description}
              icon="🏆"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {Object.entries(award.expandedDetails).map(([k, v]) => (
                  <div key={k}>
                    <strong style={{ color: '#e2e8f0', textTransform: 'capitalize' }}>{k.replace(/_/g, ' ')}:</strong>
                    <span style={{ marginLeft: '0.5rem', color: '#cbd5e1' }}>{v as React.ReactNode}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TimelineItem>
        ))}
      </Timeline>
    </SectionPage>
  );
};
export default AwardsSection;
