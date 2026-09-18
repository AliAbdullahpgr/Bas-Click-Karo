export type Character = 'driver' | 'chai' | 'uncle' | 'aunty' | 'cat' | 'gossip';
export const characters: Record<Character, { name: string; avatar: string; greeting: string; replies: [string, string][] }> = {
  driver: { name: 'Rashid bhai · Rickshaw captain', avatar: '🛺', greeting: 'Bhai jaana kidhar hai? Bas location bhejo, lecture nahi.', replies: [
    ['Office (Jhoot)', 'Office? Itni khushi se? Jhoot toh tameez se bolo. Chalo, chai pe le chalta hoon.'],
    ['University (Maybe)', 'Attendance ki tension? Meri rickshaw ki bhi 75% attendance workshop mein hai.'],
    ['Bas ghoomna hai', 'Yeh hui na baat! Petrol aapka, playlist meri.'],
    ['Kahin bhi le chalo', 'Theek hai. Ghar waalon ko keh dena five minute mein aa raha hoon.'],
    ['Meter se chalo?', 'Meter? Woh toh decoration hai, bhai. Truck art ka hissa.'],
  ] },
  chai: { name: 'Ustaad · Chai department', avatar: '☕', greeting: 'Chai piyoge? Karak, doodh patti, ya kam cheeni wali.', replies: [
    ['Haan yar ☕', 'Ek karak, kam tension, zyada sukoon. Ab phone rakh ke peeyo.'],
    ['Kadak bana', 'Itni kadak banaunga ke Monday bhi Friday lagega.'],
    ['Nahi, diet pe hun (jhoot)', 'Theek hai bhai, chai cancel. Saada paani rakh doon?'],
    ['Udhaar chalega?', 'Aaj cash, kal udhaar. Yeh board kal bhi yahin hoga.'],
    ['Cheeni kam rakhna', 'Kam cheeni wali aa gayi. Taste karke batao.'],
  ] },
  uncle: { name: 'Uncle · Unsolicited advice', avatar: '🕶️', greeting: 'Beta degree konsi kar rahe ho? Aur is mein scope hai?', replies: [
    ['Bas guzara hai', 'Guzara? Hamare zamanay mein is umar mein do bachay aur plot hota tha.'],
    ['Theek hai uncle', 'Theek toh hai. Lekin government job ka socha hai? Pension hoti hai, beta.'],
    ['Aap rishta de do', 'Hain?! Main salary pooch raha hoon aur tumhein rishta chahiye?! Pehle apne pairon pe kharay ho jao. Badtameez!'],
    ['Freelancing karta hoon', 'Achha, matlab abhi job nahi mili. Koi baat nahi, mehnat karo.'],
  ] },
  aunty: { name: 'Rishta aunty · Always online', avatar: '👩🏽‍🦱', greeting: 'Beta meri niece bhi CS kar rahi hai… bas casually bata rahi hoon.', replies: [
    ['Aunty, abhi career…', 'Haan haan, career saath chalta rahega. Bas height bata do.'],
    ['Niece ka GitHub hai?', 'GitHub ka toh nahi pata, lekin gol roti banati hai.'],
    ['Ammi ko call kar lein', 'Number toh pehle se hai beta. Kal chai pe aa rahe hain.'],
    ['Main chai leke aata hoon', 'Do cup lana. Niece bhi yahin hai. Surprise!'],
    ['Aunty, meri meeting hai', 'Sunday ko bhi meeting? Achha, camera on karke dikhao.'],
  ] },
  cat: { name: 'Billo · Mohallay ki owner', avatar: '🐈', greeting: 'Meow meow meow.', replies: [
    ['Pspspsps…', 'Meow. Meeeow.'],
    ['Biscuit chahiye?', 'Meow meow!'],
    ['Ek selfie?', 'Meeeow. Meow meow.'],
  ] },
  gossip: { name: 'Mohalla Gossip', avatar: '💬', greeting: 'Nida aunty, Bilal aur Ahmed chacha: gali ki saari khabar yahin milti hai.', replies: [] },
};

export const chaiGreetings = [
  'Chai piyoge? Karak, doodh patti, ya kam cheeni wali?',
  'Aa gaye ustad! Wohi karak chalegi ya aaj kuch halka?',
  'Chai tayyar hai. Pehle bata do: cheeni normal ya kam?',
  'Aaram se baitho. Chai garam hai aur biscuit abhi fresh aaye hain.',
];

export const chaiReplyVariants: string[][] = [
  ['Ek cup aa raha hai, bhai. Garam hai, zara sambhal ke.', 'Lo ji, taaza chai. Biscuit dubona hai toh jaldi nikaal lena.', 'Aapki chai tayyar. Pehli chuski ke baad batana kaisi bani.'],
  ['Patti thori zyada, ek ubaal aur. Ab bani asli karak!', 'Karak chai aa rahi hai. Iske baad neend ko Allah hafiz.', 'Yeh lo double patti wali. Cheeni alag rakhi hai, apne hisaab se.'],
  ['Theek hai bhai, chai cancel. Saada paani rakh doon?', 'Koi masla nahi. Jab dil kare awaaz de dena, zabardasti nahi hai.', 'Achha ji, aaj chai nahi. Kursi pe baithne ka bill nahi aata.'],
  ['Udhaar? Pichli chai ka hisaab pehle kar lein, phir dekhtay hain.', 'Aaj cash, kal udhaar. Board bhi yehi keh raha hai.', 'Chalo is baar likh leta hoon. Naam asli batana, pichla banda Shah Rukh likhwa gaya tha.'],
  ['Cheeni kam rakhi hai. Chai ka rang aur patti bilkul wohi.', 'Kam cheeni wali aa gayi. Taste karke batao, aur daalni ho toh paas rakhi hai.', 'Aapka order yaad hai: kam cheeni, zyada patti.'],
];
