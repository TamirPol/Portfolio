// Single-page navigation, animated background only for Home, and dynamic content
window.addEventListener('DOMContentLoaded', () => {
  // --- Smooth scroll for nav links ---
  document.querySelectorAll('.nav-tabs a').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 30,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // EmailJS integration (add script tag if not present)
  if (!window.emailjs) {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js';
    s.onload = () => emailjs.init('user_XXXXXXXXXXXX'); // TODO: Replace with your EmailJS user ID
    document.body.appendChild(s);
  }

  // Contact form handler
  setTimeout(() => {
    const form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const status = document.getElementById('form-status');
        status.textContent = 'Sending...';
        if (!window.emailjs) {
          status.textContent = 'Email service not loaded.';
          return;
        }
        emailjs.send('service_xxxxxxxx', 'template_xxxxxxxx', {
          from_name: form.name.value,
          from_email: form.email.value,
          message: form.message.value
        }).then(() => {
          status.textContent = 'Message sent!';
          form.reset();
        }, err => {
          status.textContent = 'Failed to send. Try again later.';
        });
      });
    }
  }, 400);

  // --- Animations for skills and projects ---
  setTimeout(() => {
    document.querySelectorAll('.skill').forEach(skill => {
      skill.addEventListener('mouseenter', () => {
        gsap.to(skill, { scale: 1.18, duration: 0.18 });
      });
      skill.addEventListener('mouseleave', () => {
        gsap.to(skill, { scale: 1, duration: 0.18 });
      });
    });
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (x - centerX) / 10;
        card.style.transform = `scale(1.07) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }, 300);

  // --- Animated Background: Interactive Lightning Particles (Home only) ---
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let w = window.innerWidth, h = window.innerHeight;
  let mouse = { x: w/2, y: h/2 };
  let particles = [];
  const PARTICLE_COUNT = 220;
  function resize() {
    const homeSection = document.getElementById('home');
    w = homeSection.offsetWidth;
    h = homeSection.offsetHeight;
    canvas.width = w;
    canvas.height = h;
    // Position the canvas absolutely within #home
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
  }
  window.addEventListener('resize', resize);
  resize();

  function randomColor() {
    // Neon blues, cyans, teals, and a touch of purple for diversity
    const neonBlues = [
      '#00f6ff', // neon cyan
      '#00eaff', // bright cyan
      '#1e90ff', // vivid blue
      '#6ee2ff', // light blue
      '#00ffd0', // neon teal
      '#00bfff', // deep sky blue
      '#38b6ff', // neon blue
      '#7df9ff', // electric blue
      '#b2e7ff', // pale blue
      '#6f00ff', // neon purple
      '#3f51b5', // indigo blue
      '#00fff7', // aqua
      '#0ff0fc', // light neon cyan
      '#00c3ff', // neon blue
      '#00ffe7'  // neon teal
    ];
    return neonBlues[Math.floor(Math.random() * neonBlues.length)];
  }

  function Particle() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 2.2;
    this.vy = (Math.random() - 0.5) * 2.2;
    // More size diversity: 1.5 to 4.5
    this.radius = 1.5 + Math.random() * 3;
    this.color = randomColor();
  }
  Particle.prototype.update = function() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let dist = Math.sqrt(dx*dx + dy*dy);
    // Faster random drift (idle movement)
    this.vx += (Math.random() - 0.5) * 0.16;
    this.vy += (Math.random() - 0.5) * 0.16;
    // Restore original cursor pull, reduce pull between particles
    if (dist < 180) {
      let angle = Math.atan2(dy, dx);
      let force = dist < 60 ? -0.05 : 0.02; // even less cursor pull
      this.vx += Math.cos(angle) * force;
      this.vy += Math.sin(angle) * force;
    }
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.94; // less friction, so they move a bit faster
    this.vy *= 0.94;
    if (this.x < 0 || this.x > w) this.vx *= -1;
    if (this.y < 0 || this.y > h) this.vy *= -1;
    this.x = Math.max(0, Math.min(w, this.x));
    this.y = Math.max(0, Math.min(h, this.y));
  };
  Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 32; // More glow for neon effect
    ctx.globalAlpha = 0.92; // Slightly more visible
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1.0;
  };

  function connectParticles() {
    // Repel particles if too close and cursor is not near
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        let dx = particles[i].x - particles[j].x;
        let dy = particles[i].y - particles[j].y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        // Repulsion if too close and cursor is far
        let cursorDist = Math.sqrt((mouse.x - particles[i].x) ** 2 + (mouse.y - particles[i].y) ** 2);
        if (dist < 32 && cursorDist > 120) {
          // Push them apart
          let angle = Math.atan2(dy, dx);
          let push = (32 - dist) * 0.08;
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
          let midX = (particles[i].x + particles[j].x) / 2 + (Math.random()-0.5)*10;
          let midY = (particles[i].y + particles[j].y) / 2 + (Math.random()-0.5)*10;
          ctx.lineTo(midX, midY);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
    for (let i = 0; i < particles.length; i++) {
      let dx = mouse.x - particles[i].x;
      let dy = mouse.y - particles[i].y;
      let dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 180) {
        ctx.save();
        ctx.strokeStyle = '#00eaffcc';
        ctx.lineWidth = 1.7;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        let mid1x = (particles[i].x + mouse.x) / 2 + (Math.random()-0.5)*18;
        let mid1y = (particles[i].y + mouse.y) / 2 + (Math.random()-0.5)*18;
        ctx.lineTo(mid1x, mid1y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
        ctx.restore();
      }
    }
  }

  function animate() {
    // Only show particles if Home section is visible in viewport
    const homeSection = document.getElementById('home');
    const rect = homeSection.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      canvas.style.display = 'block';
      ctx.clearRect(0, 0, w, h);
      for (let p of particles) {
        p.update();
        p.draw();
      }
      connectParticles();
    } else {
      canvas.style.display = 'none';
    }
    requestAnimationFrame(animate);
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }
  animate();

  window.addEventListener('mousemove', e => {
    const homeSection = document.getElementById('home');
    const rect = homeSection.getBoundingClientRect();
    // Mouse position relative to the canvas inside #home
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  // --- Project Modal Logic ---
  const projectDetails = {
    mushroom: {
      title: 'Mushroom Identifier',
      img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      desc: 'A mobile app that uses machine learning to identify wild mushrooms from photos. Features offline support, a growing database, and safety tips for foragers. Built with TensorFlow, Flask, and React Native.',
      tech: 'TensorFlow, Flask, React Native',
      link: 'https://github.com/TamirPol/mushroom-identifier'
    },
    cricket: {
      title: 'AI Cricket Commentary',
      img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80',
      desc: 'A computer vision system for live cricket event tracking and automated commentary. Detects player actions, scores, and generates natural language commentary in real time.',
      tech: 'OpenCV, YOLO, LangChain',
      link: 'https://github.com/TamirPol/ai-cricket-commentary'
    },
    geoguard: {
      title: 'GeoGuard',
      img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
      desc: 'A mobile app that recommends safer routes using real-time crime data. Visualizes risk on maps and alerts users to avoid dangerous areas. Built with Python, MongoDB, and React Native.',
      tech: 'Python, MongoDB, React Native',
      link: 'https://github.com/TamirPol/geoguard'
    },
    sports: {
      title: 'Sports Match & Messaging',
      img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80',
      desc: 'A platform to find sports partners and chat instantly. Features real-time messaging, skill-based matching, and event scheduling. Built with React.js, Flask, and WebSockets.',
      tech: 'React.js, Flask, WebSockets',
      link: 'https://github.com/TamirPol/sports-matching'
    },
    portfolio: {
      title: 'This Portfolio',
      img: 'assets/portfolio-preview.png',
      desc: 'A fully custom, animated portfolio site built from scratch. Features a neon particle background, smooth navigation, and interactive project cards. Built with vanilla HTML, CSS, JS, and GSAP.',
      tech: 'HTML, CSS, JS, GSAP',
      link: 'https://github.com/TamirPol/Portfolio'
    },
    'coming-soon': {
      title: 'Coming Soon',
      img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      desc: 'A new project is launching soon. Stay tuned for updates!',
      tech: 'Stay tuned!',
      link: null
    }
  };

  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalImg = document.getElementById('modal-img');
  const modalDesc = document.getElementById('modal-desc');
  const modalTech = document.getElementById('modal-tech');
  const modalLinks = document.getElementById('modal-links');

  function openModal(key) {
    const proj = projectDetails[key];
    if (!proj) return;
    modalTitle.textContent = proj.title;
    modalImg.innerHTML = `<img src="${proj.img}" alt="${proj.title}" />`;
    modalDesc.textContent = proj.desc;
    modalTech.textContent = proj.tech;
    if (proj.link) {
      modalLinks.innerHTML = `<a href="${proj.link}" target="_blank"><i class='fab fa-github'></i> GitHub</a>`;
    } else {
      modalLinks.innerHTML = '';
    }
    modal.classList.add('active');
  }

  // Open modal on card click
  setTimeout(() => {
    document.querySelectorAll('.project-card.window-card:not(.coming-soon)').forEach(card => {
      card.addEventListener('click', () => {
        const key = card.getAttribute('data-project');
        openModal(key);
      });
    });
    document.querySelector('.close-modal').addEventListener('click', () => {
      modal.classList.remove('active');
    });
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }, 400);
});
