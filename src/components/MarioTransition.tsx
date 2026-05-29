import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MarioTransition.module.css';
import MarioSprite from './MarioSprite';
import { useSound } from '../contexts/SoundContext';
import { soundManager } from '../utils/soundManager';

interface MarioTransitionProps {
  targetFolderName?: string;
  onComplete: () => void;
  onSkip: () => void;
  onHome: () => void;
}

const GRAVITY = 0.8;
const JUMP_FORCE = 18;
const BASE_RUN_SPEED = 2.5; 
const PIPE_X_OFFSET = 200;

interface Entity {
  id: number;
  x: number;
  y?: number;
  dir?: number;
  hit?: boolean;
  defeated?: boolean;
}

interface CoinEntity {
  id: number;
  x: number;
  y: number;
  vy: number;
  life: number;
}

interface ScoreEntity {
  id: number;
  x: number;
  y: number;
  life: number;
}

function CloudSVG({ size = 'normal' }: { size?: 'small' | 'normal' | 'large' }) {
  const sizes = {
    small: { w: 100, h: 50 },
    normal: { w: 120, h: 60 },
    large: { w: 140, h: 70 }
  };
  const s = sizes[size];
  
  return (
    <svg viewBox={`0 0 ${s.w} ${s.h}`} width={s.w} height={s.h} style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.1))' }}>
      <ellipse cx={s.w * 0.3} cy={s.h * 0.6} rx={s.w * 0.25} ry={s.h * 0.4} fill="white" opacity="0.9" />
      <ellipse cx={s.w * 0.55} cy={s.h * 0.5} rx={s.w * 0.3} ry={s.h * 0.45} fill="white" opacity="0.9" />
      <ellipse cx={s.w * 0.75} cy={s.h * 0.65} rx={s.w * 0.25} ry={s.h * 0.35} fill="white" opacity="0.9" />
    </svg>
  );
}

function GoombaSVG() {
  return (
    <svg
      style={{ width: '100%', height: '100%', filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))' }}
      viewBox="0 0 50 45"
    >
      {/* Feet */}
      <ellipse cx="15" cy="40" rx="8" ry="5" fill="#000" />
      <ellipse cx="35" cy="40" rx="8" ry="5" fill="#000" />
      {/* Stem/Body */}
      <path d="M 20 30 Q 25 40 30 30 Z" fill="#FFE0B2" />
      {/* Head */}
      <path d="M 5 25 Q 25 -5 45 25 Q 40 35 25 35 Q 10 35 5 25 Z" fill="#8B4513" />
      {/* Angry Eyebrows */}
      <path d="M 10 15 L 23 23 L 27 23 L 40 15 L 36 12 L 25 20 L 14 12 Z" fill="black" />
      {/* Eyes */}
      <ellipse cx="19" cy="24" rx="4" ry="5" fill="white" />
      <circle cx="19" cy="24" r="2" fill="black" />
      <ellipse cx="31" cy="24" rx="4" ry="5" fill="white" />
      <circle cx="31" cy="24" r="2" fill="black" />
      {/* Fangs */}
      <path d="M 22 32 L 24 27 L 26 32 Z" fill="white" />
      <path d="M 24 32 L 26 27 L 28 32 Z" fill="white" />
    </svg>
  );
}

export const MarioTransition: React.FC<MarioTransitionProps> = ({ 
  targetFolderName = 'UNKNOWN', 
  onComplete,
  onSkip,
  onHome
}) => {
  const [phase, setPhase] = useState<'setup' | 'run' | 'jump_pipe' | 'flash' | 'gameover'>('setup');
  
  // Render state
  const [pos, setPos] = useState({ x: 50, y: 0 });
  const [isJumping, setIsJumping] = useState(false);
  const [isHit, setIsHit] = useState(false);
  const { soundEnabled, toggleSound, playClick } = useSound();
  const [lives, setLives] = useState(3);
  
  const [obstacles, setObstacles] = useState<Entity[]>([]);
  const [blocks, setBlocks] = useState<Entity[]>([]);
  const [coins, setCoins] = useState<CoinEntity[]>([]);
  const [scores, setScores] = useState<ScoreEntity[]>([]);

  const keysRef = useRef({ left: false, right: false, space: false });
  
  // Central Physics Engine State
  const physicsRef = useRef({
    x: 50,
    y: 0,
    vy: 0,
    pipeX: window.innerWidth - PIPE_X_OFFSET,
    hitTime: 0,
    lives: 3,
    obstacles: [] as Entity[],
    blocks: [] as Entity[],
    coins: [] as CoinEntity[],
    scores: [] as ScoreEntity[],
    nextId: 1
  });
  
  const requestRef = useRef<number>(0);

  useEffect(() => {
    // Generate Random Entities on Mount
    const numGoombas = Math.floor(Math.random() * 3) + 1; // 1 to 3
    const newObstacles: Entity[] = [];
    for(let i=0; i<numGoombas; i++){
      newObstacles.push({
        id: i,
        x: window.innerWidth * (0.3 + (Math.random() * 0.4)), // scatter in middle
        dir: Math.random() > 0.5 ? 1 : -1,
        defeated: false,
        y: 0
      });
    }

    const newBlocks: Entity[] = [];
    const numBlocks = Math.floor(Math.random() * 2) + 5; // 5 to 6 blocks
    const startX = 250;
    const endX = window.innerWidth - 350; // Leave room before pipe
    const spacing = (endX - startX) / Math.max(1, numBlocks - 1);
    
    for (let i = 0; i < numBlocks; i++) {
      newBlocks.push({
        id: i,
        x: startX + (i * spacing),
        y: 200, // Fixed height
        hit: false
      });
    }

    physicsRef.current.obstacles = newObstacles;
    physicsRef.current.blocks = newBlocks;
    
    setObstacles(newObstacles);
    setBlocks(newBlocks);

    const timer = setTimeout(() => {
      setPhase('run');
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase === 'run') {
      soundManager.playMusic();
    } else {
      soundManager.stopMusic();
    }
    return () => soundManager.stopMusic();
  }, [phase]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        if(phase === 'run') soundManager.playJump();
        keysRef.current.space = true;
      }
      if (e.code === 'ArrowLeft') keysRef.current.left = true;
      if (e.code === 'ArrowRight') keysRef.current.right = true;
      
      if (e.code === 'Enter') { playClick(); onSkip(); }
      if (e.code === 'Escape' || e.key === 'b' || e.key === 'B') { playClick(); onHome(); }
      if (e.key === 's' || e.key === 'S') { playClick(); toggleSound(); }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') keysRef.current.space = false;
      if (e.code === 'ArrowLeft') keysRef.current.left = false;
      if (e.code === 'ArrowRight') keysRef.current.right = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [phase, onSkip, onHome, playClick, toggleSound]);

  useEffect(() => {
    if (phase !== 'run') return;

    let lastTime = performance.now();

    const updatePhysics = (time: number) => {
      const delta = (time - lastTime) / 16; 
      lastTime = time;

      const p = physicsRef.current;
      const k = keysRef.current;

      if (p.lives <= 0) {
        setPhase('gameover');
        return;
      }

      // Jump Input
      if (k.space && p.y === 0) {
        p.vy = JUMP_FORCE;
        setIsJumping(true);
        k.space = false; 
      }

      // X Movement
      let speedX = BASE_RUN_SPEED;
      if (k.left) speedX -= 1.5;
      if (k.right) speedX += 1.5;
      
      const isInvincible = time - p.hitTime < 1000;
      if (isInvincible) speedX = 1; 
      
      p.x += speedX * delta;
      if (p.x < 0) p.x = 0;

      // Y Movement (Gravity)
      if (p.y > 0 || p.vy !== 0) {
        p.vy -= GRAVITY * delta;
        p.y += p.vy * delta;
        if (p.y <= 0) {
          p.y = 0;
          p.vy = 0;
          setIsJumping(false);
        }
      }

      let entitiesChanged = false;

      // Goomba Collision
      for (const obs of p.obstacles) {
        if (obs.defeated) continue;

        obs.x += ((obs.dir || 1) * 1.0) * delta; 
        if (obs.x < window.innerWidth * 0.1) obs.dir = 1;
        if (obs.x > p.pipeX - 100) obs.dir = -1;

        const hitX = Math.abs((p.x + 48) - (obs.x + 40)) < 50;
        const hitY = p.y < 80;
        
        if (hitX && hitY) {
          if (p.vy < 0 && p.y > 40) {
            // STOMP
            obs.defeated = true;
            p.vy = JUMP_FORCE * 0.8;
            soundManager.playStomp();
            entitiesChanged = true;
          } else if (!isInvincible) {
            // HIT
            p.hitTime = time;
            p.vy = JUMP_FORCE * 0.5; 
            p.x -= 40; 
            p.lives -= 1;
            setLives(p.lives);
            soundManager.playHit();
          }
        }
      }

      // Block Collision
      for (const block of p.blocks) {
        if (block.hit) continue;

        // Block is 70x70. Mario is 96x96.
        const hitX = Math.abs((p.x + 48) - (block.x + 35)) < 70;
        // Hit from below
        if (hitX && p.y > (block.y! - 80) && p.y < block.y! && p.vy > 0) {
          block.hit = true;
          p.vy = -2; // bounce down
          soundManager.playCoin();
          
          // Spawn 1-3 coins
          const numCoins = Math.floor(Math.random() * 3) + 1;
          for(let i=0; i<numCoins; i++){
            p.coins.push({
              id: p.nextId++,
              x: block.x + 20 + (Math.random() * 20 - 10),
              y: block.y! + 70,
              vy: 12 + Math.random() * 5,
              life: 40 + Math.random() * 20
            });
          }

          // Spawn Score popup
          p.scores.push({
            id: p.nextId++,
            x: block.x,
            y: block.y! + 80,
            life: 60
          });

          entitiesChanged = true;
        }
      }

      // Coin physics
      for (let i = p.coins.length - 1; i >= 0; i--) {
        const c = p.coins[i];
        c.y += c.vy * delta;
        c.vy -= GRAVITY * delta;
        c.life -= delta;
        if (c.life <= 0) {
          p.coins.splice(i, 1);
        }
        entitiesChanged = true;
      }

      // Score physics
      for (let i = p.scores.length - 1; i >= 0; i--) {
        const s = p.scores[i];
        s.y += 0.5 * delta; // float up slowly
        s.life -= delta;
        if (s.life <= 0) {
          p.scores.splice(i, 1);
        }
        entitiesChanged = true;
      }

      setIsHit(time - p.hitTime < 1000);
      
      if (entitiesChanged) {
        setObstacles([...p.obstacles]);
        setBlocks([...p.blocks]);
        setCoins([...p.coins]);
        setScores([...p.scores]);
      } else {
        setObstacles(prev => prev.map((o, i) => ({ ...o, x: p.obstacles[i].x })));
      }

      // Reached Pipe Detection
      // Mario width = 96, Pipe width = 150
      if (p.y === 0 && (p.x + 96) > p.pipeX + 10 && p.x < p.pipeX + 140) {
        soundManager.playPipe();
        setPhase('jump_pipe');
        setPos({ x: p.pipeX + 25, y: 0 }); 
        return; 
      }
      
      if (p.x > p.pipeX + 50) p.x = p.pipeX - 50; 

      setPos({ x: p.x, y: p.y });
      requestRef.current = requestAnimationFrame(updatePhysics);
    };

    requestRef.current = requestAnimationFrame(updatePhysics);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [phase]);

  useEffect(() => {
    if (phase === 'jump_pipe') {
      setTimeout(() => setPhase('flash'), 1800);
    } else if (phase === 'flash') {
      setTimeout(() => onComplete(), 800);
    }
  }, [phase, onComplete]);

  return (
    <div className={`${styles.overlay} ${isHit ? styles.shake : ''}`}>
      
      {/* UI Container */}
      <div className={styles.uiContainer}>
        <div className={styles.topLeft}>
          <div className={styles.livesText}>
            LIVES: <span>{'❤️'.repeat(Math.max(0, lives))}</span>
          </div>
          <button className={styles.controlBtn} onClick={onHome}>
            &#x2190; HOME [B]
          </button>
        </div>

        <h1 className={styles.levelHeader}>LEVEL 1-1: {targetFolderName}</h1>

        <div className={styles.topRight}>
          <button className={styles.controlBtn} onClick={() => { playClick(); toggleSound(); }}>
            {soundEnabled ? '🔊' : '🔇'} [S]
          </button>
          <button className={styles.controlBtn} onClick={() => { playClick(); onSkip(); }}>
            SKIP [&#x23E9;]
          </button>
        </div>
      </div>

      {/* Clouds */}
      <div className={`${styles.cloud} ${styles.cloud1}`} style={{ top: '40px', left: '5%' }}>
        <CloudSVG size="large" />
      </div>
      <div className={`${styles.cloud} ${styles.cloud2}`} style={{ top: '80px', right: '10%' }}>
        <CloudSVG size="normal" />
      </div>
      <div className={`${styles.cloud} ${styles.cloud3}`} style={{ top: '120px', left: '40%' }}>
        <CloudSVG size="small" />
      </div>
      <div className={`${styles.cloud} ${styles.cloud4}`} style={{ top: '60px', right: '5%' }}>
        <CloudSVG size="large" />
      </div>
      <div className={`${styles.cloud} ${styles.cloud5}`} style={{ top: '100px', left: '20%' }}>
        <CloudSVG size="normal" />
      </div>

      {/* Target Pipe */}
      <div 
        className={`${styles.targetPipe} ${phase === 'jump_pipe' ? styles.glowing : ''}`}
        style={{ right: PIPE_X_OFFSET }}
      >
        <div className={styles.pipeTop}></div>
        <div className={styles.pipeBody}></div>
      </div>

      {/* Blocks */}
      {blocks.map(block => (
        <div 
          key={`block-${block.id}`}
          className={`${styles.floatingBlock} ${block.hit ? styles.hit : ''}`}
          style={{ left: block.x, bottom: `calc(44px + ${block.y}px)` }}
        >
          ?
        </div>
      ))}

      {/* Coins */}
      {coins.map(coin => (
        <div 
          key={`coin-${coin.id}`}
          className={styles.coin}
          style={{ left: coin.x, bottom: `calc(44px + ${coin.y}px)` }}
        />
      ))}

      {/* Scores */}
      {scores.map(score => (
        <div 
          key={`score-${score.id}`}
          className={styles.scorePopup}
          style={{ left: score.x - 15, bottom: `calc(44px + ${score.y}px)` }}
        >
          +100 PTS
        </div>
      ))}

      {/* Obstacles */}
      {obstacles.map(obs => (
        <div 
          key={`obs-${obs.id}`} 
          className={`${styles.goombaWrapper} ${obs.defeated ? styles.defeated : ''}`}
          style={{ left: obs.x }}
        >
          <GoombaSVG />
        </div>
      ))}

      {/* Mario */}
      <motion.div
        className={`${styles.marioContainer} ${isHit ? styles.hitEffect : ''}`}
        style={{ 
          left: pos.x, 
          bottom: `calc(44px + ${pos.y}px)`,
        }}
        animate={
          phase === 'jump_pipe' 
            ? { 
                y: [-150, -200, 100], 
                rotate: [0, 180, 360], 
                scale: [1, 0.8, 0.2] 
              } 
            : {}
        }
        transition={
          phase === 'jump_pipe' 
            ? { duration: 1.5, times: [0, 0.3, 1] } 
            : {}
        }
      >
        <MarioSprite 
          size={96} 
          action={phase === 'jump_pipe' || isJumping ? 'jump' : (phase === 'run' ? 'run' : 'stand')} 
          direction="right" 
        />
      </motion.div>

      {/* Game Over Modal */}
      <AnimatePresence>
        {phase === 'gameover' && (
          <div className={styles.gameOverOverlay}>
            <motion.div 
              className={styles.gameOverModal}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className={styles.gameOverTitle}>GAME OVER</div>
              <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '1rem', color: '#cccccc', margin: '0 0 1rem 0' }}>
                YOU LOST ALL LIVES
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button 
                  className={styles.controlBtn} 
                  style={{ background: '#b32428', borderColor: 'white', color: 'white' }}
                  onClick={() => window.location.reload()}
                >
                  RETRY LEVEL
                </button>
                <button 
                  className={styles.controlBtn} 
                  onClick={() => { playClick(); onHome(); }}
                >
                  MAIN MENU
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Screen flash at the end */}
      <motion.div
        className={styles.greenFlash}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'flash' ? [0, 1, 1] : 0 }}
        transition={{ duration: 0.8, times: [0, 0.5, 1] }}
      />
    </div>
  );
};

export default MarioTransition;
