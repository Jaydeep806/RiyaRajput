import { useEffect } from 'react';


import photo1 from './assets/riya.jpeg';
import photo2 from './assets/riya1.jpeg';
import photo3 from './assets/riya3.jpeg';

import musicTrack from './assets/mysong.mp3';

export default function BirthdayPage() {
  useEffect(() => {
    // ---------- inject Google Fonts (was <link> tags in <head>) ----------
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = 'https://fonts.googleapis.com';
    document.head.appendChild(preconnect);

    const fontLink = document.createElement('link');
    fontLink.href =
      'https://fonts.googleapis.com/css2?family=Great+Vibes&family=Caveat:wght@500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    const prevTitle = document.title;
    document.title = 'Happy Birthday, Riya!';

    // ---------- Starfield ----------
    const sky = document.getElementById('sky');
    const starCount = window.innerWidth < 600 ? 60 : 120;
    const starEls = [];
    for (let i = 0; i < starCount; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      s.style.left = Math.random() * 100 + 'vw';
      s.style.top = Math.random() * 100 + 'vh';
      s.style.animationDuration = 1.5 + Math.random() * 3 + 's';
      s.style.animationDelay = Math.random() * 3 + 's';
      const size = Math.random() * 1.6 + 1;
      s.style.width = size + 'px';
      s.style.height = size + 'px';
      sky.appendChild(s);
      starEls.push(s);
    }

    // ---------- Rising balloons ----------
    const balloonContainer = document.getElementById('balloons');
    const colors = ['#ff3fa4', '#4de3ff', '#ffd166', '#a06bff', '#ff8ba7'];
    const balloonCount = window.innerWidth < 600 ? 6 : 10;
    const balloonEls = [];
    for (let i = 0; i < balloonCount; i++) {
      const b = document.createElement('div');
      b.className = 'balloon';
      b.style.left = Math.random() * 90 + 'vw';
      b.style.setProperty('--sway', Math.random() * 60 - 30 + 'px');
      b.style.animationDuration = 14 + Math.random() * 10 + 's';
      b.style.animationDelay = Math.random() * -20 + 's';
      const color = colors[Math.floor(Math.random() * colors.length)];
      b.innerHTML = `<div class="body" style="background:${color}"></div><div class="string"></div>`;
      balloonContainer.appendChild(b);
      balloonEls.push(b);
    }

    // ---------- Blow out candles + confetti + wish reveal ----------
    const blowBtn = document.getElementById('blowBtn');
    const wishReveal = document.getElementById('wishReveal');
    let blown = false;

    const confettiEls = [];
    function burstConfetti() {
      const cColors = ['#ff3fa4', '#4de3ff', '#ffd166', '#a06bff', '#f5f6ff'];
      for (let i = 0; i < 60; i++) {
        const c = document.createElement('div');
        c.className = 'confetti-piece';
        c.style.left = Math.random() * 100 + 'vw';
        c.style.background = cColors[Math.floor(Math.random() * cColors.length)];
        c.style.animationDelay = Math.random() * 0.4 + 's';
        c.style.animationDuration = 2 + Math.random() * 1.4 + 's';
        c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        document.body.appendChild(c);
        confettiEls.push(c);
        setTimeout(() => c.remove(), 4200);
      }
    }

    const exciteBlock = document.getElementById('exciteBlock');
    const exciteYes = document.getElementById('exciteYes');
    const exciteNo = document.getElementById('exciteNo');
    const exciteResponse = document.getElementById('exciteResponse');

    let exciteTimeoutId = null;
    function handleBlow() {
      if (blown) return;
      blown = true;
      document.querySelectorAll('.candle-flame').forEach((f) => f.classList.add('out'));
      burstConfetti();
      wishReveal.classList.add('show');
      blowBtn.textContent = 'Wish made ✦';
      blowBtn.disabled = true;
      exciteTimeoutId = setTimeout(() => exciteBlock.classList.add('show'), 900);
    }

    function handleExciteYes() {
      burstConfetti();
      exciteResponse.textContent = "Yay! Here's to a wonderful year ahead ✨";
      exciteResponse.classList.add('show');
      exciteYes.disabled = true;
      exciteNo.disabled = true;
    }

    function handleExciteNo() {
      exciteResponse.textContent = "That's okay — just enjoy today, the rest will follow 💛";
      exciteResponse.classList.add('show');
      exciteYes.disabled = true;
      exciteNo.disabled = true;
    }

    blowBtn.addEventListener('click', handleBlow);
    exciteYes.addEventListener('click', handleExciteYes);
    exciteNo.addEventListener('click', handleExciteNo);

    // ---------- Background music (your own downloaded track) ----------
    const musicToggle = document.getElementById('musicToggle');
    let isPlaying = false;

    // musicTrack is the imported audio file (see the `import musicTrack from
    // './assets/your-song.mp3'` line near the top of this file).
    const audioEl = new Audio(musicTrack);
    audioEl.loop = true;
    audioEl.volume = 0.5;
    audioEl.preload = 'auto';

    function startMusic() {
      audioEl.muted = true;
      audioEl
        .play()
        .then(() => {
          isPlaying = true;
          musicToggle.classList.add('playing');
          musicToggle.setAttribute('aria-pressed', 'true');
          musicToggle.setAttribute('aria-label', 'Pause background music');
        })
        .catch(() => {
          /* blocked until a user gesture — the gesture listeners below will retry */
        });
    }

    function stopMusic() {
      audioEl.pause();
      isPlaying = false;
      musicToggle.classList.remove('playing');
      musicToggle.setAttribute('aria-pressed', 'false');
      musicToggle.setAttribute('aria-label', 'Play background music');
    }

    function handleMusicToggle() {
      if (isPlaying) {
        stopMusic();
      } else {
        startMusic();
      }
    }
    musicToggle.addEventListener('click', handleMusicToggle);

    // ---------- Vintage envelope open/close ----------
    const envelope = document.getElementById('envelope');
    const envelopeHint = document.getElementById('envelopeHint');
    const letterCard = document.getElementById('letterCard');
    const letterCloseHint = document.getElementById('letterCloseHint');
    let envelopeOpenedOnce = false;
    let envelopeConfettiId = null;

    function handleEnvelopeClick() {
      const opening = !envelope.classList.contains('open');
      envelope.classList.toggle('open');
      letterCard.classList.toggle('show', opening);
      letterCloseHint.classList.toggle('show', opening);
      envelopeHint.classList.toggle('hidden', opening);
      if (opening && !envelopeOpenedOnce) {
        envelopeOpenedOnce = true;
        envelopeConfettiId = setTimeout(burstConfetti, 450);
      }
    }
    envelope.addEventListener('click', handleEnvelopeClick);

    // ---------- Attempt autoplay on load, loop forever ----------
    // Browsers block audio until a user gesture, so we try immediately,
    // and if blocked, start on the very first tap/click/scroll/key anywhere.
    function tryAutoplay() {
      if (isPlaying) return;
      try {
        startMusic();
      } catch (e) {
        /* will retry on first gesture below */
      }
    }

    window.addEventListener('load', tryAutoplay);
    // In case 'load' already fired before this effect ran, try immediately too.
    tryAutoplay();

    const gestureEvents = ['click', 'touchstart', 'keydown', 'scroll'];
    function firstGestureStart() {
      audioEl.muted = false; 
      if (!isPlaying) startMusic();
      gestureEvents.forEach((evt) => window.removeEventListener(evt, firstGestureStart));
    }
    gestureEvents.forEach((evt) =>
      window.addEventListener(evt, firstGestureStart, { once: true, passive: true })
    );

    // ---------- cleanup on unmount ----------
    return () => {
      document.title = prevTitle;
      preconnect.remove();
      fontLink.remove();

      starEls.forEach((el) => el.remove());
      balloonEls.forEach((el) => el.remove());
      confettiEls.forEach((el) => el.remove());

      blowBtn.removeEventListener('click', handleBlow);
      exciteYes.removeEventListener('click', handleExciteYes);
      exciteNo.removeEventListener('click', handleExciteNo);
      musicToggle.removeEventListener('click', handleMusicToggle);
      envelope.removeEventListener('click', handleEnvelopeClick);
      window.removeEventListener('load', tryAutoplay);
      gestureEvents.forEach((evt) => window.removeEventListener(evt, firstGestureStart));

      clearTimeout(exciteTimeoutId);
      clearTimeout(envelopeConfettiId);
      audioEl.pause();
      audioEl.src = '';
    };
  }, []);

  return (
    <>
      <style>{`
  :root{
    --navy-deep:#070a1f;
    --navy:#0e1440;
    --indigo:#1c1f5e;
    --magenta:#ff3fa4;
    --cyan:#4de3ff;
    --gold:#ffd166;
    --white:#f5f6ff;
  }

  *{margin:0;padding:0;box-sizing:border-box;}
  html{scroll-behavior:smooth;}

  body{
    background:
      radial-gradient(ellipse at 20% 10%, rgba(77,227,255,0.10), transparent 45%),
      radial-gradient(ellipse at 80% 0%, rgba(255,63,164,0.14), transparent 50%),
      linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 55%, var(--indigo) 100%);
    color:var(--white);
    font-family:'Poppins', sans-serif;
    overflow-x:hidden;
    min-height:100vh;
  }

  @media (prefers-reduced-motion: reduce){
    *{animation-duration:0.01ms !important; animation-iteration-count:1 !important; transition-duration:0.01ms !important;}
  }

  /* ---------- Starfield ---------- */
  .sky{position:fixed; inset:0; z-index:0; overflow:hidden; pointer-events:none;}
  .star{
    position:absolute;
    width:2px; height:2px;
    background:#fff;
    border-radius:50%;
    animation:twinkle ease-in-out infinite;
  }
  @keyframes twinkle{
    0%,100%{ opacity:0.15; transform:scale(1); }
    50%{ opacity:1; transform:scale(1.6); }
  }

  /* ---------- Balloons ---------- */
  .balloons{position:fixed; inset:0; z-index:1; overflow:hidden; pointer-events:none;}
  .balloon{
    position:absolute;
    bottom:-20%;
    animation:rise linear infinite;
  }
  .balloon .body{
    width:46px; height:58px;
    border-radius:50% 50% 50% 50% / 55% 55% 45% 45%;
    position:relative;
    box-shadow:inset -6px -8px 14px rgba(0,0,0,0.18), inset 6px 6px 10px rgba(255,255,255,0.25);
  }
  .balloon .body::after{
    content:'';
    position:absolute;
    left:50%; bottom:-8px;
    width:0; height:0;
    border-left:5px solid transparent;
    border-right:5px solid transparent;
    border-top:8px solid inherit;
    transform:translateX(-50%);
  }
  .balloon .string{
    width:1px; height:70px;
    background:rgba(255,255,255,0.35);
    margin:0 auto;
  }
  @keyframes rise{
    0%{ transform:translateY(0) translateX(0) rotate(-4deg); }
    50%{ transform:translateY(-60vh) translateX(var(--sway, 30px)) rotate(4deg); }
    100%{ transform:translateY(-125vh) translateX(0) rotate(-4deg); }
  }

  /* ---------- Hero ---------- */
  .hero{
    position:relative;
    min-height:100svh;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    text-align:center;
    padding:6vh 6vw;
    z-index:2;
  }

  .eyebrow{
    letter-spacing:0.5em;
    font-size:0.68rem;
    text-transform:uppercase;
    color:var(--cyan);
    opacity:0;
    animation:fadeUp 1s ease forwards 0.4s;
  }

  h1.name{
    font-family:'Great Vibes', cursive;
    font-weight:400;
    font-size:clamp(3.2rem, 13vw, 8rem);
    line-height:1.1;
    margin-top:0.6rem;
    color:var(--white);
    opacity:0;
    animation:fadeUp 1s ease forwards 0.7s, glow 3s ease-in-out infinite 1.8s;
  }
  h1.name .riya{
    display:block;
    font-size:1.25em;
    background:linear-gradient(90deg, var(--magenta), var(--gold), var(--cyan), var(--magenta));
    background-size:300% auto;
    -webkit-background-clip:text;
    background-clip:text;
    color:transparent;
    animation:fadeUp 1s ease forwards 0.7s, shimmer 6s linear infinite 1.8s;
  }
  @keyframes shimmer{ to{ background-position:300% center; } }
  @keyframes glow{
    0%,100%{ filter:drop-shadow(0 0 14px rgba(255,63,164,0.55)) drop-shadow(0 0 30px rgba(77,227,255,0.25)); }
    50%{ filter:drop-shadow(0 0 26px rgba(255,63,164,0.85)) drop-shadow(0 0 46px rgba(77,227,255,0.45)); }
  }

  .tagline{
    max-width:480px;
    font-size:clamp(1rem, 2.4vw, 1.15rem);
    font-weight:300;
    line-height:1.7;
    color:var(--white);
    opacity:0;
    margin-top:1.6rem;
    animation:fadeUp 1s ease forwards 1.3s;
  }
  .tagline .accent{ color:var(--gold); font-weight:600; }

  @keyframes fadeUp{
    from{opacity:0; transform:translateY(18px);}
    to{opacity:1; transform:translateY(0);}
  }

  .scroll-cue{
    margin-top:3.2rem;
    font-size:0.65rem;
    letter-spacing:0.35em;
    text-transform:uppercase;
    color:var(--cyan);
    opacity:0;
    animation:fadeUp 1s ease forwards 1.8s, bob 2.4s ease-in-out infinite 2.8s;
  }
  @keyframes bob{ 0%,100%{transform:translateY(0);} 50%{transform:translateY(8px);} }

  /* ---------- Section shared ---------- */
  section{ position:relative; z-index:2; padding:8vh 6vw; }
  .section-inner{ max-width:920px; margin:0 auto; text-align:center; }
  .section-title{
    font-family:'Great Vibes', cursive;
    font-size:clamp(2.2rem, 6vw, 3.6rem);
    font-weight:400;
    margin-bottom:0.4rem;
    color:var(--white);
  }
  .section-sub{
    color:var(--cyan);
    font-size:0.78rem;
    letter-spacing:0.25em;
    text-transform:uppercase;
    margin-bottom:2.6rem;
    opacity:0.85;
  }

  /* ---------- Cake / candle interaction ---------- */
  .cake-wrap{ display:flex; flex-direction:column; align-items:center; gap:2.4rem; }
  .cake-scene{ position:relative; width:min(320px, 70vw); }
  .cake-svg{ width:100%; height:auto; display:block; filter:drop-shadow(0 0 26px rgba(255,63,164,0.25)); }
  .candle-flame{ transform-origin:center bottom; animation:flicker 1.6s ease-in-out infinite; }
  .candle-flame.out{ animation:none; opacity:0; transition:opacity 0.5s ease; }
  @keyframes flicker{
    0%,100%{ transform:scale(1) rotate(-2deg); }
    50%{ transform:scale(1.12) rotate(3deg); }
  }

  .blow-btn{
    font-family:'Poppins', sans-serif;
    font-size:0.82rem;
    letter-spacing:0.14em;
    text-transform:uppercase;
    background:transparent;
    color:var(--gold);
    border:1px solid var(--gold);
    padding:0.9rem 2.2rem;
    border-radius:999px;
    cursor:pointer;
    transition:all 0.35s ease;
  }
  .blow-btn:hover, .blow-btn:focus-visible{
    background:var(--gold);
    color:var(--navy-deep);
    box-shadow:0 0 26px rgba(255,209,102,0.55);
  }
  .blow-btn:disabled{ opacity:0.4; cursor:default; }

  .wish-reveal{
    max-width:560px;
    font-family:'Great Vibes', cursive;
    font-size:clamp(1.6rem, 3.6vw, 2.1rem);
    color:var(--white);
    line-height:1.5;
    opacity:0;
    max-height:0;
    overflow:hidden;
    transition:opacity 0.9s ease, max-height 0.9s ease, margin 0.9s ease;
  }
  .wish-reveal.show{ opacity:1; max-height:300px; margin-top:0.6rem; }

  .excite{
    opacity:0;
    max-height:0;
    overflow:hidden;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:1rem;
    transition:opacity 0.8s ease, max-height 0.8s ease, margin 0.8s ease;
  }
  .excite.show{ opacity:1; max-height:220px; margin-top:0.8rem; }
  .excite-q{
    font-size:0.95rem;
    letter-spacing:0.04em;
    color:var(--white);
    opacity:0.9;
  }
  .excite-btns{ display:flex; gap:0.9rem; }
  .excite-btn{
    font-family:'Poppins', sans-serif;
    font-size:0.85rem;
    font-weight:600;
    padding:0.65rem 1.8rem;
    border-radius:999px;
    cursor:pointer;
    transition:all 0.3s ease;
  }
  .excite-btn.yes{
    border:none;
    background:linear-gradient(135deg, var(--magenta), #a06bff);
    color:var(--white);
    box-shadow:0 0 18px rgba(255,63,164,0.4);
  }
  .excite-btn.yes:hover, .excite-btn.yes:focus-visible{
    transform:translateY(-2px);
    box-shadow:0 0 26px rgba(255,63,164,0.65);
  }
  .excite-btn.no{
    background:transparent;
    border:1px solid rgba(245,246,255,0.4);
    color:var(--white);
  }
  .excite-btn.no:hover, .excite-btn.no:focus-visible{
    border-color:var(--cyan);
    color:var(--cyan);
  }
  .excite-response{
    font-family:'Great Vibes', cursive;
    font-size:clamp(1.4rem, 3.2vw, 1.8rem);
    color:var(--gold);
    opacity:0;
    max-height:0;
    overflow:hidden;
    transition:opacity 0.7s ease, max-height 0.7s ease, margin 0.7s ease;
  }
  .excite-response.show{ opacity:1; max-height:200px; margin-top:0.4rem; }

  /* confetti */
  .confetti-piece{
    position:fixed; top:-5%;
    width:9px; height:14px;
    z-index:5;
    pointer-events:none;
    animation:confettiFall 2.6s ease-in forwards;
  }
  @keyframes confettiFall{
    0%{ transform:translateY(0) rotate(0deg); opacity:1; }
    100%{ transform:translateY(105vh) rotate(720deg); opacity:0; }
  }

  /* ---------- Wish cards ---------- */
  .wish-grid{
    display:grid;
    grid-template-columns:repeat(auto-fit, minmax(230px, 1fr));
    gap:1.4rem;
    margin-top:1rem;
  }
  .wish-card{
    background:linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
    border:1px solid rgba(77,227,255,0.25);
    border-radius:18px;
    padding:2rem 1.6rem;
    text-align:left;
    transition:transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
  }
  .wish-card:hover{
    transform:translateY(-6px);
    border-color:var(--magenta);
    box-shadow:0 0 24px rgba(255,63,164,0.2);
  }
  .wish-mark{ font-family:'Great Vibes', cursive; font-size:2.6rem; color:var(--magenta); line-height:1; display:block; margin-bottom:0.4rem;}
  .wish-text{ font-size:0.98rem; font-weight:300; line-height:1.75; color:var(--white); opacity:0.9;}

  /* ---------- Photo gallery ---------- */
  .gallery-grid{
    display:grid;
    grid-template-columns:repeat(3, 1fr);
    gap:1.2rem;
    margin-top:1rem;
  }
  @media (max-width:640px){
    .gallery-grid{ grid-template-columns:1fr; max-width:340px; margin-left:auto; margin-right:auto; }
  }
  .gallery-item{
    position:relative;
    border-radius:18px;
    overflow:hidden;
    aspect-ratio:3/4;
    border:1px solid rgba(255,209,102,0.3);
    box-shadow:0 0 24px rgba(255,63,164,0.15);
    transition:transform 0.4s ease, box-shadow 0.4s ease;
  }
  .gallery-item:hover{
    transform:translateY(-6px) scale(1.02);
    box-shadow:0 0 34px rgba(255,63,164,0.35);
  }
  .gallery-item img{
    width:100%; height:100%;
    object-fit:cover;
    display:block;
  }
  .gallery-item::after{
    content:'';
    position:absolute; inset:0;
    background:linear-gradient(180deg, transparent 60%, rgba(7,10,31,0.55) 100%);
    pointer-events:none;
  }

  /* ---------- Footer ---------- */
  footer{ text-align:center; padding:6vh 6vw 8vh; position:relative; z-index:2; }
  footer p{ font-family:'Great Vibes', cursive; font-size:1.7rem; color:var(--cyan); }
  footer span{ display:block; margin-top:0.5rem; font-size:0.68rem; letter-spacing:0.32em; text-transform:uppercase; color:var(--gold); opacity:0.75;}

  :focus-visible{ outline:2px solid var(--gold); outline-offset:3px; }

  /* ---------- Music toggle ---------- */
  .music-toggle{
    position:fixed; top:1.4rem; right:1.4rem; z-index:10;
    width:52px; height:52px; border-radius:50%;
    border:1px solid rgba(255,209,102,0.5);
    background:rgba(14,20,64,0.55);
    backdrop-filter:blur(6px);
    color:var(--gold);
    display:flex; align-items:center; justify-content:center;
    cursor:pointer;
    transition:all 0.35s ease;
  }
  .music-toggle:hover, .music-toggle:focus-visible{
    background:var(--gold);
    color:var(--navy-deep);
    box-shadow:0 0 22px rgba(255,209,102,0.5);
  }
  .music-toggle svg{ width:20px; height:20px; }
  .music-toggle .bar{ display:none; gap:2px; align-items:flex-end; height:16px; }
  .music-toggle.playing .icon-note{ display:none; }
  .music-toggle.playing .bar{ display:flex; }
  .music-toggle .bar span{ width:3px; background:currentColor; border-radius:2px; animation:eq 0.9s ease-in-out infinite; }
  .music-toggle .bar span:nth-child(1){ height:6px; animation-delay:0s; }
  .music-toggle .bar span:nth-child(2){ height:14px; animation-delay:0.15s; }
  .music-toggle .bar span:nth-child(3){ height:9px; animation-delay:0.3s; }
  @keyframes eq{ 0%,100%{ transform:scaleY(0.5); } 50%{ transform:scaleY(1); } }
  /* ---------- Vintage envelope + letter ---------- */
  #letter-section{ padding-bottom:2vh; }
  .envelope-wrap{
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:1.6rem;
  }
  .envelope-hint{
    font-size:0.85rem;
    letter-spacing:0.08em;
    color:var(--cyan);
    opacity:0.85;
    transition:opacity 0.4s ease;
  }
  .envelope-hint.hidden{ opacity:0; height:0; }

  .envelope{
    position:relative;
    width:min(280px, 74vw);
    height:170px;
    cursor:pointer;
  }
  .env-back{
    position:absolute; inset:0;
    background:linear-gradient(160deg, #d9c3a1, #c7a877);
    border-radius:6px;
    box-shadow:0 12px 30px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(90,65,30,0.3);
    z-index:1;
    overflow:hidden;
  }
  .env-back::before{
    content:'';
    position:absolute; inset:8px;
    border:1px dashed rgba(90,65,30,0.35);
    border-radius:3px;
  }
  .env-back::after{
    /* the visible V-shaped inner fold of the pocket */
    content:'';
    position:absolute;
    top:0; left:0; width:100%; height:100%;
    background:linear-gradient(135deg, transparent 49.3%, rgba(90,65,30,0.18) 50%, transparent 50.7%),
               linear-gradient(45deg, transparent 49.3%, rgba(90,65,30,0.18) 50%, transparent 50.7%);
    background-size:100% 100%;
    background-position:top left, top right;
    background-repeat:no-repeat;
    opacity:0.6;
  }

  .env-flap{
    position:absolute; top:0; left:0; width:100%; height:56%;
    background:linear-gradient(160deg, #e3cda6, #c7a877);
    clip-path:polygon(0 0, 100% 0, 50% 100%);
    transform-origin:top center;
    transition:transform 0.8s cubic-bezier(.4,.2,.2,1), opacity 0.3s ease 0.5s;
    z-index:3;
    box-shadow:0 2px 6px rgba(0,0,0,0.15);
  }
  .envelope.open .env-flap{ transform:rotateX(-165deg); opacity:0.15; }

  .env-seal{
    position:absolute;
    top:calc(56% - 22px);
    left:50%;
    transform:translateX(-50%);
    width:44px; height:44px;
    border-radius:50%;
    background:radial-gradient(circle at 35% 30%, #e0517a, #a3123f);
    box-shadow:0 3px 8px rgba(0,0,0,0.35);
    z-index:4;
    display:flex; align-items:center; justify-content:center;
    transition:opacity 0.4s ease, transform 0.4s ease;
  }
  .env-seal svg{ width:20px; height:20px; }
  .envelope.open .env-seal{ opacity:0; transform:translateX(-50%) scale(0.4); }

  .envelope:hover .env-flap{ filter:brightness(1.05); }

  /* the letter itself: a separate card that expands below the envelope */
  .letter-card{
    width:min(480px, 88vw);
    background:linear-gradient(180deg, #fdf6e3, #f7ecd0);
    border-radius:10px;
    box-shadow:0 14px 34px rgba(0,0,0,0.35);
    max-height:0;
    opacity:0;
    overflow:hidden;
    transform:translateY(-14px);
    transition:max-height 0.9s cubic-bezier(.2,.8,.25,1), opacity 0.7s ease, transform 0.7s ease, padding 0.9s ease;
    padding:0 1.6rem;
  }
  .letter-card.show{
    max-height:600px;
    opacity:1;
    transform:translateY(0);
    padding:1.8rem 1.6rem;
  }
  .letter-card .letter-text{
    font-family:'Caveat', cursive;
    font-size:clamp(1.1rem, 3vw, 1.35rem);
    line-height:1.6;
    color:#3a2b12;
  }

  .letter-close-hint{
    font-size:0.7rem;
    letter-spacing:0.1em;
    color:var(--white);
    opacity:0;
    max-height:0;
    transition:opacity 0.6s ease 0.6s;
  }
  .letter-close-hint.show{ opacity:0.6; }
      `}</style>

      <button className="music-toggle" id="musicToggle" aria-label="Play background music" aria-pressed="false">
        <svg
          className="icon-note"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
        <span className="bar" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      <div className="sky" id="sky"></div>
      <div className="balloons" id="balloons"></div>

      <section className="hero">
        <p className="eyebrow">A little celebration, just for you</p>
        <h1 className="name">
          Happy Birthday
          <span className="riya">Riya Rajput</span>
        </h1>
        <p className="tagline">
          Another beautiful year begins today. May it be filled with <span className="accent">laughter</span>,{' '}
          <span className="accent">love</span>, and every little thing that makes you smile.
        </p>
        <p className="scroll-cue">scroll down ↓</p>
      </section>

      <section id="cake">
        <div className="section-inner">
          <p className="section-sub">Make a wish</p>
          <h2 className="section-title">Blow out the candles</h2>

          <div className="cake-wrap">
            <div className="cake-scene">
              <svg className="cake-svg" viewBox="0 0 300 260" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <ellipse cx="150" cy="235" rx="120" ry="14" fill="#1c1f5e" />
                <rect x="55" y="170" width="190" height="55" rx="10" fill="#ff3fa4" />
                <rect x="55" y="170" width="190" height="14" rx="7" fill="#ffb3de" />
                <rect x="90" y="120" width="120" height="55" rx="10" fill="#ff6fbd" />
                <rect x="90" y="120" width="120" height="14" rx="7" fill="#ffd9ef" />
                <circle cx="100" cy="176" r="6" fill="#ffd9ef" />
                <circle cx="150" cy="180" r="7" fill="#ffd9ef" />
                <circle cx="200" cy="176" r="6" fill="#ffd9ef" />
                <g>
                  <rect x="115" y="90" width="7" height="32" fill="#ffd166" />
                  <rect x="147" y="82" width="7" height="40" fill="#ffd166" />
                  <rect x="179" y="90" width="7" height="32" fill="#ffd166" />
                </g>
                <g id="flames">
                  <ellipse className="candle-flame f1" cx="118.5" cy="84" rx="5" ry="9" fill="#4de3ff" />
                  <ellipse className="candle-flame f2" cx="150.5" cy="76" rx="5.5" ry="10" fill="#ffd166" />
                  <ellipse className="candle-flame f3" cx="182.5" cy="84" rx="5" ry="9" fill="#4de3ff" />
                </g>
              </svg>
            </div>

            <button className="blow-btn" id="blowBtn">
              Blow out candles
            </button>

            <p className="wish-reveal" id="wishReveal">
              Riya, may this year hand you every dream you've been quietly chasing, and a few sweet surprises you
              never saw coming. Happy Birthday!
            </p>

            <div className="excite" id="exciteBlock">
              <p className="excite-q">Are you excited for what's next?</p>
              <div className="excite-btns">
                <button className="excite-btn yes" id="exciteYes">
                  Yes
                </button>
                <button className="excite-btn no" id="exciteNo">
                  No
                </button>
              </div>
              <p className="excite-response" id="exciteResponse"></p>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery">
        <div className="section-inner">
          <p className="section-sub">Moments to remember</p>
          <h2 className="section-title">Riya, through the year</h2>

          <div className="gallery-grid">
            <div className="gallery-item">
              <img src={photo1} alt="Riya smiling" />
            </div>
            <div className="gallery-item">
              <img src={photo2} alt="Riya smiling" />
            </div>
            <div className="gallery-item">
              <img src={photo3} alt="Riya smiling" />
            </div>
          </div>
        </div>
      </section>

      <section id="wishes">
        <div className="section-inner">
          <p className="section-sub">Birthday Wishes</p>
          <h2 className="section-title">For Riya, with love</h2>

          <div className="wish-grid">
            <div className="wish-card">
              <span className="wish-mark">"</span>
              <p className="wish-text">
                Here's to another year of being unapologetically you — bold, kind, and brighter than you know.
              </p>
            </div>
            <div className="wish-card">
              <span className="wish-mark">"</span>
              <p className="wish-text">
                May your birthday be the gentle start of a year that gives back every bit of good you put into the
                world.
              </p>
            </div>
            <div className="wish-card">
              <span className="wish-mark">"</span>
              <p className="wish-text">
                Wishing you sunlit mornings, easy laughter, and people around you who feel like home.
              </p>
            </div>
            <div className="wish-card">
              <span className="wish-mark">"</span>
              <p className="wish-text">Not older, just more magnificent. Happy Birthday to someone truly one of a kind.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="letter-section">
        <div className="section-inner">
          <p className="section-sub">One last thing</p>
          <h2 className="section-title">A little note for you</h2>

          <div className="envelope-wrap">
            <p className="envelope-hint" id="envelopeHint">
              tap the envelope to open
            </p>

            <div className="envelope" id="envelope">
              <div className="env-back"></div>
              <div className="env-flap"></div>
              <div className="env-seal">
                <svg viewBox="0 0 24 24" fill="#ffd9e6">
                  <path d="M12 21s-7.5-4.6-10-9.3C.3 8.7 2 5 5.6 5c2 0 3.4 1.1 4.4 2.6C11 6.1 12.4 5 14.4 5 18 5 19.7 8.7 22 11.7 14.5 16.4 12 21 12 21z" />
                </svg>
              </div>
            </div>

            <div className="letter-card" id="letterCard">
              <p className="letter-text">
                Dear Riya,
                <br />
                <br />
                bhai tu na bht mast dost hai yaar, lifetime tere sath rahh luu fir v bore nhi ho sakta.
                <br />
                <br />
                mai chahta huu apna life tu enjoy kare, kvi kisi chiz ka tension na ho. life tu jaisa chill jii rhi
                hai waisa hii bus, dont stop, keep moving.
                <br />
                <br />
                and kuch khatarnak kar life me placement me, taki tumhare papa aur family proud feel kare.
                <br />
                <br />
                you are my tension buster. i love you loli. 💛
              </p>
            </div>

            <p className="letter-close-hint" id="letterCloseHint">
              tap the envelope again to close
            </p>
          </div>
        </div>
      </section>

      <footer>
        <p>With warmest wishes, today and always</p>
        <span>Happy Birthday Riya</span>
      </footer>
    </>
  );
}