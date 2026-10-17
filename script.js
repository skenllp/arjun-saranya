// =============================================
//   ARJUN & SHARANYA WEDDING WEBSITE - script.js
// =============================================

let musicPlaying = false;

// ---- Open Invitation + Autoplay Music ----
function openInvitation() {
  const welcome = document.getElementById('welcome-screen');
  const main    = document.getElementById('main-site');
  const audio   = document.getElementById('bg-music');

  // Fade out welcome
  welcome.style.opacity    = '0';
  welcome.style.transition = 'opacity 0.8s ease';

  // Autoplay music triggered by this user gesture click
  audio.volume = 0;
  audio.play().then(() => {
    musicPlaying = true;
    updateMusicIcon(true);
    // Fade music in smoothly
    fadeVolume(audio, 0, 0.5, 2000);
  }).catch(() => {
    // Autoplay blocked silently — user can click music button
  });

  setTimeout(() => {
    welcome.style.display = 'none';
    main.classList.remove('hidden');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        main.classList.add('visible');
      });
    });
    window.scrollTo(0, 0);
    startCountdown();
    initScrollAnimations();
  }, 800);
}

// ---- Smooth volume fade ----
function fadeVolume(audio, from, to, duration) {
  const steps    = 60;
  const interval = duration / steps;
  const step     = (to - from) / steps;
  let   current  = from;

  const timer = setInterval(() => {
    current += step;
    audio.volume = Math.min(Math.max(current, 0), 1);
    if ((step > 0 && current >= to) || (step < 0 && current <= to)) {
      audio.volume = to;
      clearInterval(timer);
      if (to === 0) audio.pause();
    }
  }, interval);
}

// ---- Music Toggle (floating button) ----
function toggleMusic() {
  const audio = document.getElementById('bg-music');

  if (musicPlaying) {
    fadeVolume(audio, audio.volume, 0, 800);
    musicPlaying = false;
    updateMusicIcon(false);
  } else {
    audio.play().then(() => {
      fadeVolume(audio, 0, 0.5, 800);
      musicPlaying = true;
      updateMusicIcon(true);
    }).catch(() => {});
  }
}

// ---- Update music icon ----
function updateMusicIcon(playing) {
  const icon = document.getElementById('music-icon');
  if (playing) {
    // Speaker / playing icon
    icon.innerHTML = '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>';
  } else {
    // Muted icon
    icon.innerHTML = '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>';
  }
}

// ---- Countdown Timer ----
function startCountdown() {
  const weddingDate = new Date('2026-11-15T11:25:00');

  function update() {
    const now  = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      ['cd-days','cd-hours','cd-mins','cd-secs'].forEach(id => {
        document.getElementById(id).textContent = '00';
      });
      return;
    }

    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs  = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('cd-days').textContent  = String(days).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cd-mins').textContent  = String(mins).padStart(2, '0');
    document.getElementById('cd-secs').textContent  = String(secs).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

// ---- RSVP ----
function rsvpYes() {
  const msg = document.getElementById('rsvp-msg');
  msg.classList.remove('hidden');
  msg.innerHTML = '&#10084;&#65039; Wonderful! We can\'t wait to celebrate with you! See you on November 15th, 2026!';
  document.getElementById('btn-yes').style.opacity = '1';
  document.getElementById('btn-no').style.opacity  = '0.4';
}

function rsvpNo() {
  const msg = document.getElementById('rsvp-msg');
  msg.classList.remove('hidden');
  msg.innerHTML = '&#128148; We will miss you! You will be in our hearts on this special day.';
  document.getElementById('btn-no').style.opacity  = '1';
  document.getElementById('btn-yes').style.opacity = '0.4';
}

// ---- Scroll Reveal Animations ----
function initScrollAnimations() {
  const els = document.querySelectorAll('.event-card, .couple-card, .g-card, .cd-box');
  els.forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'none';
        }, 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  els.forEach(el => observer.observe(el));
}
