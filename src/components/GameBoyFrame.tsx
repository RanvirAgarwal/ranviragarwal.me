import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SceneBackground from './SceneBackground';
import { useSound } from '../contexts/SoundContext';
import './GameBoyFrame.css';

interface GameBoyFrameProps {
  children?: React.ReactNode;
  onStartClick?: () => void;
  isExpanding?: boolean;
}

export const GameBoyFrame: React.FC<GameBoyFrameProps> = ({ 
  children, 
  onStartClick,
  isExpanding = false
}) => {
  const [scale, setScale] = useState(1);
  const { playClick } = useSound();

  useEffect(() => {
    const handleResize = () => {
      // Base dimensions of our console design
      const BASE_WIDTH = 1400;
      const BASE_HEIGHT = 787.5; // 16:9
      
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Calculate scale to fit 95% of the screen
      const scaleX = (windowWidth * 0.95) / BASE_WIDTH;
      const scaleY = (windowHeight * 0.95) / BASE_HEIGHT;
      
      setScale(Math.min(scaleX, scaleY));
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="gameboy-page">
      <div 
        className="scale-wrapper" 
        style={{ transform: `scale(${scale})` }}
      >
        <main className="console-body">
          <motion.div 
            className="metal-plate" 
            style={{ background: '#D9C8A4' }}
            animate={{ 
              backgroundColor: isExpanding ? '#001a33' : '#D9C8A4' 
            }}
            transition={{ duration: 0.8 }}
          >
            
            {/* Screws for realistic texture */}
            <div className="screw top-left"></div>
            <div className="screw top-right"></div>
            <div className="screw bottom-left"></div>
            <div className="screw bottom-right"></div>

            {/* Top Text */}
            <motion.div 
              className="top-text"
              animate={{ opacity: isExpanding ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            >
              GAME & PORTFOLIO
            </motion.div>

            <div className="controls-layout">
              {/* LEFT D-PAD */}
              <motion.div 
                className="dpad-container"
                animate={{ opacity: isExpanding ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="dpad">
                  <div className="dpad-vertical"></div>
                  <div className="dpad-horizontal"></div>
                  <div className="dpad-center"></div>
                </div>
              </motion.div>

              {/* CENTER SCREEN */}
              <div className="screen-container" style={{ backgroundColor: '#f2ebd9' }}>
                <div className="screen-bezel">
                  <div className="crt-screen">
                    
                    {/* HUD */}
                    <div className="hud">
                      <div className="hud-block">
                        <span>DEV</span>
                        <span>000000</span>
                      </div>
                      <div className="hud-block center">
                        <span>🪙x00</span>
                      </div>
                      <div className="hud-block center">
                        <span>WORLD</span>
                        <span>1-1</span>
                      </div>
                      <div className="hud-block right">
                        <span>TIME</span>
                        <span>400</span>
                      </div>
                    </div>

                    {/* Mario World Content Area */}
                    <div className="game-world">
                      <SceneBackground>
                        {/* Pipe */}
                        <div className="pipe">
                          <div className="pipe-top"></div>
                          <div className="pipe-body"></div>
                        </div>

                        {/* Main Title / Content */}
                        <div className="game-content-overlay">
                          {children || (
                            <>
                              <h1 className="game-title">
                                SUPER DEV<br/>WORLD
                              </h1>
                              <div className="game-subtitle">
                                RANVIR AGARWAL'S PORTFOLIO
                              </div>
                              <button 
                                onClick={() => { playClick(); onStartClick?.(); }}
                                className="start-button"
                              >
                                START GAME
                              </button>
                            </>
                          )}
                        </div>
                      </SceneBackground>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT BUTTONS */}
              <motion.div 
                className="action-buttons-container"
                animate={{ opacity: isExpanding ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="action-labels">
                  <div className="pill-indicator"></div>
                  <span className="label-text">GAME</span>
                  <div className="pill-indicator mt"></div>
                  <span className="label-text">TIME</span>
                  <div className="pill-indicator mt"></div>
                  <span className="label-text">PAUSE/SET</span>
                </div>

                <div className="buttons-group">
                  <div className="action-button-wrapper b-btn">
                    <button className="action-btn" onClick={playClick}></button>
                    <span className="action-btn-label">B</span>
                  </div>
                  <div className="action-button-wrapper a-btn">
                    <button className="action-btn" onClick={playClick}></button>
                    <span className="action-btn-label">A</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Logo */}
            <motion.div 
              className="brand-logo"
              animate={{ opacity: isExpanding ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            >
              DevTendo
            </motion.div>
            
            {/* Speaker Grill */}
            <motion.div 
              className="speaker-grill"
              animate={{ opacity: isExpanding ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grill-slot"></div>
              <div className="grill-slot"></div>
              <div className="grill-slot"></div>
              <div className="grill-slot"></div>
              <div className="grill-slot"></div>
            </motion.div>

          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default GameBoyFrame;
