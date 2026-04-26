# REFERENCE: Matriz Comparativa — 156 Funcionalidades CDE
# DO NOT MODIFY — This is a source document for data/features.ts
# See COMMS.md for task P11

This document contains the complete 156-feature comparison matrix.
The Claude Code terminal building P11 should read this file and use it
to expand data/features.ts with all features and scores.

## PLATFORMS TO INCLUDE (7 total):

| ID | Name | Short | In Matrix |
|---|---|---|---|
| custom | VIA-HABITA (Solución Custom CDE) | VIA | Yes (highlighted) |
| adsk | Autodesk Forma (ex-ACC/Build) | ADSK | Yes |
| trim | Trimble Connect | TRIM | Yes |
| proc | Procore | PROC | Yes |
| dalx | Dalux | DALX | Yes |
| catd | Catenda Hub (ex-Bimsync) | CATD | Yes |
| wayki | WAYKI | WAYKI | Add — estimated scores based on demo with Renzo |

## WAYKI ESTIMATED SCORES (based on demo and Serge's assessment):
- Strong in: RFI management (4), field/photos (4), plan viewing (4), Spanish UI (5), per-project pricing (5)
- Medium in: basic doc management (3), version control (3), PDF annotations (3-4)
- Weak in: BIM/IFC (2), ISO 19650 (1), AI (1), reuniones (1), BCF (1), API (2)
- Unknown: Use score of 2 as conservative default for unknowns

## CATEGORY WEIGHTS (confirmed for Habita):
1. CDE y Gestión Documental — 15%
2. Visualizadores de Archivos — 15%
3. Anotación y Marcado — 10%
4. Coordinación e Incidencias — 15%
5. RFIs y Documentos de Obra — 10%
6. Reuniones y Colaboración — 10%
7. Terreno y Gestión de Obra — 8%
8. Formularios y Reportes — 5%
9. Inteligencia Artificial — 7%
10. Plataforma e Integraciones — 5%

## COMPLETE SCORES (156 features):
Format: Feature# | Name | CUSTOM | ADSK | TRIM | PROC | DALX | CATD

### Cat 1: CDE (15%)
1|Espacios ISO 19650|5|4|5|3|3|5
2|Espacios personalizables|5|3|4|3|2|4
3|Permisos granulares CRUD|5|4|4|4|3|3
4|Jerarquía carpetas multi-nivel|5|5|4|5|3|4
5|Flujos revisión multi-paso|5|4|4|3|2|4
6|Auto-trigger revisión|3|5|3|3|2|3
7|Transmittals|4|5|5|3|2|5
8|Versionamiento con supersedencia|4|5|5|4|3|5
9|Bridge entre proyectos|2|5|3|4|2|3
10|Naming enforcement|3|3|5|2|2|5
11|Audit log completo|5|5|4|5|3|4
12|Búsqueda full-text|4|5|3|4|3|3
13|Custom metadata|3|5|3|3|2|3
14|Templates de proyecto|3|5|3|5|2|3
15|Handover/cierre|2|5|3|4|2|3
16|Papelera/recuperación|4|5|4|4|3|3

### Cat 2: Visualizadores (15%)
17|Visor IFC 3D WebGL|5|5|4|3|4|5
18|Toolbar BIM 9 herramientas|5|4|3|2|3|4
19|Modo Ghost/X-ray|5|4|3|2|3|4
20|Secciones/planos de corte|4|5|4|2|3|4
21|Colorear elementos|5|4|3|2|3|3
22|Visor DXF/DWG CAD|4|5|3|3|2|2
23|Visor PDF completo|5|5|3|4|4|3
24|Visor imágenes/360°|5|5|3|4|5|2
25|Visor Excel embebido|3|4|2|3|2|1
26|45+ tipos archivo|3|5|5|4|3|2
27|Modelos federados|3|5|4|2|3|5
28|Comparación side-by-side|5|5|4|3|3|4
29|Overlay versiones|5|4|3|2|2|3
30|Visor 3D móvil|2|5|4|3|4|3
31|Compass orientación|5|5|4|2|3|4
32|IFC2x3 + IFC4|5|5|5|2|4|5

### Cat 3: Anotación (10%)
33|Toolbar anotación 11+ herramientas|5|5|3|4|4|3
34|Medición lineal|5|5|4|3|4|3
35|Medición área polígono|5|5|3|3|4|3
36|Polilínea/área freeform móvil|3|5|3|3|4|2
37|Calibración dos puntos|5|4|3|3|3|2
38|Calibración escala predefinida|5|4|3|3|3|2
39|Indicador calibración activa|5|3|2|2|3|1
40|Panel gestión marcas|5|5|3|4|4|3
41|7+ tipos de marca|5|5|3|4|4|3
42|Apple Pencil/stylus|2|5|2|3|4|1
43|Markup stamps|1|5|2|3|3|1
44|Quick references en marcas|4|5|2|3|3|2
45|Undo/Redo marcas|5|5|3|4|4|3
46|Color picker hex+RGB|5|4|3|3|3|2

### Cat 4: Coordinación (15%)
47|Lista incidencias filtrable|5|5|4|5|4|3
48|Vista Kanban|5|3|2|4|3|2
49|Vista Calendario|5|3|2|4|2|2
50|Vista Mapa sobre plano|5|4|3|3|4|3
51|Vista Galería|5|3|2|4|3|2
52|Tipos incidencia configurables|5|4|3|4|3|3
53|Atributos personalizados|5|4|3|4|3|3
54|Motor configuración workflows|5|3|3|4|3|3
55|Pin 3D en modelo IFC|5|4|3|3|4|4
56|Pin 2D en plano CAD|5|4|3|3|4|3
57|Pin en PDF con auto-screenshot|5|5|3|4|4|3
58|Vinculación bidireccional doc↔issue|5|4|3|3|3|4
59|Cluster/agrupación masiva|4|3|3|3|2|3
60|Dashboard KPIs coordinación|5|4|3|4|3|3
61|Edición inline en tabla|3|5|2|4|3|2
62|Duplicar incidencias|3|5|2|3|3|2
63|BCF import/export|3|4|4|2|4|5
64|Issue thumbnail history|3|5|2|3|2|2
65|Permisos granulares por issue|3|5|2|3|2|2

### Cat 5: RFIs (10%)
66|Dashboard RFIs|5|5|3|5|3|3
67|Issue→RFI en un clic|5|3|2|3|2|2
68|Formulario RFI personalizable|4|5|3|4|2|2
69|Flujo aprobación RFI|5|5|3|5|3|3
70|Estado Open for Manager|2|5|2|3|2|2
71|Órdenes de cambio|4|5|2|5|2|2
72|Submittals con IA|1|5|2|5|2|2
73|Meeting minutes|5|5|2|4|2|2
74|Correspondencia formal|2|4|2|4|1|1
75|Daily logs|2|5|2|5|4|1
76|Punch lists|3|5|2|5|5|2
77|Plantillas exportación|5|3|2|3|2|2
78|Download attachments ZIP|3|5|2|4|2|2

### Cat 6: Reuniones (10%)
79|Reuniones ICE estructuradas|5|2|2|2|1|2
80|Videoconferencia integrada|5|2|2|2|1|1
81|Acuerdos en tiempo real|5|1|1|2|1|1
82|Acuerdos con responsable/fecha|5|2|1|3|1|1
83|Auto-generación minutas|4|3|1|2|1|1
84|Resumen con ítems acción|5|3|1|3|1|1
85|Historial reuniones|5|3|2|3|1|2
86|Vinculación reunión→issue/RFI|5|2|1|2|1|1
87|Transcripción audio→texto|3|3|1|2|1|1
88|Integración Zoom/Teams|3|4|3|4|2|2
89|Minutes como fuente IA|3|5|1|2|1|1
90|Programación recurrente|4|3|2|3|1|1

### Cat 7: Terreno (8%)
91|Visor 360° sobre plano|5|4|2|4|5|1
92|Galería 360° filtrable|5|4|2|3|5|1
93|Hotspots en vista 360°|5|3|2|3|4|1
94|Comparación fotos avance|3|4|2|4|4|1
95|Asset tracking|2|5|2|4|3|1
96|Inspecciones calidad|4|5|2|5|5|1
97|Inspecciones seguridad|3|5|2|5|5|1
98|Captura móvil geolocalizada|3|5|3|5|5|1
99|Offline con sync|2|4|3|4|5|1
100|Reality Capture drones/LiDAR|1|4|5|3|3|1
101|ProjectSight 360 Capture|1|3|5|3|4|1
102|Galería fotos filtrable|4|5|3|5|5|1
103|Foto→incidencia|5|4|2|4|4|1

### Cat 8: Formularios (5%)
104|Formularios PDF inteligentes|5|3|2|4|4|1
105|Form builder con IA|2|5|1|3|2|1
106|Form attachments|4|5|2|5|4|1
107|Dashboard constructor|5|4|3|4|3|2
108|9 tipos widget|5|3|2|3|2|2
109|Colores/tipografía widgets|5|3|2|3|2|2
110|Biblioteca plantillas|3|4|2|5|4|1
111|Insight Builder nativos|3|5|3|4|2|2
112|Data Connector Power BI|1|5|3|4|2|2
113|Reportes programados|2|4|3|4|3|2
114|Exportación CSV/Excel|2|5|4|5|4|4
115|Export schedule Excel|1|5|3|5|2|1
116|Notificaciones configurables|4|5|4|5|4|3

### Cat 9: IA (7%)
117|IA análisis fotos 360°|5|2|1|2|2|1
118|IA asistente reuniones|5|3|1|1|1|1
119|IA panel visor IFC|5|2|1|1|1|1
120|IA panel visor CAD|5|1|1|1|1|1
121|IA panel visor PDF|5|1|1|1|1|1
122|Autodesk Assistant Help|1|5|1|2|1|1
123|Project Data Agent|1|5|1|2|1|1
124|Quick RFI Create IA|2|5|1|2|1|1
125|AutoSpecs submittals|1|5|1|2|1|1
126|Clash detection|2|5|4|2|2|3
127|Change Analysis|1|5|2|1|1|2
128|Object Colors diferencias|2|5|3|1|1|3
129|Clasificación automática|3|3|2|3|2|1
130|Procore Copilot|1|2|1|5|1|1
131|Procore Agents|1|2|1|5|1|1
132|Agentic AI platform|1|3|4|3|1|1
133|Analítica predictiva|2|4|2|4|1|1
134|Pre-llenado formularios|3|2|1|2|1|1
135|Symbol detection Takeoff|1|5|1|1|1|1

### Cat 10: Plataforma (5%)
136|API REST|3|5|4|5|3|4
137|API GraphQL|2|3|2|2|1|2
138|App móvil nativa|2|5|4|5|5|3
139|PWA|4|3|3|3|2|3
140|Offline sync|1|3|3|4|5|2
141|Integración ERP|1|4|5|5|2|2
142|App Marketplace|1|5|4|5|2|2
143|SSO SAML/SCIM|3|5|5|5|3|3
144|FedRAMP/certificaciones|1|4|3|5|1|1
145|Zapier/n8n/webhooks|2|4|3|4|2|2
146|Plugin Revit/AutoCAD|1|5|4|3|2|3
147|Plugin SketchUp/Tekla|1|2|5|2|2|2
148|Español nativo|5|4|3|4|4|3
149|Usuarios ilimitados|5|1|2|5|3|3
150|Almacenamiento ilimitado|5|3|2|5|3|3
151|Precio <$5K/año/proyecto|5|1|4|1|3|3
152|Módulo planificación Gantt|2|4|3|5|2|1
153|Módulo costos|1|5|2|5|1|1
154|Gestión licitaciones|1|5|2|5|1|1
155|Estimating/Takeoff|1|5|2|3|1|1
156|Soporte técnico español|5|2|2|2|3|2
