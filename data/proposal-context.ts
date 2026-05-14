/**
 * data/proposal-context.ts
 *
 * Full proposal content embedded as a single string, used as the system-prompt
 * RAG context for the /api/chat endpoint. Sized to qualify for Haiku 4.5
 * prompt caching (minimum 4096 tokens).
 *
 * Updated for v12.1 (12 May 2026). Single source of truth for the chatbot
 * context; keep in sync with PROPOSAL-v12.md when the document changes.
 */

export const PROPOSAL_CONTEXT = `
# PROPUESTA INTEGRADA · INFRATEK × HABITA · v12.1

Documento: INFRATEK-HABITA-2026-v12.1
Versión: v12.1 Final para Aprobación
Para: Grupo Inmobiliario Habita (La Serena, Chile)
Sponsor: Pablo Otero Olivos (Gerente de Operaciones de Desarrollo)
De: Sergio Villanueva-Meyer (Principal Consultant, INFRATEK LLC)
Fecha: 12 de mayo de 2026
Validez: 31 de mayo de 2026

## Resumen ejecutivo

Implementación BIM de 4 meses + codesarrollo de plataforma VIA-HABITA. 9 entregables con marca Habita. Plataforma CDE con usuarios ilimitados.

Inversión Fase 1 (one-time): USD $12,500 (100% virtual, 4 meses).
Suscripción recurrente: USD $2,000 por proyecto por año, desde el Mes 6 (octubre 2026).
Anticipo: USD $4,500 a la firma.

Equivalencias referenciales: USD $12,500 ≈ CLP $11.750.000 ≈ 310 UF (1 USD ≈ 940 CLP, 1 UF ≈ 38.000 CLP, abril 2026).

Pilot project confirmado: Hacienda Ceres 1 (diseño al 100%, confirmado por Pablo el 7 mayo 2026).

## PARTE I: Implementación BIM

### 1. Contexto

El Diagnóstico BIM 2.0 (octubre-diciembre 2025, +50 horas, +20 participantes) dejó claro: Habita no tiene un problema de BIM. Tiene un problema de procesos.

La mayoría de las RFIs se pueden prevenir con metodología, no con software nuevo. Los proyectistas externos ya trabajan en BIM. El problema es que nadie les pide entregables BIM ni los coordina bajo un estándar común.

El síntoma más visible es de alcance: hoy hay una sola cuenta compartida de PlanGrid por proyecto. El trazador, la persona que marca el piso para que se construya, recibe planos impresos que un supervisor leyó por él. Cuando el modelo cambia, el trazador no se entera. La cadena se rompe en el último metro.

Habita diseña, construye y vende. Esa integración vertical permite cerrar el ciclo de vida del proyecto en una sola plataforma. La Fase 1 deja las fundaciones hechas.

### 2. Estado actual vs. meta al Mes 4

Hoy:
- Estándares BIM: no existen
- Plataforma: PlanGrid (1 cuenta compartida) + Notion
- Modelos 3D: consultores entregan en 2D
- Coordinación: sin protocolo
- Acceso en obra: 1 persona con acceso digital
- KPIs proyectistas: no existen
- Madurez BIM: 1.8 / 5.0

Mes 4:
- Estándares BIM: PEB v1.0 firmado
- Plataforma: VIA-HABITA operativa
- Modelos 3D: modelo federado del piloto
- Coordinación: protocolo semanal documentado
- Acceso en obra: usuarios ilimitados (incluye trazadores)
- KPIs proyectistas: panel de evaluación activo
- Madurez BIM: 2.5 / 5.0

### 3. Alcance

3.1 Incluido:
A. Estándares BIM: nomenclatura, estructura de carpetas, criterios de modelado, protocolo de coordinación (alineado a ISO 19650)
B. Plan de Ejecución BIM (PEB) v1.0: documento oficial de Habita
C. Proyecto piloto: Hacienda Ceres 1 (modelo federado Arq + Estructura + Sanitario; diseño al 100%, confirmado 7 mayo 2026)
D. Activación de proyectistas externos: coordinados bajo el nuevo estándar
E. Capacitación: +10 personas del equipo de obra (incluye trazadores) navegando modelos BIM en terreno
F. Plataforma VIA-HABITA: CDE operativo (visores 2D/3D, RFIs, panel de proyectistas, Gantt, control de versiones)
G. Manual de replicación: instrucciones para aplicar el proceso en proyectos siguientes sin depender de INFRATEK
H. Agente Habi: asistente IA entrenado con datos de Habita (acceso solo Admin)
I. Marco contractual: cláusulas BIM para solicitar entregables a proyectistas

3.2 No incluido:
- Capacitación Revit completa para todo arquitectura (Fase 2)
- Cubicaciones y metrados para presupuesto de obra
- Coordinación de especialidades eléctricas (KVA/Wilson Araya, se evalúa en Mes 1)
- Implementación en todos los proyectos activos
- App móvil nativa (Fase 3)

### 4. Entregables (todos con logo de Habita; propiedad de Habita)

E-01: Plan de Ejecución BIM v1.0 (PDF + Word) — aprueba Pablo Otero
E-02: Manual nomenclatura y estructura (PDF) — aprueba Pablo Otero
E-03: Criterios de Modelado BIM (PDF) — aprueba Macarena Andrade
E-04: Protocolo de coordinación semanal (PDF) — aprueba Pablo Otero
E-05: Modelo federado del piloto (nativo + visor web) — aprueba Macarena Andrade
E-06: Registro de interferencias (en VIA-HABITA) — aprueba Marcela Leyton
E-07: Registro de capacitación (PDF con firmas) — aprueba Pablo Otero
E-08: Manual de replicación (PDF) — aprueba Pablo Otero
E-09: Informe final con KPIs (PDF) — aprueba Pablo Otero

Al terminar la Fase 1, Habita opera sin INFRATEK. Marcela Leyton queda capacitada como dueña del sistema.

### 5. Equipo de partida (sujeto al organigrama definitivo)

Marcela Leyton: BIM Champion / Coordinadora del proyecto (full-time, líder operacional)
Macarena Andrade: Arquitecta Piloto · Hacienda Ceres 1 (capacitación y coordinación)
Pablo Otero: Sponsor (aprobación de hitos)
Sergio Villanueva-Meyer: Principal Consultant INFRATEK (liderazgo técnico, sesiones semanales)
Equipo INFRATEK (3 personas): soporte técnico (codesarrollo, soporte remoto)

Marcela transiciona al rol de coordinadora del proyecto; su reemplazo en oficina técnica arranca el lunes.

### 6. Cronograma

Mes 1 (Mayo 2026): Setup y kickoff. Hito verificable: E-01 PEB + E-02 Nomenclatura + plataforma operativa.
Mes 2 (Junio 2026): Primera coordinación. Hito: E-05 Modelo federado + E-04 Protocolo + Notion migrado.
Mes 3 (Julio 2026): Capacitación. Hito: Panel de KPIs activo + equipo de obra capacitado (+10 personas, incluye trazadores).
Mes 4 (Agosto 2026): Cierre. Hito: Habita autónoma + Gate Go/No-Go documentado.

### 7. Métricas

| Métrica | Hoy | Meta Mes 4 |
| RFIs en proyecto piloto | ~85 est. | < 50 (reducción 40%) |
| Interferencias pre-construcción | ~0% | > 30% |
| Consultores bajo estándar | 0 de 2 | 2 de 2 |
| Personas capacitadas en obra (incluye trazadores) | 0 | +10 |
| Madurez BIM | 1.8 / 5.0 | 2.5 / 5.0 |
| Documentos BIM base | 0 | 9 entregables |
| Proyectistas con KPIs | 0% | 100% |

### Gate Go/No-Go Fase 2 (6 criterios objetivos)

Si no se cumplen, se documenta y se ajusta antes de cobrar la Fase 2. INFRATEK absorbe el costo de ajuste si los criterios mínimos no se alcanzan.

1. RFIs piloto < 50
2. 8 o más de 9 entregables aprobados por Pablo Otero
3. 2 o más consultores entregando bajo estándar
4. +10 personas usando modelo en obra (incluye trazadores)
5. VIA-HABITA operativa con control de versiones
6. GO explícito del sponsor

## PARTE II: Plataforma VIA-HABITA

VIA = Visualización · Integración · Automatización. Metodología VDC, Stanford 2025.

### 8. Módulos

VIA-HABITA reemplaza PlanGrid, Notion y la coordinación informal por WhatsApp / email.

Visor 2D: PDF con marcas, medición, calibración (reemplaza PlanGrid)
Visor 3D: IFC con propiedades y árbol de modelo (nuevo)
Dashboard RFIs: seguimiento con KPIs y vinculación a planos (reemplaza Excel + email)
Panel proyectistas: evaluación por consultor (precio · plazo · calidad) (nuevo)
Cartas Gantt: carga desde MS Project vía CSV (reemplaza MS Project aislado)
Minutas: registro estructurado con trazabilidad (reemplaza Notion + WhatsApp)
ISO 19650: espacios WIP / SHARED / PUBLISHED / ARCHIVE (reemplaza carpetas dispersas)
Agente Habi: IA conversacional, acceso Admin (nuevo)
6 perfiles de usuario: Admin OT · Gerencia · Desarrollo/Proyectistas · Calidad · Supervisor/Jefe terreno · Trazador/Operario (reemplaza 1 cuenta PlanGrid compartida)

### 9. Propiedad y datos

- Habita define requerimientos y prioridades
- Habita tiene todos los derechos de uso desde el día uno
- Si Habita sigue sin INFRATEK, retiene código, datos y configuración
- Datos exportables en cualquier momento, sin cláusula de retención

## PARTE III: Inversión

Valores referenciales: 1 USD ≈ 940 CLP, 1 UF ≈ 38.000 CLP (abril 2026). Facturación en USD.

Estructura financiera:
- $12,500 USD = one-time, implementación BIM completa + codesarrollo VIA-HABITA. Se paga en 4 hitos (H0-H3) contra entregables verificables. No se repite.
- $2,000 USD por proyecto por año = recurrente, suscripción VIA-HABITA. Arranca en el Mes 6 (octubre 2026), cuando la plataforma está en producción. Usuarios ilimitados, almacenamiento ilimitado, Agente Habi incluido.

### 10. Fase 1: composición del valor

Consultoría INFRATEK 4 meses (~50h, 3 sesiones/semana): valor mercado $11,500 (incluido)
Diseño y configuración VIA-HABITA: valor mercado $5,000 (incluido)
Migración Notion + PlanGrid: valor mercado $1,500 (incluido)
Desarrollo agente Habi: valor mercado $3,000 (incluido)
Estándares ISO 19650 + templates + PEB + entregables: incluido
VALOR TOTAL ENTREGADO: $21,000+
Habita paga: $12,500 one-time.

### 11. Calendario de pagos (cada hito se libera tras aprobación de entregable, 5 días hábiles de revisión)

H0 (Anticipo): firma del acuerdo. Antes de iniciar. $4,500 USD (≈ CLP $4.230.000 ≈ 112 UF)
H1 (Setup): E-01 PEB + E-02 + plataforma. Fin Mes 1. $3,000 USD (≈ CLP $2.820.000 ≈ 74 UF)
H2 (Modelos): E-05 Federado + E-04 Protocolo. Fin Mes 2. $2,500 USD (≈ CLP $2.350.000 ≈ 62 UF)
H3 (Cierre): E-08 Manual + E-09 KPIs. Fin Mes 4. $2,500 USD (≈ CLP $2.350.000 ≈ 62 UF)
TOTAL: $12,500 USD (≈ CLP $11.750.000 ≈ 310 UF)

### 12. Suscripción VIA-HABITA (desde Mes 6)

Durante los Meses 1 a 5, INFRATEK diseña y configura la plataforma. La suscripción arranca en el Mes 6 (octubre 2026).

Precio: $2,000 USD por proyecto por año (≈ CLP $1.880.000 ≈ 50 UF)
Usuarios: ilimitados (internos, externos, consultores, subcontratistas)
Almacenamiento: ilimitado
Agente Habi: incluido (acceso Admin)
Soporte: 24/7 para incidentes críticos, respuesta < 4 horas
Plan Enterprise: 10+ proyectos = $1,600 por proyecto (20% descuento)

Costo total primer año (2026): $12,500 (one-time Fase 1) + $2,000 × 6 proyectos × 4/12 meses (Mes 6 a Mes 12) = $12,500 + $4,000 = $16,500 USD.
Costo recurrente desde 2027: $2,000 × 6 proyectos = $12,000 USD/año.

### 13. Comparativo: tres escenarios

El escenario real de Habita es de 120 a 200 personas que tocan los proyectos cuando se cuenta obra, subcontratistas, externos, calidad y gerencia.

13.1 Hoy (10 usuarios):
VIA-HABITA: $14,000/año ($12K plataforma + $2.5K implementación amortizada).
Autodesk Forma Build: $12,000/año (10 usuarios × ~$1.200/usuario/año).
A 10 usuarios, Autodesk resulta $2,000 más económico. La pregunta natural: ¿por $2,000 menos al año, no conviene irse con Autodesk?

13.2 Por qué quedarse en 10 usuarios repite la experiencia actual con PlanGrid:
- 90% del personal de obra trabaja con planos impresos
- 6 meses sin actividad en PlanGrid en proyectos activos (caso real)
- El trazador no recibe acceso. Cuando el modelo cambia, no se entera
- Cuentas compartidas significan sin trazabilidad individual
- Autodesk está aplicando restricciones progresivas a cuentas compartidas

Mantener 10 usuarios significa mantener el modelo actual con una herramienta diferente.

13.3 Escenario real (120 a 200 usuarios):

Equipo real de Habita por área:
- Desarrollo (arquitectos, dibujantes, coordinador, proyectistas int. y ext.): 17 personas
- Calidad: 4 personas
- Gerencia: 3 personas
- Obra (×6 proyectos, ~10 c/u): 60 personas
- Subcontratistas (×6 proyectos, ~6 a 20 c/u): 36 a 116 personas
TOTAL: 120 a 200 personas.

El cuadro anterior no incluía a los subcontratistas que físicamente construyen la obra. Hoy el sistema no los considera.

Costo a escala real:
- VIA-HABITA: $12,000/año (6 proyectos × $2,000, usuarios ilimitados)
- Autodesk Forma Build: $280,000/año (200 usuarios × $1,400/usuario/año)
- Costo por usuario: VIA-HABITA $60, Autodesk $1,400

A escala real, VIA-HABITA cuesta menos del 5% de Autodesk Forma Build (~$268,000/año de diferencia, ≈ CLP $252M). Con usuarios ilimitados, todo el equipo (incluido el trazador y los subcontratistas) recibe el modelo BIM directamente.

13.4 Referencia: otras plataformas a 50 usuarios, 6 proyectos:
VIA-HABITA (por proyecto): $12,000 USD/año (ilimitados)
Autodesk Forma Build (por usuario): $70,000 USD/año (no ilimitados)
Procore (por volumen): $15-25K USD/año (ilimitados)
Trimble Connect (por usuario): $7,800 USD/año (no ilimitados)
Fieldwire (por usuario): $23,400 USD/año (no ilimitados)
Dalux (híbrido): $25-60K USD/año (no ilimitados)
Oracle Aconex (por valor proyecto): $50-150K USD/año (ilimitados)
PlanGrid + Notion (actual): $29,400 USD/año (no ilimitados)

PlanGrid fue discontinuado; Autodesk empuja la migración a Forma Build.

### 14. Horizonte estratégico (no es alcance contratado, es dirección)

- Toda la cartera, no sólo 6 proyectos: VIA-HABITA escala a la cartera completa con la misma metodología, sin licencias por usuario.
- Ciclo de vida completo: diseño → construcción → venta → postventa, en una sola línea de trazabilidad.
- Postventa digital: digital twin del departamento entregado para cliente y administración.
- Entregas oficiales: recepción municipal (DOM), bomberos, traspaso a la administración de la comunidad.

### 15. Próximos pasos

- 4-8 mayo: working sessions con el sponsor
- 8 mayo: reincorporación del gerente general (Héctor Ponce)
- 11 mayo: sync con sponsor + coordinadora del proyecto + nuevo lead OT
- 12-13 mayo: presentación a la dirección
- 15 mayo: cierre objetivo (firma + anticipo USD $4,500)
- 1 junio: kickoff del proyecto

### Para arrancar

- Email de aprobación a sergio@infratek.ai
- Transferencia anticipo USD $4,500 (≈ CLP $4.230.000 ≈ 112 UF)
- Confirmación del proyecto piloto (Hacienda Ceres 1)
- Confirmación de Marcela Leyton como BIM Champion full-time

Propuesta válida hasta el 31 de mayo de 2026.

Contacto: Sergio Villanueva-Meyer, Principal Consultant, INFRATEK LLC.
Email: sergio@infratek.ai
WhatsApp: +1 551 430 9185
`.trim();

/** Approximate token count used to verify prompt caching is viable (Haiku 4.5 minimum is 4096). */
export const PROPOSAL_CONTEXT_APPROX_TOKENS = Math.ceil(PROPOSAL_CONTEXT.length / 3.5);
