// ============================================
// M.JASIM WAHEED - Portfolio Main JS
// ============================================

'use strict';

// ---- TRANSLATIONS ----
const translations = {
  en: {
    nav_home: 'Home',
    nav_about: 'About',
    nav_skills: 'Skills',
    nav_projects: 'Projects',
    nav_experience: 'Experience',
    nav_contact: 'Contact',
    hero_badge: 'AVAILABLE FOR HIRE',
    hero_greeting: 'Hello, I am',
    hero_title: 'Full Stack Developer · UI/UX Designer · Software Engineer',
    hero_desc: 'Crafting high-performance digital experiences with clean code, intuitive design, and cutting-edge technology.',
    hero_btn1: 'View Projects',
    hero_btn2: 'Download CV',
    stat1_label: 'Projects Done',
    stat2_label: 'Clients Served',
    stat3_label: 'Technologies',
    skills_tag: 'WHAT I DO',
    skills_title: 'My <span>Expertise</span>',
    projects_tag: 'PORTFOLIO',
    projects_title: 'Featured <span>Projects</span>',
    about_tag: 'WHO I AM',
    about_title: 'About <span>Me</span>',
    about_text: 'I am M. Jasim Waheed, a passionate Full Stack Developer and UI/UX Designer based in Pakistan. I build complete digital solutions — from sleek frontend interfaces to robust backend systems and everything in between. With expertise spanning web development, mobile apps, and software engineering, I deliver end-to-end solutions that are fast, scalable, and visually stunning.',
    about_exp: 'Years Experience',
    contact_tag: 'GET IN TOUCH',
    contact_title: 'Contact <span>Me</span>',
    contact_desc: 'Have a project in mind? Let\'s build something amazing together. I respond within 24 hours.',
    form_name: 'Your Name',
    form_email: 'Email Address',
    form_subject: 'Subject',
    form_msg: 'Your Message',
    form_send: 'Send Message',
    exp_tag: 'CAREER PATH',
    exp_title: 'My <span>Experience</span>',
    download_cv: 'Download CV',
    view_all: 'View All Projects',
  },
  ur: {
    nav_home: 'ہوم',
    nav_about: 'میرے بارے میں',
    nav_skills: 'مہارتیں',
    nav_projects: 'پروجیکٹس',
    nav_experience: 'تجربہ',
    nav_contact: 'رابطہ',
    hero_badge: 'ملازمت کے لیے دستیاب',
    hero_greeting: 'ہیلو، میں ہوں',
    hero_title: 'فل اسٹیک ڈویلپر · UI/UX ڈیزائنر · سافٹ ویئر انجینئر',
    hero_desc: 'صاف کوڈ، بہترین ڈیزائن اور جدید ٹیکنالوجی کے ساتھ اعلیٰ معیار کے ڈیجیٹل تجربات بنانا۔',
    hero_btn1: 'پروجیکٹس دیکھیں',
    hero_btn2: 'CV ڈاؤنلوڈ کریں',
    stat1_label: 'مکمل پروجیکٹس',
    stat2_label: 'خوش کلائنٹس',
    stat3_label: 'ٹیکنالوجیز',
    skills_tag: 'میں کیا کرتا ہوں',
    skills_title: 'میری <span>مہارتیں</span>',
    projects_tag: 'پورٹ فولیو',
    projects_title: 'نمایاں <span>پروجیکٹس</span>',
    about_tag: 'میں کون ہوں',
    about_title: 'میرے <span>بارے میں</span>',
    about_text: 'میں M. جاسم واحد ہوں، پاکستان میں مقیم ایک ماہر فل اسٹیک ڈویلپر اور UI/UX ڈیزائنر۔ میں مکمل ڈیجیٹل حل بناتا ہوں — خوبصورت فرنٹ اینڈ انٹرفیس سے لے کر مضبوط بیک اینڈ سسٹم تک۔ ویب ڈویلپمنٹ، موبائل ایپس اور سافٹ ویئر انجینئرنگ میں مہارت کے ساتھ، میں ایسے حل فراہم کرتا ہوں جو تیز، قابل توسیع اور بصری طور پر شاندار ہوں۔',
    about_exp: 'سال تجربہ',
    contact_tag: 'رابطہ کریں',
    contact_title: 'مجھ سے <span>رابطہ</span> کریں',
    contact_desc: 'کوئی پروجیکٹ ذہن میں ہے؟ آئیے مل کر کچھ شاندار بنائیں۔ میں ۲۴ گھنٹوں میں جواب دیتا ہوں۔',
    form_name: 'آپ کا نام',
    form_email: 'ای میل ایڈریس',
    form_subject: 'موضوع',
    form_msg: 'آپ کا پیغام',
    form_send: 'پیغام بھیجیں',
    exp_tag: 'کیریئر کا سفر',
    exp_title: 'میرا <span>تجربہ</span>',
    download_cv: 'CV ڈاؤنلوڈ',
    view_all: 'تمام پروجیکٹس',
  }
};

let currentLang = localStorage.getItem('portfolio_lang') || 'en';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('portfolio_lang', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  const t = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key]) el.innerHTML = t[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key]) el.placeholder = t[key];
  });
}

// ---- PAGE LOADER ----
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('pageLoader');
    if (loader) loader.classList.add('hidden');
  }, 1600);
});

// ---- CUSTOM CURSOR ----
function initCursor() {
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
    ring.style.left = mx + 'px';
    ring.style.top = my + 'px';
  });

  document.querySelectorAll('a, button, .btn, .project-card, .skill-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring.style.transform = 'translate(-50%,-50%) scale(1.8)');
    el.addEventListener('mouseleave', () => ring.style.transform = 'translate(-50%,-50%) scale(1)');
  });
}

// ---- NAVBAR ----
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
    updateActiveNavLink();
  });

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY;

  sections.forEach(section => {
    const top = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < bottom);
    }
  });
}

// ---- HERO SLIDESHOW ----
function initSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slide-dot');
  let current = 0;
  let timer;

  function goTo(n) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  }

  function next() { goTo(current + 1); }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(next, 4500);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startTimer(); });
  });

  if (slides.length > 0) {
    slides[0].classList.add('active');
    dots[0]?.classList.add('active');
    startTimer();
  }
}

// ---- SCROLL REVEAL ----
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ---- PROJECTS ----
function loadProjects() {
  const container = document.getElementById('projectsGrid');
  if (!container) return;

  const projects = getProjects();

  if (projects.length === 0) {
    container.innerHTML = '<p style="text-align:center;color:var(--text-muted);font-family:var(--font-mono);padding:60px 0;">// No projects yet. Add from admin panel.</p>';
    return;
  }

  container.innerHTML = projects.map(p => `
    <div class="project-card reveal">
      ${p.imageUrl
        ? `<img src="${p.imageUrl}" alt="${p.title}" style="width:100%;height:180px;object-fit:cover;border-radius:8px 8px 0 0;" onerror="this.outerHTML='<div class=\'project-img-placeholder\'>${p.emoji || '🚀'}</div>'">`
        : `<div class="project-img-placeholder">${p.emoji || '🚀'}</div>`
      }
      <span class="project-status status-${p.status === 'Live' ? 'live' : 'dev'}">${p.status}</span>
      <div class="project-body">
        <div class="project-cat">${p.category}</div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.description}</p>
        <div class="project-tech">
          ${p.tech.split(',').map(t => `<span class="tag">${t.trim()}</span>`).join('')}
        </div>
        <div class="project-links">
          ${p.liveUrl ? `<a href="${p.liveUrl}" class="proj-link" target="_blank">🌐 Live</a>` : ''}
          ${p.githubUrl ? `<a href="${p.githubUrl}" class="proj-link" target="_blank">⚙️ GitHub</a>` : ''}
        </div>
      </div>
    </div>
  `).join('');

  initScrollReveal();
}

function getProjects() {
  try {
    return JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
  } catch { return []; }
}

// ---- CONTACT FORM ----
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-primary');
    const originalText = btn.innerHTML;

    btn.innerHTML = '⏳ Sending...';
    btn.disabled = true;

    const data = {
      name: form.querySelector('[name="name"]').value,
      email: form.querySelector('[name="email"]').value,
      subject: form.querySelector('[name="subject"]').value,
      message: form.querySelector('[name="message"]').value,
      timestamp: new Date().toISOString()
    };

    // Save to localStorage (simulate backend)
    const messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
    messages.push(data);
    localStorage.setItem('portfolio_messages', JSON.stringify(messages));

    await new Promise(r => setTimeout(r, 1200));

    showNotification('✅ Message sent! I\'ll reply within 24 hours.', 'success');
    form.reset();
    btn.innerHTML = originalText;
    btn.disabled = false;
  });
}

// ---- NOTIFICATION ----
function showNotification(msg, type = 'success') {
  let notif = document.getElementById('notification');
  if (!notif) {
    notif = document.createElement('div');
    notif.id = 'notification';
    notif.className = 'notification';
    document.body.appendChild(notif);
  }
  notif.textContent = msg;
  notif.className = `notification ${type} show`;
  setTimeout(() => notif.classList.remove('show'), 4000);
}

// ---- TYPEWRITER ----
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const texts = [
    'Full Stack Developer',
    'UI/UX Designer',
    'Software Engineer',
    'Mobile App Developer',
    'Problem Solver'
  ];

  let textIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = texts[textIdx];
    if (deleting) {
      el.textContent = current.slice(0, charIdx--);
      if (charIdx < 0) {
        deleting = false;
        textIdx = (textIdx + 1) % texts.length;
        setTimeout(type, 400);
        return;
      }
    } else {
      el.textContent = current.slice(0, charIdx++);
      if (charIdx > current.length) {
        deleting = true;
        setTimeout(type, 2000);
        return;
      }
    }
    setTimeout(type, deleting ? 40 : 80);
  }

  type();
}

// ---- COUNTER ANIMATION ----
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.target || el.textContent);
    let current = 0;
    const step = target / 50;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current) + (el.dataset.suffix || '+');
      if (current >= target) clearInterval(timer);
    }, 30);
  });
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
  initCursor();
  initNavbar();
  initSlideshow();
  initScrollReveal();
  loadProjects();
  initContactForm();
  initTypewriter();

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  // Counter animation on hero visible
  const heroObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(animateCounters, 800);
        heroObserver.disconnect();
      }
    });
  });
  const hero = document.querySelector('.hero');
  if (hero) heroObserver.observe(hero);

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});