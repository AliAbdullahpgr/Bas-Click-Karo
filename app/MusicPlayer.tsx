'use client';
import type { useStreetAudio } from './useStreetAudio';
type Music = ReturnType<typeof useStreetAudio>;
const time=(seconds:number)=>Math.floor(seconds/60)+':'+String(Math.floor(seconds%60)).padStart(2,'0');
export default function MusicPlayer({music,onClose}:{music:Music;onClose:()=>void}){
  return <section className="music-player" aria-label="Good Music player">
    <header><div><small>DHABA RADIO</small><h2>Good music.<br/><em>Best memories.</em></h2></div><button aria-label="Close music player" onClick={onClose}>×</button></header>
    <div className={'cassette '+(music.playing?'spinning':'')} aria-hidden="true"><i/><span>CHAI SIDE A</span><i/></div>
    <p className="now-playing">{music.playing?'NOW PLAYING':'READY WHEN YOU ARE'}</p><h3>{music.names[music.track]}</h3>
    {<div className="song-progress"><input aria-label="Song position" type="range" min="0" max={music.duration||1} step="0.1" value={Math.min(music.position,music.duration||1)} disabled={!music.duration} onChange={e=>music.seek(Number(e.target.value))}/><div><span>{time(music.position)}</span><span>{time(music.duration)}</span></div></div>}
    <div className="playback-controls"><button aria-label="Previous track" onClick={music.previousTrack}>⏮</button><button className="play-pause" aria-label={music.playing?'Pause song':'Play song'} onClick={music.toggle}>{music.playing?'Ⅱ':'▶'}</button><button aria-label="Next track" onClick={music.nextTrack}>⏭</button></div>
    <label className="player-volume">Volume <input aria-label="Player volume" type="range" min="0" max="0.7" step="0.01" value={music.volume} onChange={e=>music.setVolume(Number(e.target.value))}/><span>{Math.round(music.volume*100)}%</span></label>
    <div className="track-list">{music.names.map((name,index)=><button key={index} className={music.track===index?'chosen':''} onClick={()=>music.playTrack(index)}><span>{music.track===index&&music.playing?'♫':String(index+1).padStart(2,'0')}</span>{name}</button>)}</div>
    <label className="add-songs">＋ Add your songs<input aria-label="Add your songs" type="file" accept="audio/*,.mp3,.wav,.m4a,.ogg,.flac" multiple onChange={e=>{music.addSongs(e.target.files);e.target.value='';}}/></label><small className="local-music-note">Your songs stay on this device. Add them again after a refresh.</small>
    {music.error&&<p className="music-error" role="status">{music.error}</p>}
  </section>;
}
