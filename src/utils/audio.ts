/**
 * Sound synthesis engine using Web Audio API for tactical Call of Duty audio effects.
 * 100% client-side, zero external assets, instant zero-latency playback.
 */

class TacticalSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Lazy audio context initialization
  }

  private getContext(): AudioContext | null {
    if (this.isMuted) return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Iconic COD Hitmarker sound: snappy double metallic tick
   */
  public playHitmarker() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    // First click
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(1400, now);
    osc1.frequency.exponentialRampToValueAtTime(300, now + 0.04);
    gain1.gain.setValueAtTime(0.35, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.05);

    // Second metallic tick (40ms later)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(2200, now + 0.035);
    osc2.frequency.exponentialRampToValueAtTime(600, now + 0.075);
    gain2.gain.setValueAtTime(0.25, now + 0.035);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.035);
    osc2.stop(now + 0.09);
  }

  /**
   * "Baja Confirmada" / Target Eliminated: satisfying high-tech pulse with XP award chord
   */
  public playBajaConfirmada() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const frequencies = [587.33, 739.99, 880.0, 1174.66]; // D5, F#5, A5, D6 harmonic chord

    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + i * 0.04);
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, now);
      filter.frequency.exponentialRampToValueAtTime(3200, now + 0.25);

      gain.gain.setValueAtTime(0.12, now + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35 + i * 0.05);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.04);
      osc.stop(now + 0.45);
    });
  }

  /**
   * Target Missed / Tactical Alert Buzzer
   */
  public playMissionAlarm() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.setValueAtTime(120, now + 0.12);
    
    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.36);
  }

  /**
   * Tactical Radio / Military Walkie Squelch & Click
   */
  public playRadioClick() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1600, now + 0.02);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  }

  /**
   * HUD Beep / Sector Target Acquisition
   */
  public playHudBeep(highPitch = false) {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(highPitch ? 1760 : 880, now);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  /**
   * Mission Victory Fanfare: Dark Matter tactical synth triumph
   */
  public playVictoryFanfare() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Dramatic chord sequence
    const notes = [
      { f: 440, t: 0.0, d: 0.18 },  // A4
      { f: 554, t: 0.15, d: 0.18 }, // C#5
      { f: 659, t: 0.3, d: 0.22 },  // E5
      { f: 880, t: 0.5, d: 0.7 },   // A5 (high resolve)
      { f: 1108, t: 0.52, d: 0.65 } // C#6
    ];

    notes.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, now + note.t);
      gain.gain.setValueAtTime(0.2, now + note.t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.t + note.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + note.t);
      osc.stop(now + note.t + note.d + 0.05);
    });
  }

  /**
   * Mission Failed / Drone Defeat Static: Low drone + glitch frequency
   */
  public playDefeatDrone() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Deep heavy low-frequency saw drone
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(95, now);
    osc.frequency.linearRampToValueAtTime(60, now + 1.2);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, now);
    filter.frequency.linearRampToValueAtTime(120, now + 1.2);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 1.5);
  }
}

export const tacticalAudio = new TacticalSoundEngine();
