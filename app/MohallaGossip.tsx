'use client';
import { useEffect, useRef, useState } from 'react';

type Person = 'nida' | 'bilal' | 'ahmed' | 'you';
type Message = { person: Person; text: string };
const people = {
  nida: { name: 'Nida aunty', avatar: '👩🏽‍🦱', color: '#a75185' },
  bilal: { name: 'Bilal', avatar: '🧑🏽', color: '#277c9d' },
  ahmed: { name: 'Ahmed chacha', avatar: '👨🏽‍🦳', color: '#977223' },
  you: { name: 'You', avatar: '', color: '#246442' },
};
const greetings: Message[] = [
  { person: 'nida', text: 'Assalamualaikum. Gali mein itna dhol kis khushi mein baj raha hai?' },
  { person: 'bilal', text: 'Aunty, saamne shaadi hai. Aapko card nahi mila? 👀' },
  { person: 'ahmed', text: 'Card ka chhoro. Parking meri dukaan ke aagay na ho bas.' },
];
const topics: { label: string; rounds: Message[][] }[] = [
  { label: 'Bijli ka kya scene hai?', rounds: [
    [{person:'bilal',text:'Mere ghar gayi hui hai. Phone 3% pe hai, dua karo.'},{person:'nida',text:'Hamari bhi gayi. Lekin saamne walon ki fairy lights chal rahi hain?'},{person:'ahmed',text:'Generator hai behen. WAPDA ne shaadi attend nahi ki.'}],
    [{person:'nida',text:'Aa gayi! Jaldi motor chalao.'},{person:'bilal',text:'Aunty woh generator ki awaaz hai 😭'},{person:'ahmed',text:'Main toh pankhay ke neeche baitha hoon. Pankha band hai, aadat nahi jaati.'}],
  ] },
  { label: 'Shaadi kiski hai?', rounds: [
    [{person:'nida',text:'Rashida ki beti ki. Mujhe toh sab pehle se pata tha.'},{person:'bilal',text:'Aunty, abhi aap hi pooch rahi thi.'},{person:'ahmed',text:'Biryani 9 baje hai. Baqi details ki zaroorat nahi.'}],
    [{person:'bilal',text:'Dulha stage pe hai. Dost abhi parking dhoond rahe hain.'},{person:'ahmed',text:'Meri dukaan ke aagay aaye toh dulhay ko bulaunga.'},{person:'nida',text:'Koi bride ki photo bhejo. Bas dress dekhni hai.'}],
  ] },
  { label: 'Aur kya khabar hai?', rounds: [
    [{person:'bilal',text:'Gali ke Wi-Fi ka password change ho gaya.'},{person:'ahmed',text:'Mera tha. Tum sab ka nahi.'},{person:'nida',text:'Chacha naya password inbox kar dein. Good morning wali photo bhejni hai.'}],
    [{person:'nida',text:'Kisi ne mera steel ka dabba dekha? Haleem bheji thi.'},{person:'bilal',text:'Aunty, dabba wapas aa sakta hai. Haleem mushkil hai.'},{person:'ahmed',text:'Yeh group sirf zaroori baaton ke liye tha. Khair, haleem mujhe kyun nahi mili?'}],
  ] },
];
export default function MohallaGossip({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>(greetings);
  const [typing, setTyping] = useState<Person | null>(null);
  const rounds = useRef([0, 0, 0]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const log = useRef<HTMLDivElement | null>(null);
  const busy = useRef(false);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => { log.current?.scrollTo({ top: log.current.scrollHeight, behavior: 'smooth' }); }, [messages, typing]);
  function send(index: number) {
    if (busy.current) return;
    busy.current = true;
    const topic = topics[index];
    const answers = topic.rounds[rounds.current[index]++ % topic.rounds.length];
    setMessages(current => [...current, { person: 'you' as const, text: topic.label }].slice(-18));
    setTyping(answers[0].person);
    answers.forEach((answer, i) => {
      timers.current.push(setTimeout(() => {
        setMessages(current => [...current, answer].slice(-18));
        setTyping(answers[i + 1]?.person ?? null);
        if (i === answers.length - 1) busy.current = false;
      }, 600 + i * 850));
    });
  }
  return <section className="mohalla-group" aria-label="Mohalla Gossip group chat">
    <header><span className="group-avatar" aria-hidden="true">💬</span><div><strong>Mohalla Gossip</strong><small>Nida aunty, Bilal, Ahmed chacha, you</small></div><button aria-label="Close Mohalla Gossip" onClick={onClose}>×</button></header>
    <div className="group-log" ref={log} role="log" aria-live="polite"><span className="group-day">TODAY</span><p className="group-notice">Sirf mohalla updates. Forwarded messages mana hain. 🤫</p>{messages.map((message, index) => <div className={'group-row '+(message.person==='you'?'from-you':'')} key={index}>{message.person!=='you'&&<span className="sender-avatar" aria-hidden="true">{people[message.person].avatar}</span>}<div className="group-bubble"><strong style={{color:people[message.person].color}}>{people[message.person].name}</strong><p>{message.text}</p><small>abhi {message.person==='you'&&<span aria-label="Read">✓✓</span>}</small></div></div>)}{typing&&<p className="group-typing">{people[typing].name} is typing<span>…</span></p>}</div>
    <div className="group-replies">{topics.map((topic,index)=><button key={topic.label} disabled={typing!==null} onClick={()=>send(index)}>{topic.label} <span>➤</span></button>)}</div>
  </section>;
}
