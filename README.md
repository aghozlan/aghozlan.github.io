# Ahmad Ghozlan — Interactive Science Labs

**Live site:** [aghozlan.github.io](https://aghozlan.github.io)

Open-access interactive lessons for Lebanese students in Grades 1–12, built on the **5E inquiry model** (Engage → Explore → Explain → Elaborate → Evaluate). Every lab runs in any browser with no installation, no login, and no subscription — one link is enough.

---

## Table of Contents

1. [What This Is](#what-this-is)
2. [Tech Stack](#tech-stack)
3. [File Inventory](#file-inventory)
   - [Physics — Grade 7](#physics--grade-7)
   - [Physics — Grade 8](#physics--grade-8)
   - [Physics — Grade 9](#physics--grade-9)
   - [Biology](#biology)
   - [Arabic Language](#arabic-language)
   - [Mathematics](#mathematics)
4. [How Submissions Work](#how-submissions-work)
5. [AI Tutoring (Groq)](#ai-tutoring-groq)
6. [Anti-Cheat Design](#anti-cheat-design)
7. [Deploying Changes](#deploying-changes)
8. [Apps Script Setup](#apps-script-setup)

---

## What This Is

Each file in this repo is a self-contained interactive lesson or exam. The design philosophy:

- **No framework, no build step.** Pure HTML + CSS + Canvas API + vanilla JS.
- **5E pedagogy.** Every lesson follows Engage → Explore → Explain → Elaborate → Evaluate.
- **Canvas-based simulations.** All diagrams and experiments are drawn programmatically — not images.
- **Automatic grading.** Students submit to a Google Sheet via Apps Script. No paper, no manual entry.
- **AI Socratic tutoring.** Selected labs use the Groq API (llama-3.1-8b-instant) to provide guided, non-answer-giving feedback.
- **Mobile-first.** All interactions work on touchscreens. Drag-and-drop has tap equivalents throughout.
- **Student name pickers.** All assessment files use section-filtered Arabic name dropdowns — no free-text entry.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Front-end | HTML5 · CSS3 · Vanilla JS (ES2018+) |
| Simulation | Canvas API · Three.js (selected labs) |
| AI tutoring | Groq API → `llama-3.1-8b-instant` |
| Grade collection | Google Apps Script → Google Sheets |
| Hosting | GitHub Pages |
| Fonts | Google Fonts (varies per lab — Syne, Orbitron, Amiri, Cairo, IBM Plex, etc.) |

**Apps Script deployment URL** (shared across all labs):

```
https://script.google.com/macros/s/AKfycbzTDERohf666RJoXbhx5hK7hTxaOQa63CDFeEKiVeSL8o4u7iBZ0uVyuiFKiMDwggmU/exec
```

**CORS pattern:** All fetch calls use `Content-Type: text/plain;charset=utf-8` with `mode: 'no-cors'` — the only approach that bypasses CORS preflight for Apps Script without requiring OAuth.

---

## File Inventory

### Physics — Grade 7

#### Heat Transfer Series

| File | Title | Description |
|---|---|---|
| `heatlab.html` | **HeatLab — Part 1** | Heat vs temperature · falling-pin conduction animation · radiation glow canvas |
| `heatlab2.html` | **HeatLab — Part 2** | Convection currents · animated particle loops · sea breeze model |

#### Electricity Series

| File | Title | Description |
|---|---|---|
| `electricitylabG7.html` | **ElectricityLab — Part 1** | Circuit components · standard symbols · generators vs receivers |
| `electricitylab2G7.html` | **ElectricityLab — Part 2** | Open vs closed circuits (animated electrons) · conductor test · PhET link · screenshot upload with XHR compression |
| `electricitylab3G7.html` | **ElectricityLab — Pre-Test** | Circuit diagram reading (canvas) · symbol drag-match · conductor sorting · animated switch · circuit builder · Grade 7D only |

---

### Physics — Grade 8

#### Mechanical Waves Series

| File | Title | Description |
|---|---|---|
| `wavelab.html` | **WaveLab — Part 1** | Wave properties · transverse vs longitudinal · v = f·λ live lab · lightning mystery |
| `wavelab2.html` | **WaveLab — Part 2** | Wave behaviour · reflection · superposition · standing waves |
| `wavelab3.html` | **WaveLab — Part 3** | Sound waves · longitudinal pressure · pitch and frequency · resonance |
| `wave3d.html` | **Wave 3D Visualisation** | Three.js 3D wave explorer · E-field and B-field animation · tunable parameters |
| `waveassessment.html` | **Wave Assessment** | Graded MCQ assessment · submits to grade sheet |
| `waveexamG8.html` | **Wave Exam** | Formal exam · 5 anti-cheat versions · absentee version (`?v=F`) · timer · auto-submit |

#### Electromagnetic Waves Series

| File | Title | Description |
|---|---|---|
| `emwavesG8.html` | **EMWaves — Part 1: Spectrum Command** | Draggable spectrum explorer · 7 band deep-dives · Three.js 3D wave lab · 4 MCQ missions + Groq AI evaluator |
| `emwaves2G8.html` | **EMWaves — Part 2: Frequency Festival** | Spectrum Survivor drag game · Wave Detective · Wave Impostor (5 rounds) · v=fλ slider calculator · Home Hunt video challenge · AI Examiner |

---

### Physics — Grade 9

#### Forces & Equilibrium Series

| File | Title | Description |
|---|---|---|
| `forceslab.html` | **ForcesLab** | Contact vs distance forces · interactive force arrow tool · 6 real-world scenarios |
| `equilibriumlab.html` | **EquilibriumLab — Part 1** | Force Painter (draw vectors on canvas) · equilibrium condition · 4 interactive activities |
| `equilibriumlab2.html` | **EquilibriumLab — Part 2: Force Verdict Lab** | Equilibrium vs interaction pairs · Sorting Arena (drag/tap) · Body Separator slider · 3-stage Verdict Chamber |
| `hookslawG9.html` | **Hooke's Law Lab** | 3 interactive spring experiments (k = 20 / 80 / 200 N/m) · live T vs Δx graph · derive T = k·Δx · elastic limit · 6 real-world applications · Grade 9A–9D |

**Equilibrium series notes:**
- All three files share the same equilibrium context — each builds on the previous.
- Force vectors always originate from the correct point of application: weight from the centre of gravity, tension/normal from the contact point.
- The symbol **Δx** uses the proper Unicode Δ (U+0394) throughout — never an underscore.

---

### Biology

| File | Grade | Title | Description |
|---|---|---|---|
| `synapselab.html` | 9 | **SynapseLab — Nerve Transmission** | 3D synapse model · 12 critical thinking + 10 creativity questions · Groq AI Socratic tutor · session timer · full per-question chat log submitted to sheet |
| `biologyExamG12.html` | 12 | **Biology Exam — Grade 12** | Formal Grade 12 Biology examination |

**SynapseLab sheet columns:** Timestamp · Name · Class · Time Spent · Q1–Q4 MCQ · Open Answers · Score · Total Chat Turns · Chat CT\_1 through CT\_12 · Chat CR\_1 through CR\_10 · Full Chat Log

---

### Arabic Language

#### Lessons

| File | Grade | Title | Description |
|---|---|---|---|
| `bayanlab.html` | 9 | **بيانLab — علم البيان** | التشبيه التام والمجمل · الاستعارة التصريحية · أمثلة من القرآن الكريم · تفاعلي |
| `NumbersArabicG9.html` | 9 | **الأعداد بالعربية** | الأعداد والمعدود · قواعد المذكر والمؤنث · تطبيقات تفاعلية |

#### Exams

| File | Grade | Title | Description |
|---|---|---|---|
| `arabicExamG7.html` | 7 | **امتحان اللغة العربية — الصف السابع** | الفاعل · نائب الفاعل · المفعول به · الإعراب · التحويل من المعلوم إلى المجهول · 5 نسخ مضادة للغش · نسخة غائب `?v=F` · 23 علامة · 40 دقيقة · الشعبتان 7C و7D |

---

### Mathematics

| File | Grade | Title | Description |
|---|---|---|---|
| `grade1Fractions.html` | 1 | **Fractions — Grade 1** | Visual introduction · halves, thirds, quarters · interactive shapes |
| `grade3Fractions.html` | 3 | **Fractions — Grade 3** | Equivalent fractions · comparing and ordering · fraction of a set |

---

## How Submissions Work

All labs use the same Apps Script endpoint. The fetch call pattern across every file:

```javascript
await fetch(APPS_SCRIPT_URL, {
  method: 'POST',
  mode: 'no-cors',
  headers: { 'Content-Type': 'text/plain;charset=utf-8' },
  body: JSON.stringify({ sheet: 'SheetTabName', name, class: cls, ...answers })
});
```

**Why `text/plain`?** Using `application/json` with `no-cors` causes browsers to silently strip custom headers, breaking the request. `text/plain` is a CORS-safe content type that passes through without a preflight.

### Sheet Tab Names

| Lab | Sheet Tab |
|---|---|
| HeatLab | `HeatTransfer_G7` |
| ElectricityLab P1 | `Electricity_G7` |
| ElectricityLab P2 | `Electricity_G7_P2` |
| ElectricityLab Pre-Test | `Electricity_G7_Pretest` |
| WaveLab | `WaveLab_G8` |
| Wave Exam G8 | `WaveExam_G8` |
| EMWaves Part 1 | `EMWaves_G8` |
| EMWaves Part 2 | `EMWaves_G8_P2` |
| EquilibriumLab P1 | `Equilibrium_G9` |
| EquilibriumLab P2 | `Equilibrium_G9_P2` |
| Hooke's Law | `HookesLaw_G9` |
| SynapseLab | `Synapse_Biology` |
| Arabic Exam G7 | `Arabic_Exam_G7` |

---

## AI Tutoring (Groq)

**The API key is stored in Apps Script → Script Properties as `GROQ_API_KEY`.  
It is never written into any HTML file.**

The key survives all redeployments of the same Apps Script project. If you see an `invalid API` error:

1. Open the Apps Script editor
2. Run `diagnoseGroq()` from the function dropdown — it performs a live test and reports the exact error
3. If the key is missing or invalid: go to [console.groq.com](https://console.groq.com) → API Keys → Create API Key
4. Paste the new key into `storeGroqKey()`, run it once, then restore the placeholder and redeploy

```javascript
// In Apps Script — run once, then restore placeholder
function storeGroqKey() {
  var MY_GROQ_KEY = 'gsk_YOUR-KEY-HERE'; // ← replace, run, restore
  PropertiesService.getScriptProperties().setProperty('GROQ_API_KEY', MY_GROQ_KEY);
}
```

**Model:** `llama-3.1-8b-instant` · max_tokens: 300 · temperature: 0.7

**Labs using Groq:** `emwavesG8.html` · `emwaves2G8.html` · `synapselab.html`

All Groq-enabled labs have a **local fallback** that generates context-aware feedback if the API is unavailable — no dead ends for students.

---

## Anti-Cheat Design

Exam files (`arabicExamG7.html`, `waveexamG8.html`) use a deterministic version assignment:

```javascript
// Same student always gets same version
// Adjacent students (similar names) get different versions
function assignVersion(name, section) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  const sectionOffset = { '7C': 0, '7D': 1, '8A': 0, '8B': 1 }[section] || 0;
  return ['A','B','C','D','E'][(h + sectionOffset * 7) % 5];
}
```

- 5 versions per exam, each with completely different sentences and topics
- Version only revealed after the student selects their name
- Absentee (Version F) accessible via `?v=F` URL parameter — different topic entirely
- Production/composition questions (تأليف) require original sentences — LLMs cannot produce a matchable answer

---

## Deploying Changes

This is a standard GitHub Pages repo. The root `index.html` is the entry point.

```bash
# Edit a file locally, then:
git add .
git commit -m "Update lab name"
git push origin main
# GitHub Pages rebuilds in ~30 seconds
```

**Filename conventions in use:**

```
heatlab.html            # subject + topic + no grade suffix (G7 is implied)
electricitylabG7.html   # subject + topic + grade when needed for disambiguation  
emwavesG8.html          # always lowercase, no spaces
hookslawG9.html         # camelCase for multi-word subjects
arabicExamG7.html       # type (Exam/Lab/Assessment) before grade
NumbersArabicG9.html    # legacy — capitalised N, keep as-is
```

---

## Apps Script Setup

The Apps Script file (`Code.gs`) handles all incoming POST requests, routes by `sheet` field, formats timestamps in `Asia/Beirut` timezone, and appends rows to the correct tab.

**Key functions:**

| Function | Purpose |
|---|---|
| `doPost(e)` | Main entry — routes `action:'ai'` to Groq, everything else to sheet handler |
| `handleSubmission(data, sheetName)` | Finds/creates sheet tab, ensures headers, appends row |
| `buildRow(data, sheetName, ts)` | Returns ordered array of values for each sheet type |
| `callGroq(data)` | Proxy to Groq API — reads key from Script Properties |
| `storeGroqKey()` | One-time setup: store Groq key in Script Properties |
| `diagnoseGroq()` | Live test — run from editor to debug API issues |
| `clearGroqKey()` | Wipe key before rotating to a new one |

**Required `appsscript.json` (manifest):**

```json
{
  "timeZone": "Asia/Beirut",
  "dependencies": {},
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8",
  "oauthScopes": [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/script.external_request"
  ]
}
```

> `"runtimeVersion": "V8"` is required — the legacy Rhino runtime is deprecated and will throw errors.

**After any Apps Script change:** Deploy → Manage Deployments → Edit (pencil icon) → Version: New Version → Deploy. The URL stays the same.

---

*Built with care for Lebanese classrooms — Ahmad Ghozlan · Physics & Science Teacher · Lebanon · 2025–2026*
