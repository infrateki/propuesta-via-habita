# VIA-HABITA Continuation Prompt
## Paste this into a new Claude conversation to pick up after Pablo's meeting

---

### PROMPT (copy everything below this line):

I need your help continuing a project we built in a previous session. I'll give you the full context, then I'll share Pablo's feedback from our meeting so we can update everything.

## Project: VIA-HABITA Proposal Site + BIM Implementation Proposal

**Me:** Sergio Villanueva-Meyer, Principal Consultant, INFRATEK LLC (Dorado, Puerto Rico)
**Client:** Pablo Otero Olivos, Gerente de Operaciones de Desarrollo, Grupo Inmobiliario Habita (La Serena, Chile)

### What exists right now:
1. **Live website:** https://viahabita.infratek.ai — Apple Store-style interactive proposal built with Next.js 15, Tailwind, Framer Motion, TypeScript
2. **GitHub repo:** https://github.com/infrateki/propuesta-via-habita.git — deployed on Vercel
3. **Signed PDF proposal:** available at /documento on the site and downloadable as /proposal.pdf
4. **Stripe payment link:** https://buy.stripe.com/8x2aEX4Cfb5f90EalH1RC04 — for $4,500 anticipo

### Site pages:
- `/` — Hero with animated counters
- `/propuesta` — 8 scroll-animated sections covering full BIM implementation scope
- `/configurador` — 4-step Apple Store configurator with real-time pricing
- `/comparativo` — Two tabs: "Precios" (12-platform comparison) + "Funcionalidades" (156-feature matrix)
- `/documento` — Inline PDF viewer
- `/gracias` — Post-payment confirmation

### Confirmed pricing:
- Implementation Phase 1: **$12,500** (100% virtual, 4 months)
- Visits to La Serena: **$2,000 each** (add-on)
- Platform subscription: **$2,000/project/year** (unlimited users, starts Month 6)
- Enterprise: 10+ projects = $1,600/project
- Platform development ($5,000 value): **included free** with BIM implementation
- Anticipo: **$4,500**
- Payment milestones: H0=$4,500 + H1=$3,000 + H2=$2,500 + H3=$2,500 = $12,500

### Team:
- Marcela Leyton — BIM Champion (full-time)
- Macarena Andrade — Arquitecta Piloto
- Pablo Otero — Sponsor + Lead
- Sergio V-M + 3-person INFRATEK team
- Consultants: RSM + Iweise (BOGA is out)

### 9 Entregables (E-01 through E-09):
BEP v1.0, Manual nomenclatura, Criterios modelado, Protocolo coordinación, Modelo federado, Registro interferencias, Registro capacitación, Manual replicación, Informe KPIs

### Key facts:
- "Habita no tiene un problema de BIM. Tiene un problema de procesos."
- Pilot project: pending Pablo's decision (Faldeos III ET3 vs Macarena's 2D project)
- Timeline: May–August 2026
- Subscription starts Month 6 (platform is being BUILT during months 1-5)
- Go/No-Go gate: 6 objective criteria. Phase 2 not charged if criteria unmet.
- VIA = Visualización · Integración · Automatización (Stanford VDC 2025)
- Proposal consolidates two previous ones (PROP-001 at $14,500 + PROP-002 at $5K+$12K/yr)

### Tech stack:
Next.js 15, App Router, TypeScript, Tailwind CSS, Framer Motion, Stripe Payment Links, Vercel deployment

### Orchestration system:
The project uses CLAUDE.md (project constitution read by all Claude Code terminals) + COMMS.md (living coordination board) for multi-terminal parallel builds. Each terminal owns specific files and updates COMMS.md when done.

### What I need help with today:
I just met with Pablo. Here's his feedback: [I WILL PASTE PABLO'S FEEDBACK HERE]

Based on his feedback, I need to:
1. Update the proposal markdown (PROPOSAL-v4.md)
2. Regenerate the signed PDF
3. Update the website content via Claude Code terminal prompts
4. Push changes to GitHub (auto-deploys to Vercel)

You have access to my machine via Filesystem MCP at: `C:\Infratek\repos\via-habita-propuesta`

Please analyze Pablo's feedback and tell me exactly what needs to change before we start generating prompts and files.
