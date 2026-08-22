/* ============================================================
   PRASANNA B — Portfolio Script
   MagicUI-inspired: blur-fade scroll reveal, accordion,
   dark mode toggle, dock interactions, typing effect,
   scroll progress, 3D tilt, active section highlighting
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. DARK MODE ──────────────────────────────────────── */
  const html = document.documentElement;

  function getStoredTheme() {
    return localStorage.getItem('theme') || 'dark';
  }

  function applyTheme(theme) {
    const iconSun = document.getElementById('icon-sun');
    const iconMoon = document.getElementById('icon-moon');
    if (theme === 'dark') {
      html.classList.add('dark');
      if (iconSun) iconSun.style.display = '';
      if (iconMoon) iconMoon.style.display = 'none';
    } else {
      html.classList.remove('dark');
      if (iconSun) iconSun.style.display = 'none';
      if (iconMoon) iconMoon.style.display = '';
    }
  }

  // Apply dark class ASAP to prevent flash
  if (getStoredTheme() === 'dark') {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }

  /* ── 2. BLUR FADE SCROLL REVEAL ────────────────────────── */
  function initBlurFade() {
    const elements = document.querySelectorAll('.blur-fade');

    // Immediately show elements already in viewport on page load
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ── 3. WORK ACCORDION ─────────────────────────────────── */
  function toggleWork(itemId) {
    const item = document.getElementById(itemId);
    if (!item) return;

    const isOpen = item.classList.contains('open');
    const trigger = item.querySelector('.work-trigger');

    if (isOpen) {
      item.classList.remove('open');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    } else {
      item.classList.add('open');
      if (trigger) trigger.setAttribute('aria-expanded', 'true');
    }
  }

  // Expose globally (used by inline onclick)
  window.toggleWork = toggleWork;

  /* ── 4. DOCK: active section highlighting on scroll ────── */
  function initDockHighlight() {
    var dockLinks = document.querySelectorAll('.dock-nav a[data-section]');
    var sections = document.querySelectorAll('section[id]');

    if (!sections.length || !dockLinks.length) return;

    function updateActiveSection() {
      var scrollY = window.scrollY + window.innerHeight / 3;

      var currentSection = '';
      sections.forEach(function (section) {
        if (section.offsetTop <= scrollY) {
          currentSection = section.id;
        }
      });

      dockLinks.forEach(function (link) {
        if (link.getAttribute('data-section') === currentSection) {
          link.classList.add('dock-active');
        } else {
          link.classList.remove('dock-active');
        }
      });
    }

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    updateActiveSection(); // initial check
  }

  /* ── 4b. DOCK: macOS magnification effect ───────────────── */
  function initDockMagnify() {
    var dock = document.getElementById('dock-nav');
    if (!dock) return;

    var icons = dock.querySelectorAll('.dock-icon');
    var BASE_SIZE = 40;
    var MAX_SIZE = 56;
    var MAGNIFY_RANGE = 120; // px radius of influence

    function resetIcons() {
      icons.forEach(function (icon) {
        icon.style.width = BASE_SIZE + 'px';
        icon.style.height = BASE_SIZE + 'px';
        icon.style.transform = '';
      });
    }

    dock.addEventListener('mousemove', function (e) {
      icons.forEach(function (icon) {
        var rect = icon.getBoundingClientRect();
        var iconCenterX = rect.left + rect.width / 2;
        var iconCenterY = rect.top + rect.height / 2;

        var dx = e.clientX - iconCenterX;
        var dy = e.clientY - iconCenterY;
        var distance = Math.sqrt(dx * dx + dy * dy);

        // Gaussian-like falloff
        var scale;
        if (distance < MAGNIFY_RANGE) {
          var factor = 1 - (distance / MAGNIFY_RANGE);
          // Smooth cubic ease
          factor = factor * factor * (3 - 2 * factor);
          var newSize = BASE_SIZE + (MAX_SIZE - BASE_SIZE) * factor;
          scale = newSize / BASE_SIZE;
        } else {
          scale = 1;
        }

        icon.style.transform = 'scale(' + scale + ')';
      });
    });

    dock.addEventListener('mouseleave', function () {
      icons.forEach(function (icon) {
        icon.style.transform = 'scale(1)';
      });
    });
  }

  /* ── 5. SMOOTH SCROLL for dock links ────────────────────── */
  function initSmoothScroll() {
    const dockLinks = document.querySelectorAll('.dock-nav a[href^="#"]');
    dockLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Back to top link
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
      backToTop.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /* ── 6. AVATAR INITIALS FALLBACK ────────────────────────── */
  function initAvatar() {
    // If you add a photo, set the src here:
    // const img = new Image();
    // img.src = 'your-photo.jpg';
    // img.onload = function() {
    //   document.getElementById('hero-avatar').innerHTML = '';
    //   document.getElementById('hero-avatar').appendChild(img);
    // };
    // For now, keep the PB initials placeholder
  }

  /* ── 7. TYPING EFFECT ──────────────────────────────────── */
  function initTypingEffect() {
    const typedEl = document.getElementById('typed-text');
    if (!typedEl) return;

    const roles = [
      'Full Stack Developer',
      'AI Engineer',
      'Research Author',
      'Freelancer',
      'Problem Solver'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typedEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typedEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        // Pause at end of word
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400;
      }

      setTimeout(type, typingSpeed);
    }

    // Start after a small delay
    setTimeout(type, 800);
  }

  /* ── 8. SCROLL PROGRESS BAR ────────────────────────────── */
  function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = scrollPercent + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ── 9. 3D CARD TILT on project cards ──────────────────── */
  function initCardTilt() {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = 'translateY(-2px) perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  /* ── 10. INIT ─────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    // Apply full theme including icon swap after DOM is ready
    applyTheme(getStoredTheme());

    // Wire up the theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', function () {
        const current = getStoredTheme();
        const next = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', next);
        applyTheme(next);
      });
    }

    initBlurFade();
    initDockHighlight();
    initDockMagnify();
    initSmoothScroll();
    initAvatar();
    initTypingEffect();
    initScrollProgress();
    initCardTilt();
  });

})();
