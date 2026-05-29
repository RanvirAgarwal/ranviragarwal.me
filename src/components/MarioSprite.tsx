import React, { useState, useEffect } from 'react';
import styles from './MarioSprite.module.css';

interface MarioSpriteProps {
  action: 'run' | 'jump' | 'stand';
  size?: number;
  direction?: 'left' | 'right';
}

const colors: Record<string, string> = {
  R: '#cc2222', // Red
  B: '#0044aa', // Blue
  S: '#ffcca6', // Skin
  M: '#663300', // Brown (Hair/Mustache)
  Y: '#fbbf24', // Yellow buttons
  K: '#000000', // Black shoes
  ' ': 'transparent'
};

const frames = {
  stand: [
    "    RRRRR   ",
    "  RRRRRRRRR ",
    "  MMMSSS    ",
    " MSMSSSSMSS ",
    " MSMMSSSSMS ",
    " MMSSSSSSSS ",
    "   SSSSSSS  ",
    "  RRRBBBR   ",
    " RRRRBBRRR  ",
    "RRRRBBBBRRRR",
    "SS RBYBBR SS",
    "SSSBBBBBBSSS",
    "SS BBBBBB SS",
    "   BB  BB   ",
    "  KKK  KKK  ",
    " KKKK  KKKK "
  ],
  run1: [
    "    RRRRR   ",
    "  RRRRRRRRR ",
    "  MMMSSS    ",
    " MSMSSSSMSS ",
    " MSMMSSSSMS ",
    " MMSSSSSSSS ",
    "   SSSSSSS  ",
    "  RRRBBBR   ",
    " RRRRBBRRR  ",
    "RRRRBBBBRRRR",
    "   RBYBBR   ",
    "  BBBBBBBB  ",
    "  BB BB BB  ",
    " SS      SS ",
    " KK      KK ",
    " KKK    KKK "
  ],
  run2: [
    "    RRRRR   ",
    "  RRRRRRRRR ",
    "  MMMSSS    ",
    " MSMSSSSMSS ",
    " MSMMSSSSMS ",
    " MMSSSSSSSS ",
    "   SSSSSSS  ",
    "   RRRBBB   ",
    "  RRRRBBRR  ",
    " RRRRBBBBRR ",
    " S  RBYBBR  ",
    " SS BBBBBB  ",
    "    BB BBB  ",
    "   BB    KK ",
    "  KKK   KKK ",
    " KKKK       "
  ],
  jump: [
    "    RRRRR   ",
    "  RRRRRRRRR ",
    "  MMMSSS    ",
    " MSMSSSSMSS ",
    " MSMMSSSSMS ",
    " MMSSSSSSSS ",
    "   SSSSSSS  ",
    "   RRRBBBR  ",
    "  RRRRBBRRR ",
    " RRRRBBBBRRR",
    " SS RBYBBR  ",
    " SS BBBBBB  ",
    "    BB  BB  ",
    "   BB    BB ",
    "  KKK    KKK",
    " KKKK    KKK"
  ]
};

export const MarioSprite: React.FC<MarioSpriteProps> = ({ 
  action, 
  size = 96,
  direction = 'right'
}) => {
  const [frameIndex, setFrameIndex] = useState(0);
  
  useEffect(() => {
    if (action !== 'run') return;
    
    const interval = setInterval(() => {
      setFrameIndex(prev => (prev === 0 ? 1 : 0));
    }, 400); // Slower frame rate
    
    return () => clearInterval(interval);
  }, [action]);

  const getFrameData = () => {
    if (action === 'stand') return frames.stand;
    if (action === 'jump') return frames.jump;
    return frameIndex === 0 ? frames.run1 : frames.run2;
  };

  const frameData = getFrameData();
  const width = 12;
  const height = 16;

  return (
    <div 
      className={styles.spriteContainer}
      style={{ 
        width: size * (width/height), 
        height: size,
        transform: `scaleX(${direction === 'left' ? -1 : 1})`
      }}
    >
      <svg 
        className={styles.pixelArt}
        viewBox={`0 0 ${width} ${height}`} 
        xmlns="http://www.w3.org/2000/svg"
      >
        {frameData.map((row, y) => 
          Array.from(row).map((char, x) => {
            if (char === ' ') return null;
            return (
              <rect 
                key={`${x}-${y}`} 
                x={x} 
                y={y} 
                width="1.05" 
                height="1.05" 
                fill={colors[char]} 
              />
            );
          })
        )}
      </svg>
    </div>
  );
};

export default MarioSprite;
