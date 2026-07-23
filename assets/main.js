  /* ── MOBILE MENU ── */
  function toggleMobileMenu() {
    const btn = document.getElementById('hamburgerBtn');
    const panel = document.getElementById('mobileNav');
    const isOpen = panel.classList.contains('is-open');
    if (isOpen) {
      panel.classList.remove('is-open');
      panel.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Abrir menú');
      document.body.style.overflow = '';
    } else {
      panel.classList.add('is-open');
      panel.setAttribute('aria-hidden', 'false');
      btn.setAttribute('aria-expanded', 'true');
      btn.setAttribute('aria-label', 'Cerrar menú');
      document.body.style.overflow = 'hidden';
    }
  }

  // Attach hamburger click via addEventListener (removes need for unsafe-inline onclick)
  document.getElementById('hamburgerBtn')?.addEventListener('click', toggleMobileMenu);

  /* ── LOGO FALLBACK ──
     Reemplaza el antiguo onerror inline (bloqueado por la CSP estricta).
     Si la imagen del logo falla, activa el fallback SVG y la quita. */
  function handleLogoError(img) {
    if (img.parentNode) img.parentNode.classList.add('logo-fallback');
    img.remove();
  }
  document.querySelectorAll('.nav-logo-img, .footer-logo-img').forEach(img => {
    img.addEventListener('error', () => handleLogoError(img));
    // Cubre el caso en que el error ya ocurrió antes de ejecutar este script (defer)
    if (img.complete && img.naturalWidth === 0) handleLogoError(img);
  });

  /* ── SERVICE CARDS: Scroll-triggered image reveal (mobile only) ── */
  if (window.matchMedia('(max-width: 900px)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -100px 0px' });
    document.querySelectorAll('.service-card').forEach(card => observer.observe(card));
  }

  // Cerrar mobile menu al hacer click en un link
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const panel = document.getElementById('mobileNav');
      const btn = document.getElementById('hamburgerBtn');
      if (panel.classList.contains('is-open')) {
        panel.classList.remove('is-open');
        panel.setAttribute('aria-hidden', 'true');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Abrir menú');
        document.body.style.overflow = '';
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // Intersection observer for nav active state
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 60
      ? 'rgba(14,22,18,0.97)'
      : 'rgba(14,22,18,0.94)';
  }, { passive: true });

  /* ──────────────────────────────────────────
     HERO SLIDER — empieza siempre en la imagen 1 (camión con logo)
  ────────────────────────────────────────── */
  (function heroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    if (slides.length < 2) return;
    let cur = 0;
    const ROTATE_MS = 6500;
    let timer = null;
    function go(i) {
      slides[cur].classList.remove('is-active');
      dots[cur]?.classList.remove('is-active');
      cur = (i + slides.length) % slides.length;
      slides[cur].classList.add('is-active');
      dots[cur]?.classList.add('is-active');
    }
    function start() { timer = setInterval(() => go(cur + 1), ROTATE_MS); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    dots.forEach(d => d.addEventListener('click', () => {
      go(parseInt(d.dataset.slide, 10));
      stop(); start(); // reinicia el ciclo
    }));
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) start();
  })();

  /* ──────────────────────────────────────────
     FLEET CAROUSEL 3D
  ────────────────────────────────────────── */
  let currentLang = 'es';

  const I18N = {
    es: {
      'nav.nosotros': 'Nosotros',
      'nav.servicios': 'Servicios',
      'nav.flota': 'Flota',
      'nav.seguridad': 'Seguridad',
      'nav.bases': 'Bases',
      'nav.proyectos': 'Proyectos',
      'nav.contacto': 'Contacto',
      'cta.contactar': 'Contactar',
      'cta.solicitar': 'Solicitar propuesta',
      'cta.ver_servicios': 'Ver servicios',
      'cta.consultar': 'Consultar disponibilidad',
      'cta.whatsapp': 'WhatsApp',
      'cta.email': 'Enviar email',
      'hero.h1': 'LOGÍSTICA MINERA EN SAN JUAN<br><em>QUE SOSTIENE TU OPERACIÓN</em><br>EN ALTA MONTAÑA',
      'hero.lead': 'Anticipamos los imprevistos para que la operación no se detenga. Flota propia, dos bases en la provincia y más de 20 años en la Cordillera de los Andes.',
      'hero.sub': 'Transporte, abastecimiento, hidrogrúas y soporte en terreno para la minería sanjuanina.',
      'stats.years': 'Años de<br>trayectoria',
      'stats.units': 'Unidades<br>propias',
      'stats.bases': 'Bases operativas<br>en San Juan',
      'stats.cert': 'Personal<br>certificado',
      'stats.projects': 'Proyectos<br>asistidos',
      'about.tag': 'Quiénes somos',
      'about.title': 'Operador logístico sanjuanino para la minería',
      'services.tag': 'Servicios',
      'services.title': 'Todo lo que la operación necesita en terreno',
      'services.all': 'Ver todos los servicios',
      'fleet.tag': 'Flota y capacidades',
      'fleet.title': 'Equipamiento propio.<br>Sin intermediarios.',
      'safety.tag': 'Higiene, seguridad y trazabilidad operativa',
      'safety.title': 'Cada viaje,<br>planificado y controlado',
      'safety.quote': 'Revisión preoperacional antes de cada salida, monitoreo en cada ruta y más de 20 años en la cordillera sin un incidente grave.',
      'bases.tag': 'Infraestructura y cobertura',
      'bases.title': 'Dos bases operativas en San Juan',
      'experience.tag': 'Experiencia que nos respalda',
      'experience.title': 'Más de 35 proyectos asistidos<br>en alta montaña',
      'team.tag': 'Capital humano',
      'team.title': 'Personas con<br>experiencia operativa real',
      'team.quote': 'Buena parte del equipo sube a la cordillera desde hace años: conocen los caminos, los tiempos y los riesgos de memoria.',
      'why.tag': 'Por qué elegirnos',
      'why.title': 'La tranquilidad de que<br>la logística no falla',
      'contact.tag': 'Contacto comercial',
      'contact.title': 'Hablemos de<br>su próximo proyecto',
      'careers.tag': 'Trabajá con nosotros',
      'careers.title': 'Sumá tu experiencia<br>al equipo',
      'flota.tech.title': 'Gestión de flota',
      'flota.tech.li1': 'Monitoreo GPS satelital en cada unidad',
      'flota.tech.li2': 'Mantenimiento preventivo programado',
      'flota.tech.li3': 'Revisión pre-operacional diaria',
      'flota.tech.li4': 'Documentación técnica al día',
      'flota.tech.li5': 'Comunicación VHF/satelital en zonas sin cobertura',
      'about.body1': 'ISMAEL S.A. es la empresa sanjuanina en la que la minería delega su logística en terreno y deja de preocuparse por ella. Especializada en logística minera, transporte minero y soporte operativo para la industria minera, el petróleo, el gas y grandes obras, operamos con flota propia en la Cordillera de los Andes, con más de 20 años de trayectoria.',
      'about.body2': 'Contamos con dos bases operativas en Rawson y Calingasta que nos permiten ofrecer logística en Calingasta y soporte operativo en alta montaña, con movilización rápida a cualquier punto de la cordillera, sin depender de operadores externos ni tránsitos interprovinciales.',
      'about.hl1': '<strong>Acceso a frentes de perforación</strong> — operamos en terrenos cordilleranos inaccesibles para operadores sin base en la provincia',
      'about.hl2': '<strong>Flota 100% propia</strong> — sin intermediarios, sin tercerización de equipamiento crítico',
      'about.hl3': '<strong>Respuesta local</strong> — dos bases propias para movilización rápida en cualquier punto de la cordillera',
      'svc.1.title': 'Servicios y logística de exploración, explotación y perforación',
      'svc.1.desc': 'Coordinación de recursos, traslados y asistencia integral para campañas mineras en frentes cordilleranos bajo condiciones extremas de altura, frío y aislamiento.',
      'svc.2.title': 'Transporte de agua',
      'svc.2.desc': 'Abastecimiento de agua para perforadoras, campamentos y riego de caminos mediante aguateros propios. Provisión continua en frentes aislados de la cordillera.',
      'svc.3.title': 'Abastecimiento en zonas remotas',
      'svc.3.desc': 'Traslado de materiales, módulos e insumos a puntos de operación de difícil acceso. Logística de última milla en rutas de montaña y caminos no convencionales.',
      'svc.4.title': 'Traslados programados',
      'svc.4.desc': 'Conexión permanente entre proyectos, laboratorios, bases, proveedores y campamentos. Rotaciones planificadas y movimientos urgentes con respuesta inmediata.',
      'svc.5.title': 'Transporte de equipos e insumos',
      'svc.5.desc': 'Soluciones para materiales críticos, equipamiento operativo y módulos habitables. Coordinación ajustada a las ventanas de operación de cada proyecto.',
      'svc.6.title': 'Soporte operativo en terreno',
      'svc.6.desc': 'Personal con experiencia en frentes de exploración y perforación. Planificación de recursos, coordinación en campo y presencia continua durante toda la campaña.',
      'svc.7.title': 'Hidrogrúas y servicios especiales',
      'svc.7.desc': 'Izaje, movimiento de cargas y asistencia a operaciones que requieren equipamiento específico, operadores de hidrogrúa certificados y personal habilitado para tareas de alto riesgo.',
      'fleet.body': 'Más de 20 unidades propias preparadas para operar en cordillera, rutas y zonas remotas. Garantizamos disponibilidad, mantenimiento preventivo programado y respuesta operativa local, sin depender de terceros para el equipamiento crítico.',
      'fleet.caption.title': '+20 unidades en operación',
      'fleet.caption.meta': 'Base operativa · San Juan',
      'fleet.item1': 'Camiones aguateros',
      'fleet.item2': 'Camiones con hidrogrúa',
      'fleet.item3': 'Camiones chasis',
      'fleet.item4': 'Tractores con semirremolque',
      'fleet.item5': 'Vehículos 4×4 / 6×4',
      'fleet.carousel.subtitle': 'Algunos de nuestros vehículos',
      'safety.body': 'Cada unidad sale con revisión preoperacional, viaja monitoreada por GPS y sigue un plan de mantenimiento preventivo. En la cordillera, un descuido no se corrige: cuesta una jornada de operación, o algo peor. Por eso trabajamos así hace más de 20 años, en línea con las exigencias HSEC de las operadoras internacionales.',
      'safety.cert1': 'Personal certificado en manejo defensivo',
      'safety.cert2': 'Operación certificada de vehículos pesados e hidrogrúa',
      'safety.cert3': 'Revisiones pre-operacionales y mantenimiento preventivo',
      'safety.cert4': 'Control de fatiga — monitoreo permanente en ruta',
      'safety.cert5': 'Compatible con exigencias HSEC de clientes internacionales',
      'safety.num1': 'Colaboradores certificados',
      'safety.num2': 'Años sin incidentes graves',
      'safety.num3': 'Flota con GPS y control de fatiga',
      'bases.body': 'Dos bases operativas estratégicamente ubicadas en San Juan nos permiten responder con rapidez a los proyectos de toda la cordillera, reducir tiempos de movilización y mantener presencia operativa local.',
      'bases.rawson.subtitle': 'Gran San Juan — Zona urbana e industrial',
      'bases.rawson.desc': 'Centro logístico, administrativo y de mantenimiento en el Gran San Juan, con vinculación directa con proveedores, laboratorios y servicios urbanos. Base de coordinación para todas las campañas.',
      'bases.rawson.tag1': 'Centro logístico',
      'bases.rawson.tag2': 'Taller de mantenimiento',
      'bases.rawson.tag3': 'Abastecimiento de flota',
      'bases.rawson.tag4': 'Administración',
      'bases.calingasta.subtitle': 'Zona cordillerana — Acceso a proyectos en altura',
      'bases.calingasta.desc': 'Posición avanzada en la zona cordillerana, junto a los principales proyectos de exploración de la provincia. Reduce tiempos de movilización y facilita la respuesta operativa en terreno de altura.',
      'bases.calingasta.tag1': 'Acceso cordillerano',
      'bases.calingasta.tag2': 'Base de avanzada',
      'bases.calingasta.tag3': 'Apoyo en campaña',
      'bases.calingasta.tag4': 'Logística de montaña',
      'bases.adv1.title': 'Menor tiempo de respuesta',
      'bases.adv1.desc': 'Movilización local sin depender de tránsitos largos desde otras provincias.',
      'bases.adv2.title': 'Conocimiento del terreno',
      'bases.adv2.desc': 'Rutas, caminos secundarios, altura cordillerana y clima de montaña.',
      'bases.adv3.title': 'Compromiso local',
      'bases.adv3.desc': 'Generación de empleo y desarrollo en la provincia de San Juan.',
      'experience.body': 'Trabajamos junto a operadoras internacionales y los proyectos mineros más relevantes de San Juan. Conocemos los frentes, las rutas y las exigencias de cada operación.',
      'experience.context': 'Como operador logístico minero sanjuanino, trabajamos en los departamentos de Calingasta, Iglesia, Jáchal y Ullum, asistiendo campañas de exploración, perforación y desarrollo minero junto a operadoras internacionales y nacionales con presencia activa en San Juan.',
      'exp.card1.tag': 'Cobre · Oro · Plata',
      'exp.card1.desc': 'Logística de abastecimiento en una de las mayores reservas de cobre del país, en la Cordillera de los Andes, San Juan.',
      'exp.card2.tag': 'Oro · Cobre · Plata',
      'exp.card2.desc': 'Soporte operativo en yacimiento de exploración avanzada en la cordillera sanjuanina, sobre los 4.000 m s.n.m.',
      'exp.card3.tag': 'Cobre',
      'exp.card3.desc': 'Transporte y abastecimiento para uno de los proyectos cupríferos más relevantes de la región andina.',
      'exp.card4.tag': 'Cobre · Oro',
      'exp.card4.desc': 'Asistencia logística a campañas de exploración en zona cordillerana de San Juan durante múltiples temporadas.',
      'exp.card5.tag': 'Zona operativa',
      'exp.card5.title': 'Calingasta — Alta Cordillera',
      'exp.card5.desc': 'Logística de exploración y abastecimiento en proyectos ubicados entre 3.500 y 4.500 m s.n.m., en los departamentos de Calingasta e Iglesia.',
      'exp.card6.tag': 'Campaña de exploración',
      'exp.card6.title': 'Exploración Regional',
      'exp.card6.desc': 'Soporte continuo a campañas de exploración de operadoras internacionales durante múltiples temporadas en la provincia de San Juan.',
      'team.body': 'Contamos con un equipo base de más de 20 colaboradores y dotación escalable según la demanda de cada campaña. Personal con amplia experiencia en operaciones críticas, entornos mineros de altura y respuesta en terreno bajo condiciones exigentes.',
      'team.roles.title': 'Perfiles operativos',
      'team.roles.sub': 'Dotación propia escalable según campaña. Sin dependencia de agencias ni subcontratistas.',
      'team.role1': 'Conductores de vehículos pesados y 4x4 en alta montaña',
      'team.role2': 'Operadores de hidrogrúa, señaleros y eslingadores certificados',
      'team.role3': 'Técnicos de mantenimiento preventivo de flota',
      'team.role4': 'Coordinadores de logística en campamento y terreno',
      'team.role5': 'Personal administrativo y de planificación operativa',
      'why.item1.title': 'Flota propia, con respaldo',
      'why.item1.desc': 'Control directo de cada unidad. Si una falla, según disponibilidad sale otra: la operación no se frena.',
      'why.item2.title': 'Presencia local en San Juan',
      'why.item2.desc': 'Bases en Rawson y Calingasta: movilización en horas, sin depender de operadores de otras provincias.',
      'why.item3.title': 'Personal propio y acreditado',
      'why.item3.desc': 'Conductores y operadores certificados, con experiencia real en minería y acreditaciones ante entes reconocidos por la OAA.',
      'why.item4.title': 'Seguros y habilitaciones al día',
      'why.item4.desc': 'ART, responsabilidad civil, seguro de carga y habilitaciones de transporte.',
      'why.item5.title': '+20 años en alta cordillera',
      'why.item5.desc': 'Más de 20 años en rutas de montaña, frentes de perforación y proyectos de exploración en San Juan.',
      'why.item6.title': 'Trazabilidad total',
      'why.item6.desc': 'Monitoreo GPS de la flota en cada recorrido: siempre sabés dónde está tu carga.',
      'why.closing': '"Queremos ser parte del crecimiento de cada proyecto, brindando soporte logístico con seguridad, trazabilidad y compromiso local."',
      'contact.body': 'Contamos con disponibilidad para nuevos proyectos. Consulte sin compromiso sobre disponibilidad de flota, capacidad operativa, cobertura cordillerana y plazos de respuesta.',
      'contact.label.tel': 'Teléfono',
      'contact.label.email': 'Correo electrónico',
      'contact.label.web': 'Sitio web',
      'contact.form.title': 'Solicitar propuesta',
      'contact.form.label.nombre': 'Nombre *',
      'contact.form.label.empresa': 'Empresa *',
      'contact.form.label.email': 'Correo electrónico *',
      'contact.form.label.servicio': 'Tipo de servicio',
      'contact.form.label.mensaje': 'Descripción del requerimiento',
      'contact.form.submit': 'Solicitar propuesta',
      'careers.body1': 'Si tenés experiencia en operaciones logísticas, transporte, mantenimiento o servicios de apoyo a la minería, envianos tu información para futuras búsquedas.',
      'careers.body2': 'Recibimos postulaciones para roles operativos, técnicos y administrativos. Personal con habilitaciones vigentes tiene prioridad.<br><strong class="text-mid">Este canal es exclusivo para postulaciones laborales.</strong> Las consultas comerciales van a <a href="#contacto" class="text-green">Contacto</a>.',
      'careers.form.title': 'Enviar postulación',
      'careers.form.label.nombre': 'Nombre completo *',
      'careers.form.label.email': 'Email *',
      'careers.form.label.area': 'Área de interés',
      'careers.form.label.mensaje': 'Mensaje / experiencia',
      'careers.form.submit': 'Enviar CV',
      'careers.adjuntos': 'También podés enviar tu CV por correo a <a href="mailto:ismaelsarr.hh@gmail.com" class="text-green">ismaelsarr.hh@gmail.com</a>',
      'contact.form.sending': 'Enviando…',
      'contact.form.success': '✓ Consulta enviada. Te responderemos a la brevedad.',
      'contact.form.error': '✗ No se pudo enviar. Escribinos directo a contacto@ismaelsa.info',
      'careers.form.sending': 'Enviando…',
      'careers.form.success': '✓ Postulación enviada. Te contactaremos si tu perfil coincide con una búsqueda activa.',
      'careers.form.error': '✗ No se pudo enviar. Escribinos directo a ismaelsarr.hh@gmail.com',
      'contact.form.ratelimit': '✗ Ya enviaste varias solicitudes desde este dispositivo. Podés volver a intentar en {t}. Si es urgente, escribinos a contacto@ismaelsa.info',
      'careers.form.ratelimit': '✗ Ya enviaste varias postulaciones desde este dispositivo. Podés volver a intentar en {t}. Si es urgente, escribinos a ismaelsarr.hh@gmail.com',
      'rl.hours': '{n} h',
      'rl.lesshour': 'menos de una hora',
      'footer.logo.sub': 'Servicios, Logística y Transporte Minero',
      'footer.tagline': 'Empresa sanjuanina con más de 20 años de experiencia en soluciones logísticas para la minería, petróleo, gas y grandes obras.',
      'footer.copy': '© 2025 ISMAEL S.A. — San Juan, Argentina.<br>Todos los derechos reservados.',
      'footer.col.empresa': 'Empresa',
      'footer.col.bases': 'Bases operativas',
      'footer.col.contacto': 'Contacto',
      'footer.rawson.desc': 'Gran San Juan — centro logístico y administrativo',
      'footer.calingasta.desc': 'Zona cordillerana — base de avanzada operativa',
      'ph.select': 'Seleccione…',
      'ph.nombre': 'Ej: Carlos Romero',
      'ph.empresa': 'Ej: Glencore Pachón',
      'ph.email.corp': 'correo@empresa.com',
      'ph.email.general': 'correo@email.com',
      'ph.cv.nombre': 'Nombre y apellido',
      'ph.cv.mensaje': 'Resumen de experiencia, certificaciones y disponibilidad.',
      'ph.archivo': 'Seleccionar archivos...',
      'ph.cv.archivo': 'Seleccionar CV (PDF)...',
      'file.proposal.label': 'Adjuntar archivo (opcional, máx. 5 MB)',
      'file.proposal.linklabel': '¿El archivo pesa más de 5 MB? Pegá un link (opcional)',
      'file.proposal.hint': 'Para PDFs grandes, subilo a Google Drive o WeTransfer y pegá el enlace acá. Verificá que sea de acceso público.',
      'ph.proposal.link': 'https://drive.google.com/…',
      'file.cv.label': 'Adjuntar CV (obligatorio, máx. 5 MB)',
      'file.cv.hint': 'Formato PDF o Word, hasta 5 MB.',
      'file.btn': 'Seleccionar archivo',
      'file.none': 'Ningún archivo seleccionado',
      'file.toobig': 'El archivo supera los 5 MB. Para archivos grandes usá el link de Drive.',
      'careers.form.cv.required': 'Adjuntá tu CV (PDF o Word, máx. 5 MB) para enviar la postulación.',
      'ph.mensaje': 'Zona de operación, fechas estimadas, volumen, equipamiento requerido, etc.',
      'svc.general': 'Consulta general',
      'area.1': 'Conducción de vehículos pesados',
      'area.2': 'Operación de hidrogrúa',
      'area.3': 'Mantenimiento y taller',
      'area.4': 'Logística y coordinación',
      'area.5': 'Seguridad e higiene',
      'area.6': 'Administración',
      'area.7': 'Otro',
      // Carrusel de flota
      'carousel.veh0.name': 'Mercedes-Benz Atego 3132',
      'carousel.veh0.meta': 'Año 2026',
      'carousel.veh0.type': 'Aguatero',
      'carousel.veh1.name': 'Toyota Hilux 2.8 TDI',
      'carousel.veh1.meta': 'Año 2023',
      'carousel.veh1.type': 'Vehículo 4×4',
      'carousel.veh2.name': 'IVECO Trakker 440',
      'carousel.veh2.meta': 'Año 2024',
      'carousel.veh2.type': 'Tractor con Semirremolque',
      'carousel.veh3.name': 'IVECO Tector 260E30',
      'carousel.veh3.meta': 'Año 2024',
      'carousel.veh3.type': 'Camión Chasis',
      'carousel.veh4.name': 'IVECO Tector 27320 + Palfinger',
      'carousel.veh4.meta': 'Año 2025',
      'carousel.veh4.type': 'Hidrogrúa',
      'carousel.veh5.name': 'IVECO Trakker 480',
      'carousel.veh5.meta': 'Año 2025',
      'carousel.veh5.type': 'Tractor con Semirremolque',
      'carousel.veh6.name': 'Mercedes-Benz Axor 3344 + Palfinger',
      'carousel.veh6.meta': 'Año 2025',
      'carousel.veh6.type': 'Hidrogrúa',
      'carousel.veh7.name': 'Mercedes-Benz Actros + OMBU',
      'carousel.veh7.meta': 'Año 2026',
      'carousel.veh7.type': 'Tractor con Semirremolque',
      'carousel.veh8.name': 'IVECO Stralis 480 + Niño Jesús de Praga',
      'carousel.veh8.meta': 'Año 2026',
      'carousel.veh8.type': 'Tractor con Semirremolque',
      'carousel.veh9.name': 'IVECO Stralis 480 + OMBU',
      'carousel.veh9.meta': 'Año 2026',
      'carousel.veh9.type': 'Tractor con Semirremolque',

      /* ── Claves compartidas por las sub-páginas de servicio (spokes) ──
         Reutilizan nav.*, cta.solicitar, cta.contactar, footer.col.bases,
         footer.col.contacto, footer.rawson.desc, footer.calingasta.desc
         (ya definidas arriba, mismo texto). */
      'breadcrumb.inicio': 'Inicio',
      'breadcrumb.servicios': 'Servicios mineros en San Juan',
      'footer.tagline.sub': 'Operador logístico sanjuanino para la industria minera, petróleo, gas y grandes obras.',
      'cta.ver_capacidades': 'Ver capacidades',
      'cta.ver_todos_servicios': 'Ver todos los servicios →',
      'stats.flota_propia': 'Flota<br>propia',
      'footer.col.servicios': 'Servicios',
      'footer.link.pillar': 'Servicios mineros en San Juan',
      'footer.link.exploracion': 'Logística de exploración y perforación',
      'footer.link.transporte': 'Transporte minero',
      'footer.link.abastecimiento': 'Abastecimiento en zonas remotas',
      'footer.link.traslado': 'Traslado de personal',
      'footer.link.agua': 'Transporte de agua para minería',
      'footer.link.hidrogruas': 'Hidrogrúas para minería',
      'footer.link.soporte': 'Soporte operativo en alta montaña',

      /* ── Traslado de personal (traslado-de-personal-minero.html) ── */
      'tp.breadcrumb.current': 'Traslado de personal',
      'tp.hero.h1': 'Traslado de personal para minería en San Juan',
      'tp.hero.lead': 'Que tu gente llegue al frente segura y a horario, campaña tras campaña. Trasladamos al personal entre bases, proyectos y campamentos en camionetas 4×4 preparadas para la alta montaña, con conductores que conocen cada ruta. Más de 20 años en la Cordillera de los Andes, con bases en Rawson y Calingasta.',
      'tp.intro.tag': 'Por qué importa',
      'tp.intro.title': 'El personal tiene que llegar. Y a tiempo.',
      'tp.intro.body1': 'En una operación minera de altura, una rotación que se atrasa es una cuadrilla que no entra al frente y una jornada que arranca tarde. Y el camino no perdona: nieve, cornisas, hielo. Llevar gente a esos lugares no es un viaje más — es un traslado que hay que planificar, con la unidad y el conductor adecuados.',
      'tp.intro.body2': 'ISMAEL S.A. traslada al personal de la operación con flota propia de camionetas 4×4 y conductores con experiencia real en la cordillera. Coordinamos las rotaciones al ritmo de la campaña, para que tu gente esté donde tiene que estar, cuando tiene que estar.',
      'tp.flota.tag': 'Flota propia',
      'tp.flota.title': 'Camionetas 4×4 preparadas para la montaña',
      'tp.flota.body1': 'Nuestra flota de camionetas 4×4 está preparada para las rutas mineras de la cordillera: caminos de cornisa, nieve y accesos que un vehículo común no hace. Cada unidad, con mantenimiento al día y equipada para la alta montaña.',
      'tp.flota.body2': 'Al ser flota y conductores propios, controlamos la disponibilidad y respondemos a los cambios de último momento sin depender de terceros.',
      'tp.flota.caption': 'Camioneta 4×4 de ISMAEL S.A. en un frente cordillerano de San Juan.',
      'tp.cap.tag': 'Qué incluye',
      'tp.cap.title': 'El personal, conectado con toda la operación',
      'tp.cap.body': 'Coordinamos los movimientos de la gente al ritmo de la campaña, entre todos los puntos donde la operación necesita a su personal.',
      'tp.cap.item1.title': 'Rotaciones programadas',
      'tp.cap.item1.desc': 'Movimientos planificados de personal entre bases, campamentos y frentes, coordinados con el cronograma de cada campaña.',
      'tp.cap.item2.title': 'Conexión entre puntos de operación',
      'tp.cap.item2.desc': 'Enlace permanente entre proyectos, laboratorios, bases y proveedores, sin depender de operadores de otras provincias.',
      'tp.cap.item3.title': 'Traslados urgentes',
      'tp.cap.item3.desc': 'Respuesta a movimientos no previstos: relevos, cambios de último momento o urgencias en el frente.',
      'tp.cap.item4.title': 'Vehículos para alta cordillera',
      'tp.cap.item4.desc': 'Camionetas 4×4 preparadas para las rutas y las condiciones de la montaña, con conductores que conocen el camino.',
      'tp.relevo.tag': 'En la ruta',
      'tp.relevo.title': 'Un relevo, en cualquier punto del camino',
      'tp.relevo.body': 'Bajar en el punto exacto donde el frente lo requiere, con el equipo puesto y listo para entrar a trabajar. Nuestros conductores conocen cada tramo de la ruta, así el traslado no le resta tiempo a la jornada.',
      'tp.relevo.caption': 'Relevo de personal de ISMAEL S.A. en un camino cordillerano de San Juan.',
      'tp.band.title': 'Tu gente en el frente, <em>a horario.</em>',
      'tp.band.body': 'Rotaciones planificadas y respuesta a los imprevistos, con flota propia y conductores que conocen la cordillera. Una variable menos de qué preocuparse en la operación.',
      'tp.why.tag': 'Operador local',
      'tp.why.title': 'Por qué contratar el traslado de personal con un operador sanjuanino',
      'tp.why.body': 'La diferencia entre un operador local y uno de afuera se mide en horas de movilización y en quién responde cuando hay que mover gente sin demora.',
      'tp.why.item1.title': 'Vehículos propios para el traslado',
      'tp.why.item1.desc': 'Camionetas 4x4 propias, mantenidas para el traslado diario de personal a los frentes. Si una unidad falla, sale otra: el turno no se pierde.',
      'tp.why.item2.title': 'Presencia local en San Juan',
      'tp.why.item2.desc': 'Bases en Rawson y Calingasta: movilización en horas, sin depender de operadores de otras provincias.',
      'tp.why.item3.title': 'Choferes con manejo de personal en ruta',
      'tp.why.item3.desc': 'Conductores acreditados, con experiencia real en caminos de cordillera y en el traslado de personal a frentes de altura.',
      'tp.why.item4.title': 'Seguro de ocupantes al día',
      'tp.why.item4.desc': 'ART, responsabilidad civil y seguro de pasajeros vigente en cada viaje.',
      'tp.why.item5.title': '+20 años en alta cordillera',
      'tp.why.item5.desc': 'Más de 20 años en rutas de montaña, frentes de perforación y proyectos de exploración en San Juan.',
      'tp.why.item6.title': 'Turnos con horario y recorrido registrados',
      'tp.why.item6.desc': 'Seguimiento GPS de cada viaje: sabés cuándo salió la camioneta y cuándo llegó a destino.',
      'tp.cta.title': '¿Necesitás coordinar el traslado de tu personal?',
      'tp.cta.body': 'Contanos las bases, los frentes y la frecuencia de las rotaciones. Te respondemos con una propuesta concreta.',

      /* ── Abastecimiento en zonas remotas (abastecimiento-minero-zonas-remotas.html) ── */
      'ab.breadcrumb.current': 'Abastecimiento en zonas remotas',
      'ab.hero.h1': 'Abastecimiento minero en zonas remotas de San Juan',
      'ab.hero.lead': 'Que a tu operación nunca le falte lo que necesita, aunque el frente esté al final de un camino que un transporte común no hace. Llevamos materiales, módulos e insumos hasta los puntos de difícil acceso de la cordillera, con flota propia y conductores que conocen cada ruta. Más de 20 años operando en San Juan, con bases en Rawson y Calingasta.',
      'ab.intro.tag': 'Por qué importa',
      'ab.intro.title': 'En una operación remota, lo que no llega frena el frente.',
      'ab.intro.body1': 'Cuanto más lejos está el frente, más frágil se vuelve la cadena de suministro. Un material que no llega, un insumo que se demora, y la cuadrilla se queda esperando. El último tramo —caminos de cornisa, nieve, accesos sin señalizar— es justo donde la logística común se planta.',
      'ab.intro.body2': 'ISMAEL S.A. lleva los materiales, módulos e insumos de la operación hasta el punto donde se necesitan, con flota propia y gente con experiencia real en la cordillera. Coordinamos cada entrega para que el abastecimiento no sea una variable de riesgo.',
      'ab.ultima.tag': 'Última milla',
      'ab.ultima.title': 'El último tramo, resuelto',
      'ab.ultima.body1': 'Donde el camino se angosta y el asfalto se termina, seguimos. Nuestras unidades entran a los accesos de montaña —cornisas, ripio, nieve— que separan la ruta principal del frente de trabajo.',
      'ab.ultima.body2': 'Al ser flota y conductores propios, planificamos cada viaje según la carga y el estado del camino, sin depender de operadores de otras provincias.',
      'ab.cap.tag': 'Qué trasladamos',
      'ab.cap.title': 'Lo que la operación necesita, hasta donde lo necesita',
      'ab.cap.body': 'Coordinamos el abastecimiento al ritmo de cada proyecto, desde la base hasta el frente más alejado.',
      'ab.cap.item1.title': 'Materiales y estructuras',
      'ab.cap.item1.desc': 'Traslado de materiales, perfiles, estructuras y equipamiento hasta el punto de operación.',
      'ab.cap.item2.title': 'Módulos e insumos',
      'ab.cap.item2.desc': 'Reposición de los módulos, insumos y consumibles que la operación necesita para no frenar.',
      'ab.cap.item3.title': 'Cargas sobredimensionadas',
      'ab.cap.item3.desc': 'Cuando la carga lo requiere, con los permisos correspondientes y camionetas guía.',
      'ab.cap.item4.title': 'Última milla en montaña',
      'ab.cap.item4.desc': 'Accesos no convencionales, caminos de cornisa y nieve que un transporte común no hace.',
      'ab.band.title': 'Hasta el último punto <em>de la operación.</em>',
      'ab.band.body': 'Materiales, módulos e insumos donde el frente los necesita, con flota propia y gente que conoce la cordillera. El abastecimiento deja de ser una preocupación.',
      'ab.why.tag': 'Operador local',
      'ab.why.title': 'Por qué tercerizar el abastecimiento con un operador sanjuanino',
      'ab.why.body': 'La diferencia entre un operador local y uno de afuera se mide en horas de movilización y en quién responde cuando falta algo en el frente.',
      'ab.why.item1.title': 'Flota propia todo terreno',
      'ab.why.item1.desc': 'Control directo de cada unidad. Si una falla, según disponibilidad sale otra: el abastecimiento no se corta.',
      'ab.why.item2.title': 'Presencia local en San Juan',
      'ab.why.item2.desc': 'Bases en Rawson y Calingasta: respuesta en horas, sin depender de operadores de otras provincias.',
      'ab.why.item3.title': 'Choferes con experiencia en rutas sin señal',
      'ab.why.item3.desc': 'Conductores acreditados, que conocen las picadas y los caminos de acceso a cada frente, incluso sin cobertura de celular.',
      'ab.why.item4.title': 'Seguros de carga al día',
      'ab.why.item4.desc': 'ART, responsabilidad civil, seguro de carga y habilitaciones de transporte vigentes.',
      'ab.why.item5.title': '+20 años en alta cordillera',
      'ab.why.item5.desc': 'Más de 20 años llegando a frentes de perforación, campamentos y proyectos de exploración en San Juan.',
      'ab.why.item6.title': 'Seguimiento de cada envío',
      'ab.why.item6.desc': 'Monitoreo GPS de la unidad hasta la entrega: sabés cuándo llega el abastecimiento al frente.',
      'ab.cta.title': '¿Necesitás asegurar el abastecimiento de tu operación?',
      'ab.cta.body': 'Contanos qué mueve tu operación, hasta dónde y con qué frecuencia. Te respondemos con una propuesta concreta.',

      /* ── Transporte de agua (transporte-agua-mineria.html) ── */
      'ta.breadcrumb.current': 'Transporte de agua',
      'ta.hero.h1': 'Transporte de agua para minería en San Juan',
      'ta.hero.lead': 'El agua en el frente, en tiempo y forma, para que la operación no se detenga. Transportamos y abastecemos agua con aguateros propios —perforación, campamentos y riego de caminos— incluso en los accesos más exigentes de la cordillera sanjuanina. Más de 20 años en alta montaña, con bases en Rawson y Calingasta.',
      'ta.intro.tag': 'El servicio',
      'ta.intro.title': 'Agua en el frente, cuando y donde se necesita',
      'ta.intro.body1': 'En un proyecto minero de cordillera, el agua no es un detalle logístico: sin ella se frena la perforación, no funciona el campamento y no se puede controlar el polvo de los caminos. En zonas donde no hay red ni fuentes cercanas, el abastecimiento depende por completo de un aguatero que llega en tiempo y forma, en cualquier condición.',
      'ta.intro.body2': 'ISMAEL S.A. opera aguateros propios —de 9.000 a 20.000 litros de capacidad— en frentes de exploración y perforación de San Juan, con provisión programada o bajo demanda. Al ser flota propia y operador local, controlamos la disponibilidad de cada unidad y respondemos sin depender de terceros ni de movilizaciones desde otras provincias.',
      'ta.intro.caption': 'Aguateros de ISMAEL S.A. junto a un lago de la cordillera, San Juan.',
      'ta.perf.tag': 'Abastecimiento a perforación',
      'ta.perf.title': 'Provisión continua a frentes de perforación',
      'ta.perf.body1': 'Las campañas de perforación consumen agua de forma sostenida y no admiten cortes: una parada por falta de abastecimiento es tiempo de equipo y de cuadrilla perdido. Coordinamos la provisión al ritmo de cada sondaje, con viajes programados y capacidad de responder a picos de demanda.',
      'ta.perf.body2': 'Trabajamos sobre rutas de montaña y caminos no convencionales, a la altura y en las condiciones de frío y aislamiento propias de los frentes de la Cordillera de los Andes.',
      'ta.perf.caption': 'Aguatero propio de ISMAEL S.A. en frente cordillerano, San Juan.',
      'ta.captacion.tag': 'Captación propia',
      'ta.captacion.title': 'El aguatero también capta en la fuente',
      'ta.captacion.body1': 'Además de trasladar agua, nuestros equipos captan directamente desde ríos y cursos habilitados con motobomba propia, cuando el proyecto lo requiere y con los permisos correspondientes. Es un paso menos en la cadena: la misma unidad que carga es la que entrega.',
      'ta.captacion.body2': 'Esto reduce los tiempos muertos de un abastecimiento que depende de un tercero para la carga inicial, y le da al operador control de punta a punta del recurso.',
      'ta.captacion.caption': 'Aguatero de ISMAEL S.A. captando agua en fuente, cordillera de San Juan.',
      'ta.cap.tag': 'Aplicaciones',
      'ta.cap.title': 'Para qué usamos el agua en campaña',
      'ta.cap.body': 'El mismo servicio de aguateros cubre las distintas necesidades de agua de un proyecto, desde la perforación hasta el mantenimiento de los caminos de acceso.',
      'ta.cap.item1.title': 'Agua para perforación',
      'ta.cap.item1.desc': 'Provisión sostenida a equipos de sondaje, ajustada al avance de cada campaña y a las ventanas de operación del frente.',
      'ta.cap.item2.title': 'Abastecimiento a campamentos',
      'ta.cap.item2.desc': 'Agua para las instalaciones de faena y los módulos habitables en puntos de operación alejados de la red.',
      'ta.cap.item3.title': 'Riego y supresión de polvo',
      'ta.cap.item3.desc': 'Riego de caminos de acceso y huellas mineras para el control de polvo, clave para la seguridad y la visibilidad en ruta.',
      'ta.cap.item4.title': 'Provisión en zonas aisladas',
      'ta.cap.item4.desc': 'Entrega en frentes de difícil acceso donde el abastecimiento depende por completo de la logística de última milla.',
      'ta.figure': '9.000 <span>a</span> 20.000 <span>litros</span>',
      'ta.band.title': 'Que el frente <em>nunca</em> se quede sin agua.',
      'ta.band.body': 'Seis capacidades de aguatero para ajustar la provisión a cada operación. Una variable menos de qué preocuparse en el frente.',
      'ta.why.tag': 'Operador local',
      'ta.why.title': 'Por qué contratar el aguatero con un operador sanjuanino',
      'ta.why.body': 'La diferencia entre un aguatero local y uno de otra provincia se mide en horas de movilización y en quién responde cuando el frente se queda sin agua fuera de horario.',
      'ta.why.item1.title': 'Aguateros propios, con respaldo',
      'ta.why.item1.desc': 'Flota propia de aguateros de 9.000 a 20.000 litros. Si una unidad falla, sale otra: el agua sigue llegando al frente.',
      'ta.why.item2.title': 'Presencia local en San Juan',
      'ta.why.item2.desc': 'Bases en Rawson y Calingasta: movilización en horas, sin depender de operadores de otras provincias.',
      'ta.why.item3.title': 'Choferes acreditados para transporte de agua',
      'ta.why.item3.desc': 'Conductores certificados, con experiencia real en el manejo de cisternas en rutas de montaña y acreditaciones reconocidas por la OAA.',
      'ta.why.item4.title': 'Seguros de carga líquida al día',
      'ta.why.item4.desc': 'ART, responsabilidad civil y seguro de carga vigente para el transporte de agua.',
      'ta.why.item5.title': '+20 años en alta cordillera',
      'ta.why.item5.desc': 'Más de 20 años en rutas de montaña, frentes de perforación y proyectos de exploración en San Juan.',
      'ta.why.item6.title': 'Trazabilidad de cada carga de agua',
      'ta.why.item6.desc': 'Monitoreo GPS de la flota: sabés qué aguatero salió, a qué hora y cuándo llegó al frente.',
      'ta.cta.title': '¿Necesitás abastecimiento de agua para tu proyecto?',
      'ta.cta.body': 'Contanos la zona de operación, el consumo estimado y las fechas de campaña. Te respondemos con una propuesta concreta de abastecimiento.',

      /* ── Hidrogrúas (hidrogruas-mineria-san-juan.html) ── */
      'hg.breadcrumb.current': 'Hidrogrúas',
      'hg.hero.h1': 'Hidrogrúas para minería en San Juan',
      'hg.hero.lead': 'Izaje resuelto en el mismo frente, sin esperas ni equipos de terceros. Hidrogrúas Palfinger propias, con operadores certificados, para carga, descarga y montaje de estructuras en los accesos más exigentes de la cordillera sanjuanina. Más de 20 años en alta montaña, con bases en Rawson y Calingasta.',
      'hg.intro.tag': 'El servicio',
      'hg.intro.title': 'Izaje y movimiento de cargas en el frente',
      'hg.intro.body1': 'En un proyecto minero, mover una carga pesada mal ubicada o sin el equipo adecuado es un riesgo de seguridad y una demora costosa. La hidrogrúa resuelve en el mismo lugar lo que de otra forma exigiría coordinar equipos externos: carga y descarga de unidades, montaje de estructuras y traslado de piezas dentro del frente.',
      'hg.intro.body2': 'ISMAEL S.A. opera hidrogrúas Palfinger montadas sobre camión propio —modelos 23500 y 36080, entre otras— con capacidad de acceder a los frentes de la Cordillera de los Andes y trabajar en las condiciones de altura y aislamiento propias de la minería sanjuanina. Cada maniobra de izaje la ejecutan operadores de hidrogrúa certificados. Al ser flota propia y operador local, controlamos la disponibilidad de cada equipo sin depender de terceros.',
      'hg.intro.caption': 'Hidrogrúa de ISMAEL S.A. izando un tanque, fuera de horario, San Juan.',
      'hg.equipo.tag': 'Equipamiento propio',
      'hg.equipo.title': 'Grúas Palfinger montadas sobre camión',
      'hg.equipo.body1': 'Trabajamos con hidrogrúas Palfinger sobre camión, una combinación que suma el alcance de la grúa a la autonomía del transporte: la misma unidad llega al frente, descarga y ubica la carga, sin necesidad de coordinar equipos por separado.',
      'hg.equipo.body2': 'Es el equipamiento indicado para operaciones en caminos de montaña y puntos de difícil acceso, donde llevar una grúa convencional no es viable.',
      'hg.equipo.caption': 'Hidrogrúa Palfinger sobre camión propio de ISMAEL S.A., San Juan.',
      'hg.izaje.tag': 'En obra',
      'hg.izaje.title': 'La grúa hace el trabajo pesado, en el momento',
      'hg.izaje.body1': 'Izar un container o una estructura no es solo levantarla: es hacerlo con el ángulo, la eslinga y la señalización correctos. Nuestros operadores certificados manejan cada maniobra con la grúa montada en el mismo camión que trajo la carga.',
      'hg.izaje.body2': 'Sin esperar a un tercero con el equipo adecuado: la unidad que transporta es la misma que descarga y ubica.',
      'hg.izaje.caption': 'Hidrogrúa de ISMAEL S.A. izando un container en obra, San Juan.',
      'hg.cap.tag': 'Aplicaciones',
      'hg.cap.title': 'Para qué usamos la hidrogrúa en campaña',
      'hg.cap.body': 'El servicio de hidrogrúas cubre las necesidades de izaje y movimiento de cargas de un proyecto, desde la logística de equipos hasta el montaje en el frente.',
      'hg.cap.item1.title': 'Carga y descarga de equipos',
      'hg.cap.item1.desc': 'Movimiento de maquinaria, contenedores, módulos e insumos entre el transporte y el punto de operación.',
      'hg.cap.item2.title': 'Montaje de estructuras',
      'hg.cap.item2.desc': 'Posicionamiento de módulos habitables, tanques, estructuras y componentes en el frente de trabajo.',
      'hg.cap.item3.title': 'Izaje en zonas de difícil acceso',
      'hg.cap.item3.desc': 'Maniobras en caminos de montaña y puntos remotos donde una grúa convencional no llega.',
      'hg.cap.item4.title': 'Apoyo a perforación y obra',
      'hg.cap.item4.desc': 'Asistencia de izaje a equipos de sondaje, campamentos y obras de infraestructura en terreno exigente.',
      'hg.band.title': 'La carga se mueve. La operación <em>no espera.</em>',
      'hg.band.body': 'Hidrogrúas propias con operadores certificados: carga, descarga y montaje resueltos en el mismo frente, sin coordinar equipos de terceros.',
      'hg.why.tag': 'Operador local',
      'hg.why.title': 'Por qué contratar la hidrogrúa con un operador sanjuanino',
      'hg.why.body': 'La diferencia entre un operador local y uno de otra provincia se mide en horas de movilización y en quién responde cuando el frente necesita mover una carga sin demora.',
      'hg.why.item1.title': 'Grúas propias, con mantenimiento propio',
      'hg.why.item1.desc': 'Flota propia de hidrogrúas Palfinger. Si una unidad falla, sale otra: el izaje no se detiene.',
      'hg.why.item2.title': 'Presencia local en San Juan',
      'hg.why.item2.desc': 'Bases en Rawson y Calingasta: movilización en horas, sin depender de operadores de otras provincias.',
      'hg.why.item3.title': 'Operadores certificados en maniobra de izaje',
      'hg.why.item3.desc': 'Grueristas acreditados ante entes reconocidos por la OAA, con experiencia real en izaje de cargas en mina.',
      'hg.why.item4.title': 'Seguros de izaje al día',
      'hg.why.item4.desc': 'ART, responsabilidad civil, seguro de carga y habilitaciones para maniobra de izaje.',
      'hg.why.item5.title': '+20 años en alta cordillera',
      'hg.why.item5.desc': 'Más de 20 años en rutas de montaña, frentes de perforación y proyectos de exploración en San Juan.',
      'hg.why.item6.title': 'Trazabilidad de cada maniobra',
      'hg.why.item6.desc': 'Registro y monitoreo GPS de cada hidrogrúa: sabés dónde está la unidad y cuándo hizo el izaje.',
      'hg.cta.title': '¿Necesitás una hidrogrúa para tu proyecto?',
      'hg.cta.body': 'Contanos la zona de operación, el tipo de carga y las fechas de campaña. Te respondemos con una propuesta concreta.',

      /* ── Soporte operativo (soporte-operativo-alta-montana.html) ── */
      'so.breadcrumb.current': 'Soporte operativo',
      'so.hero.h1': 'Soporte operativo minero en alta montaña',
      'so.hero.lead': 'Un operador presente en el frente, toda la campaña. Coordinamos la logística en terreno, trasladamos al personal y asistimos a los campamentos en los frentes mineros de San Juan, para que tu operación no tenga que resolver cada imprevisto desde cero. Más de 20 años en la Cordillera de los Andes, con bases en Rawson y Calingasta.',
      'so.intro.tag': 'Por qué importa',
      'so.intro.title': 'En la cordillera, la operación no descansa',
      'so.intro.body1': 'Una campaña minera en alta montaña tiene decenas de cosas pasando a la vez: gente que entra y sale del frente, recursos que hay que mover, campamentos que abastecer y movimientos que coordinar en zonas donde no hay nada cerca. Cada una de esas tareas, sin quien las sostenga en terreno, se convierte en una demora.',
      'so.intro.body2': 'ISMAEL S.A. acompaña la operación en el frente: coordinamos la logística en campo, trasladamos al personal y asistimos a los campamentos, con flota propia y conocimiento real de las rutas y las condiciones de la cordillera sanjuanina.',
      'so.equipo.tag': 'Presencia en terreno',
      'so.equipo.title': 'Un equipo propio en el frente',
      'so.equipo.body1': 'No coordinamos la operación desde una oficina a cientos de kilómetros: nuestra gente está en el frente, con la flota, durante la campaña. Esa presencia es lo que permite anticipar los problemas y resolverlos en el momento, no al día siguiente.',
      'so.equipo.body2': 'Conocemos las rutas, los tiempos y las exigencias de cada operación de altura, porque es donde trabajamos desde hace más de 20 años.',
      'so.equipo.caption': 'Equipo de ISMAEL S.A. en un frente minero de San Juan.',
      'so.cap.tag': 'Qué incluye',
      'so.cap.title': 'Soporte a la operación, de principio a fin',
      'so.cap.body': 'Acompañamos las necesidades operativas del proyecto en terreno, coordinadas con el ritmo de la campaña.',
      'so.cap.item1.title': 'Coordinación y logística en campo',
      'so.cap.item1.desc': 'Planificación de recursos, organización de movimientos y coordinación operativa directamente en el terreno.',
      'so.cap.item2.title': 'Traslado de personal',
      'so.cap.item2.desc': 'Movimiento de personal hacia y desde los frentes en camionetas 4×4 preparadas para la alta montaña.',
      'so.cap.item3.title': 'Asistencia a campamentos y faena',
      'so.cap.item3.desc': 'Apoyo a las instalaciones de faena y a las necesidades logísticas de los campamentos en operación.',
      'so.cap.item4.title': 'Equipos con o sin operador',
      'so.cap.item4.desc': 'Según lo que necesite tu operación: la unidad operada por nuestro personal con experiencia en el frente, o solo el equipo cuando ponés tu propio conductor.',
      'so.camp.tag': 'Asistencia a campamentos',
      'so.camp.title': 'El campamento, listo cuando lo necesitás',
      'so.camp.body': 'Instalar o ampliar un campamento en la cordillera implica mover módulos, coordinar la descarga y ubicarlos donde la faena los necesita. Nuestro equipo asiste esa logística en el lugar, con la flota y la gente para resolverlo en una sola visita.',
      'so.san.tag': 'Traslado 4x4',
      'so.san.title': 'Sanitarios y módulos, hasta donde el camino lo permita',
      'so.san.body': 'Baños químicos, módulos y equipamiento de campamento no siempre tienen un camino fácil hasta destino. Con camiones 4x4 propios llevamos ese equipamiento a campamentos en altura, sobre picadas y caminos de montaña donde un camión convencional no llega.',
      'so.san.caption': 'Traslado de módulos sanitarios a campamento de altura, ISMAEL S.A.',
      'so.gente.tag': 'Nuestra gente',
      'so.gente.title': 'Gente preparada para el frente',
      'so.gente.body': 'El soporte operativo lo sostiene la gente que lo ejecuta. Antes de subir a un frente de altura, nuestro personal cumple un proceso que no se salta por apuro.',
      'so.gente.item1.title': 'Certificaciones OAA',
      'so.gente.item1.desc': 'Conductores y operadores acreditados ante entes reconocidos por la OAA, no solo con licencia habilitante.',
      'so.gente.item2.title': 'Control de fatiga',
      'so.gente.item2.desc': 'Seguimiento de horas de manejo y descanso del personal, clave en turnos largos de alta montaña.',
      'so.gente.item3.title': 'Inducción a yacimiento',
      'so.gente.item3.desc': 'Cada persona que ingresa a un frente pasa por la inducción de seguridad del yacimiento antes de operar.',
      'so.band.title': 'En el frente, <em>todos los días.</em>',
      'so.band.body': 'No un proveedor que aparece y se va: un operador presente en terreno durante toda la campaña, que conoce tu operación y responde cuando algo hace falta.',
      'so.why.tag': 'Operador local',
      'so.why.title': 'Por qué el soporte lo da un operador sanjuanino',
      'so.why.body': 'La diferencia entre un operador local y uno de afuera se mide en horas de movilización y en quién está en el frente cuando la operación lo necesita.',
      'so.why.item1.title': 'Flota propia para abastecer campamentos',
      'so.why.item1.desc': 'Camiones y camionetas propias dedicadas a la logística de campamento. Si una unidad falla, sale otra: el campamento no se queda sin abastecer.',
      'so.why.item2.title': 'Presencia local en San Juan',
      'so.why.item2.desc': 'Bases en Rawson y Calingasta: movilización en horas, sin depender de operadores de otras provincias.',
      'so.why.item3.title': 'Personal propio con experiencia en campamento',
      'so.why.item3.desc': 'Conductores y operadores acreditados, con experiencia real en logística de campamentos de altura.',
      'so.why.item4.title': 'Seguros y habilitaciones al día',
      'so.why.item4.desc': 'ART, responsabilidad civil, seguro de carga y habilitaciones de transporte para la logística de campamento.',
      'so.why.item5.title': '+20 años en alta cordillera',
      'so.why.item5.desc': 'Más de 20 años en rutas de montaña, frentes de perforación y proyectos de exploración en San Juan.',
      'so.why.item6.title': 'Trazabilidad de cada entrega al campamento',
      'so.why.item6.desc': 'Monitoreo GPS de la flota: sabés qué unidad salió y cuándo llegó al campamento.',
      'so.cta.title': '¿Necesitás soporte operativo para tu campaña?',
      'so.cta.body': 'Contanos la zona de operación, las necesidades del frente y las fechas estimadas. Te respondemos con una propuesta concreta.',

      /* ── Transporte minero (transporte-minero-san-juan.html) ── */
      'tm.breadcrumb.current': 'Transporte minero',
      'tm.hero.h1': 'Transporte minero en San Juan',
      'tm.hero.lead': 'Tu equipo en el frente, en tiempo y forma, para que la operación no espere. Transportamos maquinaria pesada, insumos y módulos hasta los proyectos mineros de San Juan con flota propia —tractores, semirremolques y camiones de carga— y el conocimiento de las rutas de montaña que da operar acá desde hace más de 20 años.',
      'tm.intro.tag': 'Por qué importa',
      'tm.intro.title': 'El equipo que no llega es una operación que no arranca',
      'tm.intro.body1': 'En un proyecto minero, un componente demorado en la ruta no es un retraso de logística: es una perforadora parada, una cuadrilla esperando y un costo que corre por hora. En la cordillera, donde los accesos son largos y exigentes, mover una carga pesada hasta el frente depende de que el transportista conozca el camino y cumpla el plazo.',
      'tm.intro.body2': 'ISMAEL S.A. transporta equipos, insumos y estructuras hasta los frentes mineros de San Juan con flota propia. Al no depender de terceros ni de subcontratos, controlamos la disponibilidad de cada unidad y respondemos por el cumplimiento del viaje. Para el cliente, es una variable menos de qué preocuparse en el frente.',
      'tm.intro.caption': 'Unidad de ISMAEL S.A. con hidrogrúa trasladando un módulo hasta el frente minero.',
      'tm.flota.tag': 'Flota propia',
      'tm.flota.title': 'Tractores, semirremolques y camiones de carga',
      'tm.flota.body1': 'Contamos con equipos de tracción y semirremolques de 30 a 45 toneladas de capacidad según el tipo de carga, además de chasis y camiones de distinto porte, todos propios y con mantenimiento al día. La flota se asigna según el tipo de carga y las condiciones del acceso, no según lo que haya disponible en el mercado ese día.',
      'tm.flota.body2': 'Es la diferencia de trabajar con un operador que responde por sus propias unidades: control directo sobre la disponibilidad, la prioridad y el estado de cada camión.',
      'tm.flota.caption': 'Tractor con semirremolque de ISMAEL S.A. cargado de materiales en la cordillera sanjuanina.',
      'tm.cap.tag': 'Qué transportamos',
      'tm.cap.title': 'Cargas para cada etapa del proyecto',
      'tm.cap.body': 'Del arranque de una campaña al desarrollo de la mina, movemos lo que la operación necesita en terreno, coordinado con las ventanas de trabajo de cada frente.',
      'tm.cap.item1.title': 'Equipos y maquinaria pesada',
      'tm.cap.item1.desc': 'Traslado de maquinaria, equipos de gran porte y componentes hacia y desde los frentes de operación.',
      'tm.cap.item2.title': 'Insumos, materiales y repuestos',
      'tm.cap.item2.desc': 'Abastecimiento de materiales de consumo, repuestos y suministros para sostener la continuidad de la faena.',
      'tm.cap.item3.title': 'Módulos y estructuras',
      'tm.cap.item3.desc': 'Transporte de módulos habitables de campamento, tanques, estructuras y contenedores.',
      'tm.cap.item4.title': 'Cargas especiales y sobredimensionadas',
      'tm.cap.item4.desc': 'Cuando la operación lo requiere, coordinamos cargas de gran porte con los permisos correspondientes y camionetas guía para un traslado seguro.',
      'tm.cap.note': 'Operamos principalmente en San Juan y, cuando el cliente lo necesita, también realizamos transporte interprovincial: coordinamos el traslado de punta a punta, con un único responsable de toda la cadena.',
      'tm.carreton.tag': 'Cargas especiales',
      'tm.carreton.title': 'Sobredimensionados y equipos completos',
      'tm.carreton.body': 'Cuando hay que mover una máquina completa, un vehículo o una estructura que no entra en un semirremolque común, sumamos carretones de cama baja. Coordinamos los permisos de circulación y las camionetas guía para que la carga llegue sin sobresaltos.',
      'tm.carreton.caption': 'Carretón de cama baja de ISMAEL S.A. transportando un equipo en San Juan.',
      'tm.figure': '30 <span>a</span> 45 <span>toneladas</span>',
      'tm.band.title': 'Cuando el equipo tiene que estar, <em>está.</em>',
      'tm.band.body': 'Flota propia, rutas conocidas y un único responsable de que tu carga llegue al frente en tiempo y forma. Esa es la tranquilidad que buscás en un transportista minero.',
      'tm.seg.tag': 'Seguridad y trazabilidad',
      'tm.seg.title': 'Control en cada recorrido',
      'tm.seg.body': 'En transporte minero, la seguridad no es un extra: es la condición para operar. Cada viaje se planifica, se monitorea y se comunica para anticipar los riesgos del camino.',
      'tm.seg.item1.title': 'Monitoreo GPS satelital',
      'tm.seg.item1.desc': 'Seguimiento de cada unidad en ruta y trazabilidad de la carga de punta a punta.',
      'tm.seg.item2.title': 'Mantenimiento preventivo',
      'tm.seg.item2.desc': 'Plan programado y revisión preoperacional por unidad antes de cada salida.',
      'tm.seg.item3.title': 'Conductores para montaña',
      'tm.seg.item3.desc': 'Personal con experiencia en las rutas y las condiciones de la alta cordillera.',
      'tm.seg.item4.title': 'Comunicación VHF / satelital',
      'tm.seg.item4.desc': 'Enlace operativo en zonas sin cobertura durante todo el trayecto.',
      'tm.why.tag': 'Operador local',
      'tm.why.title': 'Por qué contratar el transporte con un operador sanjuanino',
      'tm.why.body': 'La diferencia entre un transportista local y uno de afuera se mide en horas de movilización, en conocimiento de las rutas y en quién responde cuando el frente necesita mover algo sin demora.',
      'tm.why.item1.title': 'Flota propia para cargas sobredimensionadas',
      'tm.why.item1.desc': 'Camiones, grúas y carretones propios. Si una unidad falla, sale otra: el equipo llega igual.',
      'tm.why.item2.title': 'Presencia local en San Juan',
      'tm.why.item2.desc': 'Bases en Rawson y Calingasta: movilización en horas, sin depender de operadores de otras provincias.',
      'tm.why.item3.title': 'Operadores certificados en carga pesada',
      'tm.why.item3.desc': 'Conductores y operadores acreditados, con experiencia real en transporte de equipos mineros y acreditaciones reconocidas por la OAA.',
      'tm.why.item4.title': 'Seguros de carga sobredimensionada al día',
      'tm.why.item4.desc': 'ART, responsabilidad civil, seguro de carga y habilitaciones para transporte de cargas especiales.',
      'tm.why.item5.title': '+20 años en alta cordillera',
      'tm.why.item5.desc': 'Más de 20 años en rutas de montaña, frentes de perforación y proyectos de exploración en San Juan.',
      'tm.why.item6.title': 'Trazabilidad total',
      'tm.why.item6.desc': 'Monitoreo GPS de la flota en cada recorrido: siempre sabés dónde está tu carga.',
      'tm.cta.title': '¿Necesitás mover equipos a un proyecto minero en San Juan?',
      'tm.cta.body': 'Contanos qué tenés que transportar, el origen y el destino, y las fechas estimadas. Te respondemos con una propuesta concreta.',

      /* ── Logística de exploración y perforación (hub, logistica-exploracion-perforacion-san-juan.html) ── */
      'ex.breadcrumb.current': 'Logística de exploración y perforación',
      'ex.hero.h1': 'Logística para exploración, explotación y perforación minera en San Juan',
      'ex.hero.lead': 'Una campaña en la alta cordillera se sostiene con logística: agua en el frente de perforación, equipos que llegan, personal que entra y sale, y abastecimiento que no se corta. ISMAEL S.A. resuelve toda esa logística con flota propia, en los proyectos mineros de San Juan, desde hace más de 20 años. Bases en Rawson y Calingasta.',
      'ex.cta.ver_resolvemos': 'Ver qué resolvemos',
      'ex.intro.tag': 'Por qué importa',
      'ex.intro.title': 'Sin logística, la campaña se frena',
      'ex.intro.body1': 'Explorar o perforar en la cordillera es operar lejos de todo. Sin agua, la perforadora para. Sin insumos, el frente se detiene. Sin la gente en el lugar, el turno no arranca. Cada eslabón de la campaña depende de que la logística no falle, en un terreno donde el camino ya es de por sí un desafío.',
      'ex.intro.body2': 'ISMAEL S.A. acompaña la campaña completa: llevamos el agua a la perforación, movemos los equipos, abastecemos los campamentos y trasladamos al personal, con flota propia y gente que conoce cada ruta de la cordillera sanjuanina. Un solo operador para toda la logística del proyecto.',
      'ex.intro.caption': 'Unidad de ISMAEL S.A. en un frente de exploración, San Juan.',
      'ex.frente.tag': 'En el frente',
      'ex.frente.title': 'Donde está el proyecto, estamos nosotros',
      'ex.frente.body1': 'Desde el primer campamento de exploración hasta la fase de explotación, ISMAEL S.A. opera en el frente: con la flota, la gente y los tiempos que exige la alta cordillera.',
      'ex.frente.body2': 'No mandamos un camión y nos vamos. Sostenemos la logística de la campaña durante toda su duración, con la continuidad que un proyecto minero necesita.',
      'ex.frente.caption': 'Unidad de ISMAEL S.A. cruzando un río hacia un frente minero de San Juan.',
      'ex.flotaperf.tag': 'Flota para perforación',
      'ex.flotaperf.title': 'Más de una unidad, cuando la campaña lo pide',
      'ex.flotaperf.body': 'Una campaña de perforación no siempre se resuelve con un solo camión: hay que mover el equipo de sondaje, sostener el abastecimiento y tener respaldo si algo falla. Trabajamos con más de una unidad propia en el mismo frente, coordinadas por el mismo operador.',
      'ex.flotaperf.caption': 'Flota de ISMAEL S.A. en un frente de perforación, San Juan.',
      'ex.campana.tag': 'La logística de tu campaña',
      'ex.campana.title': 'Todo lo que la operación necesita en el frente',
      'ex.campana.body': 'Desde la exploración hasta la explotación, cada servicio de ISMAEL S.A. sostiene una parte de la campaña. Coordinados por un mismo operador, con la misma flota y la misma gente.',
      'ex.item1.title': 'Agua para la perforación',
      'ex.item1.desc': 'Aguateros de 9.000 a 20.000 litros abasteciendo los frentes de perforación y el consumo de la operación.',
      'ex.item1.link': 'Ver transporte de agua →',
      'ex.item2.title': 'Transporte de equipos e insumos',
      'ex.item2.desc': 'Traslado de maquinaria, materiales y módulos hasta el proyecto, incluidas cargas sobredimensionadas con permisos.',
      'ex.item2.link': 'Ver transporte minero →',
      'ex.item3.title': 'Abastecimiento en zonas remotas',
      'ex.item3.desc': 'Logística de última milla hasta los campamentos y frentes de difícil acceso, por caminos no convencionales.',
      'ex.item3.link': 'Ver abastecimiento →',
      'ex.item4.title': 'Traslado de personal',
      'ex.item4.desc': 'Rotaciones programadas y movimientos del personal de la campaña en camionetas 4×4 preparadas para la montaña.',
      'ex.item4.link': 'Ver traslado de personal →',
      'ex.item5.title': 'Hidrogrúas en el frente',
      'ex.item5.desc': 'Grúas Palfinger para carga y descarga de equipos y estructuras directamente en el punto de operación.',
      'ex.item5.link': 'Ver hidrogrúas →',
      'ex.item6.title': 'Soporte operativo en la campaña',
      'ex.item6.desc': 'Un equipo propio presente en el frente, coordinando la logística en terreno durante toda la campaña.',
      'ex.item6.link': 'Ver soporte operativo →',
      'ex.band.title': 'Un solo operador para <em>toda la campaña.</em>',
      'ex.band.body': 'De la exploración a la explotación, la misma flota y la misma gente sostienen la logística de tu proyecto. Menos proveedores que coordinar, una sola responsabilidad en el frente.',
      'ex.why.tag': 'Operador local',
      'ex.why.title': 'Por qué confiar la logística de tu campaña a un operador sanjuanino',
      'ex.why.body': 'La diferencia entre un operador local y uno de afuera se mide en horas de movilización y en quién responde cuando algo tiene que resolverse en el frente, sin demoras.',
      'ex.why.item1.title': 'Flota propia, con respaldo',
      'ex.why.item1.desc': 'Control directo de cada unidad. Si una falla, según disponibilidad sale otra: la campaña no se frena.',
      'ex.why.item2.title': 'Presencia local en San Juan',
      'ex.why.item2.desc': 'Bases en Rawson y Calingasta: movilización en horas, sin depender de operadores de otras provincias.',
      'ex.why.item3.title': 'Personal propio y acreditado',
      'ex.why.item3.desc': 'Conductores y operadores certificados, con experiencia real en minería y acreditaciones ante entes reconocidos por la OAA.',
      'ex.why.item4.title': 'Seguros y habilitaciones al día',
      'ex.why.item4.desc': 'ART, responsabilidad civil, seguro de carga y habilitaciones de transporte.',
      'ex.why.item5.title': '+20 años en alta cordillera',
      'ex.why.item5.desc': 'Más de 20 años en frentes de exploración, perforación y proyectos mineros de San Juan.',
      'ex.why.item6.title': 'Trazabilidad total',
      'ex.why.item6.desc': 'Monitoreo GPS de la flota en cada recorrido: siempre sabés dónde está lo que mueve tu campaña.',
      'ex.cta.title': '¿Estás planificando una campaña de exploración o perforación?',
      'ex.cta.body': 'Contanos en qué etapa está tu proyecto y qué necesitás mover al frente. Te respondemos con una propuesta concreta.',

      /* ── Pillar de servicios (servicios-mineros-san-juan.html) ── */
      'pl.hero.h1': 'Servicios mineros en San Juan, de punta a punta',
      'pl.hero.lead': 'Un solo operador sanjuanino para sostener la continuidad de tu operación en terreno: transporte, abastecimiento de agua, hidrogrúas, flota propia y personal en frente. Un único responsable, con más de 20 años en la Cordillera de los Andes y bases en Rawson y Calingasta.',
      'pl.cta.ver_servicios': 'Ver los servicios',
      'pl.servicios.tag': 'Servicios',
      'pl.servicios.title': 'Todos los servicios mineros en un solo operador',
      'pl.card.vermas': 'Ver más',
      'pl.card1.title': 'Logística de exploración, explotación y perforación',
      'pl.card1.desc': 'Coordinación de recursos, traslados y logística de campaña para frentes cordilleranos, bajo condiciones extremas de altura, frío y aislamiento.',
      'pl.card2.title': 'Transporte de agua',
      'pl.card2.desc': 'Abastecimiento de agua para perforadoras, campamentos y riego de caminos mediante aguateros propios. Provisión continua en frentes aislados de la cordillera.',
      'pl.card3.title': 'Abastecimiento en zonas remotas',
      'pl.card3.desc': 'Traslado de materiales, módulos e insumos a puntos de operación de difícil acceso. Logística de última milla en rutas de montaña y caminos no convencionales.',
      'pl.card4.title': 'Traslados programados',
      'pl.card4.desc': 'Conexión permanente entre proyectos, laboratorios, bases, proveedores y campamentos. Rotaciones planificadas y movimientos urgentes con respuesta inmediata.',
      'pl.card5.title': 'Transporte de equipos e insumos',
      'pl.card5.desc': 'Transportamos materiales críticos, equipamiento operativo y módulos habitables, coordinados con las ventanas de operación de cada proyecto.',
      'pl.card6.title': 'Soporte operativo en terreno',
      'pl.card6.desc': 'Personal con experiencia en frentes de exploración y perforación. Planificación de recursos, coordinación en campo y presencia continua durante toda la campaña.',
      'pl.card7.title': 'Hidrogrúas y servicios especiales',
      'pl.card7.desc': 'Izaje, movimiento de cargas y asistencia a operaciones que requieren equipamiento específico, operadores de hidrogrúa certificados y personal habilitado para tareas de alto riesgo.',
      'pl.band.title': 'Todo en un solo operador. <em>Un solo responsable.</em>',
      'pl.band.body': 'En vez de coordinar cinco proveedores, tenés uno que responde por todo lo que pasa en terreno. Esa es la tranquilidad de trabajar con ISMAEL.',
      'pl.why.tag': 'Operador local',
      'pl.why.title': 'Por qué contratar un operador de servicios mineros en San Juan',
      'pl.why.body': 'La diferencia entre un proveedor sanjuanino y uno de otra provincia no se mide en tarifa: se mide en horas de movilización, en conocimiento de las rutas de montaña y en quién atiende el teléfono cuando el frente necesita algo un domingo.',
      'pl.why.item1.title': 'Flota propia, con respaldo',
      'pl.why.item1.desc': 'Control directo de cada unidad. Si una falla, según disponibilidad sale otra: la operación no se frena.',
      'pl.why.item2.title': 'Presencia local en San Juan',
      'pl.why.item2.desc': 'Bases en Rawson y Calingasta: movilización en horas, sin depender de operadores de otras provincias.',
      'pl.why.item3.title': 'Personal propio y acreditado',
      'pl.why.item3.desc': 'Conductores y operadores certificados, con experiencia real en minería y acreditaciones ante entes reconocidos por la OAA.',
      'pl.why.item4.title': 'Seguros y habilitaciones al día',
      'pl.why.item4.desc': 'ART, responsabilidad civil, seguro de carga y habilitaciones de transporte.',
      'pl.why.item5.title': '+20 años en alta cordillera',
      'pl.why.item5.desc': 'Más de 20 años en rutas de montaña, frentes de perforación y proyectos de exploración en San Juan.',
      'pl.why.item6.title': 'Trazabilidad total',
      'pl.why.item6.desc': 'Monitoreo GPS de la flota en cada recorrido: siempre sabés dónde está tu carga.',
      'pl.sect.tag': 'Sectores',
      'pl.sect.title': 'A qué industrias damos servicio',
      'pl.sect.body': 'El núcleo de nuestra operación es la minería sanjuanina, pero la misma flota, el mismo personal y las mismas bases dan servicio a otros sectores que operan en terreno exigente.',
      'pl.sect.item1.title': 'Minería',
      'pl.sect.item1.desc': 'Exploración, explotación y perforación en frentes de la Cordillera de los Andes. Es el eje de nuestra operación y donde acumulamos más de 35 proyectos asistidos.',
      'pl.sect.item2.title': 'Petróleo y gas',
      'pl.sect.item2.desc': 'Transporte, abastecimiento y soporte operativo para operaciones que requieren logística en zonas alejadas de los centros urbanos.',
      'pl.sect.item3.title': 'Grandes obras',
      'pl.sect.item3.desc': 'Movimiento de equipos, insumos y módulos para obras de infraestructura, con la misma coordinación y equipamiento que usamos en campaña minera.',
      'pl.exp.tag': 'Experiencia que nos respalda',
      'pl.exp.title': 'Más de 35 proyectos asistidos en alta montaña',
      'pl.exp.body': 'Trabajamos junto a operadoras internacionales en los departamentos de Calingasta, Iglesia, Jáchal y Ullum, asistiendo campañas de exploración, perforación y desarrollo minero. Conocemos los frentes, las rutas y las exigencias de cada operación.',
      'pl.exp.links': 'Ver el detalle de los <a href="/#experiencia" class="inline-link">proyectos donde operamos</a> o conocer nuestras <a href="/#cobertura" class="inline-link">bases operativas en San Juan</a>.',
      'pl.cta.title': '¿Necesitás un operador de servicios mineros en San Juan?',
      'pl.cta.body': 'Contanos la zona de operación, las fechas estimadas y el equipamiento que necesitás. Te respondemos con una propuesta concreta.',
    },
    en: {
      'nav.nosotros': 'About us',
      'nav.servicios': 'Services',
      'nav.flota': 'Fleet',
      'nav.seguridad': 'Safety',
      'nav.bases': 'Bases',
      'nav.proyectos': 'Projects',
      'nav.contacto': 'Contact',
      'cta.contactar': 'Contact',
      'cta.solicitar': 'Request proposal',
      'cta.ver_servicios': 'View services',
      'cta.consultar': 'Check availability',
      'cta.whatsapp': 'WhatsApp',
      'cta.email': 'Send email',
      'hero.h1': 'MINING LOGISTICS IN SAN JUAN<br><em>THAT KEEPS YOUR OPERATION RUNNING</em><br>IN THE HIGH ANDES',
      'hero.lead': 'We anticipate the unexpected so your operation never stops. Own fleet, two bases in the province and over 20 years in the Andes mountain range.',
      'hero.sub': 'Transport, water supply, cranes and field support for San Juan\'s mining industry.',
      'stats.years': 'Years of<br>experience',
      'stats.units': 'Owned<br>units',
      'stats.bases': 'Operating bases<br>in San Juan',
      'stats.cert': 'Certified<br>personnel',
      'stats.projects': 'Projects<br>supported',
      'about.tag': 'About us',
      'about.title': 'San Juan-based logistics operator for the mining industry',
      'services.tag': 'Services',
      'services.title': 'Everything the operation needs on site',
      'services.all': 'View all services',
      'fleet.tag': 'Fleet and capabilities',
      'fleet.title': 'Owned equipment.<br>No middlemen.',
      'safety.tag': 'Health, safety and operational traceability',
      'safety.title': 'Every trip,<br>planned and controlled',
      'safety.quote': 'Preoperational check before every departure, monitoring on every route, and over 20 years in the mountains without a serious incident.',
      'bases.tag': 'Infrastructure and coverage',
      'bases.title': 'Two operating bases in San Juan',
      'experience.tag': 'Experience that backs us up',
      'experience.title': 'Over 35 projects supported<br>in high-altitude operations',
      'team.tag': 'Human capital',
      'team.title': 'People with<br>real operational experience',
      'team.quote': 'Much of our team has been going up the mountains for years: they know the roads, the timing and the risks by heart.',
      'why.tag': 'Why choose us',
      'why.title': 'The peace of mind<br>that logistics won\'t fail',
      'contact.tag': 'Commercial contact',
      'contact.title': 'Let\'s talk about<br>your next project',
      'careers.tag': 'Work with us',
      'careers.title': 'Add your experience<br>to the team',
      'flota.tech.title': 'Fleet management',
      'flota.tech.li1': 'Satellite GPS monitoring on every unit',
      'flota.tech.li2': 'Scheduled preventive maintenance',
      'flota.tech.li3': 'Daily pre-operational inspection',
      'flota.tech.li4': 'Technical documentation always up to date',
      'flota.tech.li5': 'VHF/satellite comms in no-coverage areas',
      'about.body1': 'ISMAEL S.A. is the San Juan-based company that mining operations trust with their on-site logistics — and then stop worrying about it. Specializing in mining logistics, mining transport and operational support for the mining, oil, gas and major construction industries, we operate our own fleet in the Andes, with over 20 years of experience.',
      'about.body2': 'We have two operating bases in Rawson and Calingasta that let us offer logistics in Calingasta and operational support in high mountain terrain, with fast mobilization to any point in the mountain range, without relying on external operators or inter-provincial transit.',
      'about.hl1': '<strong>Access to drilling fronts</strong> — we operate in Andean terrain inaccessible to operators without a base in the province',
      'about.hl2': '<strong>100% owned fleet</strong> — no middlemen, no outsourcing of critical equipment',
      'about.hl3': '<strong>Local response</strong> — two of our own bases for rapid mobilization to any point in the mountain range',
      'svc.1.title': 'Services and logistics for exploration, exploitation and drilling',
      'svc.1.desc': 'Resource coordination, transfers and comprehensive assistance for mining campaigns on Andean fronts under extreme conditions of altitude, cold and isolation.',
      'svc.2.title': 'Water transport',
      'svc.2.desc': 'Water supply for drillers, camps and road watering using our own tankers. Continuous supply at isolated mountain fronts.',
      'svc.3.title': 'Supply in remote areas',
      'svc.3.desc': 'Transport of materials, modules and supplies to difficult-to-access operation points. Last-mile logistics on mountain roads and non-conventional tracks.',
      'svc.4.title': 'Scheduled transfers',
      'svc.4.desc': 'Permanent connection between projects, laboratories, bases, suppliers and camps. Planned rotations and urgent movements with immediate response.',
      'svc.5.title': 'Equipment and supply transport',
      'svc.5.desc': "Solutions for critical materials, operational equipment and residential modules. Coordination adjusted to each project's operational windows.",
      'svc.6.title': 'Field operational support',
      'svc.6.desc': 'Personnel with experience at exploration and drilling fronts. Resource planning, field coordination and continuous presence throughout the campaign.',
      'svc.7.title': 'Cranes and special services',
      'svc.7.desc': 'Lifting, load movement and operational assistance requiring specific equipment, certified crane operators and qualified personnel for high-risk tasks.',
      'fleet.body': 'Over 20 owned units ready to operate in the mountains, roads and remote areas. We guarantee availability, scheduled preventive maintenance and local operational response, without relying on third parties for critical equipment.',
      'fleet.caption.title': '+20 units in operation',
      'fleet.caption.meta': 'Operating base · San Juan',
      'fleet.item1': 'Water tanker trucks',
      'fleet.item2': 'Trucks with crane',
      'fleet.item3': 'Chassis trucks',
      'fleet.item4': 'Semi-trailer tractors',
      'fleet.item5': '4×4 / 6×4 vehicles',
      'fleet.carousel.subtitle': 'Some of our vehicles',
      'safety.body': 'Every unit leaves after a preoperational check, travels monitored by GPS and follows a preventive maintenance plan. In the mountains, a slip can\'t be undone: it costs a day of operation, or worse. That\'s how we\'ve worked for over 20 years, in line with the HSEC requirements of international operators.',
      'safety.cert1': 'Personnel certified in defensive driving',
      'safety.cert2': 'Certified operation of heavy vehicles and crane',
      'safety.cert3': 'Pre-operational inspections and preventive maintenance',
      'safety.cert4': 'Fatigue control — permanent route monitoring',
      'safety.cert5': 'Compatible with HSEC requirements of international clients',
      'safety.num1': 'Certified staff',
      'safety.num2': 'Years without major incidents',
      'safety.num3': 'Fleet with GPS and fatigue control',
      'bases.body': 'Two strategically located operating bases in San Juan allow us to respond quickly to projects across the mountain range, reduce mobilization times and maintain local operational presence.',
      'bases.rawson.subtitle': 'Greater San Juan — Urban and industrial area',
      'bases.rawson.desc': 'Logistics, administrative and maintenance hub in Greater San Juan, with direct links to suppliers, laboratories and urban services. Coordination base for all campaigns.',
      'bases.rawson.tag1': 'Logistics center',
      'bases.rawson.tag2': 'Maintenance workshop',
      'bases.rawson.tag3': 'Fleet supply',
      'bases.rawson.tag4': 'Administration',
      'bases.calingasta.subtitle': 'Mountain zone — Access to high-altitude projects',
      'bases.calingasta.desc': "Forward position in the mountain zone, adjacent to the province's main exploration projects. Reduces mobilization times and facilitates operational response at high-altitude terrain.",
      'bases.calingasta.tag1': 'Mountain access',
      'bases.calingasta.tag2': 'Forward base',
      'bases.calingasta.tag3': 'Campaign support',
      'bases.calingasta.tag4': 'Mountain logistics',
      'bases.adv1.title': 'Faster response time',
      'bases.adv1.desc': 'Local mobilization without relying on long transits from other provinces.',
      'bases.adv2.title': 'Terrain knowledge',
      'bases.adv2.desc': 'Roads, secondary tracks, Andean altitude and mountain climate.',
      'bases.adv3.title': 'Local commitment',
      'bases.adv3.desc': 'Job creation and development in the province of San Juan.',
      'experience.body': 'We work alongside international operators and the most relevant mining projects in San Juan. We know the fronts, the roads and the demands of each operation.',
      'experience.context': 'As a San Juan-based mining logistics operator, we work in the departments of Calingasta, Iglesia, Jáchal and Ullum, supporting exploration, drilling and mining development campaigns alongside international and national operators with an active presence in San Juan.',
      'exp.card1.tag': 'Copper · Gold · Silver',
      'exp.card1.desc': "Supply logistics at one of the country's largest copper reserves, in the Andes mountain range, San Juan.",
      'exp.card2.tag': 'Gold · Copper · Silver',
      'exp.card2.desc': 'Operational support at an advanced exploration deposit in the San Juan mountains, above 4,000 m a.s.l.',
      'exp.card3.tag': 'Copper',
      'exp.card3.desc': 'Transport and supply for one of the most significant copper projects in the Andean region.',
      'exp.card4.tag': 'Copper · Gold',
      'exp.card4.desc': 'Logistics assistance for exploration campaigns in the San Juan mountain zone over multiple seasons.',
      'exp.card5.tag': 'Operating zone',
      'exp.card5.title': 'Calingasta — High Andes',
      'exp.card5.desc': 'Exploration logistics and supply for projects located between 3,500 and 4,500 m a.s.l., in the departments of Calingasta and Iglesia.',
      'exp.card6.tag': 'Exploration campaign',
      'exp.card6.title': 'Regional Exploration',
      'exp.card6.desc': 'Continuous support to exploration campaigns by international operators over multiple seasons in the province of San Juan.',
      'team.body': 'We have a core team of over 20 staff and scalable headcount according to the demand of each campaign. Personnel with extensive experience in critical operations, high-altitude mining environments and field response under demanding conditions.',
      'team.roles.title': 'Operational profiles',
      'team.roles.sub': 'Own scalable workforce by campaign. No dependency on agencies or subcontractors.',
      'team.role1': 'Heavy vehicle and 4×4 drivers in high-altitude terrain',
      'team.role2': 'Certified crane, signalling and rigging operators',
      'team.role3': 'Preventive fleet maintenance technicians',
      'team.role4': 'Logistics coordinators in camp and field',
      'team.role5': 'Administrative and operational planning staff',
      'why.item1.title': 'Own fleet, with backup',
      'why.item1.desc': 'Direct control of every unit. If one fails, another goes out subject to availability: the operation doesn\'t stop.',
      'why.item2.title': 'Local presence in San Juan',
      'why.item2.desc': 'Bases in Rawson and Calingasta: mobilization within hours, without depending on operators from other provinces.',
      'why.item3.title': 'Own, accredited personnel',
      'why.item3.desc': 'Certified drivers and operators, with real mining experience and accreditations from OAA-recognized bodies.',
      'why.item4.title': 'Insurance and permits up to date',
      'why.item4.desc': 'Workers\' comp, civil liability, cargo insurance and transport permits.',
      'why.item5.title': '20+ years in the high Andes',
      'why.item5.desc': 'Over 20 years on mountain roads, drilling fronts and exploration projects in San Juan.',
      'why.item6.title': 'Full traceability',
      'why.item6.desc': 'GPS monitoring of the fleet on every trip: you always know where your cargo is.',
      'why.closing': '"We want to be part of the growth of every project, providing logistics support with safety, traceability and local commitment."',
      'contact.body': 'We have availability for new projects. Inquire without obligation about fleet availability, operational capacity, Andean coverage and response times.',
      'contact.label.tel': 'Phone',
      'contact.label.email': 'Email address',
      'contact.label.web': 'Website',
      'contact.form.title': 'Request a proposal',
      'contact.form.label.nombre': 'Name *',
      'contact.form.label.empresa': 'Company *',
      'contact.form.label.email': 'Email address *',
      'contact.form.label.servicio': 'Service type',
      'contact.form.label.mensaje': 'Requirement description',
      'contact.form.submit': 'Request proposal',
      'careers.body1': 'If you have experience in logistics operations, transport, maintenance or mining support services, send us your information for future openings.',
      'careers.body2': 'We accept applications for operational, technical and administrative roles. Personnel with current certifications take priority.<br><strong class="text-mid">This channel is exclusively for job applications.</strong> Commercial inquiries go to <a href="#contacto" class="text-green">Contact</a>.',
      'careers.form.title': 'Submit application',
      'careers.form.label.nombre': 'Full name *',
      'careers.form.label.email': 'Email *',
      'careers.form.label.area': 'Area of interest',
      'careers.form.label.mensaje': 'Message / experience',
      'careers.form.submit': 'Submit CV',
      'careers.adjuntos': 'You can also email your CV to <a href="mailto:ismaelsarr.hh@gmail.com" class="text-green">ismaelsarr.hh@gmail.com</a>',
      'contact.form.sending': 'Sending…',
      'contact.form.success': '✓ Inquiry sent. We\'ll get back to you shortly.',
      'contact.form.error': '✗ Could not send. Contact us directly at contacto@ismaelsa.info',
      'careers.form.sending': 'Sending…',
      'careers.form.success': '✓ Application sent. We\'ll contact you if your profile matches an active opening.',
      'careers.form.error': '✗ Could not send. Write directly to ismaelsarr.hh@gmail.com',
      'contact.form.ratelimit': '✗ You\'ve already sent several requests from this device. You can try again in {t}. If it\'s urgent, email us at contacto@ismaelsa.info',
      'careers.form.ratelimit': '✗ You\'ve already sent several applications from this device. You can try again in {t}. If it\'s urgent, email us at ismaelsarr.hh@gmail.com',
      'rl.hours': '{n} h',
      'rl.lesshour': 'less than an hour',
      'footer.logo.sub': 'Mining Services, Logistics and Transport',
      'footer.tagline': 'San Juan-based company with over 20 years of experience in logistics solutions for mining, oil, gas and major construction.',
      'footer.copy': '© 2025 ISMAEL S.A. — San Juan, Argentina.<br>All rights reserved.',
      'footer.col.empresa': 'Company',
      'footer.col.bases': 'Operating bases',
      'footer.col.contacto': 'Contact',
      'footer.rawson.desc': 'Greater San Juan — logistics and administrative hub',
      'footer.calingasta.desc': 'Mountain zone — operational forward base',
      'ph.select': 'Select…',
      'ph.nombre': 'E.g.: John Smith',
      'ph.empresa': 'E.g.: Mining Corp.',
      'ph.email.corp': 'email@company.com',
      'ph.email.general': 'email@example.com',
      'ph.cv.nombre': 'First and last name',
      'ph.cv.mensaje': 'Experience summary, certifications and availability.',
      'ph.archivo': 'Select files...',
      'ph.cv.archivo': 'Select CV (PDF)...',
      'file.proposal.label': 'Attach file (optional, max 5 MB)',
      'file.proposal.linklabel': 'File larger than 5 MB? Paste a link (optional)',
      'file.proposal.hint': 'For large PDFs, upload to Google Drive or WeTransfer and paste the link here. Make sure it is publicly accessible.',
      'ph.proposal.link': 'https://drive.google.com/…',
      'file.cv.label': 'Attach CV (required, max 5 MB)',
      'file.cv.hint': 'PDF or Word format, up to 5 MB.',
      'file.btn': 'Choose file',
      'file.none': 'No file selected',
      'file.toobig': 'File exceeds 5 MB. For larger files use the Drive link.',
      'careers.form.cv.required': 'Attach your CV (PDF or Word, max 5 MB) to send your application.',
      'ph.mensaje': 'Operating zone, estimated dates, volume, equipment required, etc.',
      // Carrusel de flota
      'carousel.veh0.name': 'Mercedes-Benz Atego 3132',
      'carousel.veh0.meta': 'Year 2026',
      'carousel.veh0.type': 'Water Tanker',
      'carousel.veh1.name': 'Toyota Hilux 2.8 TDI',
      'carousel.veh1.meta': 'Year 2023',
      'carousel.veh1.type': '4×4 Vehicle',
      'carousel.veh2.name': 'IVECO Trakker 440',
      'carousel.veh2.meta': 'Year 2024',
      'carousel.veh2.type': 'Semi-trailer Tractor',
      'carousel.veh3.name': 'IVECO Tector 260E30',
      'carousel.veh3.meta': 'Year 2024',
      'carousel.veh3.type': 'Chassis Truck',
      'carousel.veh4.name': 'IVECO Tector 27320 + Palfinger',
      'carousel.veh4.meta': 'Year 2025',
      'carousel.veh4.type': 'Crane Truck',
      'carousel.veh5.name': 'IVECO Trakker 480',
      'carousel.veh5.meta': 'Year 2025',
      'carousel.veh5.type': 'Semi-trailer Tractor',
      'carousel.veh6.name': 'Mercedes-Benz Axor 3344 + Palfinger',
      'carousel.veh6.meta': 'Year 2025',
      'carousel.veh6.type': 'Crane Truck',
      'carousel.veh7.name': 'Mercedes-Benz Actros + OMBU',
      'carousel.veh7.meta': 'Year 2026',
      'carousel.veh7.type': 'Semi-trailer Tractor',
      'carousel.veh8.name': 'IVECO Stralis 480 + Niño Jesús de Praga',
      'carousel.veh8.meta': 'Year 2026',
      'carousel.veh8.type': 'Semi-trailer Tractor',
      'carousel.veh9.name': 'IVECO Stralis 480 + OMBU',
      'carousel.veh9.meta': 'Year 2026',
      'carousel.veh9.type': 'Semi-trailer Tractor',
      'svc.general': 'General inquiry',
      'area.1': 'Heavy vehicle driving',
      'area.2': 'Crane operation',
      'area.3': 'Maintenance and workshop',
      'area.4': 'Logistics and coordination',
      'area.5': 'Safety and hygiene',
      'area.6': 'Administration',
      'area.7': 'Other',

      /* ── Shared keys for the service spoke pages ── */
      'breadcrumb.inicio': 'Home',
      'breadcrumb.servicios': 'Mining Services in San Juan',
      'footer.tagline.sub': 'San Juan-based logistics operator for the mining, oil, gas and major construction industries.',
      'cta.ver_capacidades': 'See capabilities',
      'cta.ver_todos_servicios': 'View all services →',
      'stats.flota_propia': 'Own<br>fleet',
      'footer.col.servicios': 'Services',
      'footer.link.pillar': 'Mining Services in San Juan',
      'footer.link.exploracion': 'Exploration and Drilling Logistics',
      'footer.link.transporte': 'Mining Transport',
      'footer.link.abastecimiento': 'Remote Site Supply',
      'footer.link.traslado': 'Personnel Transfer',
      'footer.link.agua': 'Water Transport for Mining',
      'footer.link.hidrogruas': 'Crane Trucks for Mining',
      'footer.link.soporte': 'High-Altitude Operational Support',

      /* ── Traslado de personal (traslado-de-personal-minero.html) ── */
      'tp.breadcrumb.current': 'Personnel Transfer',
      'tp.hero.h1': 'Personnel Transfer for Mining in San Juan',
      'tp.hero.lead': 'Your people reach the front safe and on time, campaign after campaign. We transfer personnel between bases, projects and camps in 4×4 pickups built for high altitude, with drivers who know every route. Over 20 years in the Andes Cordillera, with bases in Rawson and Calingasta.',
      'tp.intro.tag': 'Why it matters',
      'tp.intro.title': 'Your people have to get there. On time.',
      'tp.intro.body1': 'In a high-altitude mining operation, a delayed rotation means a crew that doesn\'t reach the front and a shift that starts late. And the road doesn\'t forgive: snow, ledges, ice. Moving people to those places isn\'t just another trip — it\'s a transfer that has to be planned, with the right vehicle and driver.',
      'tp.intro.body2': 'ISMAEL S.A. transfers the operation\'s personnel with its own fleet of 4×4 pickups and drivers with real experience in the cordillera. We coordinate rotations to the pace of the campaign, so your people are where they need to be, when they need to be there.',
      'tp.flota.tag': 'Own fleet',
      'tp.flota.title': '4×4 pickups built for the mountains',
      'tp.flota.body1': 'Our fleet of 4×4 pickups is built for the cordillera\'s mining routes: ledge roads, snow and access points a common vehicle can\'t handle. Every unit, kept up to date on maintenance and equipped for high altitude.',
      'tp.flota.body2': 'With our own fleet and drivers, we control availability and respond to last-minute changes without depending on third parties.',
      'tp.flota.caption': 'ISMAEL S.A. 4×4 pickup at a mining front in the San Juan cordillera.',
      'tp.cap.tag': 'What it includes',
      'tp.cap.title': 'Your people, connected to the whole operation',
      'tp.cap.body': 'We coordinate people\'s movements to the pace of the campaign, across every point where the operation needs its personnel.',
      'tp.cap.item1.title': 'Scheduled rotations',
      'tp.cap.item1.desc': 'Planned personnel movements between bases, camps and fronts, coordinated with each campaign\'s schedule.',
      'tp.cap.item2.title': 'Connection between operation points',
      'tp.cap.item2.desc': 'Permanent link between projects, labs, bases and suppliers, without depending on operators from other provinces.',
      'tp.cap.item3.title': 'Urgent transfers',
      'tp.cap.item3.desc': 'Response to unplanned movements: shift changes, last-minute changes or emergencies at the front.',
      'tp.cap.item4.title': 'Vehicles for high cordillera',
      'tp.cap.item4.desc': '4×4 pickups built for mountain routes and conditions, with drivers who know the road.',
      'tp.relevo.tag': 'On the road',
      'tp.relevo.title': 'A shift change, anywhere along the route',
      'tp.relevo.body': 'Getting off at the exact point the front requires, geared up and ready to start work. Our drivers know every stretch of the route, so the transfer doesn\'t take time away from the shift.',
      'tp.relevo.caption': 'ISMAEL S.A. personnel shift change on a mountain road in San Juan.',
      'tp.band.title': 'Your people at the front, <em>on time.</em>',
      'tp.band.body': 'Planned rotations and response to the unexpected, with our own fleet and drivers who know the cordillera. One less variable to worry about in the operation.',
      'tp.why.tag': 'Local operator',
      'tp.why.title': 'Why hire a San Juan-based operator for personnel transfer',
      'tp.why.body': 'The difference between a local operator and an outside one is measured in hours of mobilization and in who responds when people need to move without delay.',
      'tp.why.item1.title': 'Own vehicles for personnel transport',
      'tp.why.item1.desc': 'Own 4x4 pickups, maintained for the daily transport of personnel to the fronts. If one unit fails, another goes out: the shift isn\'t lost.',
      'tp.why.item2.title': 'Local presence in San Juan',
      'tp.why.item2.desc': 'Bases in Rawson and Calingasta: mobilization within hours, without depending on operators from other provinces.',
      'tp.why.item3.title': 'Drivers experienced with personnel transport',
      'tp.why.item3.desc': 'Accredited drivers, with real experience on cordillera roads and transporting personnel to high-altitude fronts.',
      'tp.why.item4.title': 'Passenger insurance up to date',
      'tp.why.item4.desc': 'ART, civil liability and passenger insurance valid on every trip.',
      'tp.why.item5.title': '+20 years in the high cordillera',
      'tp.why.item5.desc': 'Over 20 years on mountain routes, drilling fronts and exploration projects in San Juan.',
      'tp.why.item6.title': 'Shifts with logged schedule and route',
      'tp.why.item6.desc': 'GPS tracking of every trip: you know when the vehicle left and when it arrived.',
      'tp.cta.title': 'Need to coordinate your personnel transfer?',
      'tp.cta.body': 'Tell us about the bases, the fronts and the rotation frequency. We\'ll get back to you with a concrete proposal.',

      /* ── Abastecimiento en zonas remotas (abastecimiento-minero-zonas-remotas.html) ── */
      'ab.breadcrumb.current': 'Remote Site Supply',
      'ab.hero.h1': 'Remote Site Mining Supply in San Juan',
      'ab.hero.lead': 'Your operation never runs short, even when the front is at the end of a road a common carrier can\'t handle. We bring materials, modules and supplies to hard-to-reach points in the cordillera, with our own fleet and drivers who know every route. Over 20 years operating in San Juan, with bases in Rawson and Calingasta.',
      'ab.intro.tag': 'Why it matters',
      'ab.intro.title': 'In a remote operation, what doesn\'t arrive stops the front.',
      'ab.intro.body1': 'The farther the front, the more fragile the supply chain becomes. A material that doesn\'t arrive, a supply that\'s delayed, and the crew is left waiting. The last stretch —ledge roads, snow, unmarked access— is exactly where common logistics gives up.',
      'ab.intro.body2': 'ISMAEL S.A. carries the operation\'s materials, modules and supplies to the point where they\'re needed, with its own fleet and people with real experience in the cordillera. We coordinate every delivery so supply is never a risk variable.',
      'ab.ultima.tag': 'Last mile',
      'ab.ultima.title': 'The last stretch, solved',
      'ab.ultima.body1': 'Where the road narrows and the pavement ends, we keep going. Our units reach mountain access points —ledges, gravel, snow— that separate the main route from the work front.',
      'ab.ultima.body2': 'With our own fleet and drivers, we plan every trip based on the load and the road conditions, without depending on operators from other provinces.',
      'ab.cap.tag': 'What we carry',
      'ab.cap.title': 'What the operation needs, wherever it needs it',
      'ab.cap.body': 'We coordinate supply to the pace of each project, from the base to the farthest front.',
      'ab.cap.item1.title': 'Materials and structures',
      'ab.cap.item1.desc': 'Transfer of materials, profiles, structures and equipment to the point of operation.',
      'ab.cap.item2.title': 'Modules and supplies',
      'ab.cap.item2.desc': 'Restocking the modules, supplies and consumables the operation needs to keep running.',
      'ab.cap.item3.title': 'Oversized loads',
      'ab.cap.item3.desc': 'When the load requires it, with the corresponding permits and pilot vehicles.',
      'ab.cap.item4.title': 'Last mile in the mountains',
      'ab.cap.item4.desc': 'Unconventional access, ledge and snow roads a common carrier can\'t handle.',
      'ab.band.title': 'To the last point <em>of the operation.</em>',
      'ab.band.body': 'Materials, modules and supplies wherever the front needs them, with our own fleet and people who know the cordillera. Supply stops being something to worry about.',
      'ab.why.tag': 'Local operator',
      'ab.why.title': 'Why outsource supply to a San Juan-based operator',
      'ab.why.body': 'The difference between a local operator and an outside one is measured in hours of mobilization and in who responds when something is missing at the front.',
      'ab.why.item1.title': 'Own all-terrain fleet',
      'ab.why.item1.desc': 'Direct control of every unit. If one fails, another goes out subject to availability: supply doesn\'t get cut off.',
      'ab.why.item2.title': 'Local presence in San Juan',
      'ab.why.item2.desc': 'Bases in Rawson and Calingasta: response within hours, without depending on operators from other provinces.',
      'ab.why.item3.title': 'Drivers experienced on routes without signal',
      'ab.why.item3.desc': 'Accredited drivers who know the tracks and access roads to each front, even without cell coverage.',
      'ab.why.item4.title': 'Cargo insurance up to date',
      'ab.why.item4.desc': 'ART, civil liability, cargo insurance and transport permits, all current.',
      'ab.why.item5.title': '+20 years in the high cordillera',
      'ab.why.item5.desc': 'Over 20 years reaching drilling fronts, camps and exploration projects in San Juan.',
      'ab.why.item6.title': 'Tracking of every delivery',
      'ab.why.item6.desc': 'GPS monitoring of the unit until delivery: you know when supplies reach the front.',
      'ab.cta.title': 'Need to secure supply for your operation?',
      'ab.cta.body': 'Tell us what moves your operation, how far, and how often. We\'ll get back to you with a concrete proposal.',

      /* ── Transporte de agua (transporte-agua-mineria.html) ── */
      'ta.breadcrumb.current': 'Water Transport',
      'ta.hero.h1': 'Water Transport for Mining in San Juan',
      'ta.hero.lead': 'Water at the front, on time, so the operation never stops. We transport and supply water with our own tankers —drilling, camps and road watering— even on the most demanding access routes of the San Juan cordillera. Over 20 years at high altitude, with bases in Rawson and Calingasta.',
      'ta.intro.tag': 'The service',
      'ta.intro.title': 'Water at the front, when and where it\'s needed',
      'ta.intro.body1': 'In a cordillera mining project, water isn\'t a logistics detail: without it, drilling stops, the camp doesn\'t function, and road dust can\'t be controlled. In areas with no network or nearby sources, supply depends entirely on a tanker that arrives on time, in any condition.',
      'ta.intro.body2': 'ISMAEL S.A. operates its own tankers —from 9,000 to 20,000 liters of capacity— at exploration and drilling fronts in San Juan, with scheduled or on-demand supply. As our own fleet and a local operator, we control the availability of every unit and respond without depending on third parties or mobilizations from other provinces.',
      'ta.intro.caption': 'ISMAEL S.A. tankers by a cordillera lake, San Juan.',
      'ta.perf.tag': 'Supply to drilling',
      'ta.perf.title': 'Continuous supply to drilling fronts',
      'ta.perf.body1': 'Drilling campaigns consume water steadily and can\'t afford cutoffs: a stoppage from lack of supply means lost equipment and crew time. We coordinate supply to the pace of each borehole, with scheduled trips and the capacity to respond to demand peaks.',
      'ta.perf.body2': 'We work on mountain routes and unconventional roads, at altitude and under the cold and isolation conditions typical of the Andes Cordillera fronts.',
      'ta.perf.caption': 'ISMAEL S.A. own tanker at a mining front in the cordillera, San Juan.',
      'ta.captacion.tag': 'Own water sourcing',
      'ta.captacion.title': 'The tanker also draws water at the source',
      'ta.captacion.body1': 'Besides hauling water, our crews draw it directly from authorized rivers and streams using our own pump, when the project requires it and with the corresponding permits. That\'s one less step in the chain: the same unit that loads is the one that delivers.',
      'ta.captacion.body2': 'This cuts the downtime of a supply that depends on a third party for the initial load, giving the operator end-to-end control of the resource.',
      'ta.captacion.caption': 'ISMAEL S.A. tanker drawing water at the source, cordillera de San Juan.',
      'ta.cap.tag': 'Applications',
      'ta.cap.title': 'What we use water for in a campaign',
      'ta.cap.body': 'The same tanker service covers a project\'s different water needs, from drilling to access road maintenance.',
      'ta.cap.item1.title': 'Water for drilling',
      'ta.cap.item1.desc': 'Steady supply to drilling rigs, adjusted to each campaign\'s progress and the front\'s operating windows.',
      'ta.cap.item2.title': 'Camp supply',
      'ta.cap.item2.desc': 'Water for camp facilities and habitable modules at points of operation far from the network.',
      'ta.cap.item3.title': 'Watering and dust suppression',
      'ta.cap.item3.desc': 'Watering of access roads and mining tracks for dust control, key to safety and visibility on the road.',
      'ta.cap.item4.title': 'Supply to isolated areas',
      'ta.cap.item4.desc': 'Delivery to hard-to-reach fronts where supply depends entirely on last-mile logistics.',
      'ta.figure': '9,000 <span>to</span> 20,000 <span>liters</span>',
      'ta.band.title': 'So the front <em>never</em> runs out of water.',
      'ta.band.body': 'Six tanker capacities to fit supply to every operation. One less variable to worry about at the front.',
      'ta.why.tag': 'Local operator',
      'ta.why.title': 'Why hire your tanker from a San Juan-based operator',
      'ta.why.body': 'The difference between a local tanker and one from another province is measured in hours of mobilization and in who responds when the front runs out of water after hours.',
      'ta.why.item1.title': 'Own tankers, with backup',
      'ta.why.item1.desc': 'Own fleet of tankers from 9,000 to 20,000 liters. If one unit fails, another goes out: water keeps reaching the front.',
      'ta.why.item2.title': 'Local presence in San Juan',
      'ta.why.item2.desc': 'Bases in Rawson and Calingasta: mobilization within hours, without depending on operators from other provinces.',
      'ta.why.item3.title': 'Accredited drivers for water transport',
      'ta.why.item3.desc': 'Certified drivers, with real experience handling tankers on mountain roads and accreditations recognized by the OAA.',
      'ta.why.item4.title': 'Liquid cargo insurance up to date',
      'ta.why.item4.desc': 'ART, civil liability and cargo insurance valid for water transport.',
      'ta.why.item5.title': '+20 years in the high cordillera',
      'ta.why.item5.desc': 'Over 20 years on mountain routes, drilling fronts and exploration projects in San Juan.',
      'ta.why.item6.title': 'Traceability of every water load',
      'ta.why.item6.desc': 'GPS monitoring of the fleet: you know which tanker went out, when, and when it reached the front.',
      'ta.cta.title': 'Need water supply for your project?',
      'ta.cta.body': 'Tell us the area of operation, estimated consumption and campaign dates. We\'ll get back to you with a concrete supply proposal.',

      /* ── Hidrogrúas (hidrogruas-mineria-san-juan.html) ── */
      'hg.breadcrumb.current': 'Crane Trucks',
      'hg.hero.h1': 'Crane Trucks for Mining in San Juan',
      'hg.hero.lead': 'Lifting solved right at the front, with no waiting or third-party equipment. Our own Palfinger crane trucks, with certified operators, for loading, unloading and structure assembly on the most demanding access routes of the San Juan cordillera. Over 20 years at high altitude, with bases in Rawson and Calingasta.',
      'hg.intro.tag': 'The service',
      'hg.intro.title': 'Lifting and load movement at the front',
      'hg.intro.body1': 'In a mining project, moving a heavy load that\'s misplaced or without the right equipment is a safety risk and a costly delay. The crane truck solves on the spot what would otherwise require coordinating outside equipment: loading and unloading units, assembling structures and moving pieces within the front.',
      'hg.intro.body2': 'ISMAEL S.A. operates Palfinger crane trucks mounted on its own truck —models 23500 and 36080, among others— capable of reaching the Andes Cordillera fronts and working under the altitude and isolation conditions typical of San Juan mining. Every lifting maneuver is carried out by certified crane operators. As our own fleet and a local operator, we control the availability of every unit without depending on third parties.',
      'hg.intro.caption': 'ISMAEL S.A. crane truck lifting a tank after hours, San Juan.',
      'hg.equipo.tag': 'Own equipment',
      'hg.equipo.title': 'Palfinger cranes mounted on truck',
      'hg.equipo.body1': 'We work with truck-mounted Palfinger crane trucks, a combination that adds the crane\'s reach to the transport\'s autonomy: the same unit reaches the front, unloads and places the load, with no need to coordinate separate equipment.',
      'hg.equipo.body2': 'It\'s the right equipment for operations on mountain roads and hard-to-reach points, where bringing a conventional crane isn\'t viable.',
      'hg.equipo.caption': 'Palfinger crane truck on ISMAEL S.A.\'s own truck, San Juan.',
      'hg.izaje.tag': 'On site',
      'hg.izaje.title': 'The crane does the heavy work, on the spot',
      'hg.izaje.body1': 'Lifting a container or a structure isn\'t just about raising it: it\'s doing it with the right angle, sling and signaling. Our certified operators handle every maneuver with the crane mounted on the same truck that brought the load.',
      'hg.izaje.body2': 'No waiting for a third party with the right equipment: the unit that transports is the same one that unloads and places it.',
      'hg.izaje.caption': 'ISMAEL S.A. crane truck lifting a container on site, San Juan.',
      'hg.cap.tag': 'Applications',
      'hg.cap.title': 'What we use the crane truck for in a campaign',
      'hg.cap.body': 'The crane truck service covers a project\'s lifting and load-movement needs, from equipment logistics to assembly at the front.',
      'hg.cap.item1.title': 'Equipment loading and unloading',
      'hg.cap.item1.desc': 'Movement of machinery, containers, modules and supplies between transport and the point of operation.',
      'hg.cap.item2.title': 'Structure assembly',
      'hg.cap.item2.desc': 'Positioning of habitable modules, tanks, structures and components at the work front.',
      'hg.cap.item3.title': 'Lifting in hard-to-reach areas',
      'hg.cap.item3.desc': 'Maneuvers on mountain roads and remote points a conventional crane can\'t reach.',
      'hg.cap.item4.title': 'Support for drilling and site work',
      'hg.cap.item4.desc': 'Lifting assistance for drilling rigs, camps and infrastructure work in demanding terrain.',
      'hg.band.title': 'The load moves. The operation <em>doesn\'t wait.</em>',
      'hg.band.body': 'Own crane trucks with certified operators: loading, unloading and assembly solved right at the front, with no third-party equipment to coordinate.',
      'hg.why.tag': 'Local operator',
      'hg.why.title': 'Why hire your crane truck from a San Juan-based operator',
      'hg.why.body': 'The difference between a local operator and one from another province is measured in hours of mobilization and in who responds when the front needs to move a load without delay.',
      'hg.why.item1.title': 'Own cranes, with in-house maintenance',
      'hg.why.item1.desc': 'Own fleet of Palfinger crane trucks. If one unit fails, another goes out: the lift doesn\'t stop.',
      'hg.why.item2.title': 'Local presence in San Juan',
      'hg.why.item2.desc': 'Bases in Rawson and Calingasta: mobilization within hours, without depending on operators from other provinces.',
      'hg.why.item3.title': 'Operators certified in lifting maneuvers',
      'hg.why.item3.desc': 'Crane operators accredited by entities recognized by the OAA, with real experience lifting loads on mine sites.',
      'hg.why.item4.title': 'Lifting insurance up to date',
      'hg.why.item4.desc': 'ART, civil liability, cargo insurance and permits for lifting maneuvers.',
      'hg.why.item5.title': '+20 years in the high cordillera',
      'hg.why.item5.desc': 'Over 20 years on mountain routes, drilling fronts and exploration projects in San Juan.',
      'hg.why.item6.title': 'Traceability of every maneuver',
      'hg.why.item6.desc': 'GPS logging and monitoring of each crane truck: you know where the unit is and when it made the lift.',
      'hg.cta.title': 'Need a crane truck for your project?',
      'hg.cta.body': 'Tell us the area of operation, the type of load and the campaign dates. We\'ll get back to you with a concrete proposal.',

      /* ── Soporte operativo (soporte-operativo-alta-montana.html) ── */
      'so.breadcrumb.current': 'Operational Support',
      'so.hero.h1': 'High-Altitude Mining Operational Support',
      'so.hero.lead': 'An operator present at the front, throughout the campaign. We coordinate on-site logistics, transfer personnel and assist camps at San Juan\'s mining fronts, so your operation doesn\'t have to solve every setback from scratch. Over 20 years in the Andes Cordillera, with bases in Rawson and Calingasta.',
      'so.intro.tag': 'Why it matters',
      'so.intro.title': 'In the cordillera, the operation doesn\'t rest',
      'so.intro.body1': 'A high-altitude mining campaign has dozens of things happening at once: people entering and leaving the front, resources that need to move, camps to supply, and movements to coordinate in areas where nothing is nearby. Each of those tasks, without someone sustaining them on site, becomes a delay.',
      'so.intro.body2': 'ISMAEL S.A. accompanies the operation at the front: we coordinate on-field logistics, transfer personnel and assist camps, with our own fleet and real knowledge of the routes and conditions of the San Juan cordillera.',
      'so.equipo.tag': 'On-site presence',
      'so.equipo.title': 'Our own team at the front',
      'so.equipo.body1': 'We don\'t coordinate the operation from an office hundreds of kilometers away: our people are at the front, with the fleet, throughout the campaign. That presence is what allows us to anticipate problems and solve them on the spot, not the next day.',
      'so.equipo.body2': 'We know the routes, the timing and the demands of every high-altitude operation, because it\'s where we\'ve worked for over 20 years.',
      'so.equipo.caption': 'ISMAEL S.A. team at a mining front in San Juan.',
      'so.cap.tag': 'What it includes',
      'so.cap.title': 'Support for the operation, start to finish',
      'so.cap.body': 'We accompany the project\'s operational needs on site, coordinated with the pace of the campaign.',
      'so.cap.item1.title': 'On-field coordination and logistics',
      'so.cap.item1.desc': 'Resource planning, movement organization and operational coordination directly on site.',
      'so.cap.item2.title': 'Personnel transfer',
      'so.cap.item2.desc': 'Personnel movement to and from the fronts in 4×4 pickups built for high altitude.',
      'so.cap.item3.title': 'Camp and work-site assistance',
      'so.cap.item3.desc': 'Support to work-site facilities and the logistical needs of camps in operation.',
      'so.cap.item4.title': 'Equipment with or without operator',
      'so.cap.item4.desc': 'Whatever your operation needs: the unit operated by our experienced personnel at the front, or just the equipment when you provide your own driver.',
      'so.camp.tag': 'Camp assistance',
      'so.camp.title': 'The camp, ready when you need it',
      'so.camp.body': 'Setting up or expanding a camp in the cordillera means moving modules, coordinating unloading and placing them where the work site needs them. Our team assists that logistics on site, with the fleet and people to solve it in a single visit.',
      'so.san.tag': '4x4 haulage',
      'so.san.title': 'Restrooms and modules, wherever the road allows',
      'so.san.body': 'Chemical restrooms, modules and camp equipment don\'t always have an easy road to their destination. With our own 4x4 trucks we haul that equipment to high-altitude camps, over tracks and mountain roads a conventional truck can\'t reach.',
      'so.san.caption': 'Hauling sanitation modules to a high-altitude camp, ISMAEL S.A.',
      'so.gente.tag': 'Our people',
      'so.gente.title': 'People ready for the front',
      'so.gente.body': 'Operational support is only as good as the people carrying it out. Before heading up to a high-altitude front, our staff go through a process that doesn\'t get skipped under pressure.',
      'so.gente.item1.title': 'OAA certifications',
      'so.gente.item1.desc': 'Drivers and operators accredited by entities recognized by the OAA, not just a driver\'s license.',
      'so.gente.item2.title': 'Fatigue management',
      'so.gente.item2.desc': 'Tracking of driving hours and rest periods, key during long shifts at high altitude.',
      'so.gente.item3.title': 'Site induction',
      'so.gente.item3.desc': 'Everyone entering a front goes through the site\'s safety induction before starting work.',
      'so.band.title': 'At the front, <em>every day.</em>',
      'so.band.body': 'Not a supplier that shows up and leaves: an operator present on site throughout the campaign, who knows your operation and responds when something is needed.',
      'so.why.tag': 'Local operator',
      'so.why.title': 'Why support comes from a San Juan-based operator',
      'so.why.body': 'The difference between a local operator and an outside one is measured in hours of mobilization and in who\'s at the front when the operation needs it.',
      'so.why.item1.title': 'Own fleet to supply camps',
      'so.why.item1.desc': 'Own trucks and pickups dedicated to camp logistics. If one unit fails, another goes out: the camp never runs short.',
      'so.why.item2.title': 'Local presence in San Juan',
      'so.why.item2.desc': 'Bases in Rawson and Calingasta: mobilization within hours, without depending on operators from other provinces.',
      'so.why.item3.title': 'Own staff experienced in camp logistics',
      'so.why.item3.desc': 'Accredited drivers and operators, with real experience in high-altitude camp logistics.',
      'so.why.item4.title': 'Insurance and permits up to date',
      'so.why.item4.desc': 'ART, civil liability, cargo insurance and transport permits for camp logistics.',
      'so.why.item5.title': '+20 years in the high cordillera',
      'so.why.item5.desc': 'Over 20 years on mountain routes, drilling fronts and exploration projects in San Juan.',
      'so.why.item6.title': 'Traceability of every camp delivery',
      'so.why.item6.desc': 'GPS monitoring of the fleet: you know which unit went out and when it reached the camp.',
      'so.cta.title': 'Need operational support for your campaign?',
      'so.cta.body': 'Tell us the area of operation, the front\'s needs and the estimated dates. We\'ll get back to you with a concrete proposal.',

      /* ── Transporte minero (transporte-minero-san-juan.html) ── */
      'tm.breadcrumb.current': 'Mining Transport',
      'tm.hero.h1': 'Mining Transport in San Juan',
      'tm.hero.lead': 'Your equipment at the front, on time, so the operation doesn\'t wait. We transport heavy machinery, supplies and modules to San Juan\'s mining projects with our own fleet —tractors, semi-trailers and cargo trucks— and the knowledge of mountain routes that comes from operating here for over 20 years.',
      'tm.intro.tag': 'Why it matters',
      'tm.intro.title': 'Equipment that doesn\'t arrive is an operation that doesn\'t start',
      'tm.intro.body1': 'In a mining project, a component delayed on the road isn\'t a logistics setback: it\'s a drill rig standing still, a crew waiting and a cost that runs by the hour. In the cordillera, where access routes are long and demanding, moving a heavy load to the front depends on the carrier knowing the road and meeting the deadline.',
      'tm.intro.body2': 'ISMAEL S.A. transports equipment, supplies and structures to San Juan\'s mining fronts with its own fleet. By not depending on third parties or subcontractors, we control the availability of every unit and answer for the trip\'s fulfillment. For the client, it\'s one less variable to worry about at the front.',
      'tm.intro.caption': 'ISMAEL S.A. crane truck unit moving a module to the mining front.',
      'tm.flota.tag': 'Own fleet',
      'tm.flota.title': 'Tractors, semi-trailers and cargo trucks',
      'tm.flota.body1': 'We have tractor units and semi-trailers with 30 to 45 tons of capacity depending on the load, plus chassis and trucks of different sizes, all our own and kept up to date on maintenance. The fleet is assigned based on the type of load and access conditions, not on what happens to be available on the market that day.',
      'tm.flota.body2': 'It\'s the difference of working with an operator who answers for its own units: direct control over availability, priority and the condition of every truck.',
      'tm.flota.caption': 'ISMAEL S.A. tractor with semi-trailer loaded with materials on a route in the San Juan cordillera.',
      'tm.cap.tag': 'What we transport',
      'tm.cap.title': 'Loads for every stage of the project',
      'tm.cap.body': 'From the start of a campaign to mine development, we move what the operation needs on site, coordinated with each front\'s work windows.',
      'tm.cap.item1.title': 'Equipment and heavy machinery',
      'tm.cap.item1.desc': 'Transfer of machinery, large equipment and components to and from the operation fronts.',
      'tm.cap.item2.title': 'Supplies, materials and spare parts',
      'tm.cap.item2.desc': 'Supply of consumables, spare parts and materials to sustain the work\'s continuity.',
      'tm.cap.item3.title': 'Modules and structures',
      'tm.cap.item3.desc': 'Transport of habitable camp modules, tanks, structures and containers.',
      'tm.cap.item4.title': 'Special and oversized loads',
      'tm.cap.item4.desc': 'When the operation requires it, we coordinate large loads with the corresponding permits and pilot vehicles for a safe transfer.',
      'tm.cap.note': 'We operate mainly in San Juan and, when the client needs it, we also handle interprovincial transport: we coordinate the transfer end to end, with a single party responsible for the whole chain.',
      'tm.carreton.tag': 'Special loads',
      'tm.carreton.title': 'Oversized loads and complete equipment',
      'tm.carreton.body': 'When a complete machine, a vehicle or a structure that doesn\'t fit on a common semi-trailer needs to move, we add low-bed trailers. We coordinate circulation permits and pilot vehicles so the load arrives without surprises.',
      'tm.carreton.caption': 'ISMAEL S.A. low-bed trailer transporting equipment in San Juan.',
      'tm.figure': '30 <span>to</span> 45 <span>tons</span>',
      'tm.band.title': 'When the equipment has to be there, <em>it is.</em>',
      'tm.band.body': 'Own fleet, known routes and a single party responsible for your cargo reaching the front on time. That\'s the peace of mind you look for in a mining carrier.',
      'tm.seg.tag': 'Safety and traceability',
      'tm.seg.title': 'Control on every route',
      'tm.seg.body': 'In mining transport, safety isn\'t an extra: it\'s the condition to operate. Every trip is planned, monitored and communicated to anticipate the road\'s risks.',
      'tm.seg.item1.title': 'Satellite GPS monitoring',
      'tm.seg.item1.desc': 'Tracking of every unit on the road and end-to-end cargo traceability.',
      'tm.seg.item2.title': 'Preventive maintenance',
      'tm.seg.item2.desc': 'Scheduled plan and pre-operational check per unit before every departure.',
      'tm.seg.item3.title': 'Mountain drivers',
      'tm.seg.item3.desc': 'Personnel experienced in the routes and conditions of the high cordillera.',
      'tm.seg.item4.title': 'VHF / satellite communication',
      'tm.seg.item4.desc': 'Operational link in areas without coverage throughout the route.',
      'tm.why.tag': 'Local operator',
      'tm.why.title': 'Why hire your transport from a San Juan-based operator',
      'tm.why.body': 'The difference between a local carrier and an outside one is measured in hours of mobilization, in route knowledge, and in who responds when the front needs to move something without delay.',
      'tm.why.item1.title': 'Own fleet for oversized loads',
      'tm.why.item1.desc': 'Own trucks, cranes and low-boy trailers. If one unit fails, another goes out: the equipment still arrives.',
      'tm.why.item2.title': 'Local presence in San Juan',
      'tm.why.item2.desc': 'Bases in Rawson and Calingasta: mobilization within hours, without depending on operators from other provinces.',
      'tm.why.item3.title': 'Operators certified in heavy-load handling',
      'tm.why.item3.desc': 'Accredited drivers and operators, with real experience transporting mining equipment and accreditations recognized by the OAA.',
      'tm.why.item4.title': 'Oversized cargo insurance up to date',
      'tm.why.item4.desc': 'ART, civil liability, cargo insurance and permits for special cargo transport.',
      'tm.why.item5.title': '+20 years in the high cordillera',
      'tm.why.item5.desc': 'Over 20 years on mountain routes, drilling fronts and exploration projects in San Juan.',
      'tm.why.item6.title': 'Full traceability',
      'tm.why.item6.desc': 'GPS monitoring of the fleet on every route: you always know where your cargo is.',
      'tm.cta.title': 'Need to move equipment to a mining project in San Juan?',
      'tm.cta.body': 'Tell us what you need to transport, the origin and destination, and the estimated dates. We\'ll get back to you with a concrete proposal.',

      /* ── Logística de exploración y perforación (hub, logistica-exploracion-perforacion-san-juan.html) ── */
      'ex.breadcrumb.current': 'Exploration and Drilling Logistics',
      'ex.hero.h1': 'Logistics for Mining Exploration, Extraction and Drilling in San Juan',
      'ex.hero.lead': 'A high-cordillera campaign runs on logistics: water at the drilling front, equipment that arrives, personnel coming and going, and supply that never stops. ISMAEL S.A. handles all of that logistics with its own fleet, on San Juan\'s mining projects, for over 20 years. Bases in Rawson and Calingasta.',
      'ex.cta.ver_resolvemos': 'See what we solve',
      'ex.intro.tag': 'Why it matters',
      'ex.intro.title': 'Without logistics, the campaign stalls',
      'ex.intro.body1': 'Exploring or drilling in the cordillera means operating far from everything. Without water, the rig stops. Without supplies, the front halts. Without people on site, the shift doesn\'t start. Every link in the campaign depends on logistics not failing, on terrain where the road is already a challenge in itself.',
      'ex.intro.body2': 'ISMAEL S.A. accompanies the whole campaign: we bring water to the drilling site, move the equipment, supply the camps and transfer personnel, with our own fleet and people who know every route of the San Juan cordillera. A single operator for the whole project\'s logistics.',
      'ex.intro.caption': 'ISMAEL S.A. unit at an exploration front, San Juan.',
      'ex.frente.tag': 'At the front',
      'ex.frente.title': 'Wherever the project is, we are',
      'ex.frente.body1': 'From the first exploration camp to the extraction phase, ISMAEL S.A. operates at the front: with the fleet, the people and the timing the high cordillera demands.',
      'ex.frente.body2': 'We don\'t send a truck and leave. We sustain the campaign\'s logistics for its entire duration, with the continuity a mining project needs.',
      'ex.frente.caption': 'ISMAEL S.A. unit crossing a river toward a mining front in San Juan.',
      'ex.flotaperf.tag': 'Fleet for drilling',
      'ex.flotaperf.title': 'More than one unit, when the campaign calls for it',
      'ex.flotaperf.body': 'A drilling campaign isn\'t always solved with a single truck: you need to move the drilling rig, keep supply running, and have backup if something fails. We work with more than one own unit at the same front, coordinated by the same operator.',
      'ex.flotaperf.caption': 'ISMAEL S.A. fleet at a drilling front, San Juan.',
      'ex.campana.tag': 'Your campaign\'s logistics',
      'ex.campana.title': 'Everything the operation needs at the front',
      'ex.campana.body': 'From exploration to extraction, each ISMAEL S.A. service sustains a part of the campaign. Coordinated by a single operator, with the same fleet and the same people.',
      'ex.item1.title': 'Water for drilling',
      'ex.item1.desc': 'Tankers from 9,000 to 20,000 liters supplying the drilling fronts and the operation\'s consumption.',
      'ex.item1.link': 'See water transport →',
      'ex.item2.title': 'Equipment and supplies transport',
      'ex.item2.desc': 'Transfer of machinery, materials and modules to the project, including oversized loads with permits.',
      'ex.item2.link': 'See mining transport →',
      'ex.item3.title': 'Remote site supply',
      'ex.item3.desc': 'Last-mile logistics to camps and hard-to-reach fronts, via unconventional roads.',
      'ex.item3.link': 'See supply →',
      'ex.item4.title': 'Personnel transfer',
      'ex.item4.desc': 'Scheduled rotations and campaign personnel movements in 4×4 pickups built for the mountains.',
      'ex.item4.link': 'See personnel transfer →',
      'ex.item5.title': 'Crane trucks at the front',
      'ex.item5.desc': 'Palfinger cranes for loading and unloading equipment and structures directly at the point of operation.',
      'ex.item5.link': 'See crane trucks →',
      'ex.item6.title': 'Operational support for the campaign',
      'ex.item6.desc': 'Our own team present at the front, coordinating on-site logistics throughout the campaign.',
      'ex.item6.link': 'See operational support →',
      'ex.band.title': 'A single operator for <em>the whole campaign.</em>',
      'ex.band.body': 'From exploration to extraction, the same fleet and the same people sustain your project\'s logistics. Fewer suppliers to coordinate, a single responsibility at the front.',
      'ex.why.tag': 'Local operator',
      'ex.why.title': 'Why trust your campaign\'s logistics to a San Juan-based operator',
      'ex.why.body': 'The difference between a local operator and an outside one is measured in hours of mobilization and in who responds when something needs solving at the front, without delays.',
      'ex.why.item1.title': 'Own fleet, with backup',
      'ex.why.item1.desc': 'Direct control of every unit. If one fails, another goes out subject to availability: the campaign doesn\'t stop.',
      'ex.why.item2.title': 'Local presence in San Juan',
      'ex.why.item2.desc': 'Bases in Rawson and Calingasta: mobilization within hours, without depending on operators from other provinces.',
      'ex.why.item3.title': 'Own, accredited personnel',
      'ex.why.item3.desc': 'Certified drivers and operators, with real mining experience and accreditations from OAA-recognized bodies.',
      'ex.why.item4.title': 'Insurance and permits up to date',
      'ex.why.item4.desc': 'Third-party liability, cargo insurance and transport permits.',
      'ex.why.item5.title': '+20 years in the high cordillera',
      'ex.why.item5.desc': 'Over 20 years at exploration fronts, drilling sites and mining projects in San Juan.',
      'ex.why.item6.title': 'Full traceability',
      'ex.why.item6.desc': 'GPS monitoring of the fleet on every route: you always know where what moves your campaign is.',
      'ex.cta.title': 'Planning an exploration or drilling campaign?',
      'ex.cta.body': 'Tell us what stage your project is at and what you need to move to the front. We\'ll get back to you with a concrete proposal.',

      /* ── Pillar de servicios (servicios-mineros-san-juan.html) ── */
      'pl.hero.h1': 'Mining services in San Juan, end to end',
      'pl.hero.lead': 'A single San Juan-based operator to sustain your on-site operation\'s continuity: transport, water supply, crane trucks, own fleet and personnel at the front. A single party responsible, with over 20 years in the Andes Cordillera and bases in Rawson and Calingasta.',
      'pl.cta.ver_servicios': 'See the services',
      'pl.servicios.tag': 'Services',
      'pl.servicios.title': 'All mining services under one operator',
      'pl.card.vermas': 'See more',
      'pl.card1.title': 'Exploration, extraction and drilling logistics',
      'pl.card1.desc': 'Resource coordination, transfers and campaign logistics for cordillera fronts, under extreme conditions of altitude, cold and isolation.',
      'pl.card2.title': 'Water transport',
      'pl.card2.desc': 'Water supply for drilling rigs, camps and road watering via our own tankers. Continuous supply at isolated cordillera fronts.',
      'pl.card3.title': 'Remote site supply',
      'pl.card3.desc': 'Transfer of materials, modules and supplies to hard-to-reach points of operation. Last-mile logistics on mountain routes and unconventional roads.',
      'pl.card4.title': 'Scheduled transfers',
      'pl.card4.desc': 'Permanent connection between projects, labs, bases, suppliers and camps. Planned rotations and urgent movements with immediate response.',
      'pl.card5.title': 'Equipment and supplies transport',
      'pl.card5.desc': 'We transport critical materials, operational equipment and habitable modules, coordinated with each project\'s operating windows.',
      'pl.card6.title': 'On-site operational support',
      'pl.card6.desc': 'Personnel experienced in exploration and drilling fronts. Resource planning, on-field coordination and continuous presence throughout the campaign.',
      'pl.card7.title': 'Crane trucks and special services',
      'pl.card7.desc': 'Lifting, load movement and assistance to operations requiring specific equipment, certified crane operators and personnel qualified for high-risk tasks.',
      'pl.band.title': 'Everything under one operator. <em>One party responsible.</em>',
      'pl.band.body': 'Instead of coordinating five suppliers, you have one that answers for everything that happens on site. That\'s the peace of mind of working with ISMAEL.',
      'pl.why.tag': 'Local operator',
      'pl.why.title': 'Why hire a mining services operator in San Juan',
      'pl.why.body': 'The difference between a San Juan-based supplier and one from another province isn\'t measured in rate: it\'s measured in hours of mobilization, in knowledge of mountain routes, and in who answers the phone when the front needs something on a Sunday.',
      'pl.why.item1.title': 'Own fleet, with backup',
      'pl.why.item1.desc': 'Direct control of every unit. If one fails, another goes out subject to availability: the operation doesn\'t stop.',
      'pl.why.item2.title': 'Local presence in San Juan',
      'pl.why.item2.desc': 'Bases in Rawson and Calingasta: mobilization within hours, without depending on operators from other provinces.',
      'pl.why.item3.title': 'Own, accredited personnel',
      'pl.why.item3.desc': 'Certified drivers and operators, with real mining experience and accreditations from OAA-recognized bodies.',
      'pl.why.item4.title': 'Insurance and permits up to date',
      'pl.why.item4.desc': 'Third-party liability, cargo insurance and transport permits.',
      'pl.why.item5.title': '+20 years in the high cordillera',
      'pl.why.item5.desc': 'Over 20 years on mountain routes, drilling fronts and exploration projects in San Juan.',
      'pl.why.item6.title': 'Full traceability',
      'pl.why.item6.desc': 'GPS monitoring of the fleet on every route: you always know where your cargo is.',
      'pl.sect.tag': 'Industries',
      'pl.sect.title': 'What industries we serve',
      'pl.sect.body': 'The core of our operation is San Juan mining, but the same fleet, the same personnel and the same bases serve other sectors that operate in demanding terrain.',
      'pl.sect.item1.title': 'Mining',
      'pl.sect.item1.desc': 'Exploration, extraction and drilling at Andes Cordillera fronts. It\'s the core of our operation and where we\'ve built up over 35 projects assisted.',
      'pl.sect.item2.title': 'Oil and gas',
      'pl.sect.item2.desc': 'Transport, supply and operational support for operations requiring logistics in areas far from urban centers.',
      'pl.sect.item3.title': 'Major construction works',
      'pl.sect.item3.desc': 'Movement of equipment, supplies and modules for infrastructure works, with the same coordination and equipment we use in mining campaigns.',
      'pl.exp.tag': 'Experience that backs us',
      'pl.exp.title': 'Over 35 projects assisted at high altitude',
      'pl.exp.body': 'We work alongside international operators in the departments of Calingasta, Iglesia, Jáchal and Ullum, assisting exploration, drilling and mining development campaigns. We know the fronts, the routes and the demands of every operation.',
      'pl.exp.links': 'See the detail of the <a href="/#experiencia" class="inline-link">projects where we operate</a> or check out our <a href="/#cobertura" class="inline-link">operating bases in San Juan</a>.',
      'pl.cta.title': 'Need a mining services operator in San Juan?',
      'pl.cta.body': 'Tell us the area of operation, estimated dates and the equipment you need. We\'ll get back to you with a concrete proposal.',
    }
  };

  function applyI18n(lang) {
    const dict = I18N[lang] || I18N.es;
    document.documentElement.lang = lang;
    currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.dataset.i18n;
      if (dict[k] !== undefined) el.textContent = dict[k];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const k = el.dataset.i18nHtml;
      if (dict[k] !== undefined) el.innerHTML = dict[k];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const k = el.dataset.i18nPlaceholder;
      if (dict[k] !== undefined) el.placeholder = dict[k];
    });
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.classList.toggle('is-active', b.dataset.lang === lang);
    });
    updateCarouselI18n(lang);
    try { localStorage.setItem('isa_lang', lang); } catch (e) {}
  }

  function updateCarouselI18n(lang) {
    const dict = I18N[lang] || I18N.es;
    const nameEl = document.getElementById('carouselName');
    const metaEl = document.getElementById('carouselMeta');
    const typeEl = document.getElementById('carouselType');
    const specsEl = document.getElementById('carouselSpecs');
    if (!nameEl || !metaEl || !typeEl || !specsEl) return;

    const fleetData = window.fleetCarouselData;
    if (!fleetData || !fleetData.getVehicles || !fleetData.getCurrentIndex) {
      nameEl.textContent = dict['carousel.veh2.name'] || 'IVECO Trakker 440';
      metaEl.textContent = dict['carousel.veh2.meta'] || 'Año 2024';
      typeEl.textContent = dict['carousel.veh2.type'] || 'Tractor con Semirremolque';
      return;
    }

    const vehicles = fleetData.getVehicles();
    const currentIndex = fleetData.getCurrentIndex();
    const vehicle = vehicles[currentIndex];
    if (!vehicle) return;

    const nameKey = `carousel.veh${currentIndex}.name`;
    const metaKey = `carousel.veh${currentIndex}.meta`;
    const typeKey = `carousel.veh${currentIndex}.type`;

    nameEl.textContent = dict[nameKey] || vehicle.name;
    metaEl.textContent = dict[metaKey] || vehicle.meta;
    typeEl.textContent = dict[typeKey] || vehicle.type;
    const specList = (lang === 'en' && vehicle.specsEn) ? vehicle.specsEn : vehicle.specs;
    specsEl.innerHTML = specList.map(s => `<span class="fleet-carousel-spec">${s}</span>`).join('');
  }

  /* ──────────────────────────────────────────
     FLEET CAROUSEL 3D LOGIC
  ────────────────────────────────────────── */
  (function fleetCarousel() {
    const cards = document.querySelectorAll('.fleet-carousel-card');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const dots = document.querySelectorAll('.fleet-carousel-dot');
    const nameEl = document.getElementById('carouselName');
    const metaEl = document.getElementById('carouselMeta');
    const specsEl = document.getElementById('carouselSpecs');
    const typeEl = document.getElementById('carouselType');


    if (cards.length < 3) return;

    const vehicles = [
      {
        name: 'Mercedes-Benz Atego 3132',
        meta: 'Año 2026',
        type: 'Aguatero',
        specs: ['320 CV', '1300 Nm', '6.374 cm³', 'PBV 32.000 kg', 'Tanque 300L'],
        specsEn: ['320 HP', '1300 Nm', '6,374 cc', 'GVW 32,000 kg', '300L Tank']
      },
      {
        name: 'Toyota Hilux 2.8 TDI',
        meta: 'Año 2023',
        type: 'Vehículo 4×4',
        specs: ['204 CV', '500 Nm', '4×4 c/reductora', 'Remolque 3.500 kg'],
        specsEn: ['204 HP', '500 Nm', '4×4 w/ low range', 'Towing 3,500 kg']
      },
      {
        name: 'IVECO Trakker 440',
        meta: 'Año 2024',
        type: 'Tractor con Semirremolque',
        specs: ['440 CV', '1900 Nm', 'Cursor 13', 'PBT 46.000 kg', '6×4 / 8×4'],
        specsEn: ['440 HP', '1900 Nm', 'Cursor 13', 'GCW 46,000 kg', '6×4 / 8×4']
      },
      {
        name: 'IVECO Tector 260E30',
        meta: 'Año 2024',
        type: 'Camión Chasis',
        specs: ['300 CV', '1100 Nm', '6×4', 'Carga útil 15.350 kg', 'PBT 26.600 kg'],
        specsEn: ['300 HP', '1100 Nm', '6×4', 'Payload 15,350 kg', 'GCW 26,600 kg']
      },
      {
        name: 'IVECO Tector 27320 + Palfinger',
        meta: 'Año 2025',
        type: 'Hidrogrúa',
        specs: ['280 CV', '1000 Nm', '6×4', 'Grúa PK 36080', 'Alcance 27m'],
        specsEn: ['280 HP', '1000 Nm', '6×4', 'PK 36080 Crane', '27m Reach']
      },
      {
        name: 'IVECO Trakker 480',
        meta: 'Año 2025',
        type: 'Tractor con Semirremolque',
        specs: ['480 CV', '2100 Nm', 'Cursor 13', 'PBT 46.000 kg', '6×4'],
        specsEn: ['480 HP', '2100 Nm', 'Cursor 13', 'GCW 46,000 kg', '6×4']
      },
      {
        name: 'Mercedes-Benz Axor 3344 + Palfinger',
        meta: 'Año 2025',
        type: 'Hidrogrúa',
        specs: ['428 CV', '1900 Nm', '6×4', 'Grúa PK 36080', 'Alcance 27m'],
        specsEn: ['428 HP', '1900 Nm', '6×4', 'PK 36080 Crane', '27m Reach']
      },
      {
        name: 'Mercedes-Benz Actros + OMBU',
        meta: 'Año 2026',
        type: 'Tractor con Semirremolque',
        specs: ['428 CV', '1900 Nm', '6×4', 'Semirremolque 14.5m', 'PBT 46.000 kg'],
        specsEn: ['428 HP', '1900 Nm', '6×4', '14.5m Semitrailer', 'GCW 46,000 kg']
      },
      {
        name: 'IVECO Stralis 480 + Niño Jesús de Praga',
        meta: 'Año 2026',
        type: 'Tractor con Semirremolque',
        specs: ['480 CV', '2100 Nm', 'Cursor 13', 'Semirremolque 13m', 'PBT 46.000 kg'],
        specsEn: ['480 HP', '2100 Nm', 'Cursor 13', '13m Semitrailer', 'GCW 46,000 kg']
      },
      {
        name: 'IVECO Stralis 480 + OMBU',
        meta: 'Año 2026',
        type: 'Tractor con Semirremolque',
        specs: ['480 CV', '2100 Nm', 'Cursor 13', 'Semirremolque 14.5m', 'PBT 46.000 kg'],
        specsEn: ['480 HP', '2100 Nm', 'Cursor 13', '14.5m Semitrailer', 'GCW 46,000 kg']
      }
    ];

    let currentIndex = 2;
    const VISIBLE_CARDS = 5;
    let autoTimer = null;
    const AUTO_INTERVAL = 5000;

    window.fleetCarouselData = {
      getVehicles: () => vehicles,
      getCurrentIndex: () => currentIndex
    };

    function startAuto() {
      stopAuto();
      autoTimer = setInterval(() => next(), AUTO_INTERVAL);
    }

    function stopAuto() {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    }

    function updatePositions() {
      cards.forEach((card, i) => {
        card.className = 'fleet-carousel-card';
        const offset = (i - currentIndex + vehicles.length) % vehicles.length;
        if (offset === 0) card.classList.add('pos-center');
        else if (offset === 1) card.classList.add('pos-right');
        else if (offset === 2) card.classList.add('pos-far-right');
        else if (offset === vehicles.length - 1) card.classList.add('pos-left');
        else if (offset === vehicles.length - 2) card.classList.add('pos-far-left');
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === currentIndex);
      });

      updateCarouselI18n(currentLang || 'es');
    }

    function go(index) {
      currentIndex = (index + vehicles.length) % vehicles.length;
      updatePositions();
    }

    function next() { go(currentIndex + 1); }
    function prev() { go(currentIndex - 1); }

    function onInteract() {
      stopAuto();
      startAuto();
    }

    prevBtn?.addEventListener('click', () => { onInteract(); prev(); });
    nextBtn?.addEventListener('click', () => { onInteract(); next(); });
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        onInteract();
        go(parseInt(dot.dataset.index, 10));
      });
    });

    let startX = 0;
    const stage = document.getElementById('fleetCarouselStage');
    const carousel = document.querySelector('.fleet-carousel');

    carousel?.addEventListener('mouseenter', stopAuto);
    carousel?.addEventListener('mouseleave', startAuto);

    stage?.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
      stopAuto();
    }, { passive: true });

    stage?.addEventListener('touchend', e => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) next();
        else prev();
      }
      startAuto();
    }, { passive: true });

    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') { onInteract(); prev(); }
      if (e.key === 'ArrowRight') { onInteract(); next(); }
    });

    updatePositions();
    startAuto();
  })();

  /* ──────────────────────────────────────────
     CARRUSEL DE PROYECTOS (marquee)
     La animación CSS corre hasta translateX(-50%): para que al reiniciar el
     frame coincida con el inicial y el salto sea invisible, la cinta tiene que
     contener las tarjetas DOS veces. Se clonan acá en vez de repetirlas en el
     HTML para no duplicar el contenido a mano ni obligar a un lector de
     pantalla a leer 40 proyectos en lugar de 20 (la copia va aria-hidden).
  ────────────────────────────────────────── */
  (function projectsMarquee() {
    const track = document.getElementById('projectsTrack');
    if (!track) return;
    const originales = Array.from(track.children);
    originales.forEach(card => {
      const clon = card.cloneNode(true);
      clon.setAttribute('aria-hidden', 'true');
      clon.removeAttribute('role');
      track.appendChild(clon);
    });
  })();

  // Language toggle buttons
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = b.dataset.lang;
      applyI18n(lang);
    });
  });

  /* Default: ES si no hay preferencia guardada.
     El diccionario I18N cubre el contenido de la home, no el de las landings
     de servicio. Sin este guard, un visitante con 'en' guardado en localStorage
     abría una landing mitad traducida (nav/footer en inglés, cuerpo en español)
     y —peor— con <html lang="en"> sobre contenido español, lo que le informa
     mal el idioma a Google. Las landings no incluyen .lang-toggle, así que
     quedan fijas en español hasta que exista su versión /en/. */
  const supportsI18n = !!document.querySelector('.lang-toggle');
  let savedLang = 'es';
  try { savedLang = localStorage.getItem('isa_lang') || 'es'; } catch (e) {}
  if (supportsI18n) applyI18n(savedLang);

  /* ─────────────────────────────────────────────────────────────
     Formularios — FormSubmit.co (envío nativo con adjuntos)
       • Propuesta → contacto@ismaelsa.info  (archivo opcional <5MB + link Drive para >5MB)
       • CV        → ismaelsarr.hh@gmail.com (archivo obligatorio <5MB)
     FormSubmit acepta adjuntos solo con POST nativo (no AJAX); por eso al
     enviar, la página redirige a /gracias.html (campo _next).
     ACTIVACIÓN: la primera vez hay que hacer un envío de prueba en cada
     formulario y clickear el link de confirmación que manda FormSubmit a
     cada correo. Después los mensajes llegan automáticamente.
  ───────────────────────────────────────────────────────────── */
  const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB por archivo (tope FormSubmit: 10 MB total)

  // _next dinámico → página de gracias del mismo dominio (sirve en prod y en preview)
  document.querySelectorAll('input[name="_next"]').forEach(i => {
    i.value = location.origin + '/gracias.html';
  });

  // Mostrar el nombre del archivo elegido y avisar si supera 5 MB
  document.querySelectorAll('.file-upload input[type="file"]').forEach(input => {
    const nameEl = input.parentElement.querySelector('.file-upload-name');
    input.addEventListener('change', () => {
      const _d = I18N[document.documentElement.lang] || I18N.es;
      const file = input.files && input.files[0];
      nameEl.classList.remove('is-error');
      if (file && file.size > MAX_FILE_BYTES) {
        input.value = '';
        nameEl.removeAttribute('data-i18n');
        nameEl.classList.add('is-error');
        nameEl.textContent = _d['file.toobig'] || 'El archivo supera los 5 MB';
        return;
      }
      if (file) {
        nameEl.removeAttribute('data-i18n');
        nameEl.textContent = file.name;
      } else {
        nameEl.setAttribute('data-i18n', 'file.none');
        nameEl.textContent = _d['file.none'] || 'Ningún archivo seleccionado';
      }
    });
  });

  // Guarda de tamaño antes del envío nativo (≤5 MB)
  function fileTooBig(input) {
    const file = input && input.files && input.files[0];
    return !!(file && file.size > MAX_FILE_BYTES);
  }

  // Validación de tipo de archivo para CVs: solo PDF y Word
  const ALLOWED_CV_EXTENSIONS = /\.(pdf|doc|docx)$/i;
  function invalidCvType(input) {
    const file = input && input.files && input.files[0];
    if (!file) return false;
    return !ALLOWED_CV_EXTENSIONS.test(file.name);
  }

  /* ─────────────────────────────────────────────────────────────
     Rate limit por dispositivo (localStorage)
       • Propuesta: 3 envíos por ventana móvil de 6 h
       • CV:        2 envíos por ventana móvil de 12 h
     Es un límite "blando": frena el reenvío honesto y el doble-click,
     no a un atacante decidido (se saltea con incógnito / otro navegador).
     La protección anti-bot real es el honeypot (_honey) y, si hiciera
     falta, reactivar el captcha nativo de FormSubmit (_captcha=true).
  ───────────────────────────────────────────────────────────── */
  const RATE_LIMITS = {
    contact: { key: 'isa_rl_contact', max: 3, windowMs: 6 * 60 * 60 * 1000 },
    careers: { key: 'isa_rl_careers', max: 2, windowMs: 12 * 60 * 60 * 1000 },
  };

  function rlReadTimes(cfg) {
    try {
      const arr = JSON.parse(localStorage.getItem(cfg.key) || '[]');
      const now = Date.now();
      return Array.isArray(arr)
        ? arr.filter(t => typeof t === 'number' && now - t < cfg.windowMs)
        : [];
    } catch (e) { return []; }
  }

  // Devuelve { blocked, retryMs }
  function rlState(cfg) {
    const times = rlReadTimes(cfg);
    if (times.length < cfg.max) return { blocked: false, retryMs: 0 };
    const oldest = Math.min.apply(null, times);
    return { blocked: true, retryMs: Math.max(0, cfg.windowMs - (Date.now() - oldest)) };
  }

  function rlRecord(cfg) {
    const times = rlReadTimes(cfg);
    times.push(Date.now());
    try { localStorage.setItem(cfg.key, JSON.stringify(times)); } catch (e) {}
  }

  // Formatea el tiempo restante según el idioma activo
  function rlFormat(ms, _d) {
    if (ms < 60 * 60 * 1000) return _d['rl.lesshour'] || 'menos de una hora';
    const hours = Math.ceil(ms / (60 * 60 * 1000));
    return (_d['rl.hours'] || '{n} h').replace('{n}', hours);
  }

  // Si está bloqueado: muestra mensaje, previene el envío y devuelve true
  function rlBlock(cfg, e, status, btn, _d, msgKey) {
    const st = rlState(cfg);
    if (!st.blocked) return false;
    e.preventDefault();
    status.className = 'form-status error';
    status.textContent = (_d[msgKey] || '').replace('{t}', rlFormat(st.retryMs, _d));
    if (btn) { btn.disabled = true; }
    status.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return true;
  }

  // Propuesta: archivo opcional (<5MB)
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', (e) => {
    const _d = I18N[document.documentElement.lang] || I18N.es;
    const status = document.getElementById('formStatus');
    const fileInput = document.getElementById('proposal-file');
    const btn = document.getElementById('submitBtn');
    status.className = 'form-status'; status.textContent = '';
    if (rlBlock(RATE_LIMITS.contact, e, status, btn, _d, 'contact.form.ratelimit')) return;
    if (fileTooBig(fileInput)) {
      e.preventDefault();
      status.className = 'form-status error';
      status.textContent = _d['file.toobig'] || 'El archivo supera los 5 MB. Para archivos grandes usá el link de Drive.';
      fileInput.closest('.form-group')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    // Todas las validaciones OK → registrar el envío antes de la navegación nativa
    rlRecord(RATE_LIMITS.contact);
    if (btn) { btn.disabled = true; btn.textContent = _d['contact.form.sending'] || 'Enviando…'; }
  });

  // CV: archivo obligatorio (<5MB)
  const careersForm = document.getElementById('careersForm');
  careersForm?.addEventListener('submit', (e) => {
    const _d = I18N[document.documentElement.lang] || I18N.es;
    const status = document.getElementById('careersStatus');
    const fileInput = document.getElementById('cv-file');
    const btn = document.getElementById('careersBtn');
    status.className = 'form-status'; status.textContent = '';
    if (rlBlock(RATE_LIMITS.careers, e, status, btn, _d, 'careers.form.ratelimit')) return;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      e.preventDefault();
      status.className = 'form-status error';
      status.textContent = _d['careers.form.cv.required'] || 'Adjuntá tu CV (PDF o Word, máx. 5 MB) para enviar la postulación.';
      fileInput?.closest('.form-group')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (invalidCvType(fileInput)) {
      e.preventDefault();
      status.className = 'form-status error';
      status.textContent = currentLang === 'en'
        ? '✗ Only PDF or Word files (.pdf, .doc, .docx) are accepted.'
        : '✗ Solo se aceptan archivos PDF o Word (.pdf, .doc, .docx).';
      fileInput.closest('.form-group')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (fileTooBig(fileInput)) {
      e.preventDefault();
      status.className = 'form-status error';
      status.textContent = _d['file.toobig'] || 'El archivo supera los 5 MB.';
      fileInput.closest('.form-group')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    // Todas las validaciones OK → registrar el envío antes de la navegación nativa
    rlRecord(RATE_LIMITS.careers);
    if (btn) { btn.disabled = true; btn.textContent = _d['careers.form.sending'] || 'Enviando…'; }
  });
