'use client';
import { useCallback, useEffect, useRef } from 'react';
const clips = {
  meow: { url: '/audio/cat-meow.mp3', seconds: 1.8, volume: .2 },
  engine: { url: '/audio/rickshaw-engine.mp3', seconds: 4.4, volume: .12 },
  laugh: { url: '/audio/laugh.mp3', seconds: 1.6, volume: .12 },
};
export function useSoundEffects(muted: boolean, powerOff: boolean) {
  const active = useRef(new Map<string, { audio: HTMLAudioElement; timer: ReturnType<typeof setTimeout>; fade: ReturnType<typeof setInterval> }>());
  const stopAll = useCallback(() => {
    active.current.forEach(({audio,timer,fade})=>{audio.pause();clearTimeout(timer);clearInterval(fade);});
    active.current.clear();
  }, []);
  useEffect(()=>{if(muted||powerOff)stopAll();},[muted,powerOff,stopAll]);
  useEffect(()=>stopAll,[stopAll]);
  return (name: keyof typeof clips) => {
    if(muted||powerOff)return;
    const previous=active.current.get(name);
    if(previous){previous.audio.pause();clearTimeout(previous.timer);clearInterval(previous.fade);}
    const clip=clips[name], audio=new Audio(clip.url);
    audio.volume=clip.volume;
    let startedAt: number | null=null;
    const stop=()=>{
      audio.pause();clearTimeout(timer);clearInterval(fade);
      if(active.current.get(name)?.audio===audio)active.current.delete(name);
    };
    // Keep the supplied recordings intact; playback trims each cue and fades its tail.
    const timer=setTimeout(stop,(clip.seconds+3)*1000);
    const fade=setInterval(()=>{
      if(startedAt===null)return;
      const elapsed=(performance.now()-startedAt)/1000;
      const remaining=clip.seconds-elapsed;
      audio.volume=clip.volume*Math.max(0,Math.min(1,remaining/.2));
      if(remaining<=0)stop();
    },40);
    audio.onplaying=()=>{startedAt=performance.now();};
    audio.onended=stop;
    active.current.set(name,{audio,timer,fade});
    void audio.play().catch(stop);
  };
}
