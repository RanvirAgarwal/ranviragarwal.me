/**
 * RetroTVFrame.tsx — v2
 *
 * Authentic NES-console CRT frame component.
 *
 * Exported hooks (use them to control the frame from parent scope):
 *   usePower(initial?)     → { powerOn, toggle, turnOn, turnOff }
 *   useBrightness(initial?) → { brightness, setBrightness }
 *
 * Props:
 *   children           — content rendered inside the CRT screen
 *   initialPowerState  — starting power state (default true)
 *   brightness         — screen brightness 0–100 (default 100)
 *   onPowerChange      — callback fired when power state changes
 *
 * Keyboard:
 *   Space / Enter when frame is focused → toggles power
 */

import React, {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './RetroTVFrame.module.css';

// ─── Public types ────────────────────────────────────────────────

export interface RetroTVFrameProps {
  children?: React.ReactNode;
  /** Initial power state — can be driven externally via usePower() */
  initialPowerState?: boolean;
  /** Screen brightness 0–100 */
  brightness?: number;
  /** Fired every time the power state changes */
  onPowerChange?: (isOn: boolean) => void;
}

// ─── Exported hooks ──────────────────────────────────────────────

/**
 * usePower
 * Independent state hook — pair with <RetroTVFrame initialPowerState={powerOn} />
 *
 * @example
 *   const { powerOn, toggle } = usePower(true);
 *   <RetroTVFrame initialPowerState={powerOn} onPowerChange={...} />
 */
export function usePower(initial = true) {
  const [powerOn, setPowerOn] = useState(initial);
  const toggle  = useCallback(() => setPowerOn(v => !v), []);
  const turnOn  = useCallback(() => setPowerOn(true),    []);
  const turnOff = useCallback(() => setPowerOn(false),   []);
  return { powerOn, toggle, turnOn, turnOff } as const;
}

/**
 * useBrightness
 * Screen brightness state hook (clamped 0–100).
 *
 * @example
 *   const { brightness, setBrightness } = useBrightness(100);
 *   <RetroTVFrame brightness={brightness} />
 */
export function useBrightness(initial = 100) {
  const [brightness, _set] = useState<number>(
    Math.max(0, Math.min(100, initial))
  );
  const setBrightness = useCallback((v: number) => {
    _set(Math.max(0, Math.min(100, v)));
  }, []);
  return { brightness, setBrightness } as const;
}

// ─── Internal sub-components ─────────────────────────────────────

/** Five ventilation slots moulded into the side of the plastic shell */
const VentSlots = memo(({ side }: { side: 'left' | 'right' }) => (
  <div className={side === 'left' ? styles.ventLeft : styles.ventRight}>
    {Array.from({ length: 5 }, (_, i) => (
      <div key={i} className={styles.ventSlot} />
    ))}
  </div>
));
VentSlots.displayName = 'VentSlots';

/** Speaker grille — 9 staggered horizontal lines */
const SpeakerGrille = memo(() => (
  <div className={styles.speaker} aria-hidden="true">
    {Array.from({ length: 9 }, (_, i) => (
      <div key={i} className={styles.gLine} />
    ))}
  </div>
));
SpeakerGrille.displayName = 'SpeakerGrille';

/** Two NES-style 7-pin controller port recesses */
const ControllerPorts = memo(() => (
  <div className={styles.portCluster}>
    {[1, 2].map(n => (
      <div key={n} className={styles.portUnit}>
        <span className={styles.portLabel}>Controller {n}</span>
        <div className={styles.port} aria-hidden="true">
          <div className={styles.portPins}>
            {Array.from({ length: 7 }, (_, i) => (
              <div key={i} className={styles.pin} />
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
));
ControllerPorts.displayName = 'ControllerPorts';

// ─── Main component ──────────────────────────────────────────────

const RetroTVFrame = memo(function RetroTVFrame({
  children,
  initialPowerState = true,
  brightness = 100,
  onPowerChange,
}: RetroTVFrameProps) {
  // ── State ──
  const [powerOn, setPowerOn]     = useState(initialPowerState);
  const [flickering, setFlicker]  = useState(false);
  const prevPower                  = useRef(initialPowerState);
  const frameRef                   = useRef<HTMLDivElement>(null);

  // ── Sync external power prop ────────────────────────────────
  useEffect(() => {
    if (initialPowerState === prevPower.current) return;
    const turningOn = initialPowerState && !prevPower.current;
    setPowerOn(initialPowerState);
    prevPower.current = initialPowerState;
    if (turningOn) {
      setFlicker(true);
      const t = setTimeout(() => setFlicker(false), 450);
      return () => clearTimeout(t);
    }
  }, [initialPowerState]);

  // ── Power toggle handler ────────────────────────────────────
  const handlePowerToggle = useCallback(() => {
    setPowerOn(prev => {
      const next = !prev;
      onPowerChange?.(next);
      if (next) {
        setFlicker(true);
        setTimeout(() => setFlicker(false), 450);
      }
      return next;
    });
  }, [onPowerChange]);

  // ── Keyboard: Space or Enter to toggle power ────────────────
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handlePowerToggle();
      }
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [handlePowerToggle]);

  // ── Derived class strings ───────────────────────────────────
  const frameClass = [
    styles.frame,
    powerOn ? styles.screenGlowOn : styles.screenOff,
  ].filter(Boolean).join(' ');

  const contentClass = [
    styles.screenContent,
    powerOn   ? styles.screenContentOn : '',
    flickering ? styles.screenFlicker   : '',
  ].filter(Boolean).join(' ');

  const brightnessScale = brightness / 100;

  // ── Render ──────────────────────────────────────────────────
  return (
    <div
      ref={frameRef}
      className={frameClass}
      tabIndex={0}
      role="region"
      aria-label="NES retro TV frame — press Space to toggle power"
    >
      {/* ── Side ventilation slots ── */}
      <VentSlots side="left"  />
      <VentSlots side="right" />

      {/* ════════════════════════════════════════════════════
          Row 1 — Header: brand + serial
         ════════════════════════════════════════════════════ */}
      <div className={styles.headerRow}>
        <div className={styles.brandBlock}>
          <span className={styles.brandSub}>Entertainment System</span>
          <span className={styles.brandMain}>RetroFrame</span>
        </div>
        <div className={styles.headerMeta}>
          <span className={styles.modelLabel}>NES · REV.A</span>
          <span className={styles.serialStamp}>
            {'SN: ' + String(Date.now()).slice(-8)}
          </span>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          Row 2 — Content: screen housing + controls column
         ════════════════════════════════════════════════════ */}
      <div className={styles.contentRow}>

        {/* ── Screen housing (recessed tray) ── */}
        <div className={styles.screenHousing}>

          {/* Thin brushed-metal ring holding the glass */}
          <div className={styles.screenRing}>

            {/* CRT glass viewport
                Layers (bottom → top):
                  z1: screenContent (children)
                  z2: ::before phosphor tint
                  z3: ::after scanlines
                  z4: glassGlare highlight */}
            <div className={styles.crtScreen}>

              {/* Children — beneath all overlays */}
              <div
                className={contentClass}
                style={{
                  '--screen-brightness': brightnessScale,
                } as React.CSSProperties}
              >
                {children}
              </div>

              {/* Top-left glass glare highlight */}
              <div className={styles.glassGlare} aria-hidden="true" />

            </div>
          </div>
        </div>

        {/* ── Controls column (right of screen) ── */}
        <div className={styles.controlsCol}>

          {/* Power button + LED */}
          <div className={styles.powerGroup}>
            <button
              className={[
                styles.powerBtn,
                powerOn ? styles.powerBtnOn : '',
              ].filter(Boolean).join(' ')}
              onClick={handlePowerToggle}
              aria-label={powerOn ? 'Power off' : 'Power on'}
              aria-pressed={powerOn}
            />
            <span className={styles.powerBtnLabel}>Power</span>
            <div
              className={[
                styles.statusLed,
                powerOn ? styles.statusLedOn : '',
              ].filter(Boolean).join(' ')}
              role="img"
              aria-label={powerOn ? 'System on' : 'System off'}
            />
          </div>

          {/* Reset button — visual detail only */}
          <div className={styles.resetGroup} aria-hidden="true">
            <div className={styles.resetBtn} />
            <span className={styles.resetBtnLabel}>Reset</span>
          </div>

        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          Row 3 — Footer: controller ports + speaker grille
         ════════════════════════════════════════════════════ */}
      <div className={styles.footerRow}>
        <ControllerPorts />
        <SpeakerGrille   />
      </div>

    </div>
  );
});

RetroTVFrame.displayName = 'RetroTVFrame';
export default RetroTVFrame;
