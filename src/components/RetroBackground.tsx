/**
 * RetroBackground.tsx
 *
 * Fixed fullscreen circuit-board background.
 * Renders at z-index 0 so all page content sits above it.
 * Pure CSS — no canvas, no images.
 */

import { memo } from 'react';
import styles from './RetroBackground.module.css';

const RetroBackground = memo(function RetroBackground() {
  return (
    <div
      className={styles.background}
      role="presentation"
      aria-hidden="true"
    />
  );
});

RetroBackground.displayName = 'RetroBackground';
export default RetroBackground;
