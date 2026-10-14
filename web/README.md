# Happy Paws Park – birthday adventure

Static site (HTML + CSS + JS). No build step.

## Edit
Everything is at the top of `script.js`:
- `CONFIG.name` – her name  • `CONFIG.buddy` – German Shepherd's name
- `CONFIG.wishes`, `questions`, `gifts`, `letter`, `finale` – all text
- `SONGS` – paste YouTube links (watch, youtu.be or embed). Songs play one at a time and auto-advance.
- Photos: put `photo1.jpg`, `photo2.jpg`, `photo3.jpg` in `images/` (used inside the gifts). Missing photos are skipped.

## Test vs real day
`testMode: true` = play now. Set `false` to show the countdown until Oct 25, 12:00 AM (her local time).

## GitHub Pages
1. Create a repo, upload everything in this folder (index.html at the top level).
2. Settings → Pages → Source: "Deploy from a branch" → `main` / root → Save.
3. Share `https://YOUR-USER.github.io/REPO-NAME/`.

## Controls
Tap/click a puppy to pet it. Tap the grass (or A/D, arrow keys) and Buddy follows. `E` = press the main button.
