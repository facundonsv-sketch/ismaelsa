/* ═══════════════════════════════════════════════════════════════════
   ISMAEL S.A. — main.js (rediseño v7)
   GENERADO por tools/build_v7.py a partir de tools/main.template.js:
   editar la plantilla y volver a correr el generador. Sin inline
   handlers ni estilos (CSP estricta): toda la interacción vive acá.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Diccionarios ES / EN (todas las claves de las 12 páginas) ── */
  const I18N = {
    es: /*__I18N_ES__*/,
    en: /*__I18N_EN__*/
  };

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let lang = 'es';
  const dict = () => I18N[lang] || I18N.es;

  /* ──────────────────────────────────────────────
     i18n
  ────────────────────────────────────────────── */
  function applyI18n(next) {
    const d = I18N[next] ? I18N[next] : I18N.es;
    lang = I18N[next] ? next : 'es';
    document.documentElement.lang = lang === 'en' ? 'en' : 'es-AR';
    $$('[data-i18n]').forEach(el => { const k = el.dataset.i18n; if (d[k] !== undefined) el.textContent = d[k]; });
    $$('[data-i18n-html]').forEach(el => { const k = el.dataset.i18nHtml; if (d[k] !== undefined) el.innerHTML = d[k]; });
    [['alt', 'i18nAlt'], ['placeholder', 'i18nPlaceholder'], ['aria-label', 'i18nAriaLabel'], ['title', 'i18nTitle'], ['href', 'i18nHref']].forEach(([attr, ds]) => {
      $$('[data-i18n-' + attr + ']').forEach(el => { const k = el.dataset[ds]; if (d[k] !== undefined) el.setAttribute(attr, d[k]); });
    });
    const tt = $('title[data-i18n-doc]'); if (tt && d[tt.dataset.i18nDoc]) document.title = d[tt.dataset.i18nDoc];
    const md = $('meta[name="description"][data-i18n-meta]'); if (md && d[md.dataset.i18nMeta]) md.setAttribute('content', d[md.dataset.i18nMeta]);
    $$('.lang-btn').forEach(b => { const on = b.dataset.lang === lang; b.classList.toggle('is-active', on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); });
    try { localStorage.setItem('isa_lang', lang); } catch (e) { /* sin storage */ }
    document.dispatchEvent(new CustomEvent('isa:lang', { detail: lang }));
  }
  $$('.lang-btn').forEach(b => b.addEventListener('click', () => applyI18n(b.dataset.lang)));
  let saved = 'es';
  try { saved = localStorage.getItem('isa_lang') || 'es'; } catch (e) { /* sin storage */ }
  if (saved !== 'es') applyI18n(saved); else $$('.lang-btn').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === 'es' ? 'true' : 'false'));

  /* ──────────────────────────────────────────────
     Header: fondo al hacer scroll, megamenú, menú móvil
  ────────────────────────────────────────────── */
  const hd = $('#hd');
  const mega = $('#mega');
  let megaTimer = null;
  function setSolid() { const s = window.scrollY > 40; hd.classList.toggle('is-solid', s); document.body.classList.toggle('is-scrolled', s); }
  window.addEventListener('scroll', setSolid, { passive: true });
  setSolid();

  function openMega(name) {
    if (!mega || window.matchMedia('(max-width: 819px)').matches) return;
    let any = false;
    $$('[data-mega-panel]', mega).forEach(p => { const on = p.dataset.megaPanel === name; p.hidden = !on; any = any || on; });
    mega.classList.toggle('is-open', any);
    hd.classList.toggle('is-drop', any);
  }
  function closeMega() { if (!mega) return; mega.classList.remove('is-open'); hd.classList.remove('is-drop'); $$('[data-mega-panel]', mega).forEach(p => { p.hidden = true; }); }
  $$('.hd-it').forEach(it => {
    it.addEventListener('mouseenter', () => { clearTimeout(megaTimer); it.classList.contains('has-sub') ? openMega(it.dataset.mega) : closeMega(); });
    // Teclado: con foco dentro del ítem se abre su panel
    it.addEventListener('focusin', () => { it.classList.contains('has-sub') ? openMega(it.dataset.mega) : closeMega(); });
  });
  if (hd) {
    hd.addEventListener('mouseleave', () => { megaTimer = setTimeout(closeMega, 120); });
    hd.addEventListener('mouseenter', () => clearTimeout(megaTimer));
    hd.addEventListener('focusout', e => { if (!hd.contains(e.relatedTarget)) closeMega(); });
  }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeMega(); closeMenu(); } });

  const burger = $('#burger');
  const mnav = $('#mnav');
  function openMenu() {
    mnav.classList.add('is-open'); document.body.classList.add('menu-open'); hd.classList.add('is-drop');
    burger.setAttribute('aria-expanded', 'true'); burger.firstElementChild.textContent = dict()['nav.close'] || 'CERRAR';
  }
  function closeMenu() {
    if (!mnav || !mnav.classList.contains('is-open')) return;
    mnav.classList.remove('is-open'); document.body.classList.remove('menu-open'); setSolid(); hd.classList.remove('is-drop');
    burger.setAttribute('aria-expanded', 'false'); burger.firstElementChild.textContent = dict()['nav.menu'] || 'MENÚ';
  }
  if (burger && mnav) {
    burger.addEventListener('click', () => (mnav.classList.contains('is-open') ? closeMenu() : openMenu()));
    $$('a', mnav).forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('isa:lang', () => { burger.firstElementChild.textContent = dict()[mnav.classList.contains('is-open') ? 'nav.close' : 'nav.menu']; });
  }

  /* ──────────────────────────────────────────────
     Portada: slider de 3 imágenes cada 6,5 s
  ────────────────────────────────────────────── */
  (function slider() {
    const slides = $$('.hero-img[data-slide]');
    if (slides.length < 2 || reduced) return;
    let cur = 0;
    setInterval(() => {
      slides[cur].classList.remove('is-active');
      cur = (cur + 1) % slides.length;
      slides[cur].classList.add('is-active');
    }, 6500);
  })();

  /* ──────────────────────────────────────────────
     Empresa: subnavegación fija con sección activa
  ────────────────────────────────────────────── */
  (function subnav() {
    const nav = $('#subnav'); if (!nav) return;
    const links = $$('a[data-tab]', nav);
    const secs = links.map(a => document.getElementById(a.dataset.tab)).filter(Boolean);
    function update() {
      let cur = secs[0];
      secs.forEach(s => { if (s.getBoundingClientRect().top < 220) cur = s; });
      links.forEach(a => a.classList.toggle('is-active', a.dataset.tab === cur.id));
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  })();

  /* ──────────────────────────────────────────────
     Mapa de bases (Leaflet self-hosted, tiles OSM)
  ────────────────────────────────────────────── */
  (function map() {
    const el = $('#map'); if (!el || typeof L === 'undefined') return;
    const d = dict();
    const bases = [
      { k: 'map.base.rawson', dk: 'map.rawson.d', url: 'https://www.google.com/maps/search/?api=1&query=Gral.+Mariano+Acha+Sur+2356,+Rawson,+San+Juan', ll: [-31.5655, -68.5212], dir: 'right', off: [18, -40] },
      { k: 'map.base.calingasta', dk: 'map.calingasta.d', ll: [-31.331, -69.425], dir: 'bottom', off: [14, 44] }
    ];
    const m = L.map(el, { scrollWheelZoom: false, zoomControl: true, attributionControl: true });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 17, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors' }).addTo(m);
    // Íconos solo con clases (la CSP bloquea style="" dentro del HTML del marcador)
    const pin = L.divIcon({ className: '', iconSize: [34, 44], iconAnchor: [17, 44], html: '<div class="pin"><div class="pulse"></div><svg width="34" height="44" viewBox="0 0 34 44" aria-hidden="true"><path d="M17 0C7.6 0 0 7.4 0 16.6 0 29 17 44 17 44s17-15 17-27.4C34 7.4 26.4 0 17 0z" fill="#0B3D2C"/><circle cx="17" cy="16.5" r="6.5" fill="#fff"/></svg></div>' });
    const dot = L.divIcon({ className: '', iconSize: [12, 12], iconAnchor: [6, 6], html: '<div class="dot"></div>' });
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const tip = (b, dd) => '<b>' + esc(dd[b.k]) + '</b><span>' + esc(dd[b.dk]) + '</span>';
    const marks = [];
    const pts = bases.map(b => {
      const mk = L.marker(b.ll, { icon: pin, alt: d[b.k], keyboard: !!b.url }).addTo(m);
      if (b.url) mk.on('click', () => window.open(b.url, '_blank', 'noopener'));
      mk.bindTooltip(tip(b, d), { permanent: true, direction: b.dir, offset: b.off, className: 'lbl' });
      marks.push([mk, b]);
      return b.ll;
    });
    // Al cambiar de idioma, las etiquetas de las bases también se traducen
    document.addEventListener('isa:lang', () => { const d2 = dict(); marks.forEach(([mk, b]) => { mk.setTooltipContent(tip(b, d2)); const el2 = mk.getElement(); if (el2) el2.setAttribute('aria-label', d2[b.k]); }); });
    L.polyline(pts, { color: '#2E8A57', weight: 2, dashArray: '6 8' }).addTo(m);
    const proj = [['Josemaría', -28.43, -69.56, 'right'], ['Filo del Sol', -28.49, -69.66, 'left'], ['Veladero', -29.37, -69.95, 'right'], ['Pascua-Lama', -29.32, -70.03, 'left'], ['Gualcamayo', -29.87, -68.74, 'right'], ['Hualilán', -30.72, -68.92, 'right'], ['Casposo', -31.19, -69.53, 'left'], ['Los Azules', -31.07, -70.23, 'left'], ['Altar', -31.48, -70.47, 'left'], ['El Pachón', -31.75, -70.43, 'left']];
    // Los proyectos son solo informativos (sin foco ni rol de botón: son puntos de 12 px)
    proj.forEach(([n, a, b, dir]) => L.marker([a, b], { icon: dot, alt: n, interactive: false, keyboard: false }).addTo(m).bindTooltip(esc(n), { permanent: window.innerWidth > 520, direction: dir, offset: [dir === 'right' ? 8 : -8, 0], className: 'plbl' }));
    m.fitBounds(pts.concat(proj.map(p => [p[1], p[2]])), { paddingTopLeft: [110, 30], paddingBottomRight: [150, 60] });
    // Los íconos existen recién cuando el mapa tiene vista (fitBounds): nombre accesible de cada base
    marks.forEach(([mk, b]) => { const el2 = mk.getElement(); if (el2) el2.setAttribute('aria-label', d[b.k]); });
    const legend = L.control({ position: 'bottomleft' });
    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'legend');
      div.innerHTML = '<div><i class="i-pin"></i><span data-i18n="map.bases">' + esc(d['map.bases']) + '</span></div><div><i class="i-dot"></i><span data-i18n="map.proy">' + esc(d['map.proy']) + '</span></div><div class="legend-n" data-i18n="map.aprox">' + esc(d['map.aprox']) + '</div>';
      return div;
    };
    legend.addTo(m);
    document.addEventListener('isa:lang', () => { const d2 = dict(); $$('.legend [data-i18n]', el).forEach(s => { s.textContent = d2[s.dataset.i18n]; }); });
  })();

  /* ──────────────────────────────────────────────
     Formulario de cotización (FormSubmit, envío nativo)
       · honeypot _honey (anti-bot) · validación básica
       · rate limit blando por dispositivo: 3 envíos / 6 h
       · ?servicio=N preselecciona el servicio
  ────────────────────────────────────────────── */
  (function form() {
    const f = $('#contactForm'); if (!f) return;
    const status = $('#formStatus'), btn = $('#submitBtn'), sel = $('#servicio');
    const q = new URLSearchParams(location.search).get('servicio');
    if (sel && q !== null && $$('option', sel).some(o => o.value === q)) sel.value = q;
    const RL = { key: 'isa_rl_contact', max: 3, windowMs: 6 * 60 * 60 * 1000 };
    const times = () => { try { const a = JSON.parse(localStorage.getItem(RL.key) || '[]'); const n = Date.now(); return Array.isArray(a) ? a.filter(x => typeof x === 'number' && n - x < RL.windowMs) : []; } catch (e) { return []; } };
    const fmt = ms => { const d = dict(); if (ms < 36e5) return d['rl.lesshour']; return d['rl.hours'].replace('{n}', Math.ceil(ms / 36e5)); };
    const show = msg => { status.className = 'form-status error'; status.textContent = msg; status.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' }); };
    f.addEventListener('submit', e => {
      const d = dict();
      status.className = 'form-status'; status.textContent = '';
      const name = f.elements.nombre.value.trim(), mail = f.elements.email.value.trim();
      if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) { e.preventDefault(); show(d['form.invalid']); return; }
      const ts = times();
      if (ts.length >= RL.max) { e.preventDefault(); show(d['form.ratelimit'].replace('{t}', fmt(RL.windowMs - (Date.now() - Math.min.apply(null, ts))))); btn.disabled = true; return; }
      ts.push(Date.now());
      try { localStorage.setItem(RL.key, JSON.stringify(ts)); } catch (err) { /* sin storage */ }
      btn.disabled = true; btn.textContent = d['form.sending'];
    });
  })();
})();
