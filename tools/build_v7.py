# -*- coding: utf-8 -*-
"""
Generador del sitio v7 (ISMAEL S.A.).
Produce las 12 páginas HTML estáticas y el diccionario I18N (ES/EN) dentro de
assets/main.js, a partir de UNA sola fuente de textos (este archivo). No hay build
en producción: los HTML generados se commitean tal cual.

Uso:  py -I tools/build_v7.py        (desde la raíz del repo)
"""
import json, re, pathlib, html as H

ROOT = pathlib.Path(__file__).resolve().parent.parent
MAN = json.load(open(ROOT / 'assets/v7/manifest.json', encoding='utf-8'))
SITE = 'https://ismaelsa.com'
TEL = '+54 264 413-1515'; TELH = 'tel:+542644131515'
MAIL = 'contacto@ismaelsa.info'; RRHH = 'rrhh@ismaelsa.info'
MAPS = 'https://www.google.com/maps/search/?api=1&query=Gral.+Mariano+Acha+Sur+2356,+Rawson,+San+Juan'
WA_NUM = '542644131515'
IG = 'https://www.instagram.com/ismaelsanjuan_/'
FB = 'https://www.facebook.com/profile.php?id=61567888546865'
LI = 'https://www.linkedin.com/company/145184473/'
from urllib.parse import quote as _q
def wa(text):
    return f'https://wa.me/{WA_NUM}?text={_q(text)}'
WA_MSG = ('Hola, quiero consultar por un servicio.', 'Hello, I would like to ask about a service.')
# Íconos: WhatsApp/Instagram/Facebook de simple-icons (CC0, tools/icons.json); LinkedIn trazado propio.
_IC = json.load(open(ROOT / 'tools/icons.json', encoding='utf-8'))
_IC['linkedin'] = 'M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z'
def icon(name, cls='ic'):
    return f'<svg class="{cls}" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path fill="currentColor" d="{_IC[name]}"/></svg>'
EXT = 'target="_blank" rel="noopener noreferrer"'
def wa_link(key, es, en, msg_es, msg_en, cls, label_html=None):
    """Link a WhatsApp con texto visible y mensaje precargado, ambos traducibles."""
    T[key + '.href'] = (wa(msg_es), wa(msg_en))
    lbl = label_html if label_html is not None else f'<span {t(key, es, en)}>{es}</span>'
    return f'<a href="{wa(msg_es)}" data-i18n-href="{key}.href" class="{cls}" {EXT}>{icon("whatsapp")}{lbl}</a>'
def socials(cls='soc'):
    items = [('instagram', IG, 'Instagram', 's-ig'), ('facebook', FB, 'Facebook', 's-fb'), ('linkedin', LI, 'LinkedIn', 's-li')]
    return f'<div class="{cls}">' + ''.join(f'<a href="{u}" class="{c}" {EXT} aria-label="{n} — ISMAEL S.A." title="{n}">{icon(k)}</a>' for k, u, n, c in items) + '</div>'

# ──────────────────────────────────────────────────────────────────────
# Diccionario i18n: clave -> (es, en). Se llena al construir el HTML.
# ──────────────────────────────────────────────────────────────────────
T = {}

def t(key, es, en=None):
    """Registra la clave y devuelve el atributo data-i18n."""
    if key in T and T[key] != (es, en if en is not None else es):
        raise SystemExit(f'Clave i18n duplicada con texto distinto: {key}')
    T[key] = (es, en if en is not None else es)
    return f'data-i18n="{key}"'

def th(key, es, en):
    """Igual que t() pero el texto contiene HTML (data-i18n-html)."""
    T[key] = (es, en)
    return f'data-i18n-html="{key}"'

def ta(attr, key, es, en):
    """Atributo traducible (alt, placeholder, title, aria-label)."""
    T[key] = (es, en)
    return f'{attr}="{H.escape(es, quote=True)}" data-i18n-{attr}="{key}"'

RESP = json.load(open(ROOT / 'assets/v7/responsive.json', encoding='utf-8')) if (ROOT / 'assets/v7/responsive.json').exists() else {}

def img(name, alt_key, alt_es, alt_en, cls='', lazy=True, extra='', sizes=None):
    w, h, _ = MAN[name]
    lz = ' loading="lazy" decoding="async"' if lazy else ' fetchpriority="high"'
    c = f' class="{cls}"' if cls else ''
    ss = ''
    if name in RESP:  # variantes responsive (ver tools/build_v7.py: make_responsive)
        cands = ', '.join(f'/assets/v7/{name}-{ww}.webp {ww}w' for ww in RESP[name]) + f', /assets/v7/{name}.webp {w}w'
        ss = f' srcset="{cands}" sizes="{sizes or "100vw"}"'
    return f'<img src="/assets/v7/{name}.webp"{ss} {ta("alt", alt_key, alt_es, alt_en)} width="{w}" height="{h}"{c}{lz}{extra}>'

# ──────────────────────────────────────────────────────────────────────
# Datos de servicios (copiados literalmente del prototipo) + traducción EN
# ──────────────────────────────────────────────────────────────────────
SERVICES = [
  dict(slug='logistica-exploracion-perforacion-san-juan', img='svc-exploracion', pos='op-50-30',
       t=('Logística para exploración, perforación y explotación', 'Logistics for exploration, drilling and mining operations'),
       tag=('Exploración y explotación', 'Exploration and operations'),
       short=('Transporte, recursos y traslados para campañas de exploración y operaciones en explotación.',
              'Transport, resources and crew transfers for exploration campaigns and operating mines.'),
       paras=[('En ISMAEL S.A. acompañamos a las empresas mineras en las distintas etapas de un proyecto. Durante la exploración, cuando el trabajo se concentra en perforar y conocer el yacimiento, nos ocupamos de que los equipos, los insumos y el personal lleguen a tiempo al lugar de trabajo, aun en zonas alejadas y de alta montaña.',
               'At ISMAEL S.A. we support mining companies through the different stages of a project. During exploration, when the work focuses on drilling and understanding the deposit, we make sure equipment, supplies and personnel reach the work site on time, even in remote, high-mountain areas.'),
              ('Cuando el proyecto pasa a la etapa de explotación, sostenemos la logística de todos los días: traslados, abastecimiento y movimiento de materiales. Un mismo equipo organiza los recursos según el cronograma de cada cliente, para que la operación avance sin interrupciones.',
               'Once the project moves into production, we sustain the day-to-day logistics: transfers, supply and movement of materials. A single team organises resources around each client\'s schedule so the operation keeps moving without interruptions.')],
       quote=('Proyecto o zona, etapa (exploración o explotación), duración estimada y qué recursos hay que mover.',
              'Project or area, stage (exploration or production), estimated duration and which resources need to be moved.'),
       gal=[('gal-w54', 'op-55-62', 'Traslado nocturno de equipos', 'Night-time equipment transfer')],
       title=('Logística para exploración, perforación y explotación minera en San Juan | ISMAEL S.A.', 'Logistics for mining exploration, drilling and operations in San Juan | ISMAEL S.A.'),
       desc=('Transporte, recursos y traslados para campañas de exploración y operaciones en explotación en San Juan. Flota y personal propios, bases en Rawson y Calingasta.',
             'Transport, resources and crew transfers for exploration campaigns and operating mines in San Juan. Own fleet and staff, bases in Rawson and Calingasta.')),
  dict(slug='transporte-agua-mineria', img='svc-agua', pos='op-40-50',
       t=('Transporte de agua', 'Water transport'), tag=('Transporte de agua', 'Water transport'),
       short=('Abastecimiento con camiones aguateros a campamentos y operaciones sin red.',
              'Supply by water tanker trucks to camps and operations without a water network.'),
       paras=[('El agua es un recurso indispensable en cualquier operación alejada de los centros urbanos. Con nuestros camiones aguateros abastecemos campamentos, obras y operaciones que no cuentan con red, con entregas programadas o a pedido según la necesidad de cada cliente.',
               'Water is essential to any operation far from urban centres. With our water tanker trucks we supply camps, work sites and operations that have no water network, with scheduled or on-demand deliveries according to each client\'s needs.'),
              ('Las unidades están preparadas para circular por caminos de montaña, ripio y nieve, lo que nos permite sostener el abastecimiento durante toda la campaña y en las distintas épocas del año.',
               'Our units are equipped for mountain roads, gravel and snow, which allows us to keep the supply going throughout the campaign and at every time of year.')],
       quote=('Zona, consumo estimado o frecuencia deseada y período de la campaña.',
              'Area, estimated consumption or desired frequency, and campaign period.'),
       gal=[('gal-aguatero', 'op-50-60', 'Camión aguatero de ISMAEL S.A. en la montaña', 'ISMAEL S.A. water tanker truck in the mountains'),
            ('gal-aguatero-nieve', 'op-50-60', 'Camión aguatero en la cordillera nevada', 'Water tanker truck in the snow-covered Andes')],
       title=('Transporte de agua con camiones aguateros en San Juan | ISMAEL S.A.', 'Water transport by tanker truck in San Juan | ISMAEL S.A.'),
       desc=('Abastecimiento de agua con camiones aguateros propios a campamentos, obras y operaciones sin red en San Juan. Entregas programadas o a pedido.',
             'Water supply by our own tanker trucks to camps, work sites and operations without a network in San Juan. Scheduled or on-demand deliveries.')),
  dict(slug='abastecimiento-minero-zonas-remotas', img='svc-remotas', pos='op-50-35',
       t=('Abastecimiento en zonas remotas', 'Supply to remote areas'), tag=('Zonas remotas', 'Remote areas'),
       short=('Materiales, módulos e insumos hasta puntos de operación de difícil acceso.',
              'Materials, modules and supplies delivered to hard-to-reach operating sites.'),
       paras=[('Muchos proyectos mineros y obras se desarrollan lejos de las ciudades, en lugares donde llegar ya es parte del desafío. Llevamos materiales, módulos e insumos hasta esos puntos de trabajo por rutas de cordillera y caminos sin asfalto.',
               'Many mining projects and construction sites are far from the cities, in places where simply getting there is part of the challenge. We carry materials, modules and supplies to those work sites over Andean routes and unpaved roads.'),
              ('Planificamos cada entrega según el acceso y el estado del camino en cada época del año, para que el abastecimiento llegue completo y en el momento en que se lo necesita.',
               'We plan every delivery around the access and road conditions at each time of year, so supplies arrive complete and when they are needed.')],
       quote=('Qué hay que llevar, punto de entrega y frecuencia o fecha estimada.',
              'What needs to be delivered, delivery point, and frequency or estimated date.'),
       gal=[('gal-w64', 'op-68-52', 'Camión con carretón en la montaña', 'Truck with lowboy trailer in the mountains')],
       title=('Abastecimiento en zonas remotas de San Juan | ISMAEL S.A.', 'Supply to remote areas of San Juan | ISMAEL S.A.'),
       desc=('Materiales, módulos e insumos hasta puntos de operación de difícil acceso en San Juan, por rutas de cordillera y caminos sin asfalto.',
             'Materials, modules and supplies delivered to hard-to-reach operating sites in San Juan, over Andean routes and unpaved roads.')),
  dict(slug='traslado-de-personal-minero', img='svc-personal', pos='op-45-55',
       t=('Traslado de personal', 'Personnel transport'), tag=('Traslado de personal', 'Personnel transport'),
       short=('Camionetas 4×4 entre bases, proyectos y campamentos.',
              '4×4 pickups between bases, projects and camps.'),
       paras=[('Las personas son el centro de cualquier operación. Trasladamos personal en camionetas 4×4 entre bases, proyectos y campamentos, tanto en rotaciones programadas como en traslados no previstos.',
               'People are at the centre of every operation. We transport personnel in 4×4 pickups between bases, projects and camps, both on scheduled rotations and on unplanned transfers.'),
              ('Nuestros choferes conocen los caminos de montaña y trabajan con control de horas de manejo, para que cada viaje se haga con seguridad y en los tiempos que la operación requiere.',
               'Our drivers know the mountain roads and work under driving-hours control, so every trip is made safely and within the time the operation requires.')],
       quote=('Origen y destino, cantidad de personas y frecuencia de las rotaciones.',
              'Origin and destination, number of people, and rotation frequency.'),
       gal=[('gal-w09', 'op-60-60', 'Camioneta y camión de ISMAEL S.A. en terreno', 'ISMAEL S.A. pickup and truck in the field')],
       title=('Traslado de personal en camionetas 4×4 en San Juan | ISMAEL S.A.', 'Personnel transport in 4×4 pickups in San Juan | ISMAEL S.A.'),
       desc=('Traslado de personal en camionetas 4×4 entre bases, proyectos y campamentos de San Juan. Rotaciones programadas y traslados no previstos.',
             'Personnel transport in 4×4 pickups between bases, projects and camps in San Juan. Scheduled rotations and unplanned transfers.')),
  dict(slug='transporte-minero-san-juan', img='svc-equipos', pos='op-40-60',
       t=('Transporte de equipos e insumos', 'Equipment and supplies transport'), tag=('Equipos e insumos', 'Equipment and supplies'),
       short=('Equipos, maquinaria, módulos y estructuras, incluidas cargas sobredimensionadas.',
              'Equipment, machinery, modules and structures, including oversized loads.'),
       paras=[('En la minería, la construcción y las grandes obras, cada etapa depende de que los equipos y materiales estén en el lugar indicado. Transportamos maquinaria, insumos, módulos, tanques y estructuras desde el origen hasta el lugar de trabajo.',
               'In mining, construction and large projects, every stage depends on equipment and materials being in the right place. We transport machinery, supplies, modules, tanks and structures from origin to the work site.'),
              ('Para cargas sobredimensionadas contamos con carretones de cama baja, gestionamos los permisos de circulación y acompañamos el traslado con camioneta guía. No transportamos combustibles ni cargas peligrosas.',
               'For oversized loads we use lowboy trailers, arrange the transit permits and escort the move with a pilot vehicle. We do not transport fuel or hazardous cargo.')],
       quote=('Qué hay que transportar (tipo, medidas y peso aproximado), origen, destino y fechas estimadas.',
              'What needs to be transported (type, approximate dimensions and weight), origin, destination and estimated dates.'),
       gal=[('gal-w42', 'op-62-55', 'Camión con hidrogrúa y módulo', 'Truck with knuckle-boom crane and module')],
       title=('Transporte de equipos e insumos para minería en San Juan | ISMAEL S.A.', 'Equipment and supplies transport for mining in San Juan | ISMAEL S.A.'),
       desc=('Transporte de maquinaria, insumos, módulos, tanques y estructuras hasta proyectos mineros y obras en San Juan, incluidas cargas sobredimensionadas con permisos y camioneta guía.',
             'Transport of machinery, supplies, modules, tanks and structures to mining projects and work sites in San Juan, including oversized loads with permits and pilot vehicle.')),
  dict(slug='soporte-operativo-alta-montana', img='svc-soporte', pos='op-45-55',
       t=('Soporte operativo en terreno', 'On-site operational support'), tag=('Soporte en terreno', 'On-site support'),
       short=('Presencia logística en el lugar durante la campaña.',
              'Logistics presence on site throughout the campaign.'),
       paras=[('Hay campañas que necesitan una presencia logística permanente en el lugar. En esos casos ponemos unidades y personal a disposición del proyecto para resolver lo que surja durante el trabajo.',
               'Some campaigns need a permanent logistics presence on site. In those cases we assign units and personnel to the project to deal with whatever comes up during the work.'),
              ('Nos ocupamos del traslado y posicionamiento de módulos, del abastecimiento y del movimiento de materiales y personas, en coordinación con el equipo del cliente durante toda la campaña.',
               'We handle the transfer and positioning of modules, supply, and the movement of materials and people, in coordination with the client\'s team throughout the campaign.')],
       quote=('Zona, duración estimada de la campaña y qué hay que resolver en terreno.',
              'Area, estimated campaign duration and what needs to be handled on site.'),
       gal=[('gal-w24', 'op-50-55', 'Unidades de la flota en terreno', 'Fleet units in the field'),
            ('gal-w28', 'op-58-55', 'Posicionamiento de un módulo en campamento', 'Positioning a module at a camp')],
       title=('Soporte operativo en terreno para minería en San Juan | ISMAEL S.A.', 'On-site operational support for mining in San Juan | ISMAEL S.A.'),
       desc=('Presencia logística en el lugar durante toda la campaña: unidades y personal a disposición del proyecto, traslado de módulos, abastecimiento y movimiento de materiales y personas.',
             'Logistics presence on site throughout the campaign: units and personnel assigned to the project, module transfers, supply, and movement of materials and people.')),
  dict(slug='hidrogruas-mineria-san-juan', img='svc-hidrogruas', pos='op-50-45',
       t=('Hidrogrúas y servicios especiales', 'Knuckle-boom cranes and special services'), tag=('Hidrogrúas', 'Knuckle-boom cranes'),
       short=('Carga, descarga y posicionamiento con hidrogrúas Palfinger sobre camión.',
              'Loading, unloading and positioning with truck-mounted Palfinger knuckle-boom cranes.'),
       paras=[('Cargar, descargar y ubicar una pieza pesada exige equipos adecuados y personal con experiencia. Con hidrogrúas Palfinger montadas sobre camión movemos equipos, contenedores, módulos, tanques y estructuras en bases, obras y campamentos.',
               'Loading, unloading and placing a heavy piece calls for the right equipment and experienced people. With truck-mounted Palfinger knuckle-boom cranes we move equipment, containers, modules, tanks and structures at bases, work sites and camps.'),
              ('El mismo camión que transporta la carga es el que la baja y la ubica, lo que simplifica la maniobra. Cada operación la realizan operadores acreditados, con señalero y eslingador.',
               'The same truck that carries the load is the one that sets it down and positions it, which simplifies the operation. Every lift is carried out by certified operators, with a signaller and a rigger.')],
       quote=('Qué hay que izar (tipo, peso y medidas aproximadas), dónde, y si incluye el transporte.',
              'What needs to be lifted (type, approximate weight and dimensions), where, and whether transport is included.'),
       gal=[('gal-w43', 'op-55-58', 'Hidrogrúa posicionando un módulo', 'Knuckle-boom crane positioning a module'),
            ('gal-w46', 'op-50-55', 'Camión con hidrogrúa Palfinger', 'Truck with Palfinger knuckle-boom crane')],
       title=('Hidrogrúas Palfinger sobre camión para minería en San Juan | ISMAEL S.A.', 'Truck-mounted Palfinger knuckle-boom cranes for mining in San Juan | ISMAEL S.A.'),
       desc=('Carga, descarga y posicionamiento de equipos, contenedores, módulos y estructuras con hidrogrúas Palfinger sobre camión, operadas por personal acreditado, en San Juan.',
             'Loading, unloading and positioning of equipment, containers, modules and structures with truck-mounted Palfinger knuckle-boom cranes, operated by certified personnel, in San Juan.')),
]
for i, s in enumerate(SERVICES):
    s['n'] = f'0{i+1}'; s['i'] = i; s['url'] = '/' + s['slug']

EMP_TABS = [('quienes', 'Quiénes somos', 'About us'), ('mision', 'Misión y visión', 'Mission and vision'), ('trayectoria', 'Trayectoria', 'Track record'),
            ('bases', 'Bases operativas', 'Operating bases'), ('flota', 'Flota', 'Fleet'), ('personas', 'Nuestra gente', 'Our people'), ('seguridad', 'Seguridad', 'Safety')]
TRAY = [('+20', 'Años de trabajo en la minería de San Juan', 'Years working in San Juan mining'),
        ('+50', 'Proyectos mineros asistidos', 'Mining projects served'),
        ('+25', 'Unidades propias en operación', 'Own units in operation')]
COMO = [('Antes de salir', 'Before departure', 'Revisión preoperacional de cada unidad y plan de mantenimiento preventivo.', 'Pre-trip inspection of every unit and a preventive maintenance plan.'),
        ('En el camino', 'On the road', 'Seguimiento por GPS. Radio VHF o satelital donde no hay señal de celular.', 'GPS tracking. VHF or satellite radio where there is no mobile signal.'),
        ('Las personas', 'Our people', 'Control de horas de manejo y descanso. Inducción de seguridad de cada proyecto antes de ingresar.', 'Driving and rest hours control. Each project\'s safety induction before entering the site.'),
        ('Seguros y habilitaciones', 'Insurance and permits', 'ART, responsabilidad civil y seguro de carga. Habilitaciones y revisión técnica al día.', 'Workers\' compensation, liability and cargo insurance. Permits and technical inspections up to date.')]
ROLES = [('Choferes de camiones pesados y de camionetas 4×4', 'Heavy truck and 4×4 pickup drivers'),
         ('Operadores de hidrogrúa, señaleros y eslingadores', 'Knuckle-boom crane operators, signallers and riggers'),
         ('Mecánicos de mantenimiento de flota', 'Fleet maintenance mechanics'),
         ('Coordinadores de logística en campamento y terreno', 'Camp and field logistics coordinators'),
         ('Administración y planificación', 'Administration and planning')]
FLEET = [('fleet-aguateros', 'op-45-55', 'Camiones aguateros', 'Water tanker trucks'),
         ('fleet-hidrogrua', 'op-55-55', 'Camiones con hidrogrúa Palfinger', 'Trucks with Palfinger knuckle-boom crane'),
         ('fleet-tractores', 'op-45-58', 'Tractores con semirremolque', 'Tractor units with semi-trailer'),
         ('fleet-chasis', 'op-50-58', 'Camiones chasis', 'Chassis trucks'),
         ('hilux-flota', 'op-50-62', 'Camionetas 4×4', '4×4 pickups')]
FACTS = [('San Juan', 'San Juan', 'Empresa local, de capitales sanjuaninos', 'Local company, San Juan-owned'),
         ('Minería', 'Mining', 'Exploración y operaciones en cordillera', 'Exploration and operations in the Andes'),
         ('Obras', 'Projects', 'Construcción, energía e industria', 'Construction, energy and industry'),
         ('Largo plazo', 'Long term', 'Clientes que repiten campaña tras campaña', 'Clients who return campaign after campaign')]

# ──────────────────────────────────────────────────────────────────────
# Fragmentos compartidos
# ──────────────────────────────────────────────────────────────────────
CSP = ("default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; "
       "img-src 'self' data: https://tile.openstreetmap.org; connect-src 'self'; "
       "form-action 'self' https://formsubmit.co; base-uri 'self'; object-src 'none'; frame-src 'none'; upgrade-insecure-requests")

def head(page, title_es, title_en, desc_es, desc_en, path, ldjson, image='hero-convoy', noindex=False, leaflet=False):
    T[f'{page}.title'] = (title_es, title_en); T[f'{page}.desc'] = (desc_es, desc_en)
    robots = '<meta name="robots" content="noindex, follow">' if noindex else '<meta name="robots" content="index, follow">'
    lf = '\n  <link rel="stylesheet" href="/assets/vendor/leaflet.css">\n  <script src="/assets/vendor/leaflet.js" defer></script>' if leaflet else ''
    w, h, _ = MAN[image]
    return f'''<!DOCTYPE html>
<html lang="es-AR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- Security headers (meta). Los que el navegador SOLO acepta vía HTTP (X-Frame-Options,
       HSTS, Permissions-Policy, frame-ancestors) van en _headers. -->
  <meta http-equiv="Content-Security-Policy" content="{CSP}">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <meta name="google-site-verification" content="KL2jrl5dkbz-vNek7oF4nhn-2jUqlwIQTPVOkqluiKU">
  <title data-i18n-doc="{page}.title">{H.escape(title_es)}</title>
  <meta name="description" content="{H.escape(desc_es, quote=True)}" data-i18n-meta="{page}.desc">
  {robots}
  <link rel="canonical" href="{SITE}{path}">
  <link rel="icon" href="/assets/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">
  <meta property="og:site_name" content="ISMAEL S.A.">
  <meta property="og:title" content="{H.escape(title_es, quote=True)}">
  <meta property="og:description" content="{H.escape(desc_es, quote=True)}">
  <meta property="og:image" content="{SITE}/assets/v7/{image}.webp">
  <meta property="og:image:width" content="{w}">
  <meta property="og:image:height" content="{h}">
  <meta property="og:url" content="{SITE}{path}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="es_AR">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{H.escape(title_es, quote=True)}">
  <meta name="twitter:description" content="{H.escape(desc_es, quote=True)}">
  <meta name="twitter:image" content="{SITE}/assets/v7/{image}.webp">
  <script type="application/ld+json">
{json.dumps(ldjson, ensure_ascii=False, indent=2)}
  </script>
  <link rel="preload" href="/assets/fonts/barlow/barlow-semi-condensed-700.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/barlow/barlow-400.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/assets/v7.css">{lf}
</head>
<body>
<a class="skip" href="#main" {t('a11y.skip', 'Ir al contenido', 'Skip to content')}>Ir al contenido</a>
'''

ORG = {"@type": "Organization", "@id": f"{SITE}/#organization", "name": "ISMAEL S.A.", "legalName": "ISMAEL S.A.", "url": f"{SITE}/",
       "logo": f"{SITE}/assets/v7/logo-completo-verde.webp", "email": MAIL, "telephone": "+542644131515",
       "address": {"@type": "PostalAddress", "streetAddress": "Gral. Mariano Acha Sur 2356", "addressLocality": "Rawson", "addressRegion": "San Juan", "addressCountry": "AR"},
       "areaServed": [{"@type": "State", "name": "San Juan, Argentina"}],
       "sameAs": [IG, FB, LI]}
WEBSITE = {"@type": "WebSite", "@id": f"{SITE}/#website", "url": f"{SITE}/", "name": "ISMAEL S.A.", "inLanguage": "es-AR", "publisher": {"@id": f"{SITE}/#organization"}}

def ld_page(path, name, desc, extra=None):
    g = [ORG, WEBSITE, {"@type": "WebPage", "@id": f"{SITE}{path}#webpage", "url": f"{SITE}{path}", "name": name, "description": desc, "inLanguage": "es-AR",
                        "isPartOf": {"@id": f"{SITE}/#website"}, "about": {"@id": f"{SITE}/#organization"}}]
    if extra: g += extra
    return {"@context": "https://schema.org", "@graph": g}

def header(active):
    """Header fijo + megamenú + menú móvil. `active` = home|empresa|servicios|contacto."""
    def it(key, label_es, label_en, href, sub, aid):
        cls = 'hd-it' + (' is-active' if active == aid else '') + (' has-sub' if sub else '')
        caret = '<span class="caret" aria-hidden="true">▾</span>' if sub else ''
        return f'<div class="{cls}" data-mega="{aid}"><a href="{href}"><span {t(key, label_es, label_en)}>{label_es}</span>{caret}</a></div>'
    nav = (it('nav.inicio', 'Inicio', 'Home', '/', False, 'home') + it('nav.empresa', 'Empresa', 'Company', '/empresa', True, 'empresa')
           + it('nav.servicios', 'Servicios', 'Services', '/servicios', True, 'servicios') + it('nav.contacto', 'Contacto', 'Contact', '/contacto', True, 'contacto'))
    emp_links = ''.join(f'<a href="/empresa#{a}" {t("emp.tab."+a, es, en)}>{es}</a>' for a, es, en in EMP_TABS)
    svc_links = ''.join(f'<a href="{s["url"]}" {t("svc."+s["n"]+".t", *s["t"])}>{s["t"][0]}</a>' for s in SERVICES)
    cot = t('cta.cotizar', 'Solicitar cotización', 'Request a quote')
    mega = f'''
  <div class="mega" id="mega" aria-label="Submenú">
    <div class="mega-in mega-empresa" data-mega-panel="empresa" hidden>
      <div><div class="mega-t" {t('mega.emp.t1', 'Conozca la empresa', 'Get to know the company')}>Conozca la empresa</div><div class="mega-p">{emp_links}</div></div>
      <div><div class="mega-t" {t('mega.emp.t2', 'Más de ISMAEL S.A.', 'More about ISMAEL S.A.')}>Más de ISMAEL S.A.</div><div class="mega-s"><a href="/contacto" {t('nav.contacto', 'Contacto', 'Contact')}>Contacto</a><a href="{TELH}">{TEL}</a><a href="mailto:{MAIL}">{MAIL}</a>{socials('soc soc-mega')}</div></div>
      <div class="mega-n"><div class="mega-note" {t('mega.emp.note', 'Transporte y logística para minería, construcción y grandes obras, con bases en Rawson y Calingasta.', 'Transport and logistics for mining, construction and large projects, with bases in Rawson and Calingasta.')}>Transporte y logística para minería, construcción y grandes obras, con bases en Rawson y Calingasta.</div><a href="/contacto" class="btn btn-g" {cot}>Solicitar cotización</a></div>
    </div>
    <div class="mega-in mega-servicios" data-mega-panel="servicios" hidden>
      <div><div class="mega-t" {t('mega.svc.t1', 'Nuestros servicios', 'Our services')}>Nuestros servicios</div><div class="mega-p">{svc_links}</div></div>
      <div><div class="mega-t" {t('mega.svc.t2', 'Más sobre servicios', 'More about our services')}>Más sobre servicios</div><div class="mega-s"><a href="/servicios" {t('svc.all', 'Ver todos los servicios', 'See all services')}>Ver todos los servicios</a><a href="/empresa#flota" {t('mega.svc.flota', 'Flota propia', 'Own fleet')}>Flota propia</a><a href="/empresa#seguridad" {t('emp.tab.seguridad', 'Seguridad', 'Safety')}>Seguridad</a></div></div>
      <div class="mega-n"><div class="mega-note" {t('mega.svc.note', 'Los servicios se contratan por separado o combinados.', 'Services can be contracted separately or combined.')}>Los servicios se contratan por separado o combinados.</div><a href="/contacto" class="btn btn-g" {cot}>Solicitar cotización</a></div>
    </div>
    <div class="mega-in mega-contacto" data-mega-panel="contacto" hidden>
      <div><div class="mega-t" {t('nav.contacto', 'Contacto', 'Contact')}>Contacto</div><div class="mega-p">{wa_link('mega.con.wa', 'Escribir por WhatsApp', 'Message us on WhatsApp', *WA_MSG, 'mega-wa')}<a href="/contacto" {cot}>Solicitar cotización</a><a href="{TELH}" {t('mega.con.llamar', 'Llamar', 'Call us')}>Llamar</a><a href="mailto:{MAIL}" {t('mega.con.mail', 'Escribir un correo', 'Send an email')}>Escribir un correo</a></div></div>
      <div><div class="mega-t" {t('emp.tab.bases', 'Bases operativas', 'Operating bases')}>Bases operativas</div><div class="mega-s"><a href="/empresa#bases" {t('mega.con.rawson', 'Base Rawson · Gran San Juan', 'Rawson base · Greater San Juan')}>Base Rawson · Gran San Juan</a><a href="/empresa#bases" {t('mega.con.calingasta', 'Base Calingasta · Zona cordillerana', 'Calingasta base · Andean zone')}>Base Calingasta · Zona cordillerana</a></div><div class="mega-t mega-t2" {t('ft.redes', 'Seguinos en redes', 'Follow us')}>Seguinos en redes</div>{socials('soc soc-mega')}</div>
      <div class="mega-n"><div class="mega-note" {t('mega.con.note', 'Respondemos las consultas en días hábiles.', 'We answer enquiries on business days.')}>Respondemos las consultas en días hábiles.</div><a href="/contacto" class="btn btn-g" {cot}>Solicitar cotización</a></div>
    </div>
  </div>'''
    lang = '<span class="lang-toggle" role="group" aria-label="Idioma / Language"><button type="button" class="lang-btn is-active" data-lang="es" lang="es">ES</button><span class="lang-sep" aria-hidden="true">|</span><button type="button" class="lang-btn" data-lang="en" lang="en">EN</button></span>'
    mnav = ''.join(f'<a href="{h}" class="mnav-l" {t(k, es, en)}>{es}</a>' for k, es, en, h in
                   [('nav.inicio', 'Inicio', 'Home', '/'), ('nav.empresa', 'Empresa', 'Company', '/empresa'), ('nav.servicios', 'Servicios', 'Services', '/servicios'), ('nav.contacto', 'Contacto', 'Contact', '/contacto')])
    return f'''<header class="hd" id="hd">
  <div class="hd-bar">
    <a href="/" class="hd-logo"><img src="/assets/v7/logo-icono.webp" alt="" width="881" height="321"><span class="hd-logo-t"><span class="hd-logo-n">ISMAEL S.A.</span><span class="hd-logo-s" {t('hd.tagline', 'Logística y transporte', 'Logistics and transport')}>Logística y transporte</span></span></a>
    <nav class="hd-nav" aria-label="Navegación principal">{nav}<div class="hd-cta"><a href="/contacto" {cot}>Solicitar cotización</a></div><div class="hd-lang">{lang}</div></nav>
    <button type="button" class="hd-burger" id="burger" aria-expanded="false" aria-controls="mnav"><span {t('nav.menu', 'MENÚ', 'MENU')}>MENÚ</span></button>
  </div>{mega}
</header>
<nav class="mnav" id="mnav" aria-label="Menú">
  {mnav}
  {wa_link('mnav.wa', 'Escribir por WhatsApp', 'Message us on WhatsApp', *WA_MSG, 'mnav-cta mnav-wa')}
  <a href="/contacto" class="mnav-cta mnav-cta2" {cot}>Solicitar cotización</a>
  <div class="mnav-lang"><span class="lang-toggle" role="group" aria-label="Idioma / Language"><button type="button" class="lang-btn is-active" data-lang="es" lang="es">ES</button><span class="lang-sep" aria-hidden="true">|</span><button type="button" class="lang-btn" data-lang="en" lang="en">EN</button></span></div>
  <div class="mnav-c">{TEL}<br>{MAIL}{socials('soc soc-m')}</div>
</nav>
<main id="main">
'''

def cierre():
    return f'''
<section class="cta" aria-labelledby="cta-h">
  <img src="/assets/v7/logo-icono.webp" alt="" class="cta-wm" width="881" height="321" loading="lazy" aria-hidden="true">
  <div class="cta-in">
    <h2 id="cta-h" {t('cta.h', 'Solicite una cotización', 'Request a quote')}>Solicite una cotización</h2>
    <div class="btns"><a href="/contacto" class="btn btn-g" {t('cta.cotizar', 'Solicitar cotización', 'Request a quote')}>Solicitar cotización</a><a href="{TELH}" class="btn btn-o">{TEL}</a></div>
  </div>
</section>'''

def footer():
    svc = ''.join(f'<a href="{s["url"]}" {t("svc."+s["n"]+".t", *s["t"])}>{s["t"][0]}</a>' for s in SERVICES)
    emp = ''.join(f'<a href="/empresa#{a}" {t("emp.tab."+a, es, en)}>{es}</a>' for a, es, en in EMP_TABS)
    return f'''
</main>
<footer class="ft">
  <div class="wrap">
    <div class="ft-g">
      <div><img src="/assets/v7/logo-completo.webp" alt="ISMAEL S.A." class="ft-logo" width="986" height="547" loading="lazy"><p {t('ft.desc', 'Transporte y logística para minería y grandes obras en San Juan, Argentina.', 'Transport and logistics for mining and large projects in San Juan, Argentina.')}>Transporte y logística para minería y grandes obras en San Juan, Argentina.</p></div>
      <div><div class="ft-t" {t('nav.servicios', 'Servicios', 'Services')}>Servicios</div><div class="ft-l">{svc}</div></div>
      <div><div class="ft-t" {t('nav.empresa', 'Empresa', 'Company')}>Empresa</div><div class="ft-l">{emp}</div></div>
      <div><div class="ft-t" {t('ft.contacto', 'Contacto general', 'General contact')}>Contacto general</div><div class="ft-l ft-c">{wa_link('ft.wa', 'WhatsApp', 'WhatsApp', *WA_MSG, 'ft-wa')}<a href="{TELH}">{TEL}</a><a href="mailto:{MAIL}">{MAIL}</a><a href="{MAPS}" class="dim" target="_blank" rel="noopener noreferrer" {t('ft.rawson', 'Base Rawson · Gral. Mariano Acha Sur 2356', 'Rawson base · Gral. Mariano Acha Sur 2356')}>Base Rawson · Gral. Mariano Acha Sur 2356</a><span class="dim" {t('ft.horario', 'Lun a vie 9 a 17 h', 'Mon to Fri, 9 am to 5 pm')}>Lun a vie 9 a 17 h</span><span class="dim" {t('ft.calingasta', 'Base Calingasta · San Juan', 'Calingasta base · San Juan')}>Base Calingasta · San Juan</span></div></div>
    </div>
    <div class="ft-soc"><span class="ft-t" {t('ft.redes', 'Seguinos en redes', 'Follow us')}>Seguinos en redes</span>{socials()}</div>
    <div class="ft-b"><span>© 2026 ISMAEL S.A. · San Juan, Argentina</span><span>ismaelsa.com</span></div>
  </div>
</footer>
{wa_link('wa.float', 'WhatsApp', 'WhatsApp', *WA_MSG, 'wa-float', label_html=f'<span class="sr" {t("wa.float.l", "Escribir por WhatsApp", "Message us on WhatsApp")}>Escribir por WhatsApp</span>')}
<div class="mbar" aria-label="Acciones rápidas">{wa_link('mbar.wa', 'WhatsApp', 'WhatsApp', *WA_MSG, 'mbar-wa')}<a href="{TELH}" {t('mbar.llamar', 'Llamar', 'Call')}>Llamar</a><a href="/contacto" {t('mbar.cotizar', 'Cotizar', 'Get a quote')}>Cotizar</a></div>
<script src="/assets/main.js" defer></script>
</body>
</html>
'''

def eye(key, es, en, cls=''):
    return f'<div class="eye {cls}" {t(key, es, en)}>{es}</div>'

# ──────────────────────────────────────────────────────────────────────
# INICIO
# ──────────────────────────────────────────────────────────────────────
def page_index():
    ld = {"@context": "https://schema.org", "@graph": [ORG, WEBSITE,
          {"@type": "LocalBusiness", "@id": f"{SITE}/#localbusiness", "name": "ISMAEL S.A.", "parentOrganization": {"@id": f"{SITE}/#organization"},
           "description": "Transporte de cargas y agua, hidrogrúas y traslado de personal para proyectos mineros y grandes obras en San Juan. Flota y personal propios.",
           "telephone": "+542644131515", "email": MAIL, "url": f"{SITE}/", "image": f"{SITE}/assets/v7/hero-convoy.webp",
           "address": ORG["address"], "openingHours": "Mo-Fr 09:00-17:00",
           "areaServed": [{"@type": "State", "name": "San Juan, Argentina"}],
           "hasOfferCatalog": {"@type": "OfferCatalog", "name": "Servicios ISMAEL S.A.",
                               "itemListElement": [{"@type": "Offer", "itemOffered": {"@type": "Service", "name": s['t'][0], "url": f"{SITE}{s['url']}"}} for s in SERVICES]}}]}
    h = head('home', 'ISMAEL S.A. | Logística para la minería de San Juan', 'ISMAEL S.A. | Logistics for San Juan mining',
             'Transporte de cargas y agua, hidrogrúas y traslado de personal para proyectos mineros y grandes obras en San Juan. Flota y personal propios, bases en Rawson y Calingasta.',
             'Cargo and water transport, knuckle-boom cranes and personnel transport for mining projects and large works in San Juan. Own fleet and staff, bases in Rawson and Calingasta.',
             '/', ld, leaflet=True)
    slides = [('hero-convoy', 'op-14-50', 'Convoy de camiones de ISMAEL S.A. en ruta', 'ISMAEL S.A. truck convoy on the road'),
              ('hero-hidrogrua', 'op-55-55', 'Camión con hidrogrúa de ISMAEL S.A. en la cordillera', 'ISMAEL S.A. truck with knuckle-boom crane in the Andes'),
              ('hero-equipo', 'op-45-55', 'Camión de ISMAEL S.A. transportando un equipo en la montaña', 'ISMAEL S.A. truck carrying equipment in the mountains')]
    sl = ''.join(img(n, f'hero.slide{i+1}.alt', es, en, cls=f'hero-img {p}' + (' is-active' if i == 0 else ''), lazy=(i != 0), extra=' data-slide') for i, (n, p, es, en) in enumerate(slides))
    strip = ''.join(f'<a href="{s["url"]}"><span class="n">{s["n"]}</span><span class="t" {t("svc."+s["n"]+".tag", *s["tag"])}>{s["tag"][0]}</span></a>' for s in SERVICES)
    rows = ''.join(f'''<a href="{s["url"]}" class="svc-row"><div class="svc-row-t"><span class="n">{s["n"]}</span><span class="t" {t("svc."+s["n"]+".t", *s["t"])}>{s["t"][0]}</span><span class="d" {t("svc."+s["n"]+".short", *s["short"])}>{s["short"][0]}</span></div><span class="arr" aria-hidden="true">→</span><div class="svc-row-img">{img(s["img"], "svc."+s["n"]+".img.alt", s["t"][0], s["t"][1], cls=s["pos"], sizes="(max-width:759px) 40vw, (max-width:979px) 44vw, 56vw")}</div></a>''' for s in SERVICES)
    tray = ''.join(f'<div><span class="v">{v}</span><span class="k" {t("tray."+str(i)+".k", es, en)}>{es}</span></div>' for i, (v, es, en) in enumerate(TRAY))
    como = ''.join(f'<div><span class="n">0{i+1}</span><span class="t" {t("como."+str(i)+".t", tes, ten)}>{tes}</span><span class="d" {t("como."+str(i)+".d", des, den)}>{des}</span></div>' for i, (tes, ten, des, den) in enumerate(COMO))
    body = f'''
<section class="hero" aria-labelledby="hero-h">
  {sl}
  <div class="hero-sh" aria-hidden="true"></div>
  <div class="hero-in">
    <h1 id="hero-h" {t('hero.h1', 'Logística para la minería de San Juan', 'Logistics for San Juan mining')}>Logística para la minería de San Juan</h1>
    <p class="hero-p" {t('hero.p', 'Transporte de cargas y agua, hidrogrúas y traslado de personal para proyectos mineros y grandes obras en San Juan. Flota y personal propios.', 'Cargo and water transport, knuckle-boom cranes and personnel transport for mining projects and large works in San Juan. Own fleet and staff.')}>Transporte de cargas y agua, hidrogrúas y traslado de personal para proyectos mineros y grandes obras en San Juan. Flota y personal propios.</p>
    <div class="btns"><a href="/servicios" class="btn btn-g" {t('hero.b1', 'Conozca nuestros servicios', 'Explore our services')}>Conozca nuestros servicios</a><a href="/contacto" class="btn btn-o" {t('hero.b2', 'Contáctenos', 'Contact us')}>Contáctenos</a><div class="hero-soc">{wa_link('hero.wa', 'WhatsApp', 'WhatsApp', *WA_MSG, 'hs-wa s-wa', label_html=f'<span class="sr" {t("wa.float.l", "Escribir por WhatsApp", "Message us on WhatsApp")}>Escribir por WhatsApp</span>')}{socials('soc soc-hero')}</div></div>
  </div>
  <div class="hero-strip"><div class="hero-strip-in">{strip}</div></div>
</section>

<section class="sec" aria-labelledby="about-h">
  <div class="wrap about">
    <div>
      <img src="/assets/v7/logo-icono-verde.webp" alt="" class="about-logo" width="881" height="321" loading="lazy">
      {eye('about.eye', 'Quiénes somos', 'About us')}
      <h2 id="about-h" class="h2 bal" {t('about.h2', 'Una empresa sanjuanina al servicio de la minería', 'A San Juan company at the service of mining')}>Una empresa sanjuanina al servicio de la minería</h2>
      <p {t('about.p1', 'Prestamos servicios de transporte y logística para operadoras mineras y contratistas en la provincia de San Juan, desde dos bases propias: Rawson, en el Gran San Juan, y Calingasta, en la zona cordillerana.', 'We provide transport and logistics services to mining operators and contractors in the province of San Juan, from two bases of our own: Rawson, in Greater San Juan, and Calingasta, in the Andean zone.')}>Prestamos servicios de transporte y logística para operadoras mineras y contratistas en la provincia de San Juan, desde dos bases propias: Rawson, en el Gran San Juan, y Calingasta, en la zona cordillerana.</p>
      <p class="last" {t('about.p2', 'La flota, el taller y el personal son propios.', 'The fleet, the workshop and the staff are our own.')}>La flota, el taller y el personal son propios.</p>
      <a href="/empresa" class="lnk" {t('about.lnk', 'Conocer la empresa', 'Learn about the company')}>Conocer la empresa</a>
    </div>
    <div>{img('team-pe', 'about.img.alt', 'Personal de ISMAEL S.A.', 'ISMAEL S.A. staff', cls='about-img')}</div>
  </div>
</section>

<section class="tray-sec" aria-label="Trayectoria">
  <div class="wrap">
    <div class="tray">{tray}</div>
    <a href="/empresa#trayectoria" class="lnk" {t('tray.lnk', 'Nuestra trayectoria', 'Our track record')}>Nuestra trayectoria</a>
  </div>
</section>

<section class="sec sec-gray" aria-labelledby="svc-h">
  <div class="wrap">
    <div class="svc-head"><div>{eye('svc.eye', 'Servicios', 'Services')}<h2 id="svc-h" class="h2" {t('svc.h2', 'Nuestros servicios', 'Our services')}>Nuestros servicios</h2></div><a href="/servicios" class="lnk" {t('svc.all', 'Ver todos los servicios', 'See all services')}>Ver todos los servicios</a></div>
    <div class="svc-list">{rows}</div>
  </div>
</section>

<section class="sec-green" aria-labelledby="pres-h">
  <div class="pres">
    <div class="pres-t">
      {eye('pres.eye', 'Dónde estamos', 'Where we are', 'eye-l')}
      <h2 id="pres-h" {t('pres.h2', 'Presencia en la provincia de San Juan', 'Presence across the province of San Juan')}>Presencia en la provincia de San Juan</h2>
      <p {t('pres.p', 'Operamos desde dos bases propias y trabajamos en los departamentos cordilleranos, como Calingasta e Iglesia.', 'We operate from two bases of our own and work in the Andean departments, such as Calingasta and Iglesia.')}>Operamos desde dos bases propias y trabajamos en los departamentos cordilleranos, como Calingasta e Iglesia.</p>
      <div class="pres-b">
        <div><div class="k" {t('base.1.k', 'Base 01 · Administración', 'Base 01 · Administration')}>Base 01 · Administración</div><div class="t">Rawson</div><div class="a">Gral. Mariano Acha Sur 2356, Rawson, San Juan</div><div class="h" {t('base.1.h', 'Lunes a viernes de 9 a 17 h', 'Monday to Friday, 9 am to 5 pm')}>Lunes a viernes de 9 a 17 h</div><a href="{MAPS}" target="_blank" rel="noopener noreferrer" class="lnk lnk-l" {t('base.maps', 'Cómo llegar ↗', 'Get directions ↗')}>Cómo llegar ↗</a></div>
        <div><div class="k" {t('base.2.k', 'Base 02 · Operaciones', 'Base 02 · Operations')}>Base 02 · Operaciones</div><div class="t">Calingasta</div><div class="a" {t('base.2.a', 'Zona cordillerana, San Juan', 'Andean zone, San Juan')}>Zona cordillerana, San Juan</div><div class="h" {t('base.2.h', 'Base operativa, sin atención al público', 'Operating base, not open to the public')}>Base operativa, sin atención al público</div></div>
      </div>
    </div>
    <div class="map" id="map" role="region" {ta('aria-label', 'map.label', 'Mapa de las bases de ISMAEL S.A. en San Juan', 'Map of ISMAEL S.A. bases in San Juan')}></div>
  </div>
</section>

<section class="sec como-sec" aria-labelledby="como-h">
  <div class="wrap">
    {eye('como.eye', 'Cómo trabajamos', 'How we work')}
    <h2 id="como-h" class="h2" {t('como.h2', 'Seguridad en cada operación', 'Safety in every operation')}>Seguridad en cada operación</h2>
    <div class="como">{como}</div>
  </div>
</section>

<section class="sec-2 sec-green" aria-labelledby="jobs-h">
  <div class="wrap jobs">
    <div>
      {eye('jobs.eye', 'Súmese al equipo', 'Join the team', 'eye-l')}
      <h2 id="jobs-h" {t('jobs.h2', 'Oportunidades para crecer en la logística minera', 'Opportunities to grow in mining logistics')}>Oportunidades para crecer en la logística minera</h2>
      <p {th('jobs.p', f'Envíe su CV a <a href="mailto:{RRHH}">{RRHH}</a>. En el asunto, escriba el puesto o la actividad que realiza y la localidad donde reside.', f'Send your CV to <a href="mailto:{RRHH}">{RRHH}</a>. In the subject line, state the position or the work you do and the town where you live.')}>Envíe su CV a <a href="mailto:{RRHH}">{RRHH}</a>. En el asunto, escriba el puesto o la actividad que realiza y la localidad donde reside.</p>
      <div class="btns"><a href="mailto:{RRHH}?subject=CV%20-%20%5BPuesto%5D%20-%20%5BLocalidad%5D" class="btn btn-g" {t('jobs.b1', 'Enviar CV ✉', 'Send CV ✉')}>Enviar CV ✉</a><a href="/contacto" class="btn btn-o" {t('jobs.b2', 'Contactar ahora', 'Contact us now')}>Contactar ahora</a></div>
    </div>
    <div class="jobs-s">
      <div class="k" {t('jobs.k', 'Cómo postularse', 'How to apply')}>Cómo postularse</div>
      <div class="d" {t('jobs.d1', 'Recibimos currículums de forma permanente. Los guardamos y nos comunicamos cuando surge una búsqueda que coincide con su perfil.', 'We receive CVs on an ongoing basis. We keep them on file and get in touch when a vacancy matches your profile.')}>Recibimos currículums de forma permanente. Los guardamos y nos comunicamos cuando surge una búsqueda que coincide con su perfil.</div>
      <div class="d" {t('jobs.d2', 'Adjunte el CV en PDF. Si tiene licencias de conducir profesionales o habilitaciones de operación vigentes, indíquelas en el cuerpo del correo.', 'Attach your CV as a PDF. If you hold professional driving licences or current operating certifications, mention them in the body of the email.')}>Adjunte el CV en PDF. Si tiene licencias de conducir profesionales o habilitaciones de operación vigentes, indíquelas en el cuerpo del correo.</div>
    </div>
  </div>
</section>
{cierre()}'''
    return h + header('home') + body + footer()

# ──────────────────────────────────────────────────────────────────────
# EMPRESA
# ──────────────────────────────────────────────────────────────────────
def page_empresa():
    path = '/empresa'
    ld = ld_page(path, 'Empresa — ISMAEL S.A.', 'Quiénes somos, misión y visión, trayectoria, bases operativas, flota, nuestra gente y seguridad.',
                 [{"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Inicio", "item": f"{SITE}/"}, {"@type": "ListItem", "position": 2, "name": "Empresa", "item": f"{SITE}{path}"}]}])
    h = head('empresa', 'Empresa — ISMAEL S.A. | Transporte y logística en San Juan', 'Company — ISMAEL S.A. | Transport and logistics in San Juan',
             'Quiénes somos, misión y visión, trayectoria, bases operativas en Rawson y Calingasta, flota propia, nuestra gente y seguridad. ISMAEL S.A., San Juan.',
             'About us, mission and vision, track record, operating bases in Rawson and Calingasta, our own fleet, our people and safety. ISMAEL S.A., San Juan.',
             path, ld, image='team', leaflet=True)
    sub = ''.join(f'<a href="#{a}" data-tab="{a}" {t("emp.tab."+a, es, en)}>{es}</a>' for a, es, en in EMP_TABS)
    facts = ''.join(f'<div><div class="v" {t("facts."+str(i)+".v", ves, ven)}>{ves}</div><div class="k" {t("facts."+str(i)+".k", kes, ken)}>{kes}</div></div>' for i, (ves, ven, kes, ken) in enumerate(FACTS))
    tray = ''.join(f'<div><span class="v">{v}</span><span class="k" {t("tray."+str(i)+".k", es, en)}>{es}</span></div>' for i, (v, es, en) in enumerate(TRAY))
    fleet = ''.join(f'<figure>{img(n, "fleet."+str(i)+".alt", es, en, cls=p)}<figcaption {t("fleet."+str(i)+".t", es, en)}>{es}</figcaption></figure>' for i, (n, p, es, en) in enumerate(FLEET))
    roles = ''.join(f'<div><span class="n">0{i+1}</span><span {t("roles."+str(i), es, en)}>{es}</span></div>' for i, (es, en) in enumerate(ROLES))
    como = ''.join(f'<div><span class="t" {t("como."+str(i)+".t", tes, ten)}>{tes}</span><span class="d" {t("como."+str(i)+".d", des, den)}>{des}</span></div>' for i, (tes, ten, des, den) in enumerate(COMO))
    body = f'''
<section class="phero" aria-labelledby="emp-h">
  {img('team', 'emp.hero.alt', 'Flota de ISMAEL S.A. en base', 'ISMAEL S.A. fleet at the base', cls='op-50-55', lazy=False)}
  <div class="phero-sh" aria-hidden="true"></div>
  <div class="phero-in"><div class="crumb"><a href="/" {t('nav.inicio', 'Inicio', 'Home')}>Inicio</a> / <span {t('nav.empresa', 'Empresa', 'Company')}>Empresa</span></div><h1 id="emp-h" {t('nav.empresa', 'Empresa', 'Company')}>Empresa</h1></div>
</section>
<nav class="subnav" id="subnav" aria-label="Secciones de Empresa">{sub}</nav>

<section id="quienes" class="sec-2 emp-sec" aria-labelledby="q-h">
  <div class="wrap quienes">
    <div class="quienes-l"><h2 id="q-h" class="h2-md" {t('emp.tab.quienes', 'Quiénes somos', 'About us')}>Quiénes somos</h2><img src="/assets/v7/logo-completo-verde.webp" alt="ISMAEL S.A." class="quienes-logo" width="970" height="532" loading="lazy"></div>
    <div>
      <p class="lead" {t('q.p1', 'ISMAEL S.A. es una empresa sanjuanina de transporte y logística. Nació para resolver una necesidad concreta: mover cargas, agua y personas hasta los proyectos mineros de la cordillera, donde los caminos, la altura y el clima no permiten improvisar.', 'ISMAEL S.A. is a San Juan transport and logistics company. It was founded to meet a concrete need: moving cargo, water and people to the mining projects of the Andes, where the roads, the altitude and the weather leave no room for improvisation.')}>ISMAEL S.A. es una empresa sanjuanina de transporte y logística. Nació para resolver una necesidad concreta: mover cargas, agua y personas hasta los proyectos mineros de la cordillera, donde los caminos, la altura y el clima no permiten improvisar.</p>
      <p {t('q.p2', 'Con los años, ese trabajo nos dio algo que no se compra: conocimiento del terreno. Sabemos qué camino se corta con la primera nevada, cuánto tarda un relevo hasta un campamento y qué unidad conviene para cada carga. Ese criterio es lo que ofrecemos, además de los camiones.', 'Over the years that work gave us something money cannot buy: knowledge of the terrain. We know which road closes with the first snowfall, how long a crew change to a camp takes and which unit suits each load. That judgement is what we offer, along with the trucks.')}>Con los años, ese trabajo nos dio algo que no se compra: conocimiento del terreno. Sabemos qué camino se corta con la primera nevada, cuánto tarda un relevo hasta un campamento y qué unidad conviene para cada carga. Ese criterio es lo que ofrecemos, además de los camiones.</p>
      <p {t('q.p3', 'Trabajamos principalmente para operadoras mineras y para las contratistas que participan en sus proyectos, en campañas de exploración y en operaciones en marcha. Preferimos relaciones de largo plazo: los clientes que nos conocen vuelven a llamarnos cuando empieza la siguiente campaña.', 'We work mainly for mining operators and for the contractors involved in their projects, during exploration campaigns and in ongoing operations. We prefer long-term relationships: clients who know us call us again when the next campaign begins.')}>Trabajamos principalmente para operadoras mineras y para las contratistas que participan en sus proyectos, en campañas de exploración y en operaciones en marcha. Preferimos relaciones de largo plazo: los clientes que nos conocen vuelven a llamarnos cuando empieza la siguiente campaña.</p>
      <p class="last" {t('q.p4', 'La misma capacidad sirve fuera de la minería. Prestamos servicios a grandes obras, empresas constructoras, proyectos energéticos y a cualquier cliente que necesite mover cargas, agua o personal en zonas de difícil acceso.', 'The same capability serves beyond mining. We provide services to large projects, construction companies, energy projects and any client that needs to move cargo, water or personnel in hard-to-reach areas.')}>La misma capacidad sirve fuera de la minería. Prestamos servicios a grandes obras, empresas constructoras, proyectos energéticos y a cualquier cliente que necesite mover cargas, agua o personal en zonas de difícil acceso.</p>
      <div class="facts">{facts}</div>
    </div>
  </div>
</section>

<section id="mision" class="sec-2 sec-green emp-sec mision" aria-labelledby="m-h">
  <div class="wrap">
    {eye('emp.tab.mision', 'Misión y visión', 'Mission and vision', 'eye-l')}
    <div class="mision-g">
      <div><h2 id="m-h" {t('m.h', 'Misión', 'Mission')}>Misión</h2><p {t('m.p', 'Resolver el transporte y la logística que necesitan los proyectos mineros de San Juan, las grandes obras y sus contratistas, con flota y personal propios y con la seguridad como condición de cada operación.', 'To provide the transport and logistics that San Juan mining projects, large works and their contractors need, with our own fleet and staff and with safety as a condition of every operation.')}>Resolver el transporte y la logística que necesitan los proyectos mineros de San Juan, las grandes obras y sus contratistas, con flota y personal propios y con la seguridad como condición de cada operación.</p></div>
      <div><h2 {t('v.h', 'Visión', 'Vision')}>Visión</h2><p {t('v.p', 'Ser la empresa sanjuanina de referencia en logística para la minería de alta montaña, reconocida por cumplir lo que acuerda.', 'To be the leading San Juan company in logistics for high-mountain mining, known for delivering what it agrees to.')}>Ser la empresa sanjuanina de referencia en logística para la minería de alta montaña, reconocida por cumplir lo que acuerda.</p></div>
    </div>
  </div>
</section>

<section id="trayectoria" class="sec-2 emp-sec" aria-labelledby="t-h">
  <div class="wrap">
    <div class="tray-head"><h2 id="t-h" class="h2-md" {t('emp.tab.trayectoria', 'Trayectoria', 'Track record')}>Trayectoria</h2><p {t('t.p', 'Más de veinte años trabajando en la cordillera sanjuanina, en campañas de exploración y en operaciones en marcha, para operadoras y contratistas.', 'More than twenty years working in the San Juan Andes, on exploration campaigns and in ongoing operations, for operators and contractors.')}>Más de veinte años trabajando en la cordillera sanjuanina, en campañas de exploración y en operaciones en marcha, para operadoras y contratistas.</p></div>
    <div class="tray">{tray}</div>
    <p class="tray-note" {t('t.note', 'La cantidad de unidades varía según la temporada.', 'The number of units varies with the season.')}>La cantidad de unidades varía según la temporada.</p>
  </div>
</section>

<section id="bases" class="sec-2 sec-gray emp-sec bases" aria-labelledby="b-h">
  <div class="wrap">
    <h2 id="b-h" class="h2-md" {t('emp.tab.bases', 'Bases operativas', 'Operating bases')}>Bases operativas</h2>
    <div class="bases-g">
      <div class="map" id="map" role="region" {ta('aria-label', 'map.label', 'Mapa de las bases de ISMAEL S.A. en San Juan', 'Map of ISMAEL S.A. bases in San Juan')}></div>
      <div class="bases-c">
        <article class="base"><div class="k" {t('base.1.k', 'Base 01 · Administración', 'Base 01 · Administration')}>Base 01 · Administración</div><h3>Rawson</h3><p {t('base.1.d', 'Gran San Juan. Administración, taller y abastecimiento de la flota. Gral. Mariano Acha Sur 2356, Rawson. Atención de lunes a viernes de 9 a 17 h.', 'Greater San Juan. Administration, workshop and fleet supply. Gral. Mariano Acha Sur 2356, Rawson. Open Monday to Friday, 9 am to 5 pm.')}>Gran San Juan. Administración, taller y abastecimiento de la flota. Gral. Mariano Acha Sur 2356, Rawson. Atención de lunes a viernes de 9 a 17 h.</p><a href="{MAPS}" target="_blank" rel="noopener noreferrer" class="lnk" {t('base.maps', 'Cómo llegar ↗', 'Get directions ↗')}>Cómo llegar ↗</a></article>
        <article class="base"><div class="k" {t('base.2.k', 'Base 02 · Operaciones', 'Base 02 · Operations')}>Base 02 · Operaciones</div><h3>Calingasta</h3><p {t('base.2.d', 'Zona cordillerana. Base de avanzada, más cerca de los proyectos de montaña.', 'Andean zone. Forward base, closer to the mountain projects.')}>Zona cordillerana. Base de avanzada, más cerca de los proyectos de montaña.</p></article>
      </div>
    </div>
  </div>
</section>

<section id="flota" class="sec-2 emp-sec" aria-labelledby="f-h">
  <div class="wrap">
    <div class="flota-head"><h2 id="f-h" class="h2-md" {t('f.h', 'Flota propia', 'Our own fleet')}>Flota propia</h2><p {t('f.p', 'Mantenimiento preventivo en taller propio. No transportamos combustibles ni cargas peligrosas.', 'Preventive maintenance in our own workshop. We do not transport fuel or hazardous cargo.')}>Mantenimiento preventivo en taller propio. No transportamos combustibles ni cargas peligrosas.</p></div>
    <div class="fleet">{fleet}</div>
  </div>
</section>

<section id="personas" class="sec-2 sec-green emp-sec" aria-labelledby="g-h">
  <div class="wrap gente">
    <div><h2 id="g-h" class="h2-md h2-w" {t('emp.tab.personas', 'Nuestra gente', 'Our people')}>Nuestra gente</h2><p {t('g.p', 'El personal es propio y forma parte de la estructura de la empresa.', 'Our staff are our own employees and part of the company structure.')}>El personal es propio y forma parte de la estructura de la empresa.</p></div>
    <div class="roles">{roles}</div>
  </div>
</section>

<section id="seguridad" class="sec-2 emp-sec seg" aria-labelledby="s-h">
  <div class="wrap">
    <h2 id="s-h" class="h2-md" {t('emp.tab.seguridad', 'Seguridad', 'Safety')}>Seguridad</h2>
    <div class="como">{como}</div>
    <p class="seg-note" {t('s.note', 'Operadores de hidrogrúa, señaleros y eslingadores acreditados ante organismos reconocidos por la OAA.', 'Knuckle-boom crane operators, signallers and riggers certified by bodies recognised by the OAA (Argentine Accreditation Body).')}>Operadores de hidrogrúa, señaleros y eslingadores acreditados ante organismos reconocidos por la OAA.</p>
  </div>
</section>
{cierre()}'''
    return h + header('empresa') + body + footer()

# ──────────────────────────────────────────────────────────────────────
# SERVICIOS (índice) y detalle
# ──────────────────────────────────────────────────────────────────────
def page_servicios():
    path = '/servicios'
    ld = ld_page(path, 'Servicios — ISMAEL S.A.', 'Siete servicios de transporte y logística para minería y grandes obras en San Juan.',
                 [{"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Inicio", "item": f"{SITE}/"}, {"@type": "ListItem", "position": 2, "name": "Servicios", "item": f"{SITE}{path}"}]},
                  {"@type": "ItemList", "itemListElement": [{"@type": "ListItem", "position": i+1, "name": s['t'][0], "url": f"{SITE}{s['url']}"} for i, s in enumerate(SERVICES)]}])
    h = head('servicios', 'Servicios — ISMAEL S.A. | Transporte y logística minera en San Juan', 'Services — ISMAEL S.A. | Mining transport and logistics in San Juan',
             'Logística para exploración y explotación, transporte de agua, abastecimiento en zonas remotas, traslado de personal, transporte de equipos, soporte en terreno e hidrogrúas.',
             'Exploration and operations logistics, water transport, remote-area supply, personnel transport, equipment transport, on-site support and knuckle-boom cranes.',
             path, ld, image='svc-exploracion')
    rows = ''.join(f'<a href="{s["url"]}"><span class="n">{s["n"]}</span><span class="t" {t("svc."+s["n"]+".t", *s["t"])}>{s["t"][0]}</span><span class="d" {t("svc."+s["n"]+".short", *s["short"])}>{s["short"][0]}</span><span class="arr" aria-hidden="true">→</span></a>' for s in SERVICES)
    body = f'''
<section class="phead phead-svc" aria-labelledby="sv-h">
  <div class="wrap"><div class="crumb"><a href="/" {t('nav.inicio', 'Inicio', 'Home')}>Inicio</a> / <span {t('nav.servicios', 'Servicios', 'Services')}>Servicios</span></div><h1 id="sv-h" {t('nav.servicios', 'Servicios', 'Services')}>Servicios</h1><div class="idx">{rows}</div></div>
</section>
{cierre()}'''
    return h + header('servicios') + body + footer()

def svc_wa(s):
    key = 'svc.' + s['n'] + '.wa'
    es_href = wa('Hola, quiero consultar por: ' + s['t'][0] + '.')
    T[key + '.href'] = (es_href, wa('Hello, I would like to ask about: ' + s['t'][1] + '.'))
    return f'<a href="{es_href}" data-i18n-href="{key}.href" class="btn btn-wa" {EXT}>{icon("whatsapp")}<span {t("det.wa", "Consultar por WhatsApp", "Ask on WhatsApp")}>Consultar por WhatsApp</span></a>'

def page_service(s):
    path = s['url']
    ld = ld_page(path, s['title'][0], s['desc'][0],
                 [{"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Inicio", "item": f"{SITE}/"}, {"@type": "ListItem", "position": 2, "name": "Servicios", "item": f"{SITE}/servicios"}, {"@type": "ListItem", "position": 3, "name": s['t'][0], "item": f"{SITE}{path}"}]},
                  {"@type": "Service", "@id": f"{SITE}{path}#service", "name": s['t'][0], "description": s['short'][0], "provider": {"@id": f"{SITE}/#organization"}, "areaServed": {"@type": "State", "name": "San Juan, Argentina"}, "url": f"{SITE}{path}"}])
    h = head('svc'+s['n'], s['title'][0], s['title'][1], s['desc'][0], s['desc'][1], path, ld, image=s['img'])
    k = 'svc.' + s['n']
    paras = ''.join(f'<p {t(k+".p"+str(i+1), es, en)}>{es}</p>' for i, (es, en) in enumerate(s['paras']))
    gal = ''.join(f'<figure>{img(n, k+".gal"+str(i+1)+".alt", es, en, cls=p)}</figure>' for i, (n, p, es, en) in enumerate(s['gal']))
    others = ''.join(f'<a href="{o["url"]}"><span {t("svc."+o["n"]+".t", *o["t"])}>{o["t"][0]}</span><span aria-hidden="true">→</span></a>' for o in SERVICES if o is not s)
    body = f'''
<section class="phero phero-svc" aria-labelledby="d-h">
  {img(s['img'], k+'.img.alt', s['t'][0], s['t'][1], cls=s['pos'], lazy=False)}
  <div class="phero-sh" aria-hidden="true"></div>
  <div class="phero-in"><div class="crumb"><a href="/servicios" {t('nav.servicios', 'Servicios', 'Services')}>Servicios</a> / {s['n']}</div><h1 id="d-h" {t(k+'.t', *s['t'])}>{s['t'][0]}</h1></div>
</section>
<section class="sec-3">
  <div class="wrap det">
    <div>
      <p class="lead" {t(k+'.short', *s['short'])}>{s['short'][0]}</p>
      {paras}
      <div class="gal">{gal}</div>
      <div class="quote"><div class="k" {t('det.quote.k', 'Para cotizar', 'For a quote')}>Para cotizar</div><div class="d" {t(k+'.quote', *s['quote'])}>{s['quote'][0]}</div></div>
      <div class="btns det-btns"><a href="/contacto?servicio={s['i']}" class="btn btn-d" {t('cta.cotizar', 'Solicitar cotización', 'Request a quote')}>Solicitar cotización</a>{svc_wa(s)}</div>
    </div>
    <aside class="others"><div class="k" {t('det.others', 'Otros servicios', 'Other services')}>Otros servicios</div>{others}</aside>
  </div>
</section>
{cierre()}'''
    return h + header('servicios') + body + footer()

# ──────────────────────────────────────────────────────────────────────
# CONTACTO, GRACIAS, 404
# ──────────────────────────────────────────────────────────────────────
def page_contacto():
    path = '/contacto'
    ld = ld_page(path, 'Contacto — ISMAEL S.A.', 'Teléfono, correo, bases y formulario de cotización de ISMAEL S.A.',
                 [{"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Inicio", "item": f"{SITE}/"}, {"@type": "ListItem", "position": 2, "name": "Contacto", "item": f"{SITE}{path}"}]}])
    h = head('contacto', 'Contacto — ISMAEL S.A. | San Juan', 'Contact — ISMAEL S.A. | San Juan',
             'Solicite una cotización a ISMAEL S.A.: teléfono +54 264 413-1515, contacto@ismaelsa.info, Base Rawson en Gral. Mariano Acha Sur 2356 (lun a vie 9 a 17 h) y Base Calingasta.',
             'Request a quote from ISMAEL S.A.: phone +54 264 413-1515, contacto@ismaelsa.info, Rawson base at Gral. Mariano Acha Sur 2356 (Mon to Fri 9 am to 5 pm) and Calingasta base.',
             path, ld, image='base-rawson')
    opts = f'<option value="" {t("form.svc.ph", "Seleccione un servicio", "Select a service")}>Seleccione un servicio</option>' + ''.join(f'<option value="{s["i"]}" {t("svc."+s["n"]+".t", *s["t"])}>{s["t"][0]}</option>' for s in SERVICES) + f'<option value="otro" {t("form.svc.otro", "Otra consulta", "Other enquiry")}>Otra consulta</option>'
    body = f'''
<section class="phead" aria-labelledby="c-h">
  <div class="wrap"><div class="crumb"><a href="/" {t('nav.inicio', 'Inicio', 'Home')}>Inicio</a> / <span {t('nav.contacto', 'Contacto', 'Contact')}>Contacto</span></div><h1 id="c-h" {t('nav.contacto', 'Contacto', 'Contact')}>Contacto</h1></div>
</section>
<section class="sec-3">
  <div class="wrap cont">
    <div class="crows">
      <div><div class="k">WhatsApp</div>{wa_link('c.wa', '+54 264 413-1515', '+54 264 413-1515', *WA_MSG, 'c-wa')}</div>
      <div><div class="k" {t('c.tel', 'Teléfono', 'Phone')}>Teléfono</div><a href="{TELH}">{TEL}</a></div>
      <div><div class="k" {t('c.mail', 'Correo', 'Email')}>Correo</div><a href="mailto:{MAIL}">{MAIL}</a></div>
      <div><div class="k" {t('c.rawson', 'Base Rawson · Lun a vie 9 a 17 h', 'Rawson base · Mon to Fri, 9 am to 5 pm')}>Base Rawson · Lun a vie 9 a 17 h</div><a href="{MAPS}" target="_blank" rel="noopener noreferrer">Gral. Mariano Acha Sur 2356, Rawson</a></div>
      <div><div class="k" {t('c.calingasta', 'Base Calingasta', 'Calingasta base')}>Base Calingasta</div><span class="v">Calingasta, San Juan</span></div>
      <div><div class="k" {t('ft.redes', 'Seguinos en redes', 'Follow us')}>Seguinos en redes</div>{socials('soc soc-d')}</div>
    </div>
    <div class="cbox">
      <form class="form" id="contactForm" action="https://formsubmit.co/{MAIL}" method="POST" novalidate>
        <div class="form-t" {t('cta.cotizar', 'Solicitar cotización', 'Request a quote')}>Solicitar cotización</div>
        <input type="hidden" name="_subject" value="Solicitud de cotización — Web ISMAEL S.A.">
        <input type="hidden" name="_template" value="table">
        <input type="hidden" name="_captcha" value="false">
        <input type="hidden" name="_next" value="{SITE}/gracias">
        <input type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true" class="hp">
        <div class="form-g">
          <label><span {t('form.nombre', 'Nombre', 'Name')}>Nombre</span><input type="text" name="nombre" required maxlength="120" autocomplete="name"></label>
          <label><span {t('form.empresa', 'Empresa', 'Company')}>Empresa</span><input type="text" name="empresa" maxlength="120" autocomplete="organization"></label>
          <label><span {t('form.email', 'Correo electrónico', 'Email address')}>Correo electrónico</span><input type="email" name="email" required maxlength="160" autocomplete="email"></label>
          <label><span {t('form.tel', 'Teléfono', 'Phone')}>Teléfono</span><input type="tel" name="telefono" maxlength="40" autocomplete="tel"></label>
        </div>
        <label><span {t('form.svc', 'Servicio', 'Service')}>Servicio</span><select name="servicio" id="servicio">{opts}</select></label>
        <label><span {t('form.desc', 'Descripción', 'Description')}>Descripción</span><textarea name="mensaje" rows="5" maxlength="3000" {ta('placeholder', 'form.desc.ph', 'Zona, fechas aproximadas y qué hay que mover, abastecer o izar.', 'Area, approximate dates and what needs to be moved, supplied or lifted.')}></textarea></label>
        <div class="form-status" id="formStatus" role="status" aria-live="polite"></div>
        <button type="submit" class="btn btn-d" id="submitBtn" {t('form.submit', 'Enviar consulta', 'Send enquiry')}>Enviar consulta</button>
      </form>
    </div>
  </div>
</section>'''
    return h + header('contacto') + body + footer()

def page_gracias():
    h = head('gracias', 'Consulta recibida — ISMAEL S.A.', 'Enquiry received — ISMAEL S.A.', 'Recibimos su consulta. Le respondemos en días hábiles.', 'We received your enquiry. We will reply on business days.', '/gracias', ld_page('/gracias', 'Consulta recibida', 'Recibimos su consulta.'), noindex=True)
    body = f'''
<section class="util-page"><div class="wrap"><h1 {t('gr.h', 'Consulta recibida', 'Enquiry received')}>Consulta recibida</h1><p {t('gr.p', 'Le respondemos en días hábiles.', 'We will reply on business days.')}>Le respondemos en días hábiles.</p><a href="/" class="lnk" {t('util.home', 'Volver al inicio →', 'Back to home →')}>Volver al inicio →</a></div></section>'''
    return h + header('contacto') + body + footer()

def page_404():
    h = head('e404', 'Página no encontrada — ISMAEL S.A.', 'Page not found — ISMAEL S.A.', 'La página que busca no existe o fue movida.', 'The page you are looking for does not exist or has been moved.', '/404.html', ld_page('/404.html', 'Página no encontrada', 'La página no existe.'), noindex=True)
    body = f'''
<section class="util-page"><div class="wrap"><h1 {t('e404.h', 'Página no encontrada', 'Page not found')}>Página no encontrada</h1><p {t('e404.p', 'La página que busca no existe o fue movida.', 'The page you are looking for does not exist or has been moved.')}>La página que busca no existe o fue movida.</p><div class="btns"><a href="/" class="btn btn-d" {t('util.home2', 'Volver al inicio', 'Back to home')}>Volver al inicio</a><a href="/servicios" class="btn btn-d" {t('svc.all', 'Ver todos los servicios', 'See all services')}>Ver todos los servicios</a></div></div></section>'''
    return h + header('home') + body + footer()

# ──────────────────────────────────────────────────────────────────────
# main.js (lógica + diccionario)
# ──────────────────────────────────────────────────────────────────────
def write_main_js():
    es = {k: v[0] for k, v in T.items()}
    en = {k: v[1] for k, v in T.items()}
    # Mensajes que solo usa el JS
    for k, ves, ven in [('form.ratelimit', 'Ya envió varias consultas desde este dispositivo. Puede volver a intentar en {t}. Si es urgente, escríbanos a contacto@ismaelsa.info.', 'You have already sent several enquiries from this device. You can try again in {t}. If it is urgent, email us at contacto@ismaelsa.info.'),
                        ('form.sending', 'Enviando…', 'Sending…'), ('form.invalid', 'Complete el nombre y un correo electrónico válido.', 'Please enter your name and a valid email address.'),
                        ('rl.hours', '{n} h', '{n} h'), ('rl.lesshour', 'menos de una hora', 'less than an hour'),
                        ('nav.close', 'CERRAR', 'CLOSE'), ('map.bases', 'Bases ISMAEL S.A.', 'ISMAEL S.A. bases'), ('map.proy', 'Proyectos mineros de San Juan', 'San Juan mining projects'),
                        ('map.aprox', 'Ubicaciones aproximadas', 'Approximate locations'), ('map.rawson.d', 'Gral. Mariano Acha Sur 2356 · Cómo llegar ↗', 'Gral. Mariano Acha Sur 2356 · Directions ↗'),
                        ('map.calingasta.d', 'Zona cordillerana', 'Andean zone'), ('map.base.rawson', 'Base Rawson', 'Rawson base'), ('map.base.calingasta', 'Base Calingasta', 'Calingasta base')]:
        es[k] = ves; en[k] = ven
    tpl = (ROOT / 'tools/main.template.js').read_text(encoding='utf-8')
    out = tpl.replace('/*__I18N_ES__*/', json.dumps(es, ensure_ascii=False, indent=2)).replace('/*__I18N_EN__*/', json.dumps(en, ensure_ascii=False, indent=2))
    (ROOT / 'assets/main.js').write_text(out, encoding='utf-8')

def main():
    pages = {'index.html': page_index, 'empresa.html': page_empresa, 'servicios.html': page_servicios, 'contacto.html': page_contacto, 'gracias.html': page_gracias, '404.html': page_404}
    for s in SERVICES:
        pages[s['slug'] + '.html'] = (lambda s=s: page_service(s))
    for name, fn in pages.items():
        html = fn()
        assert 'style="' not in html, f'{name}: estilo inline'
        assert not re.search(r'\son[a-z]+="', html), f'{name}: handler inline'
        (ROOT / name).write_text(html, encoding='utf-8')
        print(f'{name:50} {len(html)//1024} KB')
    write_main_js()
    missing = [k for k, (a, b) in T.items() if not b]
    print(len(T), 'claves i18n;', 'sin EN:', missing or 'ninguna')

if __name__ == '__main__':
    main()
