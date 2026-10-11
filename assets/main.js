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
    es: {
  "home.title": "ISMAEL S.A. | Logística para la minería de San Juan",
  "home.desc": "Transporte de cargas y agua, hidrogrúas y traslado de personal para proyectos mineros y grandes obras en San Juan. Flota y personal propios, bases en Rawson y Calingasta.",
  "a11y.skip": "Ir al contenido",
  "hero.slide1.alt": "Convoy de camiones de ISMAEL S.A. en ruta",
  "hero.slide2.alt": "Camión con hidrogrúa de ISMAEL S.A. en la cordillera",
  "hero.slide3.alt": "Camión de ISMAEL S.A. transportando un equipo en la montaña",
  "svc.01.tag": "Exploración y explotación",
  "svc.02.tag": "Transporte de agua",
  "svc.03.tag": "Zonas remotas",
  "svc.04.tag": "Traslado de personal",
  "svc.05.tag": "Equipos e insumos",
  "svc.06.tag": "Soporte en terreno",
  "svc.07.tag": "Hidrogrúas",
  "svc.01.t": "Logística para exploración, perforación y explotación",
  "svc.01.short": "Transporte, recursos y traslados para campañas de exploración y operaciones en explotación.",
  "svc.01.img.alt": "Logística para exploración, perforación y explotación",
  "svc.02.t": "Transporte de agua",
  "svc.02.short": "Abastecimiento con camiones aguateros a campamentos y operaciones sin red.",
  "svc.02.img.alt": "Transporte de agua",
  "svc.03.t": "Abastecimiento en zonas remotas",
  "svc.03.short": "Materiales, módulos e insumos hasta puntos de operación de difícil acceso.",
  "svc.03.img.alt": "Abastecimiento en zonas remotas",
  "svc.04.t": "Traslado de personal",
  "svc.04.short": "Camionetas 4×4 entre bases, proyectos y campamentos.",
  "svc.04.img.alt": "Traslado de personal",
  "svc.05.t": "Transporte de equipos e insumos",
  "svc.05.short": "Equipos, maquinaria, módulos y estructuras, incluidas cargas sobredimensionadas.",
  "svc.05.img.alt": "Transporte de equipos e insumos",
  "svc.06.t": "Soporte operativo en terreno",
  "svc.06.short": "Presencia logística en el lugar durante la campaña.",
  "svc.06.img.alt": "Soporte operativo en terreno",
  "svc.07.t": "Hidrogrúas y servicios especiales",
  "svc.07.short": "Carga, descarga y posicionamiento con hidrogrúas Palfinger sobre camión.",
  "svc.07.img.alt": "Hidrogrúas y servicios especiales",
  "tray.0.k": "Años de trabajo en la minería de San Juan",
  "tray.1.k": "Proyectos mineros asistidos",
  "tray.2.k": "Unidades propias en operación",
  "como.0.t": "Antes de salir",
  "como.0.d": "Revisión preoperacional de cada unidad y plan de mantenimiento preventivo.",
  "como.1.t": "En el camino",
  "como.1.d": "Seguimiento por GPS. Radio VHF o satelital donde no hay señal de celular.",
  "como.2.t": "Las personas",
  "como.2.d": "Control de horas de manejo y descanso. Inducción de seguridad de cada proyecto antes de ingresar.",
  "como.3.t": "Seguros y habilitaciones",
  "como.3.d": "ART, responsabilidad civil y seguro de carga. Habilitaciones y revisión técnica al día.",
  "hero.eye": "Servicios, logística y transporte · San Juan",
  "hero.h1": "Logística para la minería de San Juan",
  "hero.p": "Transporte de cargas y agua, hidrogrúas y traslado de personal para proyectos mineros y grandes obras en San Juan. Flota y personal propios.",
  "hero.b1": "Conozca nuestros servicios",
  "hero.b2": "Contáctenos",
  "about.eye": "Quiénes somos",
  "about.h2": "Una empresa sanjuanina al servicio de la minería",
  "about.p1": "Prestamos servicios de transporte y logística para operadoras mineras y contratistas en la provincia de San Juan, desde dos bases propias: Rawson, en el Gran San Juan, y Calingasta, en la zona cordillerana.",
  "about.p2": "La flota, el taller y el personal son propios.",
  "about.lnk": "Conocer la empresa",
  "about.img.alt": "Personal de ISMAEL S.A.",
  "tray.lnk": "Nuestra trayectoria",
  "svc.eye": "Servicios",
  "svc.h2": "Nuestros servicios",
  "svc.all": "Ver todos los servicios",
  "pres.eye": "Dónde estamos",
  "pres.h2": "Presencia en la provincia de San Juan",
  "pres.p": "Operamos desde dos bases propias y trabajamos en los departamentos cordilleranos, como Calingasta e Iglesia.",
  "base.1.k": "Base 01 · Administración",
  "base.1.h": "Lunes a viernes de 9 a 17 h",
  "base.maps": "Cómo llegar ↗",
  "base.2.k": "Base 02 · Operaciones",
  "base.2.a": "Zona cordillerana, San Juan",
  "base.2.h": "Base operativa, sin atención al público",
  "map.label": "Mapa de las bases de ISMAEL S.A. en San Juan",
  "como.eye": "Cómo trabajamos",
  "como.h2": "Seguridad en cada operación",
  "jobs.eye": "Súmese al equipo",
  "jobs.h2": "Oportunidades para crecer en la logística minera",
  "jobs.p": "Envíe su CV a <a href=\"mailto:rrhh@ismaelsa.info\">rrhh@ismaelsa.info</a>. En el asunto, escriba el puesto o la actividad que realiza y la localidad donde reside.",
  "jobs.b1": "Enviar CV ✉",
  "jobs.b2": "Contactar ahora",
  "jobs.k": "Cómo postularse",
  "jobs.d1": "Recibimos currículums de forma permanente. Los guardamos y nos comunicamos cuando surge una búsqueda que coincide con su perfil.",
  "jobs.d2": "Adjunte el CV en PDF. Si tiene licencias de conducir profesionales o habilitaciones de operación vigentes, indíquelas en el cuerpo del correo.",
  "cta.h": "Solicite una cotización",
  "cta.cotizar": "Solicitar cotización",
  "nav.inicio": "Inicio",
  "nav.empresa": "Empresa",
  "nav.servicios": "Servicios",
  "nav.contacto": "Contacto",
  "emp.tab.quienes": "Quiénes somos",
  "emp.tab.mision": "Misión y visión",
  "emp.tab.trayectoria": "Trayectoria",
  "emp.tab.bases": "Bases operativas",
  "emp.tab.flota": "Flota",
  "emp.tab.personas": "Nuestra gente",
  "emp.tab.seguridad": "Seguridad",
  "mega.emp.t1": "Conozca la empresa",
  "mega.emp.t2": "Más de ISMAEL S.A.",
  "mega.emp.note": "Transporte y logística para minería, construcción y grandes obras, con bases en Rawson y Calingasta.",
  "mega.svc.t1": "Nuestros servicios",
  "mega.svc.t2": "Más sobre servicios",
  "mega.svc.flota": "Flota propia",
  "mega.svc.note": "Los servicios se contratan por separado o combinados.",
  "mega.con.llamar": "Llamar",
  "mega.con.mail": "Escribir un correo",
  "mega.con.rawson": "Base Rawson · Gran San Juan",
  "mega.con.calingasta": "Base Calingasta · Zona cordillerana",
  "mega.con.note": "Respondemos las consultas en días hábiles.",
  "hd.tagline": "Logística y transporte",
  "nav.menu": "MENÚ",
  "ft.desc": "Transporte y logística para minería y grandes obras en San Juan, Argentina.",
  "ft.contacto": "Contacto general",
  "ft.rawson": "Base Rawson · Gral. Mariano Acha Sur 2356",
  "ft.horario": "Lun a vie 9 a 17 h",
  "ft.calingasta": "Base Calingasta · San Juan",
  "mbar.llamar": "Llamar",
  "mbar.cotizar": "Cotizar",
  "empresa.title": "Empresa — ISMAEL S.A. | Transporte y logística en San Juan",
  "empresa.desc": "Quiénes somos, misión y visión, trayectoria, bases operativas en Rawson y Calingasta, flota propia, nuestra gente y seguridad. ISMAEL S.A., San Juan.",
  "facts.0.v": "San Juan",
  "facts.0.k": "Empresa local, de capitales sanjuaninos",
  "facts.1.v": "Minería",
  "facts.1.k": "Exploración y operaciones en cordillera",
  "facts.2.v": "Obras",
  "facts.2.k": "Construcción, energía e industria",
  "facts.3.v": "Largo plazo",
  "facts.3.k": "Clientes que repiten campaña tras campaña",
  "fleet.0.alt": "Camiones aguateros",
  "fleet.0.t": "Camiones aguateros",
  "fleet.1.alt": "Camiones con hidrogrúa Palfinger",
  "fleet.1.t": "Camiones con hidrogrúa Palfinger",
  "fleet.2.alt": "Tractores con semirremolque",
  "fleet.2.t": "Tractores con semirremolque",
  "fleet.3.alt": "Camiones chasis",
  "fleet.3.t": "Camiones chasis",
  "fleet.4.alt": "Camionetas 4×4",
  "fleet.4.t": "Camionetas 4×4",
  "roles.0": "Choferes de camiones pesados y de camionetas 4×4",
  "roles.1": "Operadores de hidrogrúa, señaleros y eslingadores",
  "roles.2": "Mecánicos de mantenimiento de flota",
  "roles.3": "Coordinadores de logística en campamento y terreno",
  "roles.4": "Administración y planificación",
  "emp.hero.alt": "Flota de ISMAEL S.A. en base",
  "q.p1": "ISMAEL S.A. es una empresa sanjuanina de transporte y logística. Nació para resolver una necesidad concreta: mover cargas, agua y personas hasta los proyectos mineros de la cordillera, donde los caminos, la altura y el clima no permiten improvisar.",
  "q.p2": "Con los años, ese trabajo nos dio algo que no se compra: conocimiento del terreno. Sabemos qué camino se corta con la primera nevada, cuánto tarda un relevo hasta un campamento y qué unidad conviene para cada carga. Ese criterio es lo que ofrecemos, además de los camiones.",
  "q.p3": "Trabajamos principalmente para operadoras mineras y para las contratistas que participan en sus proyectos, en campañas de exploración y en operaciones en marcha. Preferimos relaciones de largo plazo: los clientes que nos conocen vuelven a llamarnos cuando empieza la siguiente campaña.",
  "q.p4": "La misma capacidad sirve fuera de la minería. Prestamos servicios a grandes obras, empresas constructoras, proyectos energéticos y a cualquier cliente que necesite mover cargas, agua o personal en zonas de difícil acceso.",
  "m.h": "Misión",
  "m.p": "Resolver el transporte y la logística que necesitan los proyectos mineros de San Juan, las grandes obras y sus contratistas, con flota y personal propios y con la seguridad como condición de cada operación.",
  "v.h": "Visión",
  "v.p": "Ser la empresa sanjuanina de referencia en logística para la minería de alta montaña, reconocida por cumplir lo que acuerda.",
  "t.p": "Más de veinte años trabajando en la cordillera sanjuanina, en campañas de exploración y en operaciones en marcha, para operadoras y contratistas.",
  "t.note": "La cantidad de unidades varía según la temporada.",
  "base.1.d": "Gran San Juan. Administración, taller y abastecimiento de la flota. Gral. Mariano Acha Sur 2356, Rawson. Atención de lunes a viernes de 9 a 17 h.",
  "base.2.d": "Zona cordillerana. Base de avanzada, más cerca de los proyectos de montaña.",
  "f.h": "Flota propia",
  "f.p": "Mantenimiento preventivo en taller propio. No transportamos combustibles ni cargas peligrosas.",
  "g.p": "El personal es propio y forma parte de la estructura de la empresa.",
  "s.note": "Operadores de hidrogrúa, señaleros y eslingadores acreditados ante organismos reconocidos por la OAA.",
  "servicios.title": "Servicios — ISMAEL S.A. | Transporte y logística minera en San Juan",
  "servicios.desc": "Logística para exploración y explotación, transporte de agua, abastecimiento en zonas remotas, traslado de personal, transporte de equipos, soporte en terreno e hidrogrúas.",
  "contacto.title": "Contacto — ISMAEL S.A. | San Juan",
  "contacto.desc": "Solicite una cotización a ISMAEL S.A.: teléfono +54 264 413-1515, contacto@ismaelsa.info, Base Rawson en Gral. Mariano Acha Sur 2356 (lun a vie 9 a 17 h) y Base Calingasta.",
  "form.svc.ph": "Seleccione un servicio",
  "form.svc.otro": "Otra consulta",
  "c.tel": "Teléfono",
  "c.mail": "Correo",
  "c.rawson": "Base Rawson · Lun a vie 9 a 17 h",
  "c.calingasta": "Base Calingasta",
  "form.nombre": "Nombre",
  "form.empresa": "Empresa",
  "form.email": "Correo electrónico",
  "form.tel": "Teléfono",
  "form.svc": "Servicio",
  "form.desc": "Descripción",
  "form.desc.ph": "Zona, fechas aproximadas y qué hay que mover, abastecer o izar.",
  "form.submit": "Enviar consulta",
  "gracias.title": "Consulta recibida — ISMAEL S.A.",
  "gracias.desc": "Recibimos su consulta. Le respondemos en días hábiles.",
  "gr.h": "Consulta recibida",
  "gr.p": "Le respondemos en días hábiles.",
  "util.home": "Volver al inicio →",
  "e404.title": "Página no encontrada — ISMAEL S.A.",
  "e404.desc": "La página que busca no existe o fue movida.",
  "e404.h": "Página no encontrada",
  "e404.p": "La página que busca no existe o fue movida.",
  "util.home2": "Volver al inicio",
  "svc01.title": "Logística para exploración, perforación y explotación minera en San Juan | ISMAEL S.A.",
  "svc01.desc": "Transporte, recursos y traslados para campañas de exploración y operaciones en explotación en San Juan. Flota y personal propios, bases en Rawson y Calingasta.",
  "svc.01.p1": "En ISMAEL S.A. acompañamos a las empresas mineras en las distintas etapas de un proyecto. Durante la exploración, cuando el trabajo se concentra en perforar y conocer el yacimiento, nos ocupamos de que los equipos, los insumos y el personal lleguen a tiempo al lugar de trabajo, aun en zonas alejadas y de alta montaña.",
  "svc.01.p2": "Cuando el proyecto pasa a la etapa de explotación, sostenemos la logística de todos los días: traslados, abastecimiento y movimiento de materiales. Un mismo equipo organiza los recursos según el cronograma de cada cliente, para que la operación avance sin interrupciones.",
  "svc.01.gal1.alt": "Traslado nocturno de equipos",
  "det.quote.k": "Para cotizar",
  "svc.01.quote": "Proyecto o zona, etapa (exploración o explotación), duración estimada y qué recursos hay que mover.",
  "det.others": "Otros servicios",
  "svc02.title": "Transporte de agua con camiones aguateros en San Juan | ISMAEL S.A.",
  "svc02.desc": "Abastecimiento de agua con camiones aguateros propios a campamentos, obras y operaciones sin red en San Juan. Entregas programadas o a pedido.",
  "svc.02.p1": "El agua es un recurso indispensable en cualquier operación alejada de los centros urbanos. Con nuestros camiones aguateros abastecemos campamentos, obras y operaciones que no cuentan con red, con entregas programadas o a pedido según la necesidad de cada cliente.",
  "svc.02.p2": "Las unidades están preparadas para circular por caminos de montaña, ripio y nieve, lo que nos permite sostener el abastecimiento durante toda la campaña y en las distintas épocas del año.",
  "svc.02.gal1.alt": "Camión aguatero de ISMAEL S.A. en la montaña",
  "svc.02.gal2.alt": "Camión aguatero en la cordillera nevada",
  "svc.02.quote": "Zona, consumo estimado o frecuencia deseada y período de la campaña.",
  "svc03.title": "Abastecimiento en zonas remotas de San Juan | ISMAEL S.A.",
  "svc03.desc": "Materiales, módulos e insumos hasta puntos de operación de difícil acceso en San Juan, por rutas de cordillera y caminos sin asfalto.",
  "svc.03.p1": "Muchos proyectos mineros y obras se desarrollan lejos de las ciudades, en lugares donde llegar ya es parte del desafío. Llevamos materiales, módulos e insumos hasta esos puntos de trabajo por rutas de cordillera y caminos sin asfalto.",
  "svc.03.p2": "Planificamos cada entrega según el acceso y el estado del camino en cada época del año, para que el abastecimiento llegue completo y en el momento en que se lo necesita.",
  "svc.03.gal1.alt": "Camión con carretón en la montaña",
  "svc.03.quote": "Qué hay que llevar, punto de entrega y frecuencia o fecha estimada.",
  "svc04.title": "Traslado de personal en camionetas 4×4 en San Juan | ISMAEL S.A.",
  "svc04.desc": "Traslado de personal en camionetas 4×4 entre bases, proyectos y campamentos de San Juan. Rotaciones programadas y traslados no previstos.",
  "svc.04.p1": "Las personas son el centro de cualquier operación. Trasladamos personal en camionetas 4×4 entre bases, proyectos y campamentos, tanto en rotaciones programadas como en traslados no previstos.",
  "svc.04.p2": "Nuestros choferes conocen los caminos de montaña y trabajan con control de horas de manejo, para que cada viaje se haga con seguridad y en los tiempos que la operación requiere.",
  "svc.04.gal1.alt": "Camioneta y camión de ISMAEL S.A. en terreno",
  "svc.04.quote": "Origen y destino, cantidad de personas y frecuencia de las rotaciones.",
  "svc05.title": "Transporte de equipos e insumos para minería en San Juan | ISMAEL S.A.",
  "svc05.desc": "Transporte de maquinaria, insumos, módulos, tanques y estructuras hasta proyectos mineros y obras en San Juan, incluidas cargas sobredimensionadas con permisos y camioneta guía.",
  "svc.05.p1": "En la minería, la construcción y las grandes obras, cada etapa depende de que los equipos y materiales estén en el lugar indicado. Transportamos maquinaria, insumos, módulos, tanques y estructuras desde el origen hasta el lugar de trabajo.",
  "svc.05.p2": "Para cargas sobredimensionadas contamos con carretones de cama baja, gestionamos los permisos de circulación y acompañamos el traslado con camioneta guía. No transportamos combustibles ni cargas peligrosas.",
  "svc.05.gal1.alt": "Camión con hidrogrúa y módulo",
  "svc.05.quote": "Qué hay que transportar (tipo, medidas y peso aproximado), origen, destino y fechas estimadas.",
  "svc06.title": "Soporte operativo en terreno para minería en San Juan | ISMAEL S.A.",
  "svc06.desc": "Presencia logística en el lugar durante toda la campaña: unidades y personal a disposición del proyecto, traslado de módulos, abastecimiento y movimiento de materiales y personas.",
  "svc.06.p1": "Hay campañas que necesitan una presencia logística permanente en el lugar. En esos casos ponemos unidades y personal a disposición del proyecto para resolver lo que surja durante el trabajo.",
  "svc.06.p2": "Nos ocupamos del traslado y posicionamiento de módulos, del abastecimiento y del movimiento de materiales y personas, en coordinación con el equipo del cliente durante toda la campaña.",
  "svc.06.gal1.alt": "Unidades de la flota en terreno",
  "svc.06.gal2.alt": "Posicionamiento de un módulo en campamento",
  "svc.06.quote": "Zona, duración estimada de la campaña y qué hay que resolver en terreno.",
  "svc07.title": "Hidrogrúas Palfinger sobre camión para minería en San Juan | ISMAEL S.A.",
  "svc07.desc": "Carga, descarga y posicionamiento de equipos, contenedores, módulos y estructuras con hidrogrúas Palfinger sobre camión, operadas por personal acreditado, en San Juan.",
  "svc.07.p1": "Cargar, descargar y ubicar una pieza pesada exige equipos adecuados y personal con experiencia. Con hidrogrúas Palfinger montadas sobre camión movemos equipos, contenedores, módulos, tanques y estructuras en bases, obras y campamentos.",
  "svc.07.p2": "El mismo camión que transporta la carga es el que la baja y la ubica, lo que simplifica la maniobra. Cada operación la realizan operadores acreditados, con señalero y eslingador.",
  "svc.07.gal1.alt": "Hidrogrúa posicionando un módulo",
  "svc.07.gal2.alt": "Camión con hidrogrúa Palfinger",
  "svc.07.quote": "Qué hay que izar (tipo, peso y medidas aproximadas), dónde, y si incluye el transporte.",
  "form.ratelimit": "Ya envió varias consultas desde este dispositivo. Puede volver a intentar en {t}. Si es urgente, escríbanos a contacto@ismaelsa.info.",
  "form.sending": "Enviando…",
  "form.invalid": "Complete el nombre y un correo electrónico válido.",
  "rl.hours": "{n} h",
  "rl.lesshour": "menos de una hora",
  "nav.close": "CERRAR",
  "map.bases": "Bases ISMAEL S.A.",
  "map.proy": "Proyectos mineros de San Juan",
  "map.aprox": "Ubicaciones aproximadas",
  "map.rawson.d": "Gral. Mariano Acha Sur 2356 · Cómo llegar ↗",
  "map.calingasta.d": "Zona cordillerana",
  "map.base.rawson": "Base Rawson",
  "map.base.calingasta": "Base Calingasta"
},
    en: {
  "home.title": "ISMAEL S.A. | Logistics for San Juan mining",
  "home.desc": "Cargo and water transport, knuckle-boom cranes and personnel transport for mining projects and large works in San Juan. Own fleet and staff, bases in Rawson and Calingasta.",
  "a11y.skip": "Skip to content",
  "hero.slide1.alt": "ISMAEL S.A. truck convoy on the road",
  "hero.slide2.alt": "ISMAEL S.A. truck with knuckle-boom crane in the Andes",
  "hero.slide3.alt": "ISMAEL S.A. truck carrying equipment in the mountains",
  "svc.01.tag": "Exploration and operations",
  "svc.02.tag": "Water transport",
  "svc.03.tag": "Remote areas",
  "svc.04.tag": "Personnel transport",
  "svc.05.tag": "Equipment and supplies",
  "svc.06.tag": "On-site support",
  "svc.07.tag": "Knuckle-boom cranes",
  "svc.01.t": "Logistics for exploration, drilling and mining operations",
  "svc.01.short": "Transport, resources and crew transfers for exploration campaigns and operating mines.",
  "svc.01.img.alt": "Logistics for exploration, drilling and mining operations",
  "svc.02.t": "Water transport",
  "svc.02.short": "Supply by water tanker trucks to camps and operations without a water network.",
  "svc.02.img.alt": "Water transport",
  "svc.03.t": "Supply to remote areas",
  "svc.03.short": "Materials, modules and supplies delivered to hard-to-reach operating sites.",
  "svc.03.img.alt": "Supply to remote areas",
  "svc.04.t": "Personnel transport",
  "svc.04.short": "4×4 pickups between bases, projects and camps.",
  "svc.04.img.alt": "Personnel transport",
  "svc.05.t": "Equipment and supplies transport",
  "svc.05.short": "Equipment, machinery, modules and structures, including oversized loads.",
  "svc.05.img.alt": "Equipment and supplies transport",
  "svc.06.t": "On-site operational support",
  "svc.06.short": "Logistics presence on site throughout the campaign.",
  "svc.06.img.alt": "On-site operational support",
  "svc.07.t": "Knuckle-boom cranes and special services",
  "svc.07.short": "Loading, unloading and positioning with truck-mounted Palfinger knuckle-boom cranes.",
  "svc.07.img.alt": "Knuckle-boom cranes and special services",
  "tray.0.k": "Years working in San Juan mining",
  "tray.1.k": "Mining projects served",
  "tray.2.k": "Own units in operation",
  "como.0.t": "Before departure",
  "como.0.d": "Pre-trip inspection of every unit and a preventive maintenance plan.",
  "como.1.t": "On the road",
  "como.1.d": "GPS tracking. VHF or satellite radio where there is no mobile signal.",
  "como.2.t": "Our people",
  "como.2.d": "Driving and rest hours control. Each project's safety induction before entering the site.",
  "como.3.t": "Insurance and permits",
  "como.3.d": "Workers' compensation, liability and cargo insurance. Permits and technical inspections up to date.",
  "hero.eye": "Services, logistics and transport · San Juan",
  "hero.h1": "Logistics for San Juan mining",
  "hero.p": "Cargo and water transport, knuckle-boom cranes and personnel transport for mining projects and large works in San Juan. Own fleet and staff.",
  "hero.b1": "Explore our services",
  "hero.b2": "Contact us",
  "about.eye": "About us",
  "about.h2": "A San Juan company at the service of mining",
  "about.p1": "We provide transport and logistics services to mining operators and contractors in the province of San Juan, from two bases of our own: Rawson, in Greater San Juan, and Calingasta, in the Andean zone.",
  "about.p2": "The fleet, the workshop and the staff are our own.",
  "about.lnk": "Learn about the company",
  "about.img.alt": "ISMAEL S.A. staff",
  "tray.lnk": "Our track record",
  "svc.eye": "Services",
  "svc.h2": "Our services",
  "svc.all": "See all services",
  "pres.eye": "Where we are",
  "pres.h2": "Presence across the province of San Juan",
  "pres.p": "We operate from two bases of our own and work in the Andean departments, such as Calingasta and Iglesia.",
  "base.1.k": "Base 01 · Administration",
  "base.1.h": "Monday to Friday, 9 am to 5 pm",
  "base.maps": "Get directions ↗",
  "base.2.k": "Base 02 · Operations",
  "base.2.a": "Andean zone, San Juan",
  "base.2.h": "Operating base, not open to the public",
  "map.label": "Map of ISMAEL S.A. bases in San Juan",
  "como.eye": "How we work",
  "como.h2": "Safety in every operation",
  "jobs.eye": "Join the team",
  "jobs.h2": "Opportunities to grow in mining logistics",
  "jobs.p": "Send your CV to <a href=\"mailto:rrhh@ismaelsa.info\">rrhh@ismaelsa.info</a>. In the subject line, state the position or the work you do and the town where you live.",
  "jobs.b1": "Send CV ✉",
  "jobs.b2": "Contact us now",
  "jobs.k": "How to apply",
  "jobs.d1": "We receive CVs on an ongoing basis. We keep them on file and get in touch when a vacancy matches your profile.",
  "jobs.d2": "Attach your CV as a PDF. If you hold professional driving licences or current operating certifications, mention them in the body of the email.",
  "cta.h": "Request a quote",
  "cta.cotizar": "Request a quote",
  "nav.inicio": "Home",
  "nav.empresa": "Company",
  "nav.servicios": "Services",
  "nav.contacto": "Contact",
  "emp.tab.quienes": "About us",
  "emp.tab.mision": "Mission and vision",
  "emp.tab.trayectoria": "Track record",
  "emp.tab.bases": "Operating bases",
  "emp.tab.flota": "Fleet",
  "emp.tab.personas": "Our people",
  "emp.tab.seguridad": "Safety",
  "mega.emp.t1": "Get to know the company",
  "mega.emp.t2": "More about ISMAEL S.A.",
  "mega.emp.note": "Transport and logistics for mining, construction and large projects, with bases in Rawson and Calingasta.",
  "mega.svc.t1": "Our services",
  "mega.svc.t2": "More about our services",
  "mega.svc.flota": "Own fleet",
  "mega.svc.note": "Services can be contracted separately or combined.",
  "mega.con.llamar": "Call us",
  "mega.con.mail": "Send an email",
  "mega.con.rawson": "Rawson base · Greater San Juan",
  "mega.con.calingasta": "Calingasta base · Andean zone",
  "mega.con.note": "We answer enquiries on business days.",
  "hd.tagline": "Logistics and transport",
  "nav.menu": "MENU",
  "ft.desc": "Transport and logistics for mining and large projects in San Juan, Argentina.",
  "ft.contacto": "General contact",
  "ft.rawson": "Rawson base · Gral. Mariano Acha Sur 2356",
  "ft.horario": "Mon to Fri, 9 am to 5 pm",
  "ft.calingasta": "Calingasta base · San Juan",
  "mbar.llamar": "Call",
  "mbar.cotizar": "Get a quote",
  "empresa.title": "Company — ISMAEL S.A. | Transport and logistics in San Juan",
  "empresa.desc": "About us, mission and vision, track record, operating bases in Rawson and Calingasta, our own fleet, our people and safety. ISMAEL S.A., San Juan.",
  "facts.0.v": "San Juan",
  "facts.0.k": "Local company, San Juan-owned",
  "facts.1.v": "Mining",
  "facts.1.k": "Exploration and operations in the Andes",
  "facts.2.v": "Projects",
  "facts.2.k": "Construction, energy and industry",
  "facts.3.v": "Long term",
  "facts.3.k": "Clients who return campaign after campaign",
  "fleet.0.alt": "Water tanker trucks",
  "fleet.0.t": "Water tanker trucks",
  "fleet.1.alt": "Trucks with Palfinger knuckle-boom crane",
  "fleet.1.t": "Trucks with Palfinger knuckle-boom crane",
  "fleet.2.alt": "Tractor units with semi-trailer",
  "fleet.2.t": "Tractor units with semi-trailer",
  "fleet.3.alt": "Chassis trucks",
  "fleet.3.t": "Chassis trucks",
  "fleet.4.alt": "4×4 pickups",
  "fleet.4.t": "4×4 pickups",
  "roles.0": "Heavy truck and 4×4 pickup drivers",
  "roles.1": "Knuckle-boom crane operators, signallers and riggers",
  "roles.2": "Fleet maintenance mechanics",
  "roles.3": "Camp and field logistics coordinators",
  "roles.4": "Administration and planning",
  "emp.hero.alt": "ISMAEL S.A. fleet at the base",
  "q.p1": "ISMAEL S.A. is a San Juan transport and logistics company. It was founded to meet a concrete need: moving cargo, water and people to the mining projects of the Andes, where the roads, the altitude and the weather leave no room for improvisation.",
  "q.p2": "Over the years that work gave us something money cannot buy: knowledge of the terrain. We know which road closes with the first snowfall, how long a crew change to a camp takes and which unit suits each load. That judgement is what we offer, along with the trucks.",
  "q.p3": "We work mainly for mining operators and for the contractors involved in their projects, during exploration campaigns and in ongoing operations. We prefer long-term relationships: clients who know us call us again when the next campaign begins.",
  "q.p4": "The same capability serves beyond mining. We provide services to large projects, construction companies, energy projects and any client that needs to move cargo, water or personnel in hard-to-reach areas.",
  "m.h": "Mission",
  "m.p": "To provide the transport and logistics that San Juan mining projects, large works and their contractors need, with our own fleet and staff and with safety as a condition of every operation.",
  "v.h": "Vision",
  "v.p": "To be the leading San Juan company in logistics for high-mountain mining, known for delivering what it agrees to.",
  "t.p": "More than twenty years working in the San Juan Andes, on exploration campaigns and in ongoing operations, for operators and contractors.",
  "t.note": "The number of units varies with the season.",
  "base.1.d": "Greater San Juan. Administration, workshop and fleet supply. Gral. Mariano Acha Sur 2356, Rawson. Open Monday to Friday, 9 am to 5 pm.",
  "base.2.d": "Andean zone. Forward base, closer to the mountain projects.",
  "f.h": "Our own fleet",
  "f.p": "Preventive maintenance in our own workshop. We do not transport fuel or hazardous cargo.",
  "g.p": "Our staff are our own employees and part of the company structure.",
  "s.note": "Knuckle-boom crane operators, signallers and riggers certified by bodies recognised by the OAA (Argentine Accreditation Body).",
  "servicios.title": "Services — ISMAEL S.A. | Mining transport and logistics in San Juan",
  "servicios.desc": "Exploration and operations logistics, water transport, remote-area supply, personnel transport, equipment transport, on-site support and knuckle-boom cranes.",
  "contacto.title": "Contact — ISMAEL S.A. | San Juan",
  "contacto.desc": "Request a quote from ISMAEL S.A.: phone +54 264 413-1515, contacto@ismaelsa.info, Rawson base at Gral. Mariano Acha Sur 2356 (Mon to Fri 9 am to 5 pm) and Calingasta base.",
  "form.svc.ph": "Select a service",
  "form.svc.otro": "Other enquiry",
  "c.tel": "Phone",
  "c.mail": "Email",
  "c.rawson": "Rawson base · Mon to Fri, 9 am to 5 pm",
  "c.calingasta": "Calingasta base",
  "form.nombre": "Name",
  "form.empresa": "Company",
  "form.email": "Email address",
  "form.tel": "Phone",
  "form.svc": "Service",
  "form.desc": "Description",
  "form.desc.ph": "Area, approximate dates and what needs to be moved, supplied or lifted.",
  "form.submit": "Send enquiry",
  "gracias.title": "Enquiry received — ISMAEL S.A.",
  "gracias.desc": "We received your enquiry. We will reply on business days.",
  "gr.h": "Enquiry received",
  "gr.p": "We will reply on business days.",
  "util.home": "Back to home →",
  "e404.title": "Page not found — ISMAEL S.A.",
  "e404.desc": "The page you are looking for does not exist or has been moved.",
  "e404.h": "Page not found",
  "e404.p": "The page you are looking for does not exist or has been moved.",
  "util.home2": "Back to home",
  "svc01.title": "Logistics for mining exploration, drilling and operations in San Juan | ISMAEL S.A.",
  "svc01.desc": "Transport, resources and crew transfers for exploration campaigns and operating mines in San Juan. Own fleet and staff, bases in Rawson and Calingasta.",
  "svc.01.p1": "At ISMAEL S.A. we support mining companies through the different stages of a project. During exploration, when the work focuses on drilling and understanding the deposit, we make sure equipment, supplies and personnel reach the work site on time, even in remote, high-mountain areas.",
  "svc.01.p2": "Once the project moves into production, we sustain the day-to-day logistics: transfers, supply and movement of materials. A single team organises resources around each client's schedule so the operation keeps moving without interruptions.",
  "svc.01.gal1.alt": "Night-time equipment transfer",
  "det.quote.k": "For a quote",
  "svc.01.quote": "Project or area, stage (exploration or production), estimated duration and which resources need to be moved.",
  "det.others": "Other services",
  "svc02.title": "Water transport by tanker truck in San Juan | ISMAEL S.A.",
  "svc02.desc": "Water supply by our own tanker trucks to camps, work sites and operations without a network in San Juan. Scheduled or on-demand deliveries.",
  "svc.02.p1": "Water is essential to any operation far from urban centres. With our water tanker trucks we supply camps, work sites and operations that have no water network, with scheduled or on-demand deliveries according to each client's needs.",
  "svc.02.p2": "Our units are equipped for mountain roads, gravel and snow, which allows us to keep the supply going throughout the campaign and at every time of year.",
  "svc.02.gal1.alt": "ISMAEL S.A. water tanker truck in the mountains",
  "svc.02.gal2.alt": "Water tanker truck in the snow-covered Andes",
  "svc.02.quote": "Area, estimated consumption or desired frequency, and campaign period.",
  "svc03.title": "Supply to remote areas of San Juan | ISMAEL S.A.",
  "svc03.desc": "Materials, modules and supplies delivered to hard-to-reach operating sites in San Juan, over Andean routes and unpaved roads.",
  "svc.03.p1": "Many mining projects and construction sites are far from the cities, in places where simply getting there is part of the challenge. We carry materials, modules and supplies to those work sites over Andean routes and unpaved roads.",
  "svc.03.p2": "We plan every delivery around the access and road conditions at each time of year, so supplies arrive complete and when they are needed.",
  "svc.03.gal1.alt": "Truck with lowboy trailer in the mountains",
  "svc.03.quote": "What needs to be delivered, delivery point, and frequency or estimated date.",
  "svc04.title": "Personnel transport in 4×4 pickups in San Juan | ISMAEL S.A.",
  "svc04.desc": "Personnel transport in 4×4 pickups between bases, projects and camps in San Juan. Scheduled rotations and unplanned transfers.",
  "svc.04.p1": "People are at the centre of every operation. We transport personnel in 4×4 pickups between bases, projects and camps, both on scheduled rotations and on unplanned transfers.",
  "svc.04.p2": "Our drivers know the mountain roads and work under driving-hours control, so every trip is made safely and within the time the operation requires.",
  "svc.04.gal1.alt": "ISMAEL S.A. pickup and truck in the field",
  "svc.04.quote": "Origin and destination, number of people, and rotation frequency.",
  "svc05.title": "Equipment and supplies transport for mining in San Juan | ISMAEL S.A.",
  "svc05.desc": "Transport of machinery, supplies, modules, tanks and structures to mining projects and work sites in San Juan, including oversized loads with permits and pilot vehicle.",
  "svc.05.p1": "In mining, construction and large projects, every stage depends on equipment and materials being in the right place. We transport machinery, supplies, modules, tanks and structures from origin to the work site.",
  "svc.05.p2": "For oversized loads we use lowboy trailers, arrange the transit permits and escort the move with a pilot vehicle. We do not transport fuel or hazardous cargo.",
  "svc.05.gal1.alt": "Truck with knuckle-boom crane and module",
  "svc.05.quote": "What needs to be transported (type, approximate dimensions and weight), origin, destination and estimated dates.",
  "svc06.title": "On-site operational support for mining in San Juan | ISMAEL S.A.",
  "svc06.desc": "Logistics presence on site throughout the campaign: units and personnel assigned to the project, module transfers, supply, and movement of materials and people.",
  "svc.06.p1": "Some campaigns need a permanent logistics presence on site. In those cases we assign units and personnel to the project to deal with whatever comes up during the work.",
  "svc.06.p2": "We handle the transfer and positioning of modules, supply, and the movement of materials and people, in coordination with the client's team throughout the campaign.",
  "svc.06.gal1.alt": "Fleet units in the field",
  "svc.06.gal2.alt": "Positioning a module at a camp",
  "svc.06.quote": "Area, estimated campaign duration and what needs to be handled on site.",
  "svc07.title": "Truck-mounted Palfinger knuckle-boom cranes for mining in San Juan | ISMAEL S.A.",
  "svc07.desc": "Loading, unloading and positioning of equipment, containers, modules and structures with truck-mounted Palfinger knuckle-boom cranes, operated by certified personnel, in San Juan.",
  "svc.07.p1": "Loading, unloading and placing a heavy piece calls for the right equipment and experienced people. With truck-mounted Palfinger knuckle-boom cranes we move equipment, containers, modules, tanks and structures at bases, work sites and camps.",
  "svc.07.p2": "The same truck that carries the load is the one that sets it down and positions it, which simplifies the operation. Every lift is carried out by certified operators, with a signaller and a rigger.",
  "svc.07.gal1.alt": "Knuckle-boom crane positioning a module",
  "svc.07.gal2.alt": "Truck with Palfinger knuckle-boom crane",
  "svc.07.quote": "What needs to be lifted (type, approximate weight and dimensions), where, and whether transport is included.",
  "form.ratelimit": "You have already sent several enquiries from this device. You can try again in {t}. If it is urgent, email us at contacto@ismaelsa.info.",
  "form.sending": "Sending…",
  "form.invalid": "Please enter your name and a valid email address.",
  "rl.hours": "{n} h",
  "rl.lesshour": "less than an hour",
  "nav.close": "CLOSE",
  "map.bases": "ISMAEL S.A. bases",
  "map.proy": "San Juan mining projects",
  "map.aprox": "Approximate locations",
  "map.rawson.d": "Gral. Mariano Acha Sur 2356 · Directions ↗",
  "map.calingasta.d": "Andean zone",
  "map.base.rawson": "Rawson base",
  "map.base.calingasta": "Calingasta base"
}
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
    [['alt', 'i18nAlt'], ['placeholder', 'i18nPlaceholder'], ['aria-label', 'i18nAriaLabel'], ['title', 'i18nTitle']].forEach(([attr, ds]) => {
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
  function setSolid() { hd.classList.toggle('is-solid', window.scrollY > 40); }
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
