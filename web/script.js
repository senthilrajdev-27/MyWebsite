/* ================= EDIT THIS SECTION ================= */
const CONFIG = {
  name: "Sri Nandhini",
  birthdayMonth: 10, birthdayDay: 25, birthdayHour: 0,
  testMode: false,            // true = play now. Set false for the real birthday date.
  buddy: "Guboi",            // German Shepherd's name
  showMusic: true,
  wishes: {                  // {name} becomes her name
    Guboi: "Happy Birthday, {name}! ❤️ You deserve all the happiness in the world!(apdeya! 🤭)",
    Pandaram: "I hope your day is full of treats! 🦴 (ama 🤨)",
    Lara: "Keep smiling! You make the world brighter.(valicham ✨)",
    Rolex: "Today is your day. Eat the cake! 🎂 (no first cut the cake 😇)",
    Snow: "Awoooo! Happy Birthday! 🎉",
    slowmo: "Don't forget... you're someone's favorite person.  ❤️"
  },
  questions: ["Do you like puppies?", "Would you stay and play with us?", "Should we rescue one more?", "Can we make today special?", "Will you keep smiling?"],
  gifts: [
    { icon: "🎁", title: "Gift 1", text: "😇", image: "./images/img1.jpeg" },
    { icon: "🎁", title: "Gift 2", text: "Happy birthday 🎂🦋✨", image: "./images/img2.jpeg" },
    { icon: "🎁", title: "Gift 3", text: "ஆசீர்வாதம்🤗✨", image: "./images/img3.jpeg" }
  ],
  letter: `Hi {name},

I don't know if a website can really express how special someone is...

But I wanted to create this little world just for you.

Every puppy here represents a little bit of happiness I hope follows you wherever you go.

Keep smiling.

Keep being the wonderful person you are.

And whenever life feels difficult, remember that there is always someone wishing the best for you. ❤️

Mala ulathu chatgpt sonathu athula nabatha 🤭.

Happy Birthday, {name} 🎁🎂 (Nans Maa🫣)🫡🦋✨. 

God bless you my child 🤪. Eathauma yosiche pasamata 🤭, 

Na oru mental nu neetha kandupudecha🤨 eakuda pasunathuku romba nandri 😇.

Eanoda nalathu ealam unaku 🤗kadikatum.

  Neega eanna kadavula 😶‍🌫️ Daily ungala kubudura 🤭 etc...

— Your Best Friend ❤️`,
  finale: ["HAPPY BIRTHDAY", "{name} ❤️", "This little world is yours.", "May your real world be even more beautiful 🫡."]
};
const SONGS = [
  { title: "", youtubeUrl: "" },
  { title: "", youtubeUrl: "" },
  { title: "", youtubeUrl: "" },
  { title: "", youtubeUrl: "" },
  { title: "", youtubeUrl: "" },
  { title: "", youtubeUrl: "" }
];
/* ===================================================== */

const $ = s => document.querySelector(s), sleep = ms => new Promise(r => setTimeout(r, ms));
const T = s => s.replaceAll("{name}", CONFIG.name), rnd = (a, b) => a + Math.random() * (b - a);
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt) e.textContent = txt; return e; };
const COL = ["#F59BB0", "#F4C65A", "#B9A6E3", "#8FD1F0", "#fff"], rc = () => COL[Math.random() * 5 | 0];

/* ---------- dogs (animated SVG) ---------- */
const DOGS = [
  { id: "Guboi", n: CONFIG.buddy, b: "#C98A4B", e: "#3A302C", x: 45, y: 6, free: 1 },
  { id: "Pandaram", n: "Pandaram", b: "#333230", e: "#5a3d2d", x: 18, y: 1, free: 1, long: 1 },
  { id: "Lara", n: "Lara", b: "#EDB95E", e: "#C98F34", x: 62, y: 10, free: 1 },
  { id: "Rolex", n: "Rolex", b: "#7A4A32", e: "#4E2E1F", x: 78, y: 3 },
  { id: "Snow", n: "Snow", b: "#D9DFE6", e: "#59636F", x: 85, y: 9 },
  { id: "slowmo", n: "slowmo", b: "#E6C9A8", e: "#9A7550", x: 92, y: 5 }
];
const buddy = DOGS[0], field = $("#field");
const dogSVG = d => `<svg viewBox="0 0 130 100" style="--b:${d.b};--e:${d.e}"><g class="tail"><path d="M30 58Q10 50 14 30" stroke="${d.b}" stroke-width="9" stroke-linecap="round" fill="none"/></g>
<ellipse cx="62" cy="66" rx="36" ry="21" fill="${d.b}"/><rect x="38" y="76" width="10" height="20" rx="5" fill="${d.b}"/><rect x="78" y="76" width="10" height="20" rx="5" fill="${d.b}"/>
<circle cx="92" cy="42" r="23" fill="${d.b}"/><ellipse cx="74" cy="32" rx="8" ry="16" fill="${d.e}" transform="rotate(14 74 32)"/><ellipse cx="108" cy="28" rx="8" ry="15" fill="${d.e}" transform="rotate(-18 108 28)"/>
<ellipse cx="104" cy="52" rx="13" ry="9" fill="#fff" opacity=".75"/><circle cx="92" cy="40" r="3.4" fill="#2B2233"/><circle cx="106" cy="40" r="3.4" fill="#2B2233"/>
<circle cx="93" cy="39" r="1" fill="#fff"/><circle cx="107" cy="39" r="1" fill="#fff"/><ellipse cx="113" cy="48" rx="4.5" ry="3.3" fill="#2B2233"/><ellipse cx="108" cy="60" rx="4" ry="5" fill="#F27D96"/><circle cx="86" cy="52" r="4" fill="#F59BB0" opacity=".6"/></svg>`;
DOGS.forEach(d => {
  const e = d.el = el("div", "dog" + (d.long ? " long" : ""));
  e.innerHTML = `<span class="tag">${d.n}</span><div class="fl">${dogSVG(d)}</div>`;
  e.style.left = d.x + "%"; e.style.setProperty("--y", d.y); e.style.zIndex = 30 - d.y;
  e.onclick = () => { burst(d); say(d, ["Woof! 🐾", "Pet me again! 🥺", "Hehe 😄", "❤️"][Math.random() * 4 | 0]); jump(d); };
  field.append(e);
});
const jump = d => { d.el.classList.add("jump"); setTimeout(() => d.el.classList.remove("jump"), 650); };
function say(d, t, ms = 2400) { d.el.querySelector(".bub")?.remove(); const b = el("div", "bub", T(t)); d.el.append(b); setTimeout(() => b.remove(), ms); }
function go(d, x) {
  return new Promise(res => {
    x = Math.max(8, Math.min(92, x)); const dist = Math.abs(x - d.x); if (dist < 1) return res();
    d.el.classList.toggle("flip", x < d.x); const ms = dist * (reduced ? 25 : 55) + 150;
    d.el.style.transitionDuration = ms + "ms"; d.el.classList.add("walk"); d.x = x; d.el.style.left = x + "%";
    setTimeout(() => { d.el.classList.remove("walk"); res(); }, ms);
  });
}
function heart(x, y, n = 4) {
  for (let i = 0; i < (reduced ? 1 : n); i++) { const h = el("span", "heart", ["❤️", "💗", "✨"][i % 3]); h.style.left = x + rnd(-20, 20) + "px"; h.style.top = y + "px"; h.style.setProperty("--dx", rnd(-30, 30) + "px"); document.body.append(h); setTimeout(() => h.remove(), 1400); }
}
function burst(d, n) { const r = d.el.getBoundingClientRect(); heart(r.left + r.width / 2, r.top, n); }

/* ---------- lightweight roaming AI ---------- */
let lock = true, follow = 50;
setInterval(() => {
  if (lock) return;
  DOGS.filter(d => d.free).forEach(d => {
    const r = Math.random();
    if (d === buddy) { go(d, follow + rnd(-8, 8)); if (r < .15) { d.el.classList.add("sit"); setTimeout(() => d.el.classList.remove("sit"), 2200); } }
    else if (r < .55) go(d, rnd(10, 90));
    else if (r < .7) { d.el.classList.add("sit"); setTimeout(() => d.el.classList.remove("sit"), 2500); }
    else if (r < .78) { d.el.classList.add("sit"); say(d, "💤", 3000); setTimeout(() => d.el.classList.remove("sit"), 3000); }
  });
}, 2800);
field.addEventListener("pointerdown", e => { if (lock || e.target.closest(".dog")) return; follow = e.clientX / innerWidth * 100; heart(e.clientX, e.clientY, 2); go(buddy, follow - 6); });
addEventListener("keydown", e => {
  const k = e.key.toLowerCase();
  if (k === "e") return void $("#b .btn")?.click();
  if (lock) return;
  if (k === "a" || k === "arrowleft") follow = Math.max(10, follow - 8); else if (k === "d" || k === "arrowright") follow = Math.min(90, follow + 8); else return;
  go(buddy, follow - 6);
});

/* ---------- panel helpers ---------- */
function show(title, text = "", btns = []) { $("#t").textContent = T(title); $("#p").textContent = T(text); $("#x").innerHTML = ""; setBtns(btns); }
function btn(label, fn, cls = "") { const b = el("button", "btn " + cls, label); b.onclick = fn; return b; }
function setBtns(list) { const b = $("#b"); b.innerHTML = ""; list.forEach(([l, f, c]) => b.append(btn(l, f, c))); }

/* ---------- effects ---------- */
const cv = $("#fx"), cx = cv.getContext("2d"); let P = [], raf = 0;
const fit = () => { cv.width = innerWidth; cv.height = innerHeight; }; fit(); addEventListener("resize", fit);
function loop() {
  cx.clearRect(0, 0, cv.width, cv.height); P = P.filter(p => p.l > 0);
  for (const p of P) { p.x += p.vx; p.y += p.vy; p.vy += p.g; p.l--; cx.globalAlpha = Math.min(1, p.l / 30); cx.fillStyle = p.c; cx.fillRect(p.x, p.y, p.s, p.s); }
  raf = P.length ? requestAnimationFrame(loop) : 0;
}
const add = a => { P.push(...a); if (!raf) raf = requestAnimationFrame(loop); };
const confetti = (n = reduced ? 20 : 90) => add(Array.from({ length: n }, () => ({ x: rnd(0, innerWidth), y: -10, vx: rnd(-1, 1), vy: rnd(1, 3), g: .03, l: 220, s: rnd(5, 10), c: rc() })));
const boom = (x, y) => { const n = reduced ? 12 : 34; add(Array.from({ length: n }, (_, i) => { const a = i / n * 6.283, s = rnd(2, 4); return { x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, g: .04, l: 70, s: 3.5, c: rc() }; })); };
function rocket() {
  const x = innerWidth * rnd(.15, .85), r = el("div", "rocket", "🚀"); r.style.left = x + "px"; document.body.append(r);
  requestAnimationFrame(() => r.style.translate = `0 -${innerHeight * .7}px`);
  setTimeout(() => { r.remove(); boom(x, innerHeight * .3); }, 900);
}
function balloons(n = reduced ? 4 : 10) {
  for (let i = 0; i < n; i++) {
    const b = el("div", "balloon", i % 3 ? "" : "♥"), s = rnd(38, 62);
    b.style.cssText += `left:${rnd(2, 92)}%;width:${s}px;height:${s * 1.25}px;background:${rc() === "#fff" ? "#F59BB0" : rc()};--d:${rnd(9, 14)}s;--sw:${rnd(-40, 40)}px;animation-delay:${rnd(0, 2)}s`;
    document.body.append(b); setTimeout(() => b.remove(), 16500);
  }
}

/* ---------- music (YouTube IFrame API, one song at a time) ---------- */
const ids = SONGS.map(s => (s.youtubeUrl.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/) || [])[1]);
let yt, cur = -1, want = -1;
function ui() { document.querySelectorAll(".chip").forEach((c, i) => { c.classList.toggle("on", i === cur); c.classList.toggle("dim", cur >= 0 && i !== cur); }); }
function play(i) { if (!ids[i]) return; if (!yt || !yt.loadVideoById) { want = i; return; } cur = i; yt.loadVideoById(ids[i]); ui(); }
function nextSong() { for (let k = 1; k <= SONGS.length; k++) { const i = (cur + k) % SONGS.length; if (ids[i]) return play(i); } }
if (!CONFIG.showMusic) $("#music").remove(); else {
  SONGS.forEach((s, i) => { const c = el("button", "chip", "♪ " + s.title); c.onclick = () => ids[i] ? play(i) : alert("Add a YouTube link for this song in script.js"); $("#chips").append(c); });
  $("#mp").onclick = () => { if (cur < 0) return play(ids.findIndex(Boolean)); yt.getPlayerState() === 1 ? yt.pauseVideo() : yt.playVideo(); };
  if (ids.some(Boolean)) {
    window.onYouTubeIframeAPIReady = () => { yt = new YT.Player("yt", { width: 104, height: 58, playerVars: { playsinline: 1, rel: 0 }, events: { onReady: () => want >= 0 && play(want), onStateChange: e => { if (e.data === 0) nextSong(); } } }); };
    document.head.append(Object.assign(el("script"), { src: "https://www.youtube.com/iframe_api" }));
  } else $("#ytbox").style.display = "none";
}

/* ---------- story ---------- */
function target() { const n = new Date(), y = n.getFullYear(), mk = yy => new Date(yy, CONFIG.birthdayMonth - 1, CONFIG.birthdayDay, CONFIG.birthdayHour || 0); let t = mk(y); if (n >= +t + 864e5) t = mk(y + 1); return t; }
const unlocked = () => CONFIG.testMode || Date.now() >= +target();

function intro() {
  const draw = () => {
    const ready = unlocked();
    show(ready ? "Welcome to Your Little World ❤️" : "Something special is waiting for you...", ready ? "A little adventure is waiting for you..." : "Your surprise is getting closer...", ready ? [["ENTER MY WORLD ✨", enter]] : [["Not yet... 🔒", () => {}, "alt"]]);
    if (!ready) { $("#b .btn").disabled = true; $("#x").innerHTML = '<div class="count"></div>'; tick(); }
  };
  const tick = () => {
    const c = $(".count"); if (!c) return;
    const s = Math.max(0, Math.floor((+target() - Date.now()) / 1e3)); if (!s && unlocked()) { draw(); confetti(); return; }
    c.innerHTML = [["DAYS", s / 86400], ["HOURS", s % 86400 / 3600], ["MINUTES", s % 3600 / 60], ["SECONDS", s % 60]].map(([l, v]) => `<b>${String(Math.floor(v)).padStart(2, "0")}<small>${l}</small></b>`).join("");
    setTimeout(tick, 1000);
  };
  draw();
}
async function enter() {
  setBtns([]); document.body.classList.remove("intro"); 
  // Show music only after clicking ENTER MY WORLD
  if (CONFIG.showMusic) {
    $("#music").style.display = "none";
    const first = ids.findIndex(Boolean);
    if (first >= 0) play(first);
  }
  await sleep(reduced ? 100 : 1500); DOGS.forEach(d => { if (d.free) jump(d); }); lock = false;
  show("Happy Paws Park 🐾", "Say hi! Tap a puppy for a cuddle, or tap the grass and " + CONFIG.buddy + " will follow you.", [["Next ❤️", feed]]);
}
async function feed() {
  show("Feed the Puppies 🍖", "Put out some treats and see who comes running.", [["GIVE FOOD 🦴", async () => {
    setBtns([]); lock = true; const bowl = el("div", "bowl", "🍖"); bowl.style.left = "50%"; field.append(bowl);
    const fr = DOGS.filter(d => d.free); await Promise.all(fr.map((d, i) => go(d, 36 + i * 14)));
    fr.forEach(d => { d.el.classList.add("eat"); burst(d); }); await sleep(1800);
    fr.forEach(d => d.el.classList.remove("eat")); bowl.remove();
    say(buddy, "Thank you! 🥺❤️"); say(DOGS[1], "You made me happy!"); DOGS.filter(d => !d.free).forEach(jump);
    await sleep(1200); lock = false; setBtns([["Next ❤️", rescue]]);
  }]]);
}
function rescue() {
  const caged = () => DOGS.filter(d => !d.free), total = caged().length; let n = 0;
  show("These little friends are waiting for someone kind.", `Dogs Rescued: 0/${total}`, [["RESCUE THEM 🐾", async () => {
    const d = caged()[0]; if (!d) return; $(".cage").classList.add("open"); d.free = 1; n++;
    await go(d, rnd(25, 60)); burst(d, 6); jump(d); $("#p").textContent = `Dogs Rescued: ${n}/${total}`;
    if (n === total) { $("#t").textContent = "Everyone is free! 🐾"; $("#p").textContent = "You gave them a place to belong."; setBtns([["PLAY WITH BUDDY 🐕", fetchGame]]); setTimeout(() => $(".cage").style.display = "none", 1000); confetti(30); }
  }]]);
}
function fetchGame() {
  show("Play with " + CONFIG.buddy + " 🐕", "Throw the ball and watch him go!", [["THROW THE BALL 🏀", throwBall]]);
}
async function throwBall() {
  setBtns([]); lock = true; const x = Math.random() < .5 ? rnd(12, 28) : rnd(72, 88);
  const ball = el("div", "ball"); ball.innerHTML = "<i>🏀</i>"; ball.style.left = "50%"; field.append(ball); await sleep(30);
  ball.style.transitionDuration = "900ms"; ball.style.left = x + "%"; await sleep(900);
  await go(buddy, x); const home = 48, ms = Math.abs(x - home) * (reduced ? 25 : 55) + 150;
  ball.style.transitionDuration = ms + "ms"; ball.style.left = (x < home ? home + 3 : home - 3) + "%"; await go(buddy, home);
  ball.firstChild.style.animation = "arc .5s ease-out"; burst(buddy); say(buddy, "Woof! 🐾"); await sleep(900); ball.remove(); lock = false;
  show("Again? 🥺", "", [["YES ❤️", throwBall], ["MAYBE LATER 😄", () => wish(0), "alt"]]);
}
function wish(i) {
  const d = DOGS[i]; if (!d) return ask(0); lock = true;
  go(d, 50); DOGS.forEach(o => o !== d && jump(o)); say(d, "🎉❤️", 6000);
  show(`${d.n} says...`, CONFIG.wishes[d.id], [["Next ❤️", () => wish(i + 1)]]); confetti(25);
}
function ask(i) {
  const q = CONFIG.questions[i]; if (!q) return gifts(); lock = false; show(q);
  const z = el("div", "qz"), no = btn("NO 😏", () => {}, "alt"); let dodge = 0, give = false;
  const yes = () => { heart(innerWidth / 2, innerHeight * .3, 6); jump(buddy); say(buddy, "Yay! ❤️"); confetti(25); setTimeout(() => ask(i + 1), 700); };
  const y = btn("YES ❤️", yes); y.style.left = "12%"; no.style.left = "58%";
  const run = e => {
    if (give) return; e.preventDefault();
    if (++dodge > 6) { give = true; no.textContent = "Okay, YES ❤️"; no.classList.remove("alt"); no.onclick = yes; return; }
    no.style.left = rnd(0, z.clientWidth - no.offsetWidth) + "px"; no.style.top = rnd(0, z.clientHeight - no.offsetHeight) + "px";
  };
  no.onpointerenter = run; no.onpointerdown = run; z.append(y, no); $("#x").append(z);
}
function openModal(html, cls = "") { const m = $("#modal"); m.innerHTML = `<div class="sheet ${cls}">${html}</div>`; m.classList.add("show"); return m.firstChild; }
const closeModal = () => $("#modal").classList.remove("show");
function gifts() {
  show("Find the Gifts 🎁", "Open all three."); let opened = 0; const row = el("div", "gifts");
  CONFIG.gifts.forEach(g => {
    const b = el("button", "gift", g.icon); b.setAttribute("aria-label", g.title);
    b.onclick = () => {
      const s = openModal(`<h1>${g.title}</h1><p></p>`); s.querySelector("p").textContent = T(g.text);
      if (g.image) { const im = new Image(); im.alt = g.title; im.onload = () => s.prepend(im); im.src = g.image; }
      s.append(btn("Close ✨", () => { closeModal(); if (!b.classList.contains("done")) { b.classList.add("done"); if (++opened === CONFIG.gifts.length) setBtns([["OPEN THE LETTER 💌", letter]]); } }));
      heart(innerWidth / 2, innerHeight / 2, 6); burst(buddy);
    };
    row.append(b);
  });
  $("#x").append(row);
}
async function letter() {
  show("A Letter For You 💌", "Tap the envelope."); const e = el("button", "env"); e.setAttribute("aria-label", "Open the letter"); $("#x").append(e);
  e.onclick = async () => {
    e.classList.add("open"); await sleep(reduced ? 50 : 900); const s = openModal("", "letter"), txt = T(CONFIG.letter); let i = 0, done = false;
    const finish = () => { done = true; s.textContent = txt; s.append(btn("Continue ✨", () => { closeModal(); finale(); })); };
    s.onclick = () => { if (!done) { i = txt.length; finish(); } };
    const step = () => { if (done) return; if (i >= txt.length) return finish(); s.textContent = txt.slice(0, ++i); setTimeout(step, reduced ? 1 : 32); }; step();
  };
}
let fireTimer, heartTimer;
async function finale() {
  document.body.classList.add("party"); lock = false; clearInterval(fireTimer); clearInterval(heartTimer); setBtns([]); $("#x").innerHTML = "";
  DOGS.forEach(d => { d.free = 1; jump(d); }); balloons(); confetti(); rocket();
  fireTimer = setInterval(() => { rocket(); balloons(3); confetti(30); DOGS.forEach(d => Math.random() < .5 && jump(d)); }, 3000);
  heartTimer = setInterval(() => heart(rnd(0, innerWidth), innerHeight * .6, 1), 700);
  for (const [i, l] of CONFIG.finale.entries()) { show(l, ""); $("#t").style.fontSize = i < 2 ? "clamp(1.8rem,8vw,2.6rem)" : ""; await sleep(2400); }
  show(CONFIG.finale[0], T(CONFIG.finale[1]), [["Replay the Magic ✨", finale]]); $("#t").style.fontSize = "clamp(1.8rem,8vw,2.6rem)";
}
intro();
