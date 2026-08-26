// Sound Synthesizer using Web Audio API (No external sound files required)
class SoundSynth {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playBeep(frequency = 880, type = 'sine', duration = 0.2) {
    try {
      this.init();
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio Context not allowed without user interaction yet.', e);
    }
  }

  playTimerAlarm() {
    this.playBeep(880, 'sine', 0.2);
    setTimeout(() => this.playBeep(1100, 'sine', 0.3), 200);
    setTimeout(() => this.playBeep(1320, 'sine', 0.4), 400);
  }

  playClick() {
    this.playBeep(600, 'triangle', 0.05);
  }
}

export const soundSynth = new SoundSynth();
