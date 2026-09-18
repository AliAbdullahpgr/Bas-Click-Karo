# Bas Click Karo

A static Next.js Pakistani street playground. No signup, backend, database, or external asset requests.

## Run

~~~sh
npm install
npm run dev
~~~

Open http://localhost:3000. Run npm run build to export the site into out/, then npm start to preview the static build. The out/ directory can be deployed to a static host.

## Interactions

- Rickshaw destinations have distinct replies. The photographic rickshaw moves with exhaust and a 4.4-second diesel sound.
- Chai greetings and order replies rotate independently. Declining chai or asking for credit does not pour a cup. The fifth actual cup adds the acidity joke.
- Clicking uncle plays a short laugh. His answers escalate; asking for a rishta produces an angry reaction.
- Mohalla Gossip is a WhatsApp-style group with Nida aunty, Bilal, and Ahmed chacha, with multiple conversations per topic.
- The shaadi tent plays the supplied Bombay Nights clip for up to 15 seconds, without opening chat.
- The Good Music box opens a player containing Farak — Taare. It has play/pause, seeking, quieter default volume, and a local song picker. Selected local files stay on the device and are not retained after refresh.
- The cat plays a meow when clicked and answers both preset and typed messages only with meows.
- Cricket uses a GPT-generated bat and ends automatically after 12 seconds. Stop, clicking the bat again, or Escape also ends it.
- Touching the pole triggers five-second load shedding and the response: “Mar jaata abhi! Shukar hai light nahi hai.”
- The plastic chair supports dragging and arrow keys. The red button adds a short burst of chaos.
- The CAPTCHA preview can be closed. The quiz creates a local PNG score card and supports user-initiated sharing.
- Character visitor cards rotate every 20 seconds. On small screens the street scrolls horizontally.

## Assets and sounds

All scene images and supplied audio are bundled locally. See public/assets/ASSETS.md for image paths and exact GPT image prompts, and public/audio/README.md for recording sources and playback lengths. The original scene reference and early props are preserved for reference.

## Validation

npm run build performs compilation, TypeScript checks, and static export.
