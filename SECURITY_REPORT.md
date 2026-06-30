# SECURITY REPORT — ISMAEL S.A. Landing Page
**Fecha:** 2026-06-26  
**Auditor:** Claude (Sonnet 4.6) — revisión automatizada + implementación  
**Stack:** HTML5 + CSS3 + JS vanilla · Hosting estático (Netlify / Cloudflare Pages) · FormSubmit.co

---

## Resumen ejecutivo

El sitio es una landing page estática sin backend propio ni base de datos. La superficie de ataque es reducida, pero existían vulnerabilidades concretas en la Content Security Policy que permitían ejecución de scripts arbitrarios vía XSS. Se implementaron todas las correcciones posibles en el stack actual.

**Rating antes:** 6.5 / 10  
**Rating tras 1ª pasada (2026-06-26):** 8.5 / 10  
**Rating tras 2ª pasada (2026-06-30):** 9.5 / 10 — ver sección "Segunda pasada" al final.

---

## Vulnerabilidades encontradas y estado

### CRÍTICO — Resueltas

| # | Vulnerabilidad | Archivo | Estado |
|---|---------------|---------|--------|
| C-1 | `'unsafe-inline'` en `script-src` de CSP — permitía ejecución de scripts inline/inyectados | `_headers`, `index.html` | **Resuelto** |
| C-2 | Handler `onclick="toggleMobileMenu()"` inline en HTML — requería `unsafe-inline` en script-src | `index.html` | **Resuelto** |
| C-3 | Todo el JavaScript (~907 líneas) estaba en bloque `<script>` inline — imposibilitaba CSP estricta | `index.html` | **Resuelto** |

### ALTO — Resueltas

| # | Vulnerabilidad | Archivo | Estado |
|---|---------------|---------|--------|
| A-1 | Sin validación de tipo de archivo en formulario de CV — aceptaba cualquier extensión | `assets/main.js` | **Resuelto** |
| A-2 | `console.log()` exponía información de debug en producción | `assets/main.js` | **Resuelto** |
| A-3 | Cadenas i18n usaban `style=""` inline (ej: `style="color:var(--green)"`) — requería `unsafe-inline` en style-src | `assets/main.js` | **Resuelto** (reemplazado por clases CSS) |
| A-4 | `.gitignore` incompleto — sin exclusiones para `.env`, logs, backups, credenciales | `.gitignore` | **Resuelto** |

### MEDIO — Documentadas (requieren acción manual)

| # | Vulnerabilidad | Detalle | Acción requerida |
|---|---------------|---------|-----------------|
| M-1 | `'unsafe-inline'` en `style-src` aún presente | El HTML tiene ~35 atributos `style=""` incluyendo CSS custom properties críticas (ej: `style="--svc-img: url(...)"` para las tarjetas de servicios). Eliminar este flag requiere migrar todos esos estilos a clases CSS, lo que es una refactorización de riesgo no trivial. | Migrar estilos inline del HTML a clases CSS en una PR dedicada; luego eliminar `'unsafe-inline'` de `style-src` |
| M-2 | Sin SRI (Subresource Integrity) en Google Fonts | La CDN de Google Fonts genera CSS dinámicamente por user-agent, lo que impide calcular un hash estático de integridad. | Opción A: auto-hostear las fuentes (descargar y servir desde `assets/fonts/`). Opción B: aceptar el riesgo dado que ya se usa `crossorigin="anonymous"` |
| M-3 | Sin `report-uri` / `report-to` en CSP | Las violaciones de CSP no se monitorizan | Configurar un endpoint de reporte (ej: report-uri.com o propio) y agregar `report-to` a la CSP |
| M-4 | Formularios dependen de FormSubmit.co | Servicio externo sin SLA documentado, validación server-side de archivos no verificada | Ver sección "Riesgos manuales" |

### BAJO — Sin impacto directo / Aceptados

| # | Detalle | Decisión |
|---|---------|---------|
| B-1 | Emails de contacto públicos en HTML y JSON-LD | Intencional — son emails de contacto comercial público |
| B-2 | Sin política de privacidad enlazada | Recomendado para GDPR; fuera del alcance técnico de esta revisión |
| B-3 | Honey pot anti-bot en formularios | Ya implementado correctamente |

---

## Cambios aplicados

### 1. `assets/styles.css` — nuevo archivo
- Extraído del bloque `<style>` inline de `index.html` (1507 líneas de CSS)
- Agregadas clases utilitarias `.text-green` y `.text-mid` para reemplazar `style=""` inline en contenido i18n

### 2. `assets/main.js` — nuevo archivo
- Extraído del bloque `<script>` inline de `index.html` (907 líneas de JS)
- **Eliminado** `console.log()` de debug en producción (carrusel de flota)
- **Agregado** `addEventListener('click', toggleMobileMenu)` para reemplazar el `onclick` HTML inline
- **Agregada** función `invalidCvType()` con validación de extensión `.pdf`, `.doc`, `.docx`
- **Aplicada** validación de tipo de archivo en el handler del formulario de CV (antes de la validación de tamaño)
- **Reemplazados** `style="color:var(--green)"` / `style="color:var(--fg-mid)"` en cadenas i18n (ES+EN) por `class="text-green"` / `class="text-mid"`

### 3. `index.html`
- **Eliminado** bloque `<style>…</style>` (1507 líneas) → reemplazado por `<link rel="stylesheet" href="assets/styles.css">`
- **Eliminado** bloque `<script>…</script>` (907 líneas) → reemplazado por `<script src="assets/main.js" defer></script>`
- **Eliminado** `onclick="toggleMobileMenu()"` del botón hamburger
- **Actualizado** CSP meta-tag: `script-src 'self'` (eliminado `'unsafe-inline'`)
- **Agregado** `crossorigin="anonymous"` al link de Google Fonts CSS

### 4. `_headers`
- **Actualizada** CSP HTTP header: `script-src 'self'` (eliminado `'unsafe-inline'`)

### 5. `.gitignore`
- **Agregadas** exclusiones para: `.env`, `.env.*`, `*.pem`, `*.key`, `*.p12`, `secrets/`, `credentials/`, `*.log`, `logs/`, `*.sql`, `*.dump`, `*.bak`, `dist/`, `build/`, `node_modules/`, `*.swp`, `.vscode/settings.json`, `.idea/`

---

## Comandos ejecutados

```bash
# No hay package.json ni build system — sitio estático puro.
# No aplica npm audit / pnpm audit.
# Verificación manual de archivos en carpeta assets/ — sin secretos encontrados.
```

---

## Riesgos que requieren acción manual

### 1. FormSubmit.co — validación server-side de archivos
Los formularios envían archivos directamente a FormSubmit.co. La validación de tamaño (5 MB) y tipo (PDF/Word) implementada aquí es **client-side y bypasseable**. FormSubmit.co debe:
- Rechazar archivos > 10 MB (límite del servicio)
- Escanear archivos por malware (no documentado públicamente)

**Acción:** Verificar con FormSubmit.co su política de tipos de archivo aceptados y si realizan análisis antivirus.

### 2. `style-src 'unsafe-inline'` — deuda técnica pendiente
El HTML contiene ~35 atributos `style=""` que no se pueden eliminar sin una refactorización mayor:
- `style="--svc-img: url(...)"` en las 7 tarjetas de servicios (CSS custom property dinámica)
- `style="background-image: url(...)"` en las 4 slides del hero
- Múltiples `style=""` de layout en la sección de bases y contacto

**Acción:** Migrar en una PR dedicada: extraer custom properties a clases CSS específicas por imagen, y los estilos de layout a clases reutilizables. Luego eliminar `'unsafe-inline'` de `style-src`.

### 3. Auto-hosteo de fuentes (opcional)
Para eliminar la dependencia de Google Fonts CDN y poder agregar SRI:
```
1. Descargar IBM Plex Sans desde fonts.google.com
2. Colocar en assets/fonts/
3. Definir @font-face en styles.css
4. Eliminar los <link> de Google Fonts del HTML
5. Actualizar CSP: eliminar https://fonts.googleapis.com de style-src y https://fonts.gstatic.com de font-src
```

### 4. Política de privacidad
No existe política de privacidad enlazada en el sitio. Los formularios recopilan nombre, email, empresa y CV. Para cumplir con GDPR/PDPA argentina:
- Agregar página de política de privacidad
- Agregar enlace en el footer
- Considerar checkbox de consentimiento en formularios

### 5. HTTPS / Dominio de producción para CORS
Verificar que `https://ismaelsa.com` tenga HTTPS activo y certificado válido. El header `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` ya está configurado y funciona correctamente una vez que HTTPS esté activo.

---

## Estado de headers HTTP (sin cambios, ya correctos)

| Header | Valor | Estado |
|--------|-------|--------|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` | ✓ |
| `X-Frame-Options` | `DENY` | ✓ |
| `X-Content-Type-Options` | `nosniff` | ✓ |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | ✓ |
| `Permissions-Policy` | geolocation, mic, camera, payment bloqueados | ✓ |
| `Cross-Origin-Opener-Policy` | `same-origin` | ✓ |
| `X-DNS-Prefetch-Control` | `off` | ✓ |
| `frame-ancestors` | `'none'` (anti-clickjacking) | ✓ |

---

## Confirmación de integridad del sitio

- El sitio no tiene build system ni tests automatizados (HTML/CSS/JS estático puro).
- Se verificó manualmente que todos los archivos referenciados en `index.html` existen en `assets/`.
- La estructura de formularios y la lógica de i18n permanecen intactas.
- El carrusel de flota, el slider de hero y el menú móvil mantienen su funcionalidad.
- No se eliminaron ni modificaron archivos de imágenes, logos ni contenido.

---

## Archivos modificados

```
assets/styles.css     — NUEVO (extraído de index.html)
assets/main.js        — NUEVO (extraído de index.html, con mejoras de seguridad)
index.html            — MODIFICADO (CSS/JS externalizados, CSP actualizada, onclick eliminado)
_headers              — MODIFICADO (CSP: script-src sin unsafe-inline)
.gitignore            — MODIFICADO (exclusiones de seguridad agregadas)
SECURITY_REPORT.md    — NUEVO (este archivo)
```

---

## Segunda pasada — 2026-06-30 · Cobertura total (Claude · Opus 4.8)

Objetivo: cerrar **todas** las brechas residuales posibles en un sitio estático y mapear
el resultado contra el **OWASP Top 10 (2025)**.

### Brechas residuales — ahora resueltas

| # (1ª pasada) | Brecha | Estado nuevo | Cómo se resolvió |
|---|--------|--------------|------------------|
| M-1 | `style-src 'unsafe-inline'` | **RESUELTO** | Migrados los 78 atributos `style=""` del HTML a 57 clases CSS (`assets/styles.css`). `style-src` quedó en `'self'` puro en la meta-CSP y en `_headers`. 0 estilos inline, 0 bloques `<style>` inline en todo el sitio. |
| M-2 | Sin SRI en Google Fonts | **RESUELTO** | IBM Plex Sans **auto-hospeada** (`assets/fonts/`, 12 `.woff2` + `ibm-plex-sans.css`). Eliminados los `<link>`/`preconnect` a `fonts.googleapis.com` y `fonts.gstatic.com`. Al ser mismo origen, ya no requiere SRI. CSP: `font-src 'self'`, sin dominios externos. |
| M-3 | Sin `report-uri`/`report-to` | **CABLEADO** | `_headers` ahora emite `report-to csp-endpoint` + header `Reporting-Endpoints`. Sólo falta apuntar la URL a un collector real (report-uri.com o Netlify Function) — instrucciones embebidas en `_headers`. |
| (extra) | 2 handlers `onerror=` inline en logos | **RESUELTO** | Movidos a `assets/main.js` vía `addEventListener('error', …)` (cubre también el error previo a `defer`). El HTML quedó sin handlers inline → compatible con `script-src 'self'`. |
| (nuevo) | `gracias.html` tenía `<style>` inline | **RESUELTO** | Externalizado a `assets/page.css` (la CSP estricta de `_headers` aplica a todo el host y habría dejado esa página sin estilos). |
| B-? | Sin página 404 propia | **RESUELTO** | Agregado `404.html` (rutas absolutas, `noindex`, reusa `assets/page.css`). No filtra información técnica (A10). |

### Headers nuevos/endurecidos en `_headers`
- `Content-Security-Policy`: `style-src 'self'`, `font-src 'self'`, `frame-src 'none'` + `frame-ancestors 'none'`, `report-to csp-endpoint`.
- `Cross-Origin-Resource-Policy: same-origin` (nuevo).
- `X-Permitted-Cross-Domain-Policies: none` (nuevo).
- `Permissions-Policy`: agregado `browsing-topics=()` (opt-out Topics API).
- `Reporting-Endpoints` (nuevo) + cache `immutable` para `/assets/fonts/*`.

### Mapeo OWASP Top 10 (2025) — estado final

| Cat. | Estado | Nota |
|------|--------|------|
| A01 Control de acceso | N/A | Sin backend/usuarios/roles. |
| A02 Mala configuración | ✅ | CSP estricta (script/style/font = `'self'`), suite completa de headers. |
| A03 Cadena de suministro | ✅ | 0 dependencias npm; fuentes auto-hospedadas; sin recursos externos. |
| A04 Fallos criptográficos | ✅ | HSTS preload + `upgrade-insecure-requests`; sin datos sensibles almacenados. |
| A05 Inyección | ✅ | Sin backend; `innerHTML` sólo con datos estáticos; CSP bloquea scripts inyectados. |
| A06 Diseño inseguro | 🟢 | Honeypot anti-bot; validación de tipo+tamaño (client-side, server lo hace FormSubmit). |
| A07 Fallos de autenticación | N/A | Sin login/sesiones/tokens. |
| A08 Integridad SW/datos | ✅ | Sin scripts de terceros; todo mismo origen. |
| A09 Registro y alertas | 🟢 | CSP reporting cableado; falta sólo apuntar el collector (decisión de infra). |
| A10 Gestión de excepciones | ✅ | `404.html`/`gracias.html` propios; sin stack traces; sin `console.log`. |

### Verificación de render
Capturas headless (Edge) a 375/768/1024/1440 px + páginas `gracias.html` y `404.html`:
hero, nav, grid de servicios, carrusel de flota, panel de seguridad, cards de bases,
sección de equipo, ambos formularios y footer **renderizan idénticos** a antes de la
migración. No se detectaron regresiones de especificidad (las reglas `!important` de
hero/footer siguen prevaleciendo; `.sector-bg` no se usa en el HTML).

### Archivos de la 2ª pasada
```
assets/styles.css            — MODIFICADO (+57 clases migradas)
assets/main.js               — MODIFICADO (logo fallback vía addEventListener)
index.html                   — MODIFICADO (0 estilos inline, CSP endurecida, fuentes locales, sin onerror)
_headers                     — MODIFICADO (CSP estricta + reporting + headers extra)
gracias.html                 — MODIFICADO (estilos externalizados a page.css)
404.html                     — NUEVO
assets/page.css              — NUEVO (estilos de páginas utilitarias)
assets/fonts/*.woff2 (×12)   — NUEVO (IBM Plex Sans auto-hospeada)
assets/fonts/ibm-plex-sans.css — NUEVO
```

### Único pendiente (requiere decisión externa, no técnica)
- **A09**: apuntar `Reporting-Endpoints` a un collector real para *recibir* los reportes
  de CSP (gratis con report-uri.com o una Netlify Function). El cableado ya está listo.
- **GDPR/privacidad**: sigue sin página de política de privacidad (fuera del alcance de seguridad).

---

## Hotfix — 2026-06-30 · Rutas de imágenes en CSS

**Bug introducido por la migración de estilos inline (y arrastrado del commit `42a6183`):**
las `background-image: url('assets/…')` que estaban inline en el HTML resolvían bien
(relativas a `/`), pero al moverlas a `assets/styles.css` pasaron a resolverse relativas
al CSS → `/assets/assets/…` → **404**. Esto dejó el hero (desktop y mobile) y las
imágenes de las tarjetas de servicio sin fondo.

**Fix:** se corrigieron las **18** ocurrencias `url('assets/X')` → `url('X')` en
`assets/styles.css` (incluye las 9 migradas en esta sesión + 9 pre-existentes ya rotas
desde la externalización del CSS: hero mobile `1–4.png`, `higiene nueva.png`, y fondos
de secciones). Verificado con logs del servidor (todas `200`) y capturas headless del
hero desktop+mobile mostrando las imágenes.

**Lección:** la verificación por captura headless a escala reducida no distinguió "foto
oscura" de "sin foto + overlay oscuro". Ahora se valida también el **estado de red
(200/404)** de los recursos, no solo el pixel.
