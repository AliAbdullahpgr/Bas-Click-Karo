'use client';
import { useEffect, useRef, useState } from 'react';

// Original procedural phrases, not recordings or arrangements of existing songs.
export function useStreetAudio(muted: boolean, powerOff: boolean) {
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(0);
  const [volume, setVolume] = useState(.3);
  const context = useRef<AudioContext | null>(null);
  const master = useRef<GainNode | null>(null);
  const names = ['Dhaba groove', 'Shaadi dhol', 'Raat ki chai'];
  function start() {
    if (!context.current) {
      context.current = new AudioContext();
      master.current = context.current.createGain();
      master.current.connect(context.current.destination);
    }
    void context.current.resume();
    setPlaying(true);
  }
  useEffect(() => {
    if (master.current && context.current) master.current.gain.setTargetAtTime(muted || powerOff ? 0 : volume * .6, context.current.currentTime, .12);
  }, [volume, muted, powerOff, playing]);
  useEffect(() => {
    const ctx = context.current, output = master.current;
    if (!playing || !ctx || !output || muted || powerOff) return;
    let step = 0, next = ctx.currentTime + .05;
    const beat = 60 / [98, 118, 76][track] / 4;
    const notes = [[0, 3, 5, 7, 10, 7, 5, 3], [0, 5, 7, 10, 12, 10, 7, 5], [0, 2, 5, 7, 9, 7, 5, 2]][track];
    function tone(at: number, frequency: number, duration: number, amp: number, type: OscillatorType = 'sine', end?: number) {
      const osc = ctx!.createOscillator(), gain = ctx!.createGain();
      osc.type = type; osc.frequency.setValueAtTime(frequency, at);
      if (end) osc.frequency.exponentialRampToValueAtTime(end, at + duration * .7);
      gain.gain.setValueAtTime(0, at); gain.gain.linearRampToValueAtTime(amp, at + .009); gain.gain.exponentialRampToValueAtTime(.0001, at + duration);
      osc.connect(gain); gain.connect(output!); osc.start(at); osc.stop(at + duration + .02);
      osc.onended = () => { osc.disconnect(); gain.disconnect(); };
    }
    function tap(at: number, amp: number) {
      const buffer = ctx!.createBuffer(1, ctx!.sampleRate * .08, ctx!.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (data.length * .15));
      const source = ctx!.createBufferSource(), filter = ctx!.createBiquadFilter(), gain = ctx!.createGain();
      source.buffer = buffer; filter.type = 'bandpass'; filter.frequency.value = 2200; gain.gain.value = amp;
      source.connect(filter); filter.connect(gain); gain.connect(output!); source.start(at);
      source.onended = () => { source.disconnect(); filter.disconnect(); gain.disconnect(); };
    }
    const timer = setInterval(() => {
      while (next < ctx.currentTime + .15) {
        const s = step % 16;
        if ([0, 6, 8, 14].includes(s)) { tone(next, 145, .24, .8, 'sine', 54); tone(next, 230, .08, .12); }
        if ([3, 4, 7, 11, 12, 15].includes(s)) { tone(next, 390, .095, .24, 'triangle', 170); tap(next, .22); }
        if (s % 2 === 0) tap(next, .07);
        if (step % 4 === 0) {
          const frequency = 293.66 * Math.pow(2, notes[Math.floor(step / 4) % 8] / 12);
          tone(next, frequency, beat * 3.4, .19); tone(next, frequency * 2, beat * 2.5, .025);
        }
        if (step % 8 === 0) tone(next, 146.83, beat * 7, .045, 'triangle');
        next += beat; step++;
      }
    }, 40);
    return () => clearInterval(timer);
  }, [playing, track, muted, powerOff]);
  useEffect(() => () => { void context.current?.close(); }, []);
  return { playing, start, toggle: () => playing ? setPlaying(false) : start(), track, nextTrack: () => setTrack(t => (t + 1) % 3), volume, setVolume, names };
}
