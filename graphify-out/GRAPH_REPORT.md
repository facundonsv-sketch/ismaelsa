# Graph Report - .  (2026-06-15)

## Corpus Check
- Large corpus: 81 files · ~578,099 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 74 nodes · 117 edges · 8 communities (6 shown, 2 thin omitted)
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.5)
- Token cost: 79,015 input · 4,000 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Contratistas de perforación|Contratistas de perforación]]
- [[_COMMUNITY_Servicios y flota|Servicios y flota]]
- [[_COMMUNITY_Proyectos y operadoras mineras|Proyectos y operadoras mineras]]
- [[_COMMUNITY_Bases operativas y geografía|Bases operativas y geografía]]
- [[_COMMUNITY_Seguridad y certificaciones|Seguridad y certificaciones]]
- [[_COMMUNITY_Conversión comercial|Conversión comercial]]
- [[_COMMUNITY_Metadatos del proyecto|Metadatos del proyecto]]
- [[_COMMUNITY_Diferenciación comercial|Diferenciación comercial]]

## God Nodes (most connected - your core abstractions)

## Surprising Connections (you probably didn't know these)
- `CLAUDE.md` --DOCUMENTS--> `ISMAEL S.A.`  [INFERRED]
   →   _Bridges community 0 → community 6_
- `Los Azules` --LOCATED_IN--> `San Juan`  [INFERRED]
   →   _Bridges community 2 → community 3_
- `ISMAEL S.A.` --WORKED_FOR--> `AbraSilver`  [EXTRACTED]
   →   _Bridges community 0 → community 2_
- `ISMAEL S.A.` --OPERATES_BASE_AT--> `Base Calingasta`  [EXTRACTED]
   →   _Bridges community 0 → community 3_
- `ISMAEL S.A.` --HOLDS_CERTIFICATION--> `Hidrogrúa IRAM`  [EXTRACTED]
   →   _Bridges community 0 → community 4_

## Import Cycles
- None detected.

## Communities (8 total, 2 thin omitted)

### Community 0 - "Contratistas de perforación"
Cohesion: 0.09
Nodes (23): AGV Servicios Mineros, Aurora Mining, Caterwest S.A., Primeros auxilios, Chita, Comunicación VHF/satelital, Mantenimiento preventivo, Trazabilidad operativa (+15 more)

### Community 1 - "Servicios y flota"
Cohesion: 0.19
Nodes (13): GPS satelital, Flota, Servicios, Abastecimiento en zonas remotas, Soporte operativo en terreno, Transporte de agua, Transporte de equipos e insumos, Traslados programados (+5 more)

### Community 2 - "Proyectos y operadoras mineras"
Cohesion: 0.21
Nodes (12): AbraSilver, El Pachón, Filo del Sol, Fortescue Argentina, Glencore, Glencore Pachón S.A., José María, Cordillera de los Andes (+4 more)

### Community 3 - "Bases operativas y geografía"
Cohesion: 0.22
Nodes (10): Base Calingasta, Base Rawson, Coipita, Las Choicas, Argentina, Calingasta, Rawson, San Juan (+2 more)

### Community 4 - "Seguridad y certificaciones"
Cohesion: 0.25
Nodes (9): Hidrogrúa IRAM, Manejo defensivo 4x4, Rigger, Conducción de vehículos pesados, Control de fatiga, Estándares HSEC, Capital humano, Seguridad (+1 more)

### Community 5 - "Conversión comercial"
Cohesion: 0.50
Nodes (4): Contacto, Trabajá con nosotros, Web3Forms, WhatsApp

## Knowledge Gaps
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 2 inferred relationships involving `ISMAEL S.A.` (e.g. with `CLAUDE.md` and `Primeros auxilios`) actually correct?**
  _`ISMAEL S.A.` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 4 inferred relationships involving `San Juan` (e.g. with `Coipita` and `Las Choicas`) actually correct?**
  _`San Juan` has 4 INFERRED edges - model-reasoned connections that need verification._
- **Should `Contratistas de perforación` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._