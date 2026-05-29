const DEFAULT_SETTINGS = {
  soundEnabled: true,
  masterVolume: 1.0,
  effectsVolume: 1.0,
  musicVolume: 0.7,
};

class SoundManager {
  private ctx: AudioContext | null = null;
  public settings = { ...DEFAULT_SETTINGS };
  private bgmInterval: number | null = null;

  constructor() {
    this.loadSettings();
  }

  private loadSettings() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('soundSettings');
      if (saved) {
        try {
          this.settings = JSON.parse(saved);
        } catch (e) {
          // ignore parsing error
        }
      } else {
        localStorage.setItem('soundSettings', JSON.stringify(DEFAULT_SETTINGS));
      }
    }
  }

  private saveSettings() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('soundSettings', JSON.stringify(this.settings));
    }
  }

  public get muted(): boolean {
    return !this.settings.soundEnabled;
  }

  // Need to call this on first user interaction to unlock AudioContext
  public init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.settings.soundEnabled = !this.settings.soundEnabled;
    this.saveSettings();
    if (this.settings.soundEnabled) {
      this.init();
    } else {
      this.stopMusic();
    }
    return !this.settings.soundEnabled;
  }

  public playMusic() {
    if (this.muted) return;
    this.init();
    this.stopMusic();

    const pattern = [
      { f: 392.00, d: 0.15 }, // G4
      { f: 392.00, d: 0.15 },
      { f: 392.00, d: 0.15 },
      { f: 261.63, d: 0.15 }, // C4
      { f: 329.63, d: 0.15 }, // E4
      { f: 392.00, d: 0.15 },
    ];

    const playSequence = () => {
      if (this.muted || !this.ctx || this.ctx.state !== 'running') return;
      
      let time = this.ctx.currentTime + 0.1;
      pattern.forEach((note) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.value = note.f;
        
        gain.gain.setValueAtTime(0.04 * this.settings.musicVolume * this.settings.masterVolume, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + note.d - 0.02);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(time);
        osc.stop(time + note.d);
        time += note.d * 1.5; // Space between notes
      });
    };

    playSequence();
    this.bgmInterval = window.setInterval(playSequence, 3000);
  }

  public stopMusic() {
    if (this.bgmInterval !== null) {
      window.clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  public playClick() {
    if (this.muted) return;
    this.init();
    const t = this.ctx!.currentTime;
    const osc = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(1200, t + 0.05);
    
    gain.gain.setValueAtTime(0.1 * this.settings.effectsVolume * this.settings.masterVolume, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx!.destination);

    osc.start(t);
    osc.stop(t + 0.05);
  }

  public playHover() {
    if (this.muted) return;
    this.init();
    const t = this.ctx!.currentTime;
    const osc = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, t);
    
    gain.gain.setValueAtTime(0.05 * this.settings.effectsVolume * this.settings.masterVolume, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx!.destination);

    osc.start(t);
    osc.stop(t + 0.05);
  }

  public playJump() {
    if (this.muted) return;
    this.init();
    const t = this.ctx!.currentTime;
    const osc = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(300, t);
    osc.frequency.exponentialRampToValueAtTime(600, t + 0.1);
    
    gain.gain.setValueAtTime(0.1 * this.settings.effectsVolume * this.settings.masterVolume, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx!.destination);

    osc.start(t);
    osc.stop(t + 0.1);
  }

  public playCoin() {
    if (this.muted) return;
    this.init();
    const t = this.ctx!.currentTime;
    const osc = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(987.77, t); // B5
    osc.frequency.setValueAtTime(1318.51, t + 0.1); // E6
    
    gain.gain.setValueAtTime(0.1 * this.settings.effectsVolume * this.settings.masterVolume, t);
    gain.gain.setValueAtTime(0.1 * this.settings.effectsVolume * this.settings.masterVolume, t + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx!.destination);

    osc.start(t);
    osc.stop(t + 0.4);
  }

  public playStomp() {
    if (this.muted) return;
    this.init();
    const t = this.ctx!.currentTime;
    const osc = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(400, t);
    osc.frequency.exponentialRampToValueAtTime(100, t + 0.15);
    
    gain.gain.setValueAtTime(0.1 * this.settings.effectsVolume * this.settings.masterVolume, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx!.destination);

    osc.start(t);
    osc.stop(t + 0.15);
  }

  public playHit() {
    if (this.muted) return;
    this.init();
    const t = this.ctx!.currentTime;
    const osc = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, t);
    osc.frequency.linearRampToValueAtTime(50, t + 0.2);
    
    gain.gain.setValueAtTime(0.2 * this.settings.effectsVolume * this.settings.masterVolume, t);
    gain.gain.linearRampToValueAtTime(0.01, t + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx!.destination);

    osc.start(t);
    osc.stop(t + 0.2);
  }

  public playPipe() {
    if (this.muted) return;
    this.init();
    const t = this.ctx!.currentTime;
    const osc = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(600, t);
    for(let i=0; i<6; i++){
      osc.frequency.exponentialRampToValueAtTime(100, t + (i*0.1) + 0.05);
      osc.frequency.setValueAtTime(600, t + (i*0.1) + 0.1);
    }
    
    gain.gain.setValueAtTime(0.1 * this.settings.effectsVolume * this.settings.masterVolume, t);
    gain.gain.linearRampToValueAtTime(0.01, t + 0.6);

    osc.connect(gain);
    gain.connect(this.ctx!.destination);

    osc.start(t);
    osc.stop(t + 0.6);
  }
}

export const soundManager = new SoundManager();
