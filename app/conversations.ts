export type Character = 'driver' | 'chai' | 'uncle' | 'aunty' | 'cat' | 'paan';
export const characters: Record<Character, { name: string; avatar: string; greeting: string; replies: [string, string][] }> = {
  driver: { name: 'Rashid bhai · Rickshaw captain', avatar: '🛺', greeting: 'Bhai jaana kidhar hai? Bas location bhejo, lecture nahi.', replies: [
    ['Office (Jhoot)', 'Office? Itni khushi se? Jhoot toh tameez se bolo. Chalo, chai pe le chalta hoon.'],
    ['University (Maybe)', 'Attendance ki tension? Meri rickshaw ki bhi 75% attendance workshop mein hai.'],
    ['Bas ghoomna hai', 'Yeh hui na baat! Petrol aapka, playlist meri.'],
    ['Kahin bhi le chalo', 'Theek hai. Ghar waalon ko keh dena five minute mein aa raha hoon.'],
    ['Meter se chalo?', 'Meter? Woh toh decoration hai, bhai. Truck art ka hissa.'],
  ] },
  chai: { name: 'Ustaad · Chai department', avatar: '☕', greeting: 'Chai piyoge? Yahan maslay solve nahi hotay, bas halka feel hota hai.', replies: [
    ['Haan yar ☕', 'Ek karak, kam tension, zyada sukoon. Ab phone rakh ke peeyo.'],
    ['Kadak bana', 'Itni kadak banaunga ke Monday bhi Friday lagega.'],
    ['Nahi, diet pe hun (jhoot)', 'Bilkul. Chai mein calories nahi, yaadein hoti hain. Do biscuit bhi?'],
    ['Udhaar chalega?', 'Aaj cash, kal udhaar. Yeh board kal bhi yahin hoga.'],
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
  cat: { name: 'Billo · Mohallay ki owner', avatar: '🐈', greeting: 'Meow. Yeh gali meri hai. Aap guest ho.', replies: [
    ['Pspspsps…', 'Mrrp. Appointment li thi? Main bohat busy hoon.'],
    ['Biscuit chahiye?', 'Meow! Ab baat ho sakti hai. Pehle biscuit, phir friendship.'],
    ['Ek selfie?', 'Sirf meri achhi side se. Dono achhi hain waise.'],
  ] },
  paan: { name: 'Paan bhai · Mohalla news', avatar: '🌿', greeting: 'Meetha paan ya mohalla gossip? Dono fresh hain.', replies: [
    ['Meetha paan', 'Gulkand double. Din meetha ho, bill bhi meetha nahi hoga.'],
    ['Kya khabar hai?', 'Saamne walay uncle ne Wi-Fi ka password badal diya. Poori gali pareshan hai.'],
    ['Udhaar?', 'Aap se pehle bhi ek banda yehi keh kar gaya tha. Ab woh Dubai mein hai.'],
  ] },
};
