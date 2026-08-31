# FurnaceWatch Brand Copy — Ground Truth

> **This document is the single source of truth for all customer-facing copy.**
> Before writing any page, email, ad, or sales material, read this first.
> If new copy contradicts what is here, update this document first and get alignment, then update the copy.

---

## 1. What FurnaceWatch Is

FurnaceWatch is a **remote diagnostic sensor** for gas furnaces. It mounts on the exterior of any high-efficiency furnace cabinet and monitors operating state continuously — detecting when furnace components are active and flagging when they fail.

When a furnace fails, FurnaceWatch identifies the failure mode and notifies your team instantly. Service technicians know what happened before they talk to the customer. Dispatchers route the right technician with the right knowledge. Fleet managers see every customer location — in real time.

---

## 2. What FurnaceWatch Is NOT

This is the most important section. These mistakes have appeared in copy before — do not repeat them.

| Wrong framing | Why it is wrong | Correct framing |
|---|---|---|
| "Predicts when the motor will seize" | FurnaceWatch does not estimate time-to-failure or predict future events | "Detects when the motor isn't running when it should be" |
| "Alerts you X hours before failure" | We do not provide a countdown to failure | "When a failure occurs, your team knows immediately" |
| "Predictive maintenance" | Implies FFT-based wear curve analysis and Remaining Useful Life estimation — that is a different category of product | "Remote diagnostics" or "Failure mode detection" |
| "Bearing defect frequency detected" | This is traditional PdM/FFT language. Not what the product does. | "Abnormal operating sequence detected" or "Failed ignition detected" |
| "Bearing wear" as a detected state | Same. We do not measure bearing wear. | "Flame dropout," "Failed ignition," "Inducer absent" |
| "ADXL355," "ESP32," "TFLite," "FFT" | Hardware and software implementation details. Do not appear in customer copy. | Describe capability, not implementation. |
| "Catch failures before they happen" | Implies prediction. We diagnose failures as they occur. | "Know what failed the moment it happens" |

---

## 3. What FurnaceWatch Actually Does

The sensor captures vibration signatures from the outside of the furnace cabinet. The machine learning model running on the sensor classifies what operating state the furnace is in — in real time, without a cloud connection. When something happens that should not, or fails to happen when it should, the system identifies the failure mode and sends an alert.

**This is state-based failure diagnosis, not wear prediction.**

The system knows what a normally functioning furnace looks and feels like mechanically. It flags deviations as they occur and classifies them into known failure modes.

---

## 4. Failure Modes the System Detects

These are the approved failure mode names. Use these exact terms in copy.

| Failure Mode | Plain Language Description |
|---|---|
| **Failed ignition** | The ignition sequence ran but flame was never established |
| **Flame dropout** | Flame established and then extinguished before the cycle should have ended |
| **Inducer absent** | A heat call was received but inducer motor activity was not detected |
| **Short cycling** | Furnace turning on and off repeatedly without completing a normal cycle |
| **Combustion instability** | Irregular flame signature during an otherwise normal operating cycle |
| **Abnormal operating sequence** | Components active or inactive in an order inconsistent with a normal cycle |

---

FurnaceWatch is sold to two co-equal audiences. The product and its diagnostic capability are **identical** for both — only the framing changes. The marketing site presents these two tracks via a **"For Homeowners / For HVAC Professionals" toggle** (see Section 6).

### Audience A: HVAC Service Companies
The fleet customer. They manage fleets of residential and light commercial furnaces across many customer locations. Their pain is:
- Finding out a furnace failed when the homeowner calls
- Rolling trucks without knowing what the problem is
- Emergency callbacks and repeat visits
- No visibility across their fleet without physically visiting each site
- Standing behind 10-year warranties on equipment they installed years ago

### Audience B: Homeowners
The single-furnace customer. They want to know the moment their furnace fails — and exactly why — instead of discovering it hours later in a cold house. Their pain is:
- Discovering the furnace is down only when the house gets cold (the thermostat still reads as "calling for heat," so nothing looks wrong)
- Not knowing what actually failed when they call for service
- Uncertainty about whether a repair targets the real problem

### Secondary: Property Managers
Multi-unit residential or commercial property managers monitoring HVAC across a portfolio. Their needs overlap the HVAC-fleet track (portfolio-wide visibility) and the homeowner track (per-unit failure clarity).

---

## 6. Value Proposition by Audience

> The site presents two tracks behind a toggle. **For Homeowners** and **For HVAC Professionals** below are the two top-level tracks; the role-specific blocks (Service Managers, Dispatchers, etc.) live under the HVAC Professionals track.

### Track 1 — For Homeowners

**Headline:** "Know the moment your furnace fails — and exactly why."
**Alternate:** "Don't wait for a cold house to find out."

- **Instant failure awareness** — "Your thermostat still says it's calling for heat. Your furnace stopped three hours ago. FurnaceWatch tells you the second it happens — not at 3 AM when you wake up cold."
- **Know the cause, not just the symptom** — "Not 'it's broken,' but 'the igniter fired and the flame never lit.' You walk into the repair conversation already informed."
- **Fix the right problem** — "When you know what failed, you can have a straight conversation about the fix. The right repair, the first time."

> **Guardrail:** The "fix the right problem" message must never imply technicians overcharge or that the homeowner is being taken advantage of. Frame it as an *informed homeowner* and a *right-first-time repair* — never "avoid getting ripped off."

### Track 2 — For HVAC Professionals

**Headline:** "Every furnace in your fleet. One dashboard. The failure mode before the call."

- **Fleet health at a glance** — "Every location. One dashboard. No site visit required to know what's running."
- **Warranty obligation, de-risked** — "You warranted it for a decade. Now you'll know what happened before the homeowner does."
- **Smarter truck rolls** — "Walk in knowing. Leave faster. No cold-call diagnosis in the driveway."

#### For Service Managers
- "See the status of every customer furnace in your fleet without leaving your desk."
- "When a furnace fails, your team knows the failure mode before the customer calls."
- "Stop chasing emergency calls. Start dispatching with context."

### For Dispatchers
- "Route the right technician with the right knowledge — before the truck leaves."
- "Critical, warning, and healthy — see which units need attention right now."

#### For Field Technicians
- "Walk in knowing the failure mode. Leave faster."
- "The first 15 minutes of diagnosis happen before you arrive."
- "Remote context replaces guesswork."

#### For Property Managers
- "One dashboard for every unit in your portfolio."
- "No more waiting for tenant complaints to discover HVAC failures."

---

## 7. Approved Messaging Pillars

### Pillar 1 — Instant Remote Diagnosis
When a furnace fails, FurnaceWatch tells you what happened and why — before anyone calls you.

**Approved phrases:**
- "Know what failed. Before you roll a truck."
- "Remote diagnostics for every furnace in your fleet."
- "When the furnace goes down, you know why."
- "Know what happened before the customer does."

### Pillar 2 — Fleet Visibility
One dashboard for your entire customer base. Health status updated continuously from live sensor data.

**Approved phrases:**
- "Every location. One dashboard."
- "See your whole fleet at a glance."
- "Your fleet, watched around the clock."
- "Fleet-wide health scores. Live, not scheduled."

### Pillar 3 — Better Truck Rolls
Technicians arrive knowing the failure mode. No cold calls. No guessing.

**Approved phrases:**
- "Walk in knowing. Leave faster."
- "Context before the job. Every time."
- "The right tech with the right parts, every dispatch."

### Pillar 4 — Non-Invasive, Works on Any Furnace
Mounts on the exterior of any gas furnace. No wiring into the control board. No HVAC license required to install.

**Approved phrases:**
- "Mounts on any furnace in 15 minutes."
- "No modifications. No wiring. Just clip and connect."
- "Works on every gas furnace we have tested."

---

## 8. Approved Taglines

### Hero / Primary
- **"Know before the furnace fails."** — current hero headline, keep
- "When the furnace goes down, you know why." — alternate hero

### Sub-headlines
- "Remote diagnostics for your entire fleet."
- "Failure mode detection, not guesswork."
- "Know what failed. Before you roll a truck."
- "Walk in knowing. Leave faster."
- "Every location. One dashboard."
- "Your fleet, watched around the clock."
- "Fleet-wide health scores. Live, not scheduled."

### Call to Action
- **"Stop reacting. Start knowing."** — use in CTAs (replaces "start predicting")
- "See it live. Request a demo."
- "Get the full picture. Request a demo."

---

## 9. The Technology (Plain Language for Customer Copy)

FurnaceWatch uses a vibration sensor mounted on the outside of the furnace cabinet. It captures the mechanical signatures produced by each component running — the draft inducer, the igniter, the burner flame, the blower motor. A machine learning model running on the sensor classifies what is happening in real time, with no internet connection required.

When the furnace completes a normal heating cycle, no alert is sent. When a component fails to start, shuts down early, or the cycle does not follow the expected sequence, the system identifies the failure mode and sends an alert — in under two seconds.

**Key capability points (approved):**
- On-device AI — inference runs on the sensor, not in the cloud
- Works offline — failure detection does not depend on internet connectivity
- Installs in 15 minutes — mounts to the exterior of any gas furnace
- No modifications to the furnace — nothing penetrates the cabinet
- Live telemetry — data uploads when connected; detection runs continuously regardless
- Multi-tenant portal — fleet health, alerts, history, and role-based access

---

## 10. Approved Stats and Claims

These are the claims we can stand behind. Do not invent new numbers without data.

| Claim | Approved phrasing |
|---|---|
| Alert speed | "Under 2 seconds from failure to alert" |
| Accuracy | "94% furnace state classification accuracy" |
| Installation | "15-minute installation on any standard gas furnace" |
| Offline operation | "Works offline — no internet required for on-device detection" |
| Uptime | "99.9% platform uptime SLA" |
| Fleet | "One dashboard for every furnace in your fleet" |

---

## 11. Sample Testimonial-Style Copy (Templates)

Use these as drafting guides. Replace name/company when using real customer quotes.

> "We used to find out a furnace was down when the homeowner called in a panic. Now we know the failure mode before we pick up the phone. We can dispatch the right technician with the right parts — no guessing."
> — Service manager, residential HVAC company

> "The remote diagnostic detail changes how we run dispatching. One of our units failed at 2 AM — FurnaceWatch logged the failure mode before anyone knew there was a problem. The homeowner woke up to a message from us, not a cold house."
> — Lead technician, HVAC service company

> "Fleet visibility across 200+ customer locations used to mean spreadsheets and phone calls. The map view and health scores let my team prioritize every morning in under five minutes."
> — Owner, HVAC service company

---

## 12. Founder Story (for About page and press)

The founder experienced repeated, expensive furnace failures — failed flame sensors, a draft inducer that showed signs for months before quitting, warranty service calls that required scheduling, waiting, and still didn't prevent the next failure. Each time a technician came out, they diagnosed the problem in minutes and noted the warning signs had been building for weeks. The information existed — in the vibration and mechanical behavior of the furnace itself — but no one was listening to it.

FurnaceWatch was built to surface that information: not just for homeowners, but for the HVAC service professionals who maintain thousands of furnaces across their customer base. The failure always happens. What changes with FurnaceWatch is that your team knows what happened and why before the first call comes in.

---

## 13. Copy Review Checklist

Before publishing any copy, verify:

- [ ] Does it describe FurnaceWatch as a **diagnostic** tool, not a predictive one?
- [ ] Does it avoid "predicts," "before failure," "bearing wear," or "motor seize"?
- [ ] Does it speak to the value for **HVAC service companies** first?
- [ ] Does it avoid hardware-specific terms (ADXL355, ESP32, TFLite, FFT)?
- [ ] Is the failure mode language drawn from Section 4 of this document?
- [ ] Are all stats drawn from Section 10?
- [ ] Has it been reviewed against the "What NOT to Say" table in Section 2?
