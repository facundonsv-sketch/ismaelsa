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
      'hero.tag': 'San Juan, Argentina — Cordillera de los Andes',
      'hero.h1': 'SERVICIOS MINEROS<br><em>Y LOGÍSTICA OPERATIVA</em><br>EMPRESA SANJUANINA',
      'hero.lead': 'Flota propia, dos bases en San Juan y más de 20 años operando en la Cordillera de los Andes.',
      'hero.sub': 'Transporte, abastecimiento, hidrogrúas y soporte en terreno para la minería sanjuanina.',
      'stats.years': 'Años de<br>trayectoria',
      'stats.units': 'Unidades<br>propias',
      'stats.bases': 'Bases operativas<br>en San Juan',
      'stats.cert': 'Personal<br>certificado',
      'stats.projects': 'Proyectos<br>asistidos',
      'about.tag': 'Quiénes somos',
      'about.title': 'Operador logístico sanjuanino para la minería',
      'about.label': 'Cordillera de los Andes · San Juan',
      'services.tag': 'Servicios',
      'services.title': 'Lo que hacemos, lo hacemos bien',
      'fleet.tag': 'Flota y capacidades',
      'fleet.title': 'Equipamiento propio.<br>Sin intermediarios.',
      'safety.tag': 'Higiene, seguridad y trazabilidad operativa',
      'safety.title': 'Seguridad operativa<br>sin excepciones',
      'safety.quote': '"La seguridad no es un requisito: es nuestro estándar operativo."',
      'bases.tag': 'Infraestructura y cobertura',
      'bases.title': 'Dos bases operativas en San Juan',
      'experience.tag': 'Experiencia que nos respalda',
      'experience.title': 'Más de 35 proyectos asistidos<br>en alta montaña',
      'team.tag': 'Capital humano',
      'team.title': 'Personas con<br>experiencia operativa real',
      'team.quote': '"No solo cumplimos los estándares: los integramos a nuestra cultura operativa."',
      'why.tag': 'Por qué elegirnos',
      'why.title': 'Soporte logístico minero<br>con criterio operativo real',
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
      'about.body1': 'ISMAEL S.A. es una empresa de San Juan especializada en logística, transporte y soporte operativo para la industria minera, petróleo, gas y grandes obras. Operamos con flota propia en la Cordillera de los Andes, con más de 20 años de presencia en la provincia.',
      'about.body2': 'Contamos con dos bases en Rawson y Calingasta que nos permiten movilizar equipos rápidamente a cualquier punto de la cordillera, sin depender de operadores externos ni tránsitos interprovinciales.',
      'about.hl1': '<strong>Acceso a frentes de perforación</strong> — operamos en terrenos cordilleranos inaccesibles para operadores sin base en la provincia',
      'about.hl2': '<strong>Flota 100% propia</strong> — sin intermediarios, sin tercerización de equipamiento crítico',
      'about.hl3': '<strong>Respuesta local</strong> — dos bases en San Juan para movilización rápida en cualquier punto de la cordillera',
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
      'svc.7.desc': 'Izaje, movimiento de cargas y asistencia a operaciones que requieren equipamiento específico, riggers certificados y personal habilitado para tareas de alto riesgo.',
      'fleet.body': 'Más de 20 unidades propias preparadas para operar en cordillera, rutas y zonas remotas. Garantizamos disponibilidad, mantenimiento preventivo programado y respuesta operativa local, sin depender de terceros para el equipamiento crítico.',
      'fleet.caption.title': '+20 unidades en operación',
      'fleet.caption.meta': 'Base operativa · San Juan',
      'fleet.item1': 'Camiones aguateros',
      'fleet.item2': 'Camiones con hidrogrúa',
      'fleet.item3': 'Camiones chasis',
      'fleet.item4': 'Tractores con semirremolque',
      'fleet.item5': 'Vehículos 4×4 / 6×4',
      'fleet.carousel.subtitle': 'Algunos de nuestros vehículos',
      'safety.body': 'Cada servicio se ejecuta bajo procedimientos de seguridad, seguimiento satelital y control preventivo de la flota, priorizando la protección del personal, la continuidad operativa y el cumplimiento en terreno. Compatibles con las exigencias HSEC de operadoras mineras internacionales.',
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
      'experience.context': 'Operamos en los departamentos de Calingasta, Iglesia, Jáchal y Ullum, asistiendo campañas de exploración, perforación y desarrollo minero junto a operadoras internacionales y nacionales con presencia activa en San Juan.',
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
      'team.role2': 'Operadores de hidrogrúa e izaje de cargas (Rigger)',
      'team.role3': 'Técnicos de mantenimiento preventivo de flota',
      'team.role4': 'Coordinadores de logística en campamento y terreno',
      'team.role5': 'Personal administrativo y de planificación operativa',
      'why.item1.title': 'Presencia local en San Juan',
      'why.item1.desc': 'Bases en Rawson y Calingasta. Sin demoras de movilización interprovincial ni dependencia de operadores externos.',
      'why.item2.title': 'Flota propia, sin intermediarios',
      'why.item2.desc': 'Control directo sobre disponibilidad, mantenimiento y prioridad de asignación de cada unidad.',
      'why.item3.title': 'Capacidad de respuesta rápida',
      'why.item3.desc': 'Movilización en horas, dotación escalable según campaña, disponibilidad fuera de horario administrativo.',
      'why.item4.title': 'Experiencia en alta cordillera',
      'why.item4.desc': 'Más de 20 años operando en rutas de montaña, frentes de perforación y proyectos de exploración en San Juan.',
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
      'hero.tag': 'San Juan, Argentina — Andes Mountain Range',
      'hero.h1': 'MINING SERVICES<br><em>AND OPERATIONAL LOGISTICS</em><br>SAN JUAN-BASED COMPANY',
      'hero.lead': 'Own fleet, two bases in San Juan and over 20 years operating in the Andes mountain range.',
      'hero.sub': 'Transport, water supply, cranes and field support for San Juan\'s mining industry.',
      'stats.years': 'Years of<br>experience',
      'stats.units': 'Owned<br>units',
      'stats.bases': 'Operating bases<br>in San Juan',
      'stats.cert': 'Certified<br>personnel',
      'stats.projects': 'Projects<br>supported',
      'about.tag': 'About us',
      'about.title': 'San Juan-based logistics operator for the mining industry',
      'about.label': 'Andes Mountain Range · San Juan',
      'services.tag': 'Services',
      'services.title': 'What we do, we do well',
      'fleet.tag': 'Fleet and capabilities',
      'fleet.title': 'Owned equipment.<br>No middlemen.',
      'safety.tag': 'Health, safety and operational traceability',
      'safety.title': 'Operational safety<br>without exceptions',
      'safety.quote': '"Safety is not a requirement: it is our operational standard."',
      'bases.tag': 'Infrastructure and coverage',
      'bases.title': 'Two operating bases in San Juan',
      'experience.tag': 'Experience that backs us up',
      'experience.title': 'Over 35 projects supported<br>in high-altitude operations',
      'team.tag': 'Human capital',
      'team.title': 'People with<br>real operational experience',
      'team.quote': '"We don\'t just meet the standards: we integrate them into our operational culture."',
      'why.tag': 'Why choose us',
      'why.title': 'Mining logistics support<br>with real operational criteria',
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
      'about.body1': 'ISMAEL S.A. is a San Juan-based company specializing in logistics, transport and operational support for the mining, oil, gas and major construction industries. We operate with our own fleet in the Andes, with over 20 years of presence in the province.',
      'about.body2': 'We have two bases in Rawson and Calingasta that allow us to mobilize equipment quickly to any point in the mountain range, without relying on external operators or inter-provincial transit.',
      'about.hl1': '<strong>Access to drilling fronts</strong> — we operate in Andean terrain inaccessible to operators without a base in the province',
      'about.hl2': '<strong>100% owned fleet</strong> — no middlemen, no outsourcing of critical equipment',
      'about.hl3': '<strong>Local response</strong> — two bases in San Juan for rapid mobilization to any point in the mountain range',
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
      'svc.7.desc': 'Lifting, load movement and operational assistance requiring specific equipment, certified riggers and qualified personnel for high-risk tasks.',
      'fleet.body': 'Over 20 owned units ready to operate in the mountains, roads and remote areas. We guarantee availability, scheduled preventive maintenance and local operational response, without relying on third parties for critical equipment.',
      'fleet.caption.title': '+20 units in operation',
      'fleet.caption.meta': 'Operating base · San Juan',
      'fleet.item1': 'Water tanker trucks',
      'fleet.item2': 'Trucks with crane',
      'fleet.item3': 'Chassis trucks',
      'fleet.item4': 'Semi-trailer tractors',
      'fleet.item5': '4×4 / 6×4 vehicles',
      'fleet.carousel.subtitle': 'Some of our vehicles',
      'safety.body': 'Every service is executed under safety procedures, satellite tracking and fleet preventive control, prioritizing personnel protection, operational continuity and on-site compliance. Compatible with the HSEC requirements of international mining operators.',
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
      'experience.context': 'We operate in the departments of Calingasta, Iglesia, Jáchal and Ullum, supporting exploration, drilling and mining development campaigns alongside international and national operators with an active presence in San Juan.',
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
      'team.role2': 'Crane operators and load lifting (Rigger)',
      'team.role3': 'Preventive fleet maintenance technicians',
      'team.role4': 'Logistics coordinators in camp and field',
      'team.role5': 'Administrative and operational planning staff',
      'why.item1.title': 'Local presence in San Juan',
      'why.item1.desc': 'Bases in Rawson and Calingasta. No inter-provincial mobilization delays or dependence on external operators.',
      'why.item2.title': 'Own fleet, no middlemen',
      'why.item2.desc': 'Direct control over availability, maintenance and priority allocation of each unit.',
      'why.item3.title': 'Rapid response capacity',
      'why.item3.desc': 'Mobilization within hours, scalable workforce by campaign, availability outside office hours.',
      'why.item4.title': 'High Andes experience',
      'why.item4.desc': 'Over 20 years operating on mountain roads, drilling fronts and exploration projects in San Juan.',
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

  // Language toggle buttons
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = b.dataset.lang;
      applyI18n(lang);
    });
  });

  // Default: ES si no hay preferencia guardada
  let savedLang = 'es';
  try { savedLang = localStorage.getItem('isa_lang') || 'es'; } catch (e) {}
  applyI18n(savedLang);

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

  // Propuesta: archivo opcional (<5MB)
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', (e) => {
    const _d = I18N[document.documentElement.lang] || I18N.es;
    const status = document.getElementById('formStatus');
    const fileInput = document.getElementById('proposal-file');
    status.className = 'form-status'; status.textContent = '';
    if (fileTooBig(fileInput)) {
      e.preventDefault();
      status.className = 'form-status error';
      status.textContent = _d['file.toobig'] || 'El archivo supera los 5 MB. Para archivos grandes usá el link de Drive.';
      fileInput.closest('.form-group')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const btn = document.getElementById('submitBtn');
    if (btn) { btn.disabled = true; btn.textContent = _d['contact.form.sending'] || 'Enviando…'; }
  });

  // CV: archivo obligatorio (<5MB)
  const careersForm = document.getElementById('careersForm');
  careersForm?.addEventListener('submit', (e) => {
    const _d = I18N[document.documentElement.lang] || I18N.es;
    const status = document.getElementById('careersStatus');
    const fileInput = document.getElementById('cv-file');
    status.className = 'form-status'; status.textContent = '';
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
    const btn = document.getElementById('careersBtn');
    if (btn) { btn.disabled = true; btn.textContent = _d['careers.form.sending'] || 'Enviando…'; }
  });
