import React from 'react';
import styles from './SceneBackground.module.css';

interface SceneBackgroundProps {
  children: React.ReactNode;
  showClouds?: boolean;
  showGround?: boolean;
  showBushes?: boolean;
}

export const SceneBackground: React.FC<SceneBackgroundProps> = ({ 
  children,
  showClouds = true,
  showGround = true,
  showBushes = true
}) => {
  return (
    <div className={styles.sceneContainer}>
      {showClouds && (
        <>
          <div className={`${styles.cloud} ${styles.cloud1}`}>
            <div className={`${styles.cloudPart} ${styles.part1}`}></div>
            <div className={`${styles.cloudPart} ${styles.part2}`}></div>
            <div className={`${styles.cloudPart} ${styles.part3}`}></div>
          </div>
          <div className={`${styles.cloud} ${styles.cloud2}`}>
            <div className={`${styles.cloudPart} ${styles.part1}`}></div>
            <div className={`${styles.cloudPart} ${styles.part2}`}></div>
            <div className={`${styles.cloudPart} ${styles.part3}`}></div>
          </div>
          <div className={`${styles.cloud} ${styles.cloud3}`}>
            <div className={`${styles.cloudPart} ${styles.part1}`}></div>
            <div className={`${styles.cloudPart} ${styles.part2}`}></div>
            <div className={`${styles.cloudPart} ${styles.part3}`}></div>
            <div className={`${styles.cloudPart} ${styles.part4}`}></div>
          </div>
        </>
      )}

      {showBushes && (
        <div className={`${styles.bush} ${styles.bush1}`}>
          <div className={`${styles.bushPart} ${styles.p1}`}></div>
          <div className={`${styles.bushPart} ${styles.p2}`}></div>
          <div className={`${styles.bushPart} ${styles.p3}`}></div>
        </div>
      )}

      {showGround && (
        <div className={styles.groundContainer}>
          <div className={styles.groundTopGrass}></div>
          <div className={styles.groundBricks}></div>
        </div>
      )}

      <div className={styles.contentWrapper}>
        {children}
      </div>

      <div className={styles.crtOverlay}></div>
    </div>
  );
};

export default SceneBackground;
