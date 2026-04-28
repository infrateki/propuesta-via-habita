# Multi-Terminal Claude Code Orchestration
## COMMS.md + CLAUDE.md Pattern

**Author:** Sergio Villanueva-Meyer · INFRATEK LLC
**Origin:** VIA-HABITA Proposal Site Build (April 2026)
**Technique:** Boris Cherny Parallel Terminals (T1–T5)

---

## What This Solves

When building a project with multiple Claude Code terminals running in parallel, each terminal operates independently — it has no awareness of what other terminals are doing, what files they've changed, or what decisions have been made. This creates three problems:

1. **File conflicts** — Two terminals edit the same file simultaneously
2. **State blindness** — A terminal doesn't know what's been completed by others
3. **Decision drift** — Critical parameters (prices, names, dates) get inconsistent across terminals

The COMMS.md + CLAUDE.md pattern solves all three by giving every terminal a shared source of truth inside the repo itself.

---

## The Two Files

### CLAUDE.md — The Constitution
Lives in the project root. Every Claude Code terminal reads this automatically when it opens the project. It contains:

- **What the project is** (one paragraph)
- **Tech stack** (frameworks, languages, deployment target)
- **Confirmed facts** that must never be wrong (prices, names, dates, URLs)
- **Design constraints** (colors, fonts, responsive breakpoints, accessibility rules)
- **File ownership rules** (which terminal owns which files)
- **Build/test commands** (`npm run build`, `npx tsc --noEmit`, etc.)
- **What to do when finished** (run build, update COMMS.md)

**Key principle:** CLAUDE.md is written once at project start and rarely changes. It's the "system prompt" for every agent working on the project.

### COMMS.md — The Coordination Board
Lives in the project root. Every terminal reads this before starting work and updates it when done. It contains:

- **Current project status** (phase, sprint, blockers)
- **Task board** with assignable tasks (P1, P2, P3...)
- **File ownership table** (who owns what — prevents conflicts)
- **Terminal log** (what each terminal has done, timestamped)
- **Decision log** (what was decided, by whom, when)
- **Blocker section** (what's stuck and why)
- **Next sprint** (what comes after current work)

**Key principle:** COMMS.md is a living document that every terminal reads and writes. It's the "shared memory" between agents.

---

## Setup Instructions

### Step 1: Create CLAUDE.md

At project start, create `CLAUDE.md` in the repo root:

```markdown
# CLAUDE.md — Project Instructions for All Terminals

## Project: [PROJECT NAME]

### What this is
[One paragraph describing the project, its purpose, and who it's for.]

### Stack
- [Framework]
- [Styling]
- [Key libraries]
- [Deployment target]

### Language
[UI language. Code language.]

### Before doing any work
1. **Read COMMS.md** — check status, blockers, and your terminal's ownership
2. **Check file ownership** — do NOT modify files owned by another terminal
3. **Update COMMS.md** when you start and finish work

### Confirmed facts (source of truth)
- [Critical parameter 1]: **[value]**
- [Critical parameter 2]: **[value]**
- [Person]: **[Full Name]** — [Role]

### Design system
- [Colors, typography, spacing, component patterns]

### Critical constraints
- [Constraint 1]
- [Constraint 2]

### Commands
npm run dev / npm run build / npx tsc --noEmit

### When you finish a task
1. Run type check and build
2. Update your section in COMMS.md
3. Note new exports in COMMS.md if other terminals need them
```

### Step 2: Create COMMS.md

Create `COMMS.md` in the repo root:

```markdown
# COMMS.md — Terminal Orchestration Board
## [PROJECT NAME]

**Last updated:** [DATE] · by [WHO]
**Status:** 🟡 IN PROGRESS

---

## HOW TO USE THIS FILE

Each Claude Code terminal MUST:
1. **READ this file** at the start of every task
2. **UPDATE your section** when you start/finish work
3. **CHECK blockers** before modifying shared files
4. **NEVER modify another terminal's owned files**
5. **When done**, change task status to ✅ and add timestamp

---

## PROJECT STATUS

| Component | Terminal | Status | Last Update | Notes |
|---|---|---|---|---|
| [Component 1] | T1 | ⬜ TODO | | |
| [Component 2] | T2 | ⬜ TODO | | |
| [Component 3] | T3 | ⬜ TODO | | |

---

## TASK BOARD

| # | Task | Owner | Status | File(s) |
|---|---|---|---|---|
| P1 | [Description] | | ⬜ TODO | [files] |
| P2 | [Description] | | ⬜ TODO | [files] |

---

## FILE OWNERSHIP

T1 owns: [files]
T2 owns: [files]
T3 owns: [files]
SHARED: package.json, COMMS.md, CLAUDE.md

---

## TERMINAL LOG

### T1 — [Name]
[Timestamped entries]

### T2 — [Name]
[Timestamped entries]

### ORCHESTRATOR
[Entries from orchestrator]

---

## BLOCKERS

🔴 BLOCKER T#: [Description]
   Blocked by: [T# or external]
   Impact: [What can't proceed]
   Resolution: [What's needed]

---

## DECISION LOG

| Date | Decision | Made by | Impact |
|---|---|---|---|

---

## NEXT SPRINT

- [ ] [Future task]
```

---

## Terminal Prompt Structure

Every terminal prompt follows this pattern:

```
Read COMMS.md and CLAUDE.md. You are T[N] — [Component] owner.

Tasks [P#] + [P#]:

[Detailed description]

### Constraints
- DO NOT modify files outside of: [owned files]

### When done
1. Run npm run build — must pass
2. Update COMMS.md: mark tasks ✅ DONE with timestamp
```

**Five rules:**
1. Every prompt starts with **"Read COMMS.md and CLAUDE.md"**
2. Every prompt declares **terminal identity**
3. Every prompt lists **owned files**
4. Every prompt ends with **"Update COMMS.md"**
5. Never assign **two terminals to the same file**

---

## Execution Order

```
Phase 1: T1 (Foundation)     — ALONE FIRST (~3-5 min)
Phase 2: T2, T3, T4, T5     — ALL IN PARALLEL (~10-15 min)
Phase 3: Any terminal        — INTEGRATION TEST
```

T1 creates the project skeleton. T2–T5 build on it in parallel without conflicts. Integration test verifies everything works together.

---

## Orchestrator Role (Claude Chat)

The orchestrator (human + Claude chat):
1. Creates CLAUDE.md and COMMS.md
2. Writes T1–T5 prompts
3. Pushes data files via Filesystem MCP
4. Updates COMMS.md with new tasks and decisions
5. Writes follow-up prompts for idle terminals

**Reactivate idle terminal:**
```
Read COMMS.md, pick up the next unclaimed TODO task, and start working.
```

**Restart crashed terminal:**
```
Read COMMS.md and CLAUDE.md. You are T[N] — [Component] owner.
Check the terminal log for your previous work. Pick up where you left off.
```

---

## Anti-Patterns

1. **Don't give two terminals the same file** — #1 conflict source
2. **Don't skip COMMS.md** — terminals will duplicate work or break things
3. **Don't put decisions only in prompts** — other terminals won't see them
4. **Don't run integration test early** — wait for ALL terminals to finish
5. **Don't skip the build check** — if it doesn't build, it's not done

---

## Quick Reference

| Need to... | Do this |
|---|---|
| Start new project | Create CLAUDE.md + COMMS.md, write T1 prompt |
| Add parallel work | Write T2–T5 prompts with file ownership |
| Change a confirmed fact | Update CLAUDE.md + COMMS.md decision log |
| Add a new task | Add to COMMS.md task board as ⬜ TODO |
| Push data to repo | Filesystem MCP from orchestrator |
| Fix cross-terminal issue | Add blocker in COMMS.md |
| Reactivate idle terminal | "Read COMMS.md, pick up next TODO" |
| Deploy | One terminal: git push + deploy, update COMMS.md to 🟢 |
