# SEO_NOTES.md — Pendientes y decisiones de la optimización SEO

Este archivo documenta datos que **no se inventaron** durante la optimización SEO
(2026-07-08) y mejoras estructurales recomendadas a futuro. Ningún teléfono, dirección,
email o red social fue inventado — todo lo que no estaba confirmado en el sitio quedó
pendiente acá.

## 1. Datos faltantes para JSON-LD / Google Business Profile

Estos campos **no se agregaron** a los datos estructurados (`Organization` / `LocalBusiness`
en `index.html`) porque no están confirmados en el sitio. Cuando estén disponibles, hay
que agregarlos en el bloque `<script type="application/ld+json">` de `index.html`:

- **`sameAs`** (redes sociales / perfiles institucionales): no hay LinkedIn, Instagram,
  Facebook ni Google Business Profile vinculados desde el sitio. Agregar las URLs reales
  apenas existan — mejora mucho la confianza del Knowledge Graph y el SEO local.
- **`geo` (latitude/longitude)** de las bases de Rawson y Calingasta: no están publicadas.
  Sumar coordenadas reales mejora la aparición en Google Maps / búsquedas locales ("logística
  minera cerca de mí", packs de mapa).
- **`openingHours`**: no está publicado el horario de atención.
- **Dirección exacta (calle y número)** de ambas bases: hoy el JSON-LD solo tiene
  `addressLocality`/`addressRegion` (Rawson, San Juan). Si se decide publicar la dirección
  física exacta, agregar `streetAddress` y `postalCode` — esto es requisito fuerte para el
  ranking en el "local pack" de Google.
- **Email "oficial" único**: el sitio usa `contacto@ismaelsa.info` para consultas comerciales
  y `ismaelsarr.hh@gmail.com` para RRHH (ambos ya están en el sitio y se mantuvieron tal cual).
  Si hay un dominio corporativo distinto para RRHH a futuro, actualizar el segundo.

## 2. Teléfono — unificado

Antes de esta optimización el teléfono era inconsistente en el código: el JSON-LD tenía
`+54264413151` (dígito faltante) y el botón de contacto tenía `href="tel:+5426441315"`
(enlace roto, marcaba un número incompleto). Se unificó todo a **`+542644131515`**
(formato visible `+54 264 413-1515`) en las 5 ubicaciones: JSON-LD, botón de contacto,
footer y ambos enlaces de WhatsApp. La consistencia de Nombre-Dirección-Teléfono (NAP) es
un factor de ranking local — mantener este número igual en Google Business Profile y
cualquier directorio donde se registre la empresa.

## 3. Bilingüe ES/EN — recomendación estructural futura

El sitio es bilingüe, pero el inglés se resuelve **client-side**: un botón (`data-lang`)
dispara `applyI18n('en')` en `assets/main.js`, que reemplaza el texto en el DOM sin cambiar
la URL. **Google solo puede indexar el contenido en español** de esta forma — el contenido
en inglés nunca es rastreable ni indexable como página independiente.

Por instrucción explícita, **no se restructuró el sitio en esta pasada** (no se crearon
rutas `/en/`). Queda documentado como mejora futura recomendada:

- Crear `https://ismaelsa.com/en/` (o subdominio `en.ismaelsa.com`) con el contenido en
  inglés ya traducido en `I18N.en` de `assets/main.js` (la traducción ya existe, solo
  falta publicarla como página real).
- Agregar `<link rel="alternate" hreflang="es-AR" href="https://ismaelsa.com/">` y
  `<link rel="alternate" hreflang="en" href="https://ismaelsa.com/en/">` (+ `x-default`)
  en ambas versiones.
- Incluir ambas URLs en `sitemap.xml`.
- Esto amplía el alcance a búsquedas en inglés de operadoras mineras internacionales
  (uno de los públicos que ya menciona el propio contenido del sitio).

## 4. Imagen usada como `og:image` / `twitter:image`

Se usó `assets/sunset-convoy.jpg` (1280×720, relación 16:9) como imagen de vista previa
para compartir en WhatsApp/LinkedIn/Twitter, porque es la imagen existente con la
proporción más cercana al estándar recomendado (1200×630, ~1.91:1) sin necesidad de
recortar o generar una imagen nueva. Antes apuntaba a una foto de WhatsApp con ruta
relativa (`assets/WhatsApp Image...jpeg`), lo cual **rompía el preview** en redes sociales
porque Open Graph requiere URLs absolutas.

**Recomendación futura:** encargar una imagen dedicada de 1200×630 (foto de flota o
cordillera con el logo aplicado) optimizada específicamente para compartir en redes —
da más control sobre el mensaje visual que reusar una foto de contenido.

## 5. Performance — imágenes pesadas (no se tocaron los binarios)

Varias imágenes activas en el sitio pesan 2–3&nbsp;MB cada una, lo que afecta directamente
el LCP (Largest Contentful Paint) y el puntaje de Core Web Vitals:

- `assets/1.png`, `2.png`, `3.png`, `4.png` (slides del hero, ~2.4–3&nbsp;MB c/u — la
  primera se carga siempre, sin lazy loading posible porque es contenido above-the-fold)
- `assets/logo.png`, `assets/logosolo.png` (~2–2.1&nbsp;MB, usadas en nav/hero/footer)
- `assets/grua nueva.png`, `assets/higiene nueva.png`, `assets/nieve nueva.png` (~2.5–3&nbsp;MB c/u)

**No se comprimieron ni convirtieron** en esta pasada porque el entorno de trabajo no
tiene una herramienta real de procesamiento de imágenes instalada (no hay ImageMagick ni
`cwebp`; el único `convert` disponible en el PATH es el de Windows para sistemas de
archivos, no sirve para imágenes). Recomendación concreta para resolverlo:

1. Comprimir/convertir estas imágenes a **WebP o AVIF** con [Squoosh.app](https://squoosh.app)
   o TinyPNG, apuntando a **<300&nbsp;KB** por imagen manteniendo calidad visual alta.
2. Los PNG de fondo (`1.png`–`4.png`, `grua nueva.png`, `higiene nueva.png`, `nieve nueva.png`)
   son fotos, no gráficos con transparencia real — no necesitan ser PNG, JPG/WebP de
   calidad 80–85 reduciría el peso entre 80–90% sin pérdida perceptible.
3. Considerar `<link rel="preload" as="image">` para la primera imagen del hero
   (`hero-bg-1`) una vez que esté comprimida, para adelantar su descarga.
4. Alternativa rápida sin herramientas nuevas: instalar Pillow (ya está disponible en este
   entorno vía Python) y correr un script de reencode batch a WebP — puedo hacerlo en una
   próxima sesión si se confirma que es aceptable perder metadata EXIF de las fotos.

## 6. Otros pendientes fuera del código

Ver checklist final en la respuesta del asistente (Search Console, Google Business Profile,
backlinks, etc.) — no se repite acá para evitar desincronización entre dos listas.
