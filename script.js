// Portfolio interactions + GSAP hero animation
window.addEventListener('DOMContentLoaded', () => {
  // -------- Utilities --------
  function $(sel, root = document) { return root.querySelector(sel); }
  function $all(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }

  // -------- Split heading into spans (preserve real spaces) --------
  function splitLetters(selector) {
    const el = $(selector);
    if (!el) return { spans: [], letters: [] };
    const text = el.textContent;
    el.textContent = '';
    const spans = [];
    const letters = [];
    for (const ch of text) {
      if (ch === ' ') {
        el.appendChild(document.createTextNode(' '));
      } else {
        const span = document.createElement('span');
        span.textContent = ch;
        el.appendChild(span);
        spans.push(span);
        letters.push(span);
      }
    }
    return { spans, letters };
  }

  // -------- Smooth scroll for nav links --------
  $all('.nav-tabs a').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = $(href);
        if (target) window.scrollTo({ top: target.offsetTop - 30, behavior: 'smooth' });
      }
    });
  });

  // -------- Mobile nav toggle --------
  const navToggle = $('#nav-toggle');
  const navTabs = $('#nav-tabs');
  if (navToggle && navTabs) {
    navToggle.addEventListener('click', () => navTabs.classList.toggle('open'));
    $all('a', navTabs).forEach(a => a.addEventListener('click', () => navTabs.classList.remove('open')));
  }

  // -------- EmailJS (optional) --------
  if (!window.emailjs) {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js';
    s.onload = () => emailjs.init('7mHTRgto1etyaYpml');
    document.body.appendChild(s);
  }
  const form = $('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = $('#form-status');
      status.textContent = 'Sending...';
      if (!window.emailjs) { status.textContent = 'Email service not loaded.'; return; }
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

  // -------- Skill cards: twist on hover only --------
  $all('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const rot = (Math.random() * 16 - 8); // -8..+8 deg
      if (window.gsap) gsap.to(card, { rotation: rot, scale: 1.06, duration: 0.22, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      if (window.gsap) gsap.to(card, { rotation: 0, scale: 1, duration: 0.22, ease: 'power2.in' });
    });
  });

  // -------- GSAP hero animation --------
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    const nameSplit = splitLetters('#hero-name');
    const nameSpans = nameSplit.letters;

    if (nameSpans.length) {
      const twistVals = nameSpans.map(() => (Math.random() * 24 - 12)); // -12..+12°
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.pin-wrap',
          start: 'top top',
          end: '+=70%',
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });
      const off = () => window.innerHeight * 0.5;
      tl.to(nameSpans, {
        y: (i) => (i % 2 === 0 ? -off() : off()),
        rotation: (i) => twistVals[i],
        ease: 'none'
      });
    }
  } else {
    // Fallback: gentle float if GSAP/ScrollTrigger not present
    const spl = splitLetters('#hero-name');
    if (spl.letters.length && window.gsap) {
      gsap.fromTo('#hero-name span', { y: 0 }, {
        y: (i) => (i % 2 === 0 ? -20 : 20),
        repeat: -1, yoyo: true, duration: 1.4, ease: 'sine.inOut', stagger: 0.03
      });
    }
  }
  
  
  
  // -------- Projects horizontal scroll (no snap, can center last, faster) --------
  if (window.gsap && window.ScrollTrigger) {
    const track = document.querySelector('.proj-track');
    if (track) {
      const cards = gsap.utils.toArray('.proj-card');

      function getTargets() {
        const V = window.innerWidth;
        const W = track.scrollWidth;
        // Classic flush-right maximum (last edge aligns with viewport right)
        const flushRight = -(W - V);
        // Compute center position for the last card
        const last = cards[cards.length - 1];
        const lastCenter = last.offsetLeft + last.offsetWidth / 2;
        const centerLast = -(lastCenter - V / 2);
        // Allow further travel to center the last card (may be < flushRight)
        const targetX = Math.min(0, centerLast);
        const travel = Math.abs(targetX); // total horizontal distance
        return { targetX, travel };
      }

      let targets = getTargets();
      window.addEventListener('resize', () => { targets = getTargets(); });

      gsap.to(track, {
        x: () => targets.targetX,
        ease: 'none',
        scrollTrigger: {
          trigger: '.projects-carousel',
          start: 'top top+=50',  // small lead-in before pin
          end: () => '+=' + Math.max(1, Math.round(targets.travel * 0.6)), // shorter distance => faster
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: false // no auto-lock; stops wherever you leave it
        }
      });
    }
  }

  // -------- About tabs --------

  (function setupAboutTabs(){
    const tabs = $all('.about-tab');
    const panels = $all('.about-tab-panel');
    if (!tabs.length) return;
    panels.forEach((p,i) => p.style.display = tabs[i].classList.contains('active') ? 'flex' : 'none');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        if (tab.classList.contains('active')) return;
        const activeIdx = tabs.findIndex(t => t.classList.contains('active'));
        const nextIdx = tabs.indexOf(tab);
        const activePanel = panels[activeIdx];
        const nextPanel = panels[nextIdx];
        if (window.gsap) {
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
        } else {
          activePanel.style.display = 'none';
          nextPanel.style.display = 'flex';
        }
        tabs.forEach((t, i) => t.classList.toggle('active', i === nextIdx));
      });
    });
  })();
});
// --- First-visit "site in progress" popup ---
window.addEventListener('DOMContentLoaded', () => {
  try {
    const overlay = document.getElementById('wipOverlay');
    const dialog  = overlay ? overlay.querySelector('.wip-dialog') : null;
    const okBtn   = document.getElementById('wipOk');
    const closeBtn= document.getElementById('wipClose');
    if (!overlay || !dialog || !okBtn || !closeBtn) return;

    const KEY = 'wipNoticeDismissed';
    if (localStorage.getItem(KEY) === '1') return;

    function openPopup(){
      overlay.hidden = false;
      requestAnimationFrame(() => overlay.classList.add('is-open'));
      okBtn.focus();

      // simple focus trap + Esc
      function onKey(e){
        if (e.key === 'Escape') { e.preventDefault(); dismiss(); }
        if (e.key === 'Tab') {
          const foci = [okBtn, closeBtn];
          const idx = foci.indexOf(document.activeElement);
          if (idx === -1) { e.preventDefault(); okBtn.focus(); return; }
          const next = (idx + (e.shiftKey ? -1 : 1) + foci.length) % foci.length;
          e.preventDefault(); foci[next].focus();
        }
      }
      overlay.addEventListener('keydown', onKey);
      overlay._cleanup = () => overlay.removeEventListener('keydown', onKey);
    }

    function dismiss(){
      localStorage.setItem(KEY, '1');
      overlay.classList.remove('is-open');
      setTimeout(() => { overlay.hidden = true; overlay._cleanup && overlay._cleanup(); }, 180);
    }

    okBtn.addEventListener('click', dismiss);
    closeBtn.addEventListener('click', dismiss);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) dismiss(); });

    openPopup();
  } catch(e) {
    // never block the page if anything goes wrong
    console.error('[wip-popup]', e);
  }
});
