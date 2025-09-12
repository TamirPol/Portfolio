// Single-page navigation, animated background only for Home, and dynamic content
window.addEventListener('DOMContentLoaded', () => {
  // --- Smooth scroll for nav links ---
  document.querySelectorAll('.nav-tabs a').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({ top: target.offsetTop - 30, behavior: 'smooth' });
        }
      }
    });
  });

  // --- Hamburger menu toggle ---
  const navToggle = document.getElementById('nav-toggle');
  const navTabs = document.getElementById('nav-tabs');
  if (navToggle && navTabs) {
    navToggle.addEventListener('click', () => navTabs.classList.toggle('open'));
    navTabs.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navTabs.classList.remove('open'));
    });
  }

  // --- EmailJS integration (loads lazily) ---
  if (!window.emailjs) {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js';
    s.onload = () => emailjs.init('7mHTRgto1etyaYpml'); // Consider moving to env on server if you add a backend
    document.body.appendChild(s);
  }

  // Contact form handler
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const status = document.getElementById('form-status');
      status.textContent = 'Sending...';
      if (!window.emailjs) {
        status.textContent = 'Email service not loaded.';
        return;
      }
      emailjs.send('service_zlg4p3c', 'template_voow52t', {
        from_name: form.name.value.trim(),
        from_email: form.email.value.trim(),
        message: form.message.value.trim()
      }).then(() => {
        status.textContent = 'Message sent!';
        form.reset();
      }).catch(() => {
        status.textContent = 'Failed to send. Try again later.';
      });
    });
  }

  // --- Hover/tilt animations ---
  // Fix: your HTML uses .skill-card, not .skill
  document.querySelectorAll('.skill-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { scale: 1.06, rotateZ: gsap.utils.random(-12, 12), duration: 0.22, ease: 'power2.out' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { scale: 1, rotateZ: 0, duration: 0.22, ease: 'power2.in' });
      });
  });
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = (y - rect.height / 2) / 10;
      const rotateY = (x - rect.width / 2) / 10;
      card.style.transform = `scale(1.04) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // --- Animated Background: Interactive Lightning Particles (Home only) ---
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  let w = 0, h = 0;
  let mouse = { x: 0, y: 0 };
  let particles = [];
  let PARTICLE_COUNT = 100;
  let isMobile = false;

  function getParticleCount() {
    const width = window.innerWidth;
    if (width < 600) return 0;
    if (width < 900) return 30;
    if (width < 1300) return 60;
    return 100;
  }

  function resizeParticles() {
    const homeSection = document.getElementById('home');
    if (!canvas || !ctx || !homeSection) return;
    w = homeSection.offsetWidth;
    h = homeSection.offsetHeight;
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    PARTICLE_COUNT = getParticleCount();
    isMobile = window.innerWidth < 600;

    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
  }
  window.addEventListener('resize', resizeParticles);
  resizeParticles();

  function randomColor() {
    const colors = ['#00f6ff', '#00eaff', '#1e90ff', '#6ee2ff', '#00ffd0', '#00bfff', '#38b6ff', '#7df9ff', '#b2e7ff', '#6f00ff', '#3f51b5', '#00fff7', '#0ff0fc', '#00c3ff', '#00ffe7'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function Particle() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 2.2;
    this.vy = (Math.random() - 0.5) * 2.2;
    this.radius = 1.5 + Math.random() * 3;
    this.color = randomColor();
  }
  Particle.prototype.update = function () {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.hypot(dx, dy);

    if (isMobile) {
      this.vx += (Math.random() - 0.5) * 0.1;
      this.vy += (Math.random() - 0.5) * 0.1;
    } else {
      this.vx += (Math.random() - 0.5) * 0.16;
      if (dist < 180) {
        const angle = Math.atan2(dy, dx);
        const force = dist < 60 ? -0.05 : 0.02;
        this.vx += Math.cos(angle) * force;
        this.vy += Math.sin(angle) * force;
      }
    }
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.94;
    this.vy *= 0.94;

    if (this.x < 0 || this.x > w) this.vx *= -1;
    if (this.y < 0 || this.y > h) this.vy *= -1;
    this.x = Math.max(0, Math.min(w, this.x));
    this.y = Math.max(0, Math.min(h, this.y));
  };
  Particle.prototype.draw = function () {
    if (!ctx) return;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 32;
    ctx.globalAlpha = 0.92;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  };

  function connectParticles() {
    if (!ctx) return;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        const cursorDist = Math.hypot(mouse.x - particles[i].x, mouse.y - particles[i].y);
        if (dist < 32 && cursorDist > 120) {
          const angle = Math.atan2(dy, dx);
          const push = (32 - dist) * 0.08;
          particles[i].vx += Math.cos(angle) * push;
          particles[i].vy += Math.sin(angle) * push;
          particles[j].vx -= Math.cos(angle) * push;
          particles[j].vy -= Math.sin(angle) * push;
        }
        if (dist < 90) {
          ctx.save();
          ctx.strokeStyle = '#6ee2ff33';
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          const midX = (particles[i].x + particles[j].x) / 2 + (Math.random() - 0.5) * 10;
          const midY = (particles[i].y + particles[j].y) / 2 + (Math.random() - 0.5) * 10;
          ctx.lineTo(midX, midY);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
    for (let i = 0; i < particles.length; i++) {
      const dx = mouse.x - particles[i].x;
      const dy = mouse.y - particles[i].y;
      const dist = Math.hypot(dx, dy);
      if (dist < 180) {
        ctx.save();
        ctx.strokeStyle = '#00eaffcc';
        ctx.lineWidth = 1.7;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        const mid1x = (particles[i].x + mouse.x) / 2 + (Math.random() - 0.5) * 18;
        const mid1y = (particles[i].y + mouse.y) / 2 + (Math.random() - 0.5) * 18;
        ctx.lineTo(mid1x, mid1y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
        ctx.restore();
      }
    }
  }

  function animate() {
    const homeSection = document.getElementById('home');
    if (canvas && ctx && homeSection) {
      const rect = homeSection.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight && PARTICLE_COUNT > 0) {
        canvas.style.display = 'block';
        ctx.clearRect(0, 0, w, h);
        for (const p of particles) { p.update(); p.draw(); }
        connectParticles();
      } else {
        canvas.style.display = 'none';
      }
    }
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener('mousemove', e => {
    const homeSection = document.getElementById('home');
    if (!homeSection) return;
    const rect = homeSection.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  // --- Project Modal Logic ---
  const projectDetails = {
    mushroom: {
      title: 'Mushroom Identifier',
      desc: 'Take a photo, get a likely species. Runs a lightweight CNN and shows confidence, look-alikes, and safety notes. Offline cache for trails.',
      tech: 'TensorFlow, Flask API, React Native'
    },
    cricket: {
      title: 'AI Cricket Commentary',
      desc: 'Detects events (bowls, shots, wickets) from video and generates short play-by-play lines. Uses object tracking + a promptable NLG layer.',
      tech: 'OpenCV, YOLO, LangChain'
    },
    geoguard: {
      title: 'GeoGuard',
      desc: 'Scores routes with city crime datasets and highlights risk on the map. Suggests safer alternates; simple on-device caching for speed.',
      tech: 'Python ETL, MongoDB, React Native'
    },
    sports: {
      title: 'Sports Match & Messaging',
      desc: 'Match by sport, location, and skill. Realtime DMs and event scheduling; WebSocket presence and typing indicators.',
      tech: 'React, Flask, WebSockets'
    },
    portfolio: {
      title: 'This Portfolio',
      desc: 'Custom, animated single-page site with a neon particle background and 3D tilt cards. No frameworks; small, fast, and fun.',
      tech: 'HTML, CSS, JS, GSAP'
    },
    'coming-soon': {
      title: 'Coming Soon',
      desc: 'A new project is launching soon.',
      tech: 'Stay tuned'
    }
  };

  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalImg = document.getElementById('modal-img');
  const modalDesc = document.getElementById('modal-desc');
  const modalTech = document.getElementById('modal-tech');
  const modalLinks = document.getElementById('modal-links');

  function openModalFromCard(card) {
    const key = card.getAttribute('data-project');
    const proj = projectDetails[key];
    if (!proj) return;

    // Title/desc/tech
    modalTitle.textContent = proj.title;
    const imgEl = card.querySelector('.window-media img');
    modalImg.innerHTML = imgEl ? `<img src="${imgEl.src}" alt="${imgEl.alt || proj.title}" />` : '';
    modalDesc.textContent = proj.desc;
    modalTech.textContent = proj.tech;

    // Link: mirror the card's GitHub anchor if present
    const cardLink = card.querySelector('a.project-link');
    if (cardLink && cardLink.href) {
      modalLinks.innerHTML = `<a href="${cardLink.href}" target="_blank" rel="noreferrer"><i class="fab fa-github"></i> GitHub</a>`;
    } else {
      modalLinks.innerHTML = '';
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }

  // Open modal on card click (except "coming soon")
  document.querySelectorAll('.project-card.window-card:not(.coming-soon)').forEach(card => {
    card.addEventListener('click', () => openModalFromCard(card));
  });

  const closeBtn = document.querySelector('.close-modal');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    });
  }
  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // --- About Me / Work Experience tab switcher ---
  function setupAboutTabs() {
    const tabs = document.querySelectorAll('.about-tab');
    const panels = document.querySelectorAll('.about-tab-panel');

    // Show only active on load
    tabs.forEach((tab, i) => {
      panels[i].style.display = tab.classList.contains('active') ? 'flex' : 'none';
    });

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        if (tab.classList.contains('active')) return;
        const activeIdx = Array.from(tabs).findIndex(t => t.classList.contains('active'));
        const nextIdx = Array.from(tabs).indexOf(tab);
        const activePanel = panels[activeIdx];
        const nextPanel = panels[nextIdx];

        gsap.to(activePanel, {
          duration: 0.18, y: 40, opacity: 0, ease: 'power2.in',
          onComplete: () => {
            activePanel.style.display = 'none';
            activePanel.style.transform = '';
            activePanel.style.opacity = '';

            nextPanel.style.display = 'flex';
            gsap.fromTo(nextPanel, { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.18, ease: 'power2.out', clearProps: 'all' });
          }
        });

        tabs.forEach((t, i) => t.classList.toggle('active', i === nextIdx));
      });
    });
  }
  setupAboutTabs();
});
