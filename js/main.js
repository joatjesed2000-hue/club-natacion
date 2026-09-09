/* Comportamiento compartido: navegación, fotos y calendario. Sin dependencias. */
document.addEventListener('DOMContentLoaded', () => {
  injectComponents();
  fixCrossPageAnchors();
  setupMobileMenu();
  setupCurrentNavigation();
  setupNavbarScroll();
  setupScrollReveal();
  setFooterYear();
  setupCarousels();
  setupCountdowns();
  setupLightbox();
});

function injectComponents() {
  const nav = document.getElementById('navbar-placeholder');
  const footer = document.getElementById('footer-placeholder');
  if (nav && typeof NAVBAR_HTML !== 'undefined') nav.innerHTML = NAVBAR_HTML;
  if (footer && typeof FOOTER_HTML !== 'undefined') footer.innerHTML = FOOTER_HTML;
}

function fixCrossPageAnchors() {
  if (!document.body.hasAttribute('data-subpage')) return;
  ['#navbar-placeholder', '#footer-placeholder'].forEach(selector => {
    const root = document.querySelector(selector);
    if (!root) return;
    root.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!/^(?:https?:|mailto:|tel:|\/\/)/.test(href)) link.setAttribute('href', '../' + href);
    });
    root.querySelectorAll('img[src^="assets/"]').forEach(img => img.setAttribute('src', '../' + img.getAttribute('src')));
  });
}

function setupMobileMenu() {
  const toggle = document.getElementById('navbar-toggle');
  const links = document.getElementById('navbar-links');
  const navbar = document.getElementById('navbar');
  if (!toggle || !links || !navbar) return;
  const mobile = window.matchMedia('(max-width: 1120px)');
  function setOpen(open, restoreFocus = false) {
    open = mobile.matches && open;
    links.classList.toggle('is-open', open);
    toggle.classList.toggle('is-active', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    links.inert = mobile.matches && !open;
    if (mobile.matches && !open) links.setAttribute('aria-hidden', 'true');
    else links.removeAttribute('aria-hidden');
    if (restoreFocus) toggle.focus({preventScroll: true});
  }
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  links.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && links.classList.contains('is-open')) setOpen(false, true);
  });
  document.addEventListener('click', event => {
    if (!navbar.contains(event.target)) setOpen(false);
  });
  navbar.addEventListener('focusout', event => {
    if (event.relatedTarget && !navbar.contains(event.relatedTarget)) setOpen(false);
  });
  mobile.addEventListener('change', () => setOpen(false));
  setOpen(false);
}

function setupCurrentNavigation() {
  const links = document.querySelectorAll('#navbar-links a');
  function update() {
    const current = new URL(window.location.href);
    const clean = path => path.replace(/index\.html$/, '').replace(/\/$/, '');
    links.forEach(link => {
      const target = new URL(link.href);
      link.removeAttribute('aria-current');
      if (target.origin !== current.origin || clean(target.pathname) !== clean(current.pathname)) return;
      if (!target.hash) link.setAttribute('aria-current', 'page');
      else if (target.hash === (current.hash || '#inicio')) link.setAttribute('aria-current', 'location');
    });
  }
  update();
  window.addEventListener('hashchange', update);
}

function setupNavbarScroll() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const update = () => nav.classList.toggle('is-scrolled', window.scrollY > 12);
  update();
  window.addEventListener('scroll', update, {passive: true});
}

function setupScrollReveal() {
  const targets = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.08});
  targets.forEach(target => {
    target.classList.add('reveal-ready');
    observer.observe(target);
  });
}

function setFooterYear() {
  const year = document.getElementById('footer-year');
  if (year) year.textContent = new Date().getFullYear();
}

function setupCarousels() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel__track');
    const slides = Array.from(carousel.querySelectorAll('.carousel__slide'));
    const controls = document.querySelector('[data-carousel-controls="' + carousel.id + '"]');
    const dotsWrap = controls?.querySelector('.carousel__dots');
    const pause = controls?.querySelector('.carousel__pause');
    const position = carousel.querySelector('.carousel__position');
    if (!track || slides.length < 2 || !dotsWrap) return;
    carousel.setAttribute('role', 'region');
    carousel.setAttribute('aria-roledescription', 'carrusel');
    carousel.setAttribute('aria-label', 'Fotografías del equipo Tiburones');
    let index = 0;
    let playing = !reduced.matches;
    let timer;
    let hovered = false;
    let focused = false;
    const dots = slides.map((slide, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel__dot';
      dot.setAttribute('aria-label', 'Ver foto ' + (i + 1));
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-label', 'Foto ' + (i + 1) + ' de ' + slides.length);
      return dot;
    });
    function render() {
      track.style.transform = 'translateX(-' + index * 100 + '%)';
      slides.forEach((slide, i) => {
        slide.inert = i !== index;
        slide.setAttribute('aria-hidden', String(i !== index));
        dots[i].classList.toggle('is-active', i === index);
        dots[i].setAttribute('aria-pressed', String(i === index));
      });
      if (position) {
        position.setAttribute('aria-live', playing ? 'off' : 'polite');
        position.textContent = (index + 1) + ' / ' + slides.length;
      }
      if (pause) {
        pause.textContent = playing ? 'Pausar' : 'Reproducir';
        pause.setAttribute('aria-label', (playing ? 'Pausar' : 'Reproducir') + ' presentación de fotos');
      }
    }
    function goTo(next) {
      index = (next + slides.length) % slides.length;
      render();
    }
    function syncTimer() {
      clearInterval(timer);
      if (!playing || hovered || focused || document.hidden) return;
      timer = setInterval(() => {
        if (!document.querySelector('.lightbox[open]')) goTo(index + 1);
      }, 6000);
    }
    carousel.querySelector('.carousel__btn--prev')?.addEventListener('click', () => goTo(index - 1));
    carousel.querySelector('.carousel__btn--next')?.addEventListener('click', () => goTo(index + 1));
    pause?.addEventListener('click', () => { playing = !playing; render(); syncTimer(); });
    [carousel, controls].forEach(region => {
      region.addEventListener('mouseenter', () => { hovered = true; syncTimer(); });
      region.addEventListener('mouseleave', () => { hovered = false; syncTimer(); });
      region.addEventListener('focusin', () => { focused = true; syncTimer(); });
      region.addEventListener('focusout', () => {
        setTimeout(() => { focused = carousel.contains(document.activeElement) || controls.contains(document.activeElement); syncTimer(); }, 0);
      });
    });
    document.addEventListener('visibilitychange', syncTimer);
    reduced.addEventListener('change', () => { if (reduced.matches) playing = false; render(); syncTimer(); });
    render(); syncTimer();
  });
}

/* Calendar-day comparisons always use Colombia, independent of the visitor's timezone. */
function colombiaDay(date) {
  const parts = new Intl.DateTimeFormat('en-CA', {timeZone: 'America/Bogota', year: 'numeric', month: '2-digit', day: '2-digit'}).formatToParts(date);
  const value = kind => Number(parts.find(part => part.type === kind).value);
  return Date.UTC(value('year'), value('month') - 1, value('day'));
}

function getCountdownState(value, now = new Date()) {
  const deadline = new Date(value);
  if (Number.isNaN(deadline.getTime())) return {text: 'Consulta la fecha con el club', tone: 'closed'};
  if (now >= deadline) return {text: 'Inscripciones cerradas', tone: 'closed'};
  const days = Math.round((colombiaDay(deadline) - colombiaDay(now)) / 86400000);
  if (days === 0) return {text: 'Cierra hoy', tone: 'soon'};
  if (days === 1) return {text: 'Cierra mañana', tone: 'soon'};
  return {text: 'Faltan ' + days + ' días', tone: days <= 7 ? 'soon' : ''};
}

function setupCountdowns() {
  const pills = document.querySelectorAll('[data-countdown]');
  const list = document.querySelector('.event-list');
  if (!pills.length && !list) return;
  function update() {
    const now = new Date();
    const today = colombiaDay(now);
    pills.forEach(pill => {
      const state = getCountdownState(pill.dataset.countdown, now);
      pill.textContent = state.text;
      pill.classList.toggle('countdown-pill--soon', state.tone === 'soon');
      pill.classList.toggle('countdown-pill--closed', state.tone === 'closed');
    });
    if (!list) return;
    const cards = Array.from(list.querySelectorAll('[data-start]'));
    const records = cards.map(card => {
      const start = new Date(card.dataset.start);
      if (Number.isNaN(start.getTime())) return null;
      const day = colombiaDay(start);
      const past = day < today;
      card.classList.toggle('event-card--past', past);
      const status = card.querySelector('.event-card__status');
      if (status) status.textContent = past ? 'Fecha transcurrida' : day === today ? 'Jornada hoy' : 'Próxima competencia';
      return {card, start: start.getTime(), past};
    }).filter(Boolean);
    records.sort((a, b) => Number(a.past) - Number(b.past) || (a.past ? b.start - a.start : a.start - b.start));
    records.forEach((record, i) => {
      if (list.children[i] !== record.card) list.insertBefore(record.card, list.children[i] || null);
    });
  }
  update();
  setInterval(update, 60000);
}

function setupLightbox() {
  const galleries = document.querySelectorAll('.lightbox-gallery');
  if (!galleries.length) return;
  const overlay = document.createElement('dialog');
  overlay.className = 'lightbox';
  overlay.setAttribute('aria-label', 'Fotografías del Club Tiburones');
  overlay.innerHTML = `
    <span class="lightbox__counter" aria-live="polite" aria-atomic="true"></span>
    <button type="button" class="lightbox__close" aria-label="Cerrar foto" autofocus><span aria-hidden="true">✕</span></button>
    <button type="button" class="lightbox__nav lightbox__nav--prev" aria-label="Foto anterior"><span aria-hidden="true">←</span></button>
    <figure class="lightbox__figure"><img class="lightbox__img" alt=""><figcaption class="lightbox__caption"></figcaption></figure>
    <button type="button" class="lightbox__nav lightbox__nav--next" aria-label="Foto siguiente"><span aria-hidden="true">→</span></button>`;
  document.body.appendChild(overlay);
  const image = overlay.querySelector('.lightbox__img');
  const caption = overlay.querySelector('.lightbox__caption');
  const counter = overlay.querySelector('.lightbox__counter');
  const closeButton = overlay.querySelector('.lightbox__close');
  const previous = overlay.querySelector('.lightbox__nav--prev');
  const next = overlay.querySelector('.lightbox__nav--next');
  let group = [];
  let index = 0;
  let opener;
  let previousOverflow = '';
  function show(nextIndex) {
    index = (nextIndex + group.length) % group.length;
    image.src = group[index].currentSrc || group[index].src;
    image.alt = group[index].alt || 'Fotografía del Club Tiburones';
    caption.textContent = image.alt;
    counter.textContent = 'Foto ' + (index + 1) + ' de ' + group.length;
    previous.hidden = next.hidden = group.length < 2;
  }
  function open(images, nextIndex) {
    group = images;
    opener = document.activeElement;
    previousOverflow = document.body.style.overflow;
    show(nextIndex);
    overlay.showModal();
    document.body.style.overflow = 'hidden';
    closeButton.focus({preventScroll: true});
  }
  function close() { overlay.close(); }
  galleries.forEach(gallery => {
    const images = Array.from(gallery.querySelectorAll('img'));
    images.forEach((img, i) => {
      if (typeof overlay.showModal !== 'function') return;
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      img.setAttribute('aria-haspopup', 'dialog');
      img.setAttribute('aria-label', 'Ampliar: ' + (img.alt || 'foto del club'));
      img.addEventListener('click', () => open(images, i));
      img.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(images, i); }
      });
    });
  });
  previous.addEventListener('click', () => show(index - 1));
  next.addEventListener('click', () => show(index + 1));
  closeButton.addEventListener('click', close);
  overlay.addEventListener('click', event => { if (event.target === overlay) close(); });
  overlay.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    if (opener?.isConnected) opener.focus({preventScroll: true});
  });
  overlay.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); show(index + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(index - 1); }
  });
}
