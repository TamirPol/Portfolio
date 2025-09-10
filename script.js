// SPA navigation, animated background, and dynamic content
window.addEventListener('DOMContentLoaded', () => {
  // --- SPA Navigation ---
  const tabs = document.querySelectorAll('.nav-tabs li');
  const pages = document.querySelectorAll('.page');
  const canvas = document.getElementById('bg-canvas');
  function showPage(tabName) {
    tabs.forEach(t => t.classList.remove('active'));
    pages.forEach(page => page.classList.remove('active'));
    const pageId = 'page-' + tabName;
    document.getElementById(pageId).classList.add('active');
    document.querySelector('.nav-tabs li[data-tab="' + tabName + '"]').classList.add('active');
    if (tabName === 'home') {
      canvas.style.display = 'block';
      document.body.style.background = '#0a0c12';
    } else {
      canvas.style.display = 'none';
      document.body.style.background = '#0a0c12';
    }
  }
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      showPage(tab.dataset.tab);
    });
  });
  // On load, ensure correct background
  showPage('home');

  // --- Inject Skills Page ---
// ...existing code...
  const skillsHTML = `
    <h2>Skills</h2>
    <div class="skills-cards">
      <div class="skill-card">
        <div class="skill-icon"><img src="assets/python.png" alt="Python" /></div>
        <div class="skill-info"><div class="skill-name">Python</div><div class="skill-desc">ML, scripting, backend</div></div>
      </div>
      <div class="skill-card">
        <div class="skill-icon"><img src="assets/js.png" alt="JavaScript" /></div>
        <div class="skill-info"><div class="skill-name">JavaScript</div><div class="skill-desc">Web, apps, interactivity</div></div>
      </div>
      <div class="skill-card">
        <div class="skill-icon"><img src="assets/nodejs.png" alt="Node.js" /></div>
        <div class="skill-info"><div class="skill-name">Node.js</div><div class="skill-desc">APIs, servers, tools</div></div>
      </div>
      <div class="skill-card">
        <div class="skill-icon"><img src="assets/c++.png" alt="C++" /></div>
        <div class="skill-info"><div class="skill-name">C++</div><div class="skill-desc">Performance, systems</div></div>
      </div>
      <div class="skill-card">
        <div class="skill-icon"><img src="assets/c.png" alt="C" /></div>
        <div class="skill-info"><div class="skill-name">C</div><div class="skill-desc">Embedded, low-level</div></div>
      </div>
      <div class="skill-card">
        <div class="skill-icon"><img src="assets/html.png" alt="HTML5" /></div>
        <div class="skill-info"><div class="skill-name">HTML5</div><div class="skill-desc">Web structure</div></div>
      </div>
      <div class="skill-card">
        <div class="skill-icon"><img src="assets/css-3.png" alt="CSS3" /></div>
        <div class="skill-info"><div class="skill-name">CSS3</div><div class="skill-desc">Styling, animation</div></div>
      </div>
      <div class="skill-card">
        <div class="skill-icon"><i class="fas fa-terminal"></i></div>
        <div class="skill-info"><div class="skill-name">Bash</div><div class="skill-desc">Automation, scripting</div></div>
      </div>
      <div class="skill-card">
        <div class="skill-icon"><img src="assets/git.png" alt="Git" /></div>
        <div class="skill-info"><div class="skill-name">Git</div><div class="skill-desc">Version control</div></div>
      </div>
      <div class="skill-card">
        <div class="skill-icon"><img src="assets/linux.png" alt="Linux" /></div>
        <div class="skill-info"><div class="skill-name">Linux</div><div class="skill-desc">Dev, servers</div></div>
      </div>
      <div class="skill-card">
        <div class="skill-icon"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" /></div>
        <div class="skill-info"><div class="skill-name">MongoDB</div><div class="skill-desc">NoSQL, scalable</div></div>
      </div>
      <div class="skill-card">
        <div class="skill-icon"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" alt="SQLite" /></div>
        <div class="skill-info"><div class="skill-name">SQLite</div><div class="skill-desc">Lightweight DB</div></div>
      </div>
      <div class="skill-card">
        <div class="skill-icon"><img src="assets/react.png" alt="React" /></div>
        <div class="skill-info"><div class="skill-name">React</div><div class="skill-desc">Web/mobile UI</div></div>
      </div>
      <div class="skill-card">
        <div class="skill-icon"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" alt="Flask" /></div>
        <div class="skill-info"><div class="skill-name">Flask</div><div class="skill-desc">APIs, web backend</div></div>
      </div>
      <div class="skill-card">
        <div class="skill-icon"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow" /></div>
        <div class="skill-info"><div class="skill-name">TensorFlow</div><div class="skill-desc">ML, AI</div></div>
      </div>
      <div class="skill-card">
        <div class="skill-icon"><i class="fas fa-network-wired"></i></div>
        <div class="skill-info"><div class="skill-name">WebSockets</div><div class="skill-desc">Realtime comms</div></div>
      </div>
    </div>
  `;
// ...existing code...
  document.getElementById('page-skills').innerHTML = skillsHTML;

  // --- Inject Projects Page ---
  const projectsHTML = `
    <h2>Projects</h2>
    <div class="projects-grid">
      <div class="project-card window-card" style="--accent:#6ee2ff;">
        <div class="window-bar"><i class="fas fa-leaf"></i> Mushroom Identifier</div>
        <div class="window-media"><img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Mushroom App" /></div>
        <div class="window-content">Mobile app for identifying mushrooms with ML.<div class="project-tech">TensorFlow, Flask, React Native</div></div>
        <a class="project-link" href="https://github.com/TamirPol/mushroom-identifier" target="_blank"><i class="fab fa-github"></i> GitHub</a>
      </div>
      <div class="project-card window-card" style="--accent:#1e90ff;">
        <div class="window-bar"><i class="fas fa-baseball-ball"></i> AI Cricket Commentary</div>
        <div class="window-media"><img src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80" alt="Cricket AI" /></div>
        <div class="window-content">Live event tracking & commentary.<div class="project-tech">OpenCV, YOLO, LangChain</div></div>
        <a class="project-link" href="https://github.com/TamirPol/ai-cricket-commentary" target="_blank"><i class="fab fa-github"></i> GitHub</a>
      </div>
      <div class="project-card window-card" style="--accent:#00eaff;">
        <div class="window-bar"><i class="fas fa-shield-alt"></i> GeoGuard</div>
        <div class="window-media"><img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" alt="GeoGuard" /></div>
        <div class="window-content">Safer route recommendations using crime data.<div class="project-tech">Python, MongoDB, React Native</div></div>
        <a class="project-link" href="https://github.com/TamirPol/geoguard" target="_blank"><i class="fab fa-github"></i> GitHub</a>
      </div>
      <div class="project-card window-card" style="--accent:#b2e7ff;">
        <div class="window-bar"><i class="fas fa-basketball-ball"></i> Sports Match & Messaging</div>
        <div class="window-media"><img src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80" alt="Sports Match" /></div>
        <div class="window-content">Find sports partners & chat instantly.<div class="project-tech">React.js, Flask, WebSockets</div></div>
        <a class="project-link" href="https://github.com/TamirPol/sports-matching" target="_blank"><i class="fab fa-github"></i> GitHub</a>
      </div>
    </div>
  `;
  document.getElementById('page-projects').innerHTML = projectsHTML;

  // --- Inject Contact Page ---
  const contactHTML = `
    <h2>Contact</h2>
    <form id="contact-form" class="contact-form">
      <div class="form-row">
        <input type="text" name="name" placeholder="Your Name" required />
      </div>
      <div class="form-row">
        <input type="email" name="email" placeholder="Your Email" required />
      </div>
      <div class="form-row">
        <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
      </div>
      <button type="submit">Send</button>
      <div id="form-status"></div>
    </form>
    <div class="contact-links">
      <a href="mailto:tpolyako@uwaterloo.ca"><i class="fas fa-envelope"></i></a>
      <a href="https://linkedin.com/in/Tamir-Polyakov" target="_blank"><i class="fab fa-linkedin"></i></a>
      <a href="https://github.com/TamirPol" target="_blank"><i class="fab fa-github"></i></a>
    </div>
    <p>Waterloo, ON | 873.688.2121</p>
  `;
  document.getElementById('page-contact').innerHTML = contactHTML;

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

  // --- Animated Background: Interactive Lightning Particles ---
  const ctx = canvas.getContext('2d');
  let w = window.innerWidth, h = window.innerHeight;
  let mouse = { x: w/2, y: h/2 };
  let particles = [];
  const PARTICLE_COUNT = 220;
  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
  }
  window.addEventListener('resize', resize);
  resize();

  function randomColor() {
    const blues = ['#6ee2ff', '#1e90ff', '#00eaff', '#b2e7ff', '#0a0c12'];
    return blues[Math.floor(Math.random() * blues.length)];
  }

  function Particle() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = (Math.random() - 0.5) * 1.5;
    this.radius = 1.7 + Math.random() * 2.2;
    this.color = randomColor();
  }
  Particle.prototype.update = function() {
    // Move toward or away from mouse
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let dist = Math.sqrt(dx*dx + dy*dy);
    // Always move a little (gentle drift)
    this.vx += (Math.random() - 0.5) * 0.06;
    this.vy += (Math.random() - 0.5) * 0.06;
    if (dist < 180) {
      // Attract if far, repel if close
      let angle = Math.atan2(dy, dx);
      let force = dist < 60 ? -0.18 : 0.07;
      this.vx += Math.cos(angle) * force;
      this.vy += Math.sin(angle) * force;
    }
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.96;
    this.vy *= 0.96;
    // Bounce off edges
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
    ctx.shadowBlur = 16;
    ctx.fill();
    ctx.shadowBlur = 0;
  };

  function connectParticles() {
    // Connect particles to each other
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        let dx = particles[i].x - particles[j].x;
        let dy = particles[i].y - particles[j].y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 90) {
          ctx.save();
          ctx.strokeStyle = '#6ee2ff33';
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          // Lightning effect: jagged line
          let midX = (particles[i].x + particles[j].x) / 2 + (Math.random()-0.5)*10;
          let midY = (particles[i].y + particles[j].y) / 2 + (Math.random()-0.5)*10;
          ctx.lineTo(midX, midY);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
    // Connect particles to mouse with "signal" lines
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
        // Two "signal" lines per particle
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
    ctx.clearRect(0, 0, w, h);
    for (let p of particles) {
      p.update();
      p.draw();
    }
    connectParticles();
    requestAnimationFrame(animate);
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }
  animate();

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
});
