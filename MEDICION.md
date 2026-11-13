# Medición de visitas — ismaelsa.com

Archivo interno: no se publica (está bloqueado con 404 en `_redirects`).

## Qué se instaló

**Cloudflare Web Analytics.** Es gratis, no usa cookies y no guarda datos personales, así que
no hace falta un banner de cookies. La web sigue publicada en Netlify: no pasa por Cloudflare.
Lo único que se agrega es un script chico que avisa de cada visita.

- **Script:** `https://static.cloudflareinsights.com/beacon.min.js`. Va antes de `</body>` en las
  13 páginas y sirve para español e inglés, porque el idioma cambia dentro de la misma página.
- **Dónde está:** lo agrega el generador, `tools/build_v7.py`, en la constante `CF_TOKEN`. Si el
  token está vacío, el script no se agrega a ninguna página. Después de cambiarlo hay que correr
  `py -I tools/build_v7.py`.
- **CSP:** se ampliaron solo dos directivas, en los dos lugares donde está definida:
  - `script-src`: se agregó `https://static.cloudflareinsights.com`.
  - `connect-src`: se agregó `https://cloudflareinsights.com`.

  Los dos lugares son la constante `CSP` de `tools/build_v7.py`, que genera el `<meta>` de cada
  página, y `_headers`, la cabecera de Netlify. El navegador aplica las dos reglas, así que
  siempre hay que cambiarlas juntas. No se agregó `'unsafe-inline'`, `'unsafe-eval'` ni comodines.

## Dónde ver los datos

En dash.cloudflare.com → **Analytics & Logs → Web Analytics → ismaelsa.com**. Lo que muestra:

- **Visits** y **Page views**: cuántas visitas hubo y cuántas páginas se vieron.
- **Referer**: el sitio desde el que llegó la visita. Por ejemplo `l.instagram.com`,
  `instagram.com`, `facebook.com`, `lm.facebook.com`, `linkedin.com`, `lnkd.in` o `google.com`.
- **Path**: qué página se vio. Ahí aparecen los links cortos de redes (ver abajo).
- **Country**, **Device** y **Browser**.

Cloudflare guarda el detalle completo de los últimos 7 días y un resumen de los últimos 6 meses.
En sitios con pocas visitas registra casi todas.

## Cómo saber de qué red social viene cada visita

**Importante:** Cloudflare Web Analytics **no registra los parámetros de la URL**, como
`?utm_source=...`. Lo dice su FAQ: "do not log query strings" y "UTM parameters: Not yet". Un
link con UTM funciona, pero en este panel no se ve de dónde vino.

Por eso hay **links cortos por red**. Cada uno muestra el inicio igual que `ismaelsa.com`, pero
Cloudflare registra la ruta, así que en **Path** se ve cuántas visitas llegaron por cada uno:

| Dónde se usa                       | Link para pegar                    | En Cloudflare aparece como |
|------------------------------------|------------------------------------|----------------------------|
| Instagram (posteos, mensajes)      | https://ismaelsa.com/ig            | `/ig`                      |
| Biografía de Instagram             | https://ismaelsa.com/ig-bio        | `/ig-bio`                  |
| Sticker de link en historias de IG | https://ismaelsa.com/ig-historia   | `/ig-historia`             |
| Facebook                           | https://ismaelsa.com/fb            | `/fb`                      |
| LinkedIn                           | https://ismaelsa.com/in            | `/in`                      |

- **Cómo funcionan:** están definidos en `_redirects` como reescritura 200. La página mantiene
  `<link rel="canonical" href="https://ismaelsa.com/">`, así que Google no los toma como páginas
  duplicadas.
- **Para agregar otro**, por ejemplo uno de WhatsApp: sumar una línea `/wa   /   200` en
  `_redirects`.
- **También sirve el Referer**, aunque a veces viene vacío. En las historias de Instagram y en
  algunas apps el navegador no manda de dónde vino, y la visita aparece como directa. Por eso el
  link corto es la fuente más confiable.

## Links con UTM

Los links con UTM sirven si algún día se suma Google Analytics u otra herramienta que sí los
registre. Hoy, en Cloudflare, no se ven. El formato es:

`https://ismaelsa.com/?utm_source=RED&utm_medium=TIPO&utm_campaign=web`

- `utm_source`: la red (`instagram`, `facebook`, `linkedin`).
- `utm_medium`: dónde se pone (`social` en un posteo, `bio` en la biografía, `historia` en un
  sticker).
- `utm_campaign`: el nombre de la campaña (`web` es el general).

| Uso                       | Link                                                                        |
|---------------------------|-----------------------------------------------------------------------------|
| Instagram                 | https://ismaelsa.com/?utm_source=instagram&utm_medium=social&utm_campaign=web   |
| Facebook                  | https://ismaelsa.com/?utm_source=facebook&utm_medium=social&utm_campaign=web    |
| LinkedIn                  | https://ismaelsa.com/?utm_source=linkedin&utm_medium=social&utm_campaign=web    |
| Biografía de Instagram    | https://ismaelsa.com/?utm_source=instagram&utm_medium=bio&utm_campaign=web      |
| Historias de Instagram    | https://ismaelsa.com/?utm_source=instagram&utm_medium=historia&utm_campaign=web |

Se pueden combinar las dos cosas, por ejemplo
`https://ismaelsa.com/ig-bio?utm_source=instagram&utm_medium=bio&utm_campaign=web`. Así
Cloudflare lo cuenta por la ruta y una herramienta futura lo puede contar por el UTM.
