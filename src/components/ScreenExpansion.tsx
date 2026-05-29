import React from 'react';
import { motion } from 'framer-motion';

interface ScreenExpansionProps {
  isExpanding: boolean;
  children: React.ReactNode;
}

export const ScreenExpansion: React.FC<ScreenExpansionProps> = ({ 
  isExpanding, 
  children 
}) => {
  return (
    <motion.div
      initial={false}
      animate={{
        scale: isExpanding ? 5 : 1,
        // When expanding, we want to translate it so the screen center fills the viewport
        // The screen center is slightly to the left in the GameBoy design
        x: isExpanding ? '5%' : '0%',
        y: isExpanding ? '15%' : '0%',
      }}
      transition={{ 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transformOrigin: 'center center'
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScreenExpansion;
