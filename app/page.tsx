'use client';

import { useEffect, useRef, useState } from 'react';

const questions = [
  { title: 'Which one is the correct chai color?', options: ['Doodh hi doodh', 'Perfect karak', 'Yeh coffee hai?', 'Paani with feelings'], correct: 1 },
  { title: 'Your friend says “5 minute mein aa raha hoon.” When will they arrive?', options: ['5 minutes', '15 minutes', '45 minutes', "They haven’t left home yet"], correct: 3 },
  { title: 'Ammi: “Mehman aa rahe hain.” Your response?', options: ['Okay', 'Great!', 'Why?', 'Mujhe room se bahar toh nahi ana?'], correct: 3 },
];
const uncleLines = ['Beta degree konsi kar rahe ho?', 'Salary kitni hai?', 'Shaadi kab karni hai?'];
export default function Home() {
  const [clicks, setClicks] = useState(0);
  const [chai, setChai] = useState(0);
  const [uncle, setUncle] = useState(0);
  const [horns, setHorns] = useState(0);
  const [toast, setToast] = useState('');
  const [dark, setDark] = useState(false);
  const [drive, setDrive] = useState(false);
  const [steam, setSteam] = useState(false);
  const [chaos, setChaos] = useState(false);
  const [bat, setBat] = useState(false);
  const [hits, setHits] = useState(0);
  const [muted, setMuted] = useState(false);
  const [aunty, setAunty] = useState(false);
  const [boss, setBoss] = useState(false);
  const [bossHealth, setBossHealth] = useState(3);
  const [quiz, setQuiz] = useState(-1);
  const [selected, setSelected] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [chair, setChair] = useState({x:0,y:0});
  const [chairMoved, setChairMoved] = useState(false);
  const quizPrompted = useRef(false);
  const dialogRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if(quiz < 0 && !boss)return;
    const previous=document.activeElement as HTMLElement | null;
    const onKey=(event:KeyboardEvent)=>{
      if(event.key==='Escape'){setQuiz(-1);setBoss(false);return;}
      if(event.key!=='Tab')return;
      const items=dialogRef.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)');
      if(!items?.length)return;
      const first=items[0],last=items[items.length-1];
      if(event.shiftKey && document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey && document.activeElement===last){event.preventDefault();first.focus();}
    };
    document.addEventListener('keydown',onKey);
    dialogRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
    return()=>{document.removeEventListener('keydown',onKey);previous?.focus();};
  },[quiz,boss]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audio = useRef<AudioContext | null>(null);
  const drag = useRef<{x:number;y:number;ox:number;oy:number} | null>(null);
  const later = (fn:()=>void, delay:number) => { timers.current.push(setTimeout(fn, delay)); };
  useEffect(() => { const interval = setInterval(()=>setAunty(true), 40000); return () => { clearInterval(interval); timers.current.forEach(clearTimeout); if(toastTimer.current)clearTimeout(toastTimer.current); void audio.current?.close(); }; }, []);
  const say = (text:string) => { setToast(text); if(toastTimer.current)clearTimeout(toastTimer.current); toastTimer.current=setTimeout(()=>setToast(''),4000); };
  const count = () => { setClicks(c=>c+1); if(clicks>=8 && !quizPrompted.current && quiz===-1){quizPrompted.current=true;later(()=>{setCorrect(0);setSelected(null);setQuiz(0);},1000);} };
  const sound = (kind='horn') => { if(muted)return; try { const ctx=audio.current || (audio.current=new AudioContext()); void ctx.resume(); [0,.18].forEach((delay,i)=> { const osc=ctx.createOscillator(); const gain=ctx.createGain(); osc.type=kind==='chai'?'sine':'sawtooth'; osc.frequency.value=kind==='chai'?750+i*200:330+i*110; gain.gain.setValueAtTime(0,ctx.currentTime+delay); gain.gain.linearRampToValueAtTime(.07,ctx.currentTime+delay+.02); gain.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+delay+.17); osc.connect(gain);gain.connect(ctx.destination);osc.start(ctx.currentTime+delay);osc.stop(ctx.currentTime+delay+.2); }); } catch {} };
  function tea(){count();setChai(c=>c+1);setSteam(true);sound('chai');say(chai>=4?'Bhai bas karo, acidity ho jayegi.':'Chai piyoge? ☕ Ek dum karak!');later(()=>setSteam(false),2200);}
  function rickshaw(){count();sound();setDrive(true);say(drive?'Bhai jana kidhar hai pehle ye toh batao.':'Bhai jana kidhar hai? 🛺');later(()=>setDrive(false),3500);}
  function blackout(){if(dark)return;count();setDark(true);later(()=>{setDark(false);say('Bijli aa gayi! 🎉 Jaldi phone charge karo.');sound('chai');},5000);}
  function honk(){count();setHorns(h=>h+1);sound();say(horns>=3?'Pakistan mein horn bajana zaroori nahi hota. …PON PON!':'PON PON! 📣');}
  function askUncle(){count(); if(uncle>=3){setBossHealth(3);setBoss(true);}else{say(uncleLines[uncle]);setUncle(u=>u+1);}}
  function redButton(){count();sound();setChaos(true);setDrive(true);setAunty(true);say('Mana kiya tha na! Ab bhugto. 🎉');later(()=>{setChaos(false);setDrive(false);},6500);}
  function answer(){if(selected===null)return;setCorrect(c=>c+(selected===questions[quiz].correct?1:0));setSelected(null);setQuiz(q=>q+1);}
  const score=correct===3?94:correct===2?81:correct===1?62:38;
  function downloadCard(){const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1080;const ctx=canvas.getContext('2d');if(!ctx)return;ctx.fillStyle='#102b27';ctx.fillRect(0,0,1080,1080);ctx.strokeStyle='#f5cb56';ctx.lineWidth=8;ctx.strokeRect(40,40,1000,1000);ctx.textAlign='center';ctx.fillStyle='#f5cb56';ctx.font='bold 65px Georgia';ctx.fillText('Bas Click Karo',540,170);ctx.fillStyle='#faf1d9';ctx.font='30px sans-serif';ctx.fillText('OFFICIALLY, UNOFFICIALLY PAKISTANI',540,310);ctx.font='bold 230px Georgia';ctx.fillStyle='#f5cb56';ctx.fillText(score+'%',540,585);ctx.font='36px sans-serif';ctx.fillStyle='#faf1d9';ctx.fillText('Has argued about biryani at least once.',540,720);ctx.font='26px sans-serif';ctx.fillText('Proudly useless. Made in Pakistan.',540,930);const a=document.createElement('a');a.download='bas-click-karo-score.png';a.href=canvas.toDataURL('image/png');a.click();say('Result card downloaded. Family group ready!');}
  async function share(){const text='I’m '+score+'% Pakistani 🇵🇰 Has argued about biryani at least once. Bas Click Karo!';try{if(navigator.share)await navigator.share({title:'Bas Click Karo',text,url:location.href});else{await navigator.clipboard.writeText(text+' '+location.href);say('Copied! Ab family group mein bhejo.');}}catch{say('Use Download card to save your result.');}}
  return <main className={bat?'bat-mode':''}>
    <header className="topbar"><a className="brand" href="/">👆 <strong>Bas Click Karo</strong></a><nav aria-label="Main navigation"><button className="active" onClick={()=>{setBat(false);setQuiz(-1);}}>⌂ <span>Home</span></button><button onClick={redButton}>🎮 <span>Bekaar Cheezen</span></button><button onClick={tea}>☕ <span>Time Pass</span></button><button onClick={()=>[tea,rickshaw,askUncle,honk][Math.floor(Math.random()*4)]()}>🎲 <span>Random</span></button></nav><div className="top-actions"><span className="live"><i/> Productivity: 0%</span><button className="sound-button" aria-label={muted?'Enable sound':'Mute sound'} onClick={()=>setMuted(!muted)}>{muted?'🔇':'🔊'}</button><button className="login" onClick={()=>say('Login? Yahan time waste karne ke liye account nahi chahiye. 😌')}>Login? Kya karogay?</button></div></header>
    <div className="scene-scroll"><section className={'scene '+(chaos?'chaos':'')} aria-label="Interactive Pakistani street">
      <div className="scene-art"/>
      <span className="scene-tag">✦ EST. ABHI ABHI · OPEN 24/7, BIJLI HO TOH</span>
      <button className="hotspot tea" aria-label="Have chai" onClick={tea}><span className="hint">☕ Chai piyoge?</span></button>
      <button className="hotspot rickshaw" aria-label="Ride the rickshaw" onClick={rickshaw}><span className="hint">🛺 Bhai, chalna hai?</span></button>
      <button className="hotspot uncle" aria-label="Talk to uncle" onClick={askUncle}><span className="hint">🕶 Uncle has questions</span></button>
      <button className="hotspot pole" aria-label="Touch electricity pole" onClick={blackout}><span className="hint">⚡ Haath mat lagana</span></button>
      <button className="hotspot cricket" aria-label="Pick up cricket bat" onClick={()=>{count();setBat(!bat);setHits(0);say(bat?'Bat wapas rakh diya.':'Gully cricket ON! Hit the flying emojis.');}}><span className="hint">🏏 Cricket heals everything</span></button>
      <button className="hotspot cat" aria-label="Pet the cat" onClick={()=>{count();say('Meow. Khana hai? Nahi? Toh jao. 🐈');}}><span className="hint">🐈 Pspspsps…</span></button>
      <button className="hotspot wedding" aria-label="Visit the wedding tent" onClick={()=>{count();setAunty(true);sound();}}><span className="hint">💃 Shaadi season: always on</span></button>
      <button className="hotspot paan" aria-label="Visit paan shop" onClick={()=>{count();say('Meetha paan? Udhaar band hai, sharminda na karein.');}}><span className="hint">🌿 Paan ka scene?</span></button>
      <button className="red-button" onClick={redButton}><span>ISKO MAT<br/>DABANA</span><small>☠</small></button>
      <div className="rickshaw-choices">{['Office (Jhoot)','University (Maybe)','Bas ghoomna hai','Kahin bhi le chalo'].map(x=><button key={x} onClick={()=>{rickshaw();say(x==='Office (Jhoot)'?'Office? Aaj toh chutti hai boss.':'Theek hai. Meter nahi chal raha waise.');}}>📍 {x}</button>)}</div>
      <div className="chai-choices">{['Haan yar ☕','Kadak bana','Nahi, diet pe hun (jhoot)'].map(x=><button key={x} onClick={tea}>▫ {x}</button>)}</div>
      <div className="uncle-choices">{['Bas guzara hai','Theek hai uncle','Aap rishta de do'].map(x=><button key={x} onClick={askUncle}>▫ {x}</button>)}</div>
      <aside className="captcha-preview"><div className="window-title"><strong>Pakistani CAPTCHA</strong><span>−　×</span></div><div className="captcha-body"><p>Select all the things that are more reliable than our electricity:</p><div className="captcha-grid">{[['☕','Chai'],['🛺','Rickshaw'],['☀️','Umeed'],['📶','Mobile Data'],['👤','Politicians'],['💡','Load Shedding']].map(([emoji,label])=><button key={label} onClick={e=>e.currentTarget.classList.toggle('picked')}><span>{emoji}</span>{label}</button>)}</div><button className="green-button" onClick={()=>{setCorrect(0);setSelected(null);setQuiz(0);}}>Verify kar lo yaar</button><small>100% unofficial. 200% personal.</small></div></aside>
      <button className="horn" onClick={honk}>📣 PON PON {horns>3?'📣':''}</button>
      <button className="movable-chair" aria-label="Drag the plastic chair, or move with arrow keys" style={{transform:'translate('+chair.x+'px,'+chair.y+'px)'}} onPointerDown={e=>{e.currentTarget.setPointerCapture(e.pointerId);drag.current={x:e.clientX,y:e.clientY,ox:chair.x,oy:chair.y};}} onPointerMove={e=>{if(!drag.current)return;setChairMoved(true);setChair({x:Math.max(-1100,Math.min(100,drag.current.ox+e.clientX-drag.current.x)),y:Math.max(-470,Math.min(35,drag.current.oy+e.clientY-drag.current.y))});}} onPointerUp={()=>{drag.current=null;say('Kursi idhar rakh di. Bas. That’s it.');}} onPointerCancel={()=>drag.current=null} onKeyDown={e=>{if(!e.key.startsWith('Arrow'))return;e.preventDefault();setChairMoved(true);setChair(c=>({x:c.x+(e.key==='ArrowLeft'?-20:e.key==='ArrowRight'?20:0),y:c.y+(e.key==='ArrowUp'?-20:e.key==='ArrowDown'?20:0)}));}}><img src="/assets/chair.svg" alt="Red plastic chair" draggable={false}/><span>{chairMoved?'Bas. That’s the joke.':'Apni kursi khud lagao ↔'}</span></button>
      <div className="today"><span>TODAY’S PLAN:</span><div>☑ Chai</div><div>☑ Time pass</div><div>☑ Aur kuch nahi</div><b>☺</b></div>
      {steam&&<div className="steam" aria-hidden="true">♨ ♨ ♨</div>}
      {drive&&<img className="driving-rickshaw" src="/assets/rickshaw.svg" alt="Rickshaw driving across the street"/>}
      {(chaos||bat)&&<div className="emoji-field">{['🏏','🥭','🏆','☕','🩴','💸','🍗','❤️','🎉','🛺','🥭','🩴'].map((emoji,i)=><button key={i} aria-label={'Hit '+emoji} style={{left:(8+i*7.4)+'%',animationDelay:(i*.19)+'s',animationDuration:(3+i%3)+'s'}} onClick={e=>{if(!bat)return;setHits(h=>h+1);sound('chai');e.currentTarget.style.visibility='hidden';const target=e.currentTarget;later(()=>target.style.visibility='visible',900);}}>{emoji}</button>)}</div>}
      {bat&&<div className="game-score">🏏 Gully cricket · {hits} runs <button onClick={()=>setBat(false)}>Finish ×</button></div>}
      {aunty&&<button className="aunty" onClick={()=>{setAunty(false);say('Aunty: Achha, apni Ammi ka number toh de do…');}}><span>👩🏽‍🦱</span><div><b>Rishta aunty has entered the chat.</b>Beta meri niece bhi CS kar rahi hai…<small>Click to politely escape →</small></div></button>}
      <div className="scene-dock">{[['🎮','Games'],['☕','Chai break'],['📣','Horn bajao'],['⚡','Bijli check'],['🎲','Surprise me'],['🇵🇰','Pakistani test']].map(([icon,label],i)=><button key={label} onClick={()=>[()=>{setBat(true);setHits(0);},tea,honk,blackout,redButton,()=>{setCorrect(0);setQuiz(0);setSelected(null);}][i]()}><span>{icon}</span>{label}</button>)}</div>
    </section></div>
    <footer><strong>Bas Click Karo</strong><span>Proudly useless</span><span>Made in Pakistan 🇵🇰</span><span className="footer-note">For the chronically online ♥</span><span className="click-counter">{clicks} clicks. Zero kaam.</span><button onClick={()=>say('Privacy: Sab browser mein. Hum bhi kuch kaam nahi kar rahe.')}>Privacy (Shhh…)</button><button onClick={blackout}>☾</button></footer>
    <div className={'toast '+(toast?'visible':'')} role="status" aria-live="polite">{toast}</div>
    {dark&&<div className="blackout" role="alert"><span>💡</span><p>WELCOME TO PAKISTAN</p><h1>LOAD<br/>SHEDDING.</h1><p>UPS bhi jawab de gaya.</p><div className="power-progress"/><small>Bijli aa rahi hai… probably.</small></div>}
    {boss&&<div className="modal-backdrop"><section ref={dialogRef} className="modal boss" role="dialog" aria-modal="true" aria-label="Uncle boss fight"><button className="close" onClick={()=>setBoss(false)}>×</button><div className="eyebrow">UNSOLICITED ADVICE · FINAL LEVEL</div><span className="boss-face">🕶️</span><h2>UNCLE BOSS FIGHT</h2><p>“Sharma ji ka beta toh…”</p><div className="health"><i style={{width:bossHealth/3*100+'%'}}/></div><p>Dodge {bossHealth} more personal questions.</p><button autoFocus className="green-button" onClick={()=>{sound();if(bossHealth<=1){setBoss(false);setUncle(0);say('UNCLE DEFEATED. “Beta, badtameez ho gaye ho.” 🏆');}else setBossHealth(h=>h-1);}}>“Uncle, aapki salary kitni hai?” ↗</button></section></div>}
    {quiz>=0&&<div className="modal-backdrop" onKeyDown={e=>{if(e.key==='Escape')setQuiz(-1);}}><section ref={dialogRef} className="modal quiz" role="dialog" aria-modal="true" aria-label="Prove you are Pakistani"><button className="close" aria-label="Close CAPTCHA" onClick={()=>setQuiz(-1)}>×</button><div className="eyebrow">BAS CLICK KARO · CITIZENSHIP DEPARTMENT</div>{quiz<3?<><div className="quiz-top"><span>🇵🇰</span><small>QUESTION 0{quiz+1} / 03</small></div><h2>Prove you’re<br/><em>Pakistani.</em></h2><p className="question">{questions[quiz].title}</p><div className={'answers '+(quiz===0?'tea-answers':'')}>{questions[quiz].options.map((option,i)=><button key={option} className={selected===i?'selected':''} onClick={()=>setSelected(i)}>{quiz===0&&<span className="cup" style={{'--tea':['#eedcc2','#b9763f','#49301f','#d4b27c'][i]} as React.CSSProperties}>☕</span>}<span>{option}</span><b>{selected===i?'●':'○'}</b></button>)}</div><button autoFocus className="green-button next" disabled={selected===null} onClick={answer}>{quiz===2?'Mera result dikhao':'Agla sawaal'} →</button><small className="quiz-foot">No CNIC required. Just vibes.</small></>:<><div className="result-seal">🇵🇰</div><h2>Certified <em>apna banda.</em></h2><div className="result-score">{score}<span>%</span></div><div className="eyebrow">PAKISTANI SCORE</div><p className="classification">Has argued about biryani<br/>at least once.</p><button autoFocus className="green-button next" onClick={downloadCard}>↓ Download result card</button><button className="share-button" onClick={share}>Share with the group ↗</button><button className="retry" onClick={()=>{setCorrect(0);setQuiz(0);setSelected(null);}}>Phir se try karein?</button></>}</section></div>}
  </main>;
}
