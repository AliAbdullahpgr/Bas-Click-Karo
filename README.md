# Bas Click Karo

Static Next.js demo. No backend, signup, database, or external asset requests.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3000. Run `npm run build` to create the standalone static site in `out/`. Serve that directory with any static host.

## Assets

- `public/assets/pakistani-street.png`: supplied reference artwork, used intact as the backdrop. Some background lettering and props are baked into that artwork.
- `public/assets/rickshaw.svg`: original animated rickshaw prop.
- `public/assets/chair.svg`: original draggable chair prop.
- `public/assets/bat.svg`: original cricket cursor.
- Horn/chai sounds: synthesized locally with Web Audio after interaction.
- Result card: generated locally as a downloadable PNG.

Click the street objects, red button, and bottom dock. Nine street interactions invite the CAPTCHA; the Pakistani test button opens it immediately. The street scrolls horizontally on narrow screens. The plastic chair supports dragging and arrow keys. No data leaves the browser except when you explicitly use native sharing.
