# FurnaceWatch Brand Copy — Ground Truth (v2)

> **This document is the single source of truth for all customer-facing copy.**
> Before writing any page, email, ad, or sales material, read this first.
> If new copy contradicts what is here, update this document first, then the copy.
>
> **v2 — 2026-08-30.** Single audience: HVAC service companies. The v1 dual-audience
> version (homeowner track included) is archived at
> `docs/archive/BRAND_COPY_v1_dual-audience.md` for the future consumer site.
> The claims audit behind this version is `docs/REDESIGN_PLAN.md` §1.2.

---

## 1. What FurnaceWatch Is

FurnaceWatch is a **furnace-mounted diagnostic sensor and fleet portal for HVAC service
companies**. A technician mounts the sensor on the furnace during a normal maintenance
visit. It powers from the furnace's own 24V transformer, senses the heat call from the
thermostat wires, and follows every heating cycle — inducer, ignition, blower — around
the clock.

When a cycle goes wrong, the failure gets a name and the service company's team gets a
push notification — before the customer calls. The portal shows every monitored furnace
in one list, and the company's customers can log in to see only their own equipment.

**The product and the platform are both called FurnaceWatch.** No sub-brands, no model
numbers in customer copy.

---

## 2. The Audience

The buyer is a **residential HVAC service company** — owner or GM signs, the service
manager or dispatcher champions it, technicians install and live with it.

| Role | What copy must answer for them |
|---|---|
| Owner / GM | Does this make maintenance agreements worth more, cut callbacks, protect me on warranty installs? |
| Service manager / dispatcher | Will I know what failed before I assign the truck? What does the alert say? |
| Technician | How do I install it? Does it make me look good on the job? |
| Office / CSR | Can I see the customer's furnace while they're on the phone? |

Property managers and OEM/distributor partners are secondary — a mention, never a track.
**Homeowners are not an audience of this site.** Homeowner-facing copy belongs to the
future consumer site only.

---

## 3. Claims Policy — the most important section

**Decision (2026-08-30): FurnaceWatch marketing uses no accuracy numbers and no
unbacked quantitative claims. None.** The buyer doesn't care whether it's 95% or 99% —
it has to work for them. Every numeric or capability claim must trace to a file in the
repos, and the register in `REDESIGN_PLAN.md` §1.2 governs.

### Prohibited (as of 2026-08-30)

| Never say | Why |
|---|---|
| "Patented" / "patent pending" | Provisional drafted, **not filed**. Revisit only with a filing receipt. |
| Any accuracy number ("94%", "&lt;3% false positives") | Policy above; single-furnace validation only. |
| "99.9% uptime SLA", "&lt;2s alerts", "6× faster" | No basis exists. |
| "Predicts", "before failure", "catches early signs", "predictive maintenance" | The product is state-based **diagnosis**, not prediction. |
| "Bearing wear", "motor about to seize" | Not detected. |
| "Email + SMS alerts", "multi-channel" | Push notifications only today. |
| "Fleet map" | Not built. "Fleet list" is real. |
| "15-minute install", "no wiring", "no technician needed", "plug into any outlet", "QR Wi-Fi setup" | The install is a technician job: cabinet mount, 24V transformer leads, thermostat-wire sensing; Wi-Fi is configured before the unit ships. |
| "Ships in 2 business days", "30-day pilot", "no credit card" | No fulfilment or billing exists. The design-partner program is the honest offer. |
| Hardware/stack terms: ADXL355, ESP32, TFLite, FFT, Hz, model sizes, inference times | Implementation detail. Describe capability, never the stack. |
| "Flame detection" | The sensed signal is ignition / gas-valve activity, not flame rectification. Say "ignition". |
| Invented testimonials, invented logos, invented outcome stats | Never again. Social proof waits for real design partners. |

### Approved qualitative phrasings

- "Validated on instrumented furnaces; wider validation underway."
- "Detection runs on the sensor itself — a Wi-Fi drop never means an unwatched furnace."
- "Installed by your technician during a normal maintenance visit."
- "Push notifications to your team's phones, naming the failure mode."
- "Every monitored furnace in one list, with health scores and cycle history."
- "Your customers see only their own equipment."

---

## 4. Failure Modes — approved names

Use these exact names. They are the intersection of what the detection has real captured
signatures for and what the portal can raise today.

| Site name | Plain-language description |
|---|---|
| **Heat call with no ignition** | The thermostat is calling for heat and the furnace has not fired |
| **Igniter failure** | The ignition sequence ran and the burner did not light |
| **Flame sensor failure** | The burner lit and dropped out early, cycle after cycle |
| **Pressure switch / rollout trip** | The inducer ran and ignition was never attempted |
| **Short cycling** | Starting and stopping without completing normal cycles |
| **Extended run** | A cycle running far past normal length |
| **Sensor offline** | The sensor stopped reporting — the unit is never silently unwatched |

**Do not list** (not detectable today): gas valve failure, blower motor failure, inducer
degradation. Revisit when `FMEA.md` gains captured signatures for them.

---

## 5. Value Pillars — three, plus proof

1. **Know what failed before the customer calls.** Diagnosis with named failure modes,
   the moment it happens. Not prediction.
2. **Dispatch with the diagnosis.** Right tech, right parts, one visit. The first
   fifteen minutes of troubleshooting happen before the truck leaves.
3. **Turn maintenance agreements into monitored agreements.** A reason to renew, a
   premium tier to sell, a differentiator. Sell revenue, not just cost avoidance.

**Proof pillar — built for the mechanical room:** powered by the furnace's 24V
transformer (no batteries, no wall wart), detection on the sensor through Wi-Fi drops,
installed by the company's own technician, heat call sensed from the thermostat wires.

### Approved phrases

- "Know the moment the furnace fails." *(current hero)*
- "Know what failed before the customer calls."
- "Dispatch with the diagnosis."
- "Walk in knowing. Leave faster."
- "Every furnace under agreement. One list."
- "Failures get names, not guesses."
- "The thermostat says heating. The furnace says nothing. You'll know first."
- "Stop reacting. Start knowing." *(CTA)*

---

## 6. The Technology (plain language)

FurnaceWatch senses two things: what the furnace was **asked** to do (the heat call, from
the thermostat wires) and what it **actually did** (the mechanical activity of the
inducer, ignition, and blower, from the sensor on the cabinet). It knows what a normal
heating cycle looks like; when a cycle goes wrong, it identifies which way and alerts
the team.

Detection runs on the sensor itself, so it keeps watching during internet outages — and
the portal flags any sensor that stops reporting.

Mention "on-device" once per page at most, as a reliability benefit. Never name chips,
models, sample rates, or frameworks.

---

## 7. Design Partner Program (approved copy basis)

- A **small number** of residential HVAC service companies, one heating season.
- Each runs **10–25 monitored furnaces** on active maintenance agreements.
- **Partners get:** sensors and portal free for the season, a direct line to the founder,
  real roadmap input, launch pricing locked in.
- **We ask:** a named contact, a 30-minute monthly call, honest technician install
  feedback, and a case study at season's end that the partner approves before publication.
- Tone: honest early-stage. "Built with service companies, not just for them." Never
  imply a large existing customer base.

---

## 8. Pricing (approved copy basis)

Publish the **model only** (decision 2026-08-30): per monitored furnace per month,
sensor included, no per-user fees, customer logins included, add/drop furnaces with
agreements. No public number until the willingness-to-pay study is done; design partners
lock in launch pricing. If asked, we answer directly — "ask us" is the approved response,
never a made-up figure.

---

## 9. Voice

Sounds like a good service manager, not a SaaS deck.

- **Use:** heat call, inducer, igniter, rollout, no-heat, callback, truck roll,
  maintenance agreement, first-visit fix, installed base.
- **Never:** "AI-powered", "revolutionize", "seamless", "leverage", "peace of mind",
  "predictive", "cutting-edge", exclamation points.
- Short declarative sentences. Specific beats clever. Numbers only when backed (see §3).

---

## 10. Founder Story (for About and press)

The founder's own furnace kept failing — a dirty flame sensor one winter, a draft
inducer the next. Each visit, the technician diagnosed it in minutes and said it had
been acting up for a while. The information existed in the furnace's behaviour; nobody
was listening. As an engineer, he instrumented his own furnace and started listening.

The people who actually need that signal are the service companies that installed the
furnace, warranted it, and hold the maintenance agreement. They take the 6 AM call and
roll the truck blind. FurnaceWatch exists so they know first — and know *what*.

FurnaceWatch is founder-led. A demo means talking to the person who built it. That is a
feature; say it plainly.

---

## 11. Copy Review Checklist

- [ ] Is the audience an HVAC service company (never a homeowner)?
- [ ] Diagnostic framing only — no "predict", "before failure", "early signs"?
- [ ] Zero numbers, or every number traced to a repo file and signed off?
- [ ] Failure-mode names drawn from §4 only?
- [ ] Install described as a technician job (24V, thermostat wires, pre-shipped Wi-Fi)?
- [ ] Alerts described as push notifications (nothing else)?
- [ ] No hardware/stack terms, no "patented", no invented social proof?
- [ ] Checked against the register in `REDESIGN_PLAN.md` §1.2?
