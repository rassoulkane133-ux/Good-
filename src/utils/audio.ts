/**
 * Web Audio API Sound Synthesizer for fitness timers and workout cues.
 * Completely self-contained, no external audio files required.
 */
class SoundService {
  private audioCtx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  public toggleSound(enabled?: boolean): boolean {
    if (enabled !== undefined) {
      this.soundEnabled = enabled;
    } else {
      this.soundEnabled = !this.soundEnabled;
    }
    return this.soundEnabled;
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  // Short tick for 3, 2, 1 countdown
  public playCountdownTick(): void {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // Audio context might be restricted before first gesture
    }
  }

  // Higher pitched tone for START / GO
  public playGoTone(): void {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1000, ctx.currentTime);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // Ignore audio error
    }
  }

  // Pleasant double chime for rest period completion
  public playRestCompleted(): void {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      [
        { freq: 523.25, time: 0, dur: 0.18 }, // C5
        { freq: 659.25, time: 0.12, dur: 0.22 }, // E5
        { freq: 783.99, time: 0.24, dur: 0.35 }  // G5
      ].forEach(tone => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(tone.freq, now + tone.time);

        gain.gain.setValueAtTime(0.2, now + tone.time);
        gain.gain.exponentialRampToValueAtTime(0.001, now + tone.time + tone.dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + tone.time);
        osc.stop(now + tone.time + tone.dur);
      });
    } catch {
      // Ignore
    }
  }

  // Fanfare celebratory chime for workout completion
  public playWorkoutComplete(): void {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const notes = [
        { freq: 440, time: 0, dur: 0.15 },
        { freq: 554.37, time: 0.15, dur: 0.15 },
        { freq: 659.25, time: 0.3, dur: 0.15 },
        { freq: 880, time: 0.45, dur: 0.5 }
      ];

      notes.forEach(n => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.freq, ctx.currentTime + n.time);

        gain.gain.setValueAtTime(0.25, ctx.currentTime + n.time);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + n.time + n.dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + n.time);
        osc.stop(ctx.currentTime + n.time + n.dur);
      });
    } catch {
      // Ignore
    }
  }
}

export const sound = new SoundService();
