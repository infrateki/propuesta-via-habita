# CLAUDE.md — Project Instructions for All Terminals

## Project: VIA-HABITA Interactive Proposal Site

### What this is
An Apple Store-inspired interactive proposal website for INFRATEK LLC to present a BIM implementation + CDE platform proposal to Grupo Inmobiliario Habita (Chile). Pablo Otero (client) can explore the proposal, configure his plan with interactive controls, see prices in real-time, and pay via Stripe.

### Stack
- Next.js 15 (App Router, TypeScript)
- Tailwind CSS (dark mode default)
- Framer Motion (animations)
- Stripe (payments)
- Lucide React (icons)
- Deployed on Vercel → viahabita.infratek.ai

### Language
ALL user-facing text is in **Spanish**. Code comments and variable names in English.

### Before doing any work
1. **Read COMMS.md** — check current status, blockers, and your terminal's ownership
2. **Check file ownership** — do NOT modify files owned by another terminal
3. **Update COMMS.md** when you start and finish work

### Design system
- Dark mode: bg `#09090b`, text `#fafafa`
- Accent blue: `#0071E3` (Apple blue)
- Success green: `#30D158`
- Danger red: `#FF453A`
- Surface: `#1c1c1e`
- Border: `#38383a`
- Typography: system-ui with SF Pro fallback
- Stainless-steel architectural minimalism, NOT generic AI gradient slop

### Confirmed pricing (source of truth)
- Implementation: **$12,500** (100% virtual, base)
- Visits to La Serena: **$2,000 each** (add-on, NOT included)
- Platform: **$2,000/project/year** (unlimited users)
- Enterprise: **$1,600/project** at 10+ projects (20% off)
- AI Básico: ~$55/mo/project (Haiku)
- AI Intermedio: ~$140/mo/project (Sonnet)
- AI Premium: ~$350/mo/project (Opus)
- Knowledge Graph: **$5,000** setup + year 1, **$2,500/year** renewal
- Self-hosted: **$3,000** setup
- GPU Básica: **$8,000**, Intermedia: **$15,000**, Pro: **$35,000**
- Hourly: Sergio $200, Senior $120, Training $80
- Anticipo: **$4,500**

### Key people
- **Marcela Leyton** — BIM Champion / BIM Manager (full-time)
- **Macarena Andrade** — Arquitecta Piloto
- **Pablo Otero** — Sponsor + Lead
- **Sergio Villanueva-Meyer** — Principal Consultant, INFRATEK

### Critical constraints
- NO localStorage or sessionStorage (doesn't work in some environments)
- All displayed numbers MUST be rounded (no floating point artifacts)
- Stripe must gracefully fallback when keys are missing
- Mobile responsive at 375px minimum
- robots: noindex, nofollow (private proposal)
- PROPOSAL-v4.md is the content source of truth — do NOT modify it

### Commands
```bash
npm run dev          # Start dev server
npm run build        # Production build (must pass before deploy)
npm run lint         # ESLint check
npx tsc --noEmit     # Type check without emitting
```

### When you finish a task
1. Run `npx tsc --noEmit` to verify types
2. Run `npm run build` to verify production build
3. Update your section in COMMS.md with status and notes
4. If you created new exports that other terminals need, note them in COMMS.md
