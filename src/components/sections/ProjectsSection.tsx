import React from 'react';
import SectionPage from '../SectionPage';
import { portfolioData } from '../../data/portfolioData';
import { Card } from '../Card';
import styles from './Section.module.css';

interface Props { onBack: () => void; }

export const ProjectsSection: React.FC<Props> = ({ onBack }) => {
  return (
    <SectionPage title="Projects" level="1-2" onBack={onBack}>
      <div className={styles.grid}>
        {portfolioData.projects.map((proj, idx) => (
          <Card 
            key={proj.id}
            title={proj.name}
            subtitle={`${proj.category} | ${proj.timeline}`}
            accentColor={proj.color}
            shortDescription={proj.shortDescription}
            icon="🚀"
            delay={idx * 0.15}
          >
            <div style={{ marginBottom: '1rem' }}>
              <p>{proj.fullDescription}</p>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <strong style={{ color: '#e2e8f0' }}>Approach:</strong>
              <ul className={styles.list}>
                {proj.expandedDetails.approach.map((r, i) => <li key={i} className={styles.listItem}>{r}</li>)}
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '4px', flexWrap: 'wrap' }}>
              {Object.entries(proj.results).map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontSize: '0.8rem', color: proj.color, textTransform: 'uppercase', marginBottom: '4px' }}>{k.replace(/_/g, ' ')}</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>{v as React.ReactNode}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              {proj.links?.github && <a href={proj.links.github} target="_blank" rel="noreferrer" className={styles.link}>[GitHub]</a>}
              {proj.links?.demo && <a href={proj.links.demo} target="_blank" rel="noreferrer" className={styles.link}>[Live Demo]</a>}
            </div>

            <div className={styles.tagContainer}>
              {proj.tech.map(t => <span key={t} className={styles.tag}>{t}</span>)}
            </div>
          </Card>
        ))}
      </div>
    </SectionPage>
  );
};
export default ProjectsSection;
