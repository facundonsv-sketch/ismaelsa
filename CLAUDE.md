## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

## Sitio v7 (rediseño oct 2026) — cómo se edita

- **No editar los `*.html` ni `assets/main.js` a mano**: se GENERAN con `py -I tools/build_v7.py`
  desde `tools/build_v7.py` (textos ES/EN, datos de servicios, head SEO, nav/footer) y
  `tools/main.template.js` (lógica). Editar la fuente y volver a correr el generador.
- Todos los textos llevan `data-i18n` y existen en ES y EN; el generador falla si falta una clave.
- CSP estricta: nada inline (ni `style=""` ni `onclick`); el generador lo verifica. Estilos en
  `assets/v7.css`; mapa con Leaflet self-hosted (`assets/vendor/`), tiles de OSM permitidos en `img-src`.
- Imágenes del rediseño en `assets/v7/` (WebP; `tools/build_v7.py` lee `manifest.json` y `responsive.json`).
- Referencia de diseño: `_handoff/handoff-ismaelsa-v7/ISMAEL Web v7.dc.html` (local, gitignorado).
- `docs/`, `tools/`, `_handoff/`, `_old-assets/` están bloqueados en `_redirects` (404) por si se publican.
