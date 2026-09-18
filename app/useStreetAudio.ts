'use client';
import { useEffect, useRef, useState } from 'react';

type Song = { name: string; url: string };
const suppliedSong: Song = { name: 'Farak — Taare', url: '/audio/farak-taare.mp3' };
export function useStreetAudio(muted: boolean, powerOff: boolean) {
  const [playing, setPlaying] = useState(false);
  const [dholPlaying, setDholPlaying] = useState(false);
  const [track, setTrack] = useState(0);
  const [volume, setVolume] = useState(.12);
  const [songs, setSongs] = useState<Song[]>([suppliedSong]);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState('');
  const fileAudio = useRef<HTMLAudioElement | null>(null);
  const dholAudio = useRef<HTMLAudioElement | null>(null);
  const objectUrls = useRef<string[]>([]);
  const names = songs.map(song=>song.name);
  function stop(){fileAudio.current?.pause();setPlaying(false);}
  function stopDhol(){dholAudio.current?.pause();setDholPlaying(false);}
  function start(){setError('');stopDhol();setPlaying(true);}
  function toggleDhol(){
    setError('');stop();
    if(dholPlaying){stopDhol();return;}
    if(!dholPlaying&&dholAudio.current)dholAudio.current.currentTime=0;
    setDholPlaying(true);
  }
  useEffect(()=>{
    if(!dholPlaying)return;
    const timeout=window.setTimeout(()=>{dholAudio.current?.pause();setDholPlaying(false);},6000);
    return()=>window.clearTimeout(timeout);
  },[dholPlaying]);
  useEffect(()=>{
    const song=songs[track];
    if(!song)return;
    const player=fileAudio.current || (fileAudio.current=new Audio());
    let cancelled=false;
    if(player.getAttribute('src')!==song.url){player.src=song.url;setPosition(0);setDuration(0);}
    player.volume=volume;
    player.muted=muted;
    player.onloadedmetadata=()=>setDuration(Number.isFinite(player.duration)?player.duration:0);
    player.ontimeupdate=()=>setPosition(player.currentTime);
    player.onended=()=>{
      if(track+1<songs.length)setTrack(track+1);
      else setPlaying(false);
    };
    player.onerror=()=>{setError('Yeh file play nahi ho rahi. MP3, WAV ya M4A try karein.');setPlaying(false);};
    if(playing&&!powerOff)void player.play().catch(()=>{if(cancelled)return;setError('Play dabao to start this song.');setPlaying(false);});
    else player.pause();
    return()=>{cancelled=true;player.pause();};
  },[track,songs,playing,volume,muted,powerOff]);
  useEffect(()=>{
    if(!dholPlaying){dholAudio.current?.pause();return;}
    const player=dholAudio.current || (dholAudio.current=new Audio('/audio/shaadi-dhol.mp3'));
    let cancelled=false;
    player.volume=volume;
    player.muted=muted;
    const stop=()=>{player.pause();setDholPlaying(false);};
    player.onended=stop;
    player.ontimeupdate=()=>{if(player.currentTime>=6)stop();};
    player.onerror=()=>{stop();setError('Shaadi sound load nahi ho saka.');};
    if(!powerOff)void player.play().catch(()=>{if(!cancelled)stop();});
    else player.pause();
    return()=>{cancelled=true;player.pause();};
  },[dholPlaying,volume,muted,powerOff]);
  function addSongs(files: FileList | null){
    if(!files)return;
    const additions=Array.from(files).filter(file=>file.type.startsWith('audio/')||/\.(mp3|wav|ogg|m4a|aac|flac)$/i.test(file.name)).map(file=>{
      const url=URL.createObjectURL(file);objectUrls.current.push(url);return {name:file.name.replace(/\.[^.]+$/,''),url};
    });
    if(!additions.length){setError('Audio files select karein: MP3, WAV ya M4A.');return;}
    stop();stopDhol();setSongs(current=>[...current,...additions]);setTrack(songs.length);setError('');
  }
  useEffect(()=>()=>{fileAudio.current?.pause();dholAudio.current?.pause();objectUrls.current.forEach(URL.revokeObjectURL);},[]);
  return {
    playing,dholPlaying,toggleDhol,start,stop,addSongs,position,duration,error,
    hasFileTrack:true,seek:(time:number)=>{if(fileAudio.current){fileAudio.current.currentTime=time;setPosition(time);}},
    previousTrack:()=>setTrack(t=>(t-1+names.length)%names.length),
    playTrack:(index:number)=>{setTrack(index);start();},
    toggle:()=>playing?stop():start(),track,nextTrack:()=>setTrack(t=>(t+1)%names.length),volume,setVolume,names,
  };
}
