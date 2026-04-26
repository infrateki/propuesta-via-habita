# CONTENT GAPS — From Ontology Review
# Items from the v2.0/v4.0 ontology that should be added to the Next.js site

## 🔴 HIGH PRIORITY (add before directorio)

### 1. "$21,000+ valor de mercado" framing
The ontology Section 14 shows a powerful value breakdown:
| Componente | Valor mercado | Incluido |
|---|---|---|
| Consultoría 4 meses (~50h, 3 ses/sem) | $11,500 | ✓ |
| Configuración VIA-HABITA (CDE, visores, Habi) | $5,000 | ✓ sin costo |
| Migración Notion + PlanGrid | $1,500 | ✓ sin costo |
| Desarrollo agente Habi | $3,000 | ✓ sin costo |
| BEP + 8 entregables + ISO 19650 + templates | Incluido | ✓ |
| **TOTAL VALOR** | **$21,000+** | → **$12,500** |

**Where to add:** PriceSummary.tsx in configurator — add a subtle "Valor entregado: $21,000+" line above the total, with the $12,500 shown as the actual price. Makes the investment feel like a deal, not a cost.

### 2. Payment process flow
The ontology specifies: "INFRATEK entrega → Pablo/Marcela revisan (5 días hábiles) → Aprobación formal → Pago se libera."
**Where to add:** Below the payment milestones table on /propuesta investment section. Shows that Habita controls the release of every payment.

### 3. Price consolidation explanation
Pablo has seen PROP-001 ($14,500) and PROP-002 ($5K+$12K/yr) separately.
**Where to add:** A one-liner in the investment section or configurator:
"Esta propuesta integra la implementación BIM (PROP-001) y el codesarrollo de plataforma (PROP-002), eliminando duplicidades en consultoría y setup. Resultado: mismo alcance, menor inversión."

### 4. VIA acronym explanation
**Where to add:** First mention of "VIA-HABITA" on /propuesta hero:
"VIA = Visualización · Integración · Automatización — metodología VDC Stanford 2025"

## 🟡 MEDIUM PRIORITY (polish phase)

### 5. Progressive scaling table
Shows how Habita transitions from PlanGrid to VIA-HABITA over time:
| Período | En VIA-HABITA | En PlanGrid/Notion | Costo anual |
|---|---|---|---|
| Mes 5–8 (2026) | 1–2 nuevos | 4–5 existentes | $2,000–$4,000 |
| Mes 9–12 (2026) | 3–4 | 2–3 | $6,000–$8,000 |
| Año 2 (2027) | 5–6 | 0–1 | $10,000–$12,000 |
| Año 3 (2028) | 6–7 | 0 | $12,000–$14,000 |
**Where to add:** Below the subscription pricing in /propuesta investment section or as an expandable detail in the configurator.

### 6. Year 1 total range
"$12,500 (Fase 1) + $4,000–$6,000 (suscripción 8 meses) + $720–$1,920 (IA) = $17,220–$20,420"
**Where to add:** The configurator already calculates this dynamically. Verify it matches this range with default config (1 visit + 3 projects + básico AI).

### 7. Mutual commitments table
INFRATEK commits to X / Habita commits to Y — two-column layout.
**Where to add:** /propuesta after the KPIs section or inside the Gate section. Frames the engagement as a partnership, not a vendor contract.

## 🟢 LOW PRIORITY (post-launch)

### 8. v2.0 software-only toggle
Toggle on /configurador: "Ver solo plataforma (sin implementación)"
Shows $2,000/project pricing without the $12,500 implementation.
Useful if board asks "what if we just want the software?"

### 9. Presentation mode
- F key toggles fullscreen on /propuesta
- ←/→ arrows navigate between sections
- P opens print stylesheet (one section per page)
Useful for boardroom projection.

### 10. Keyboard nav hint
Small "Navegar: ←/→" hint in bottom corner of /propuesta.
Only shows on desktop, disappears after first use.
