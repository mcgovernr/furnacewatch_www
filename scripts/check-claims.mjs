#!/usr/bin/env node
// Claims-policy lint — enforces docs/BRAND_COPY.md §3 in CI.
//
// Scans customer-facing source (src/**) for phrases the product cannot back:
// patent claims, accuracy numbers, SLA/latency figures, capabilities that
// don't exist, prediction framing, and implementation details.
//
// A line that is a *denial* of prediction ("not a prediction", "does not
// predict") is allowed. A line that genuinely needs an exception can carry
// the marker `claims-ok` (e.g. in a comment) — use sparingly, and only with
// a backing file per BRAND_COPY §3.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const SRC = join(ROOT, 'src');
const EXTS = ['.astro', '.mdx', '.md', '.ts', '.tsx', '.js', '.mjs'];

/** @type {{re: RegExp, why: string, allow?: RegExp}[]} */
const RULES = [
  { re: /patent/i, why: 'No patent has been filed (REDESIGN_PLAN §1.2)' },
  { re: /\b\d{1,3}(\.\d+)?\s?%/, why: 'No percentage claims — BRAND_COPY §3 (no accuracy/outcome numbers)' },
  { re: /\buptime\b|\bSLA\b/, why: 'No uptime/SLA commitment exists' },
  { re: /<\s?2\s?s|\b\d+\s?second alert|alert latency/i, why: 'Alert latency has never been measured' },
  { re: /\b\d+[x×]\s?(faster|fewer|more)/i, why: 'No comparative multiplier has a basis' },
  { re: /predict|predictive|prediction/i, why: 'Prediction framing — the product diagnoses, it does not predict', allow: /not a prediction|does(n'?t| not) predict|no prediction|not prediction/i },
  { re: /bearing/i, why: 'Bearing wear is not detected' },
  { re: /\bSMS\b|email \+|multi-?channel/i, why: 'Alerts are push notifications only today' },
  { re: /fleet map|map view/i, why: 'The fleet map is not built (fleet *list* is real)' },
  { re: /\bQR\b/i, why: 'There is no QR/field Wi-Fi setup — factory-provisioned over USB' },
  { re: /15[- ]minute|minutes? to install|plug into (any|a) (standard )?outlet/i, why: 'The install is a technician job, not a timed consumer install' },
  { re: /ships in \d|no credit card|30-day pilot/i, why: 'No fulfilment/billing exists — design-partner program is the offer' },
  { re: /ADXL|ESP32|TFLite|TensorFlow|\bFFT\b|\d+\s?Hz\b/i, why: 'Implementation detail — describe capability, never the stack (BRAND_COPY §3)' },
  { re: /Dorsey|Lafferty|Precision Climate|Summit Air|Clearfield/i, why: 'Fabricated customer — never again' },
  { re: /flame detection|detects? flame\b/i, why: 'The sensed signal is ignition/gas-valve activity, not flame rectification' },
];

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (EXTS.some(e => p.endsWith(e))) yield p;
  }
}

let violations = 0;
for (const file of walk(SRC)) {
  const lines = readFileSync(file, 'utf8').split(/\r?\n/);
  lines.forEach((line, i) => {
    if (line.includes('claims-ok')) return;
    // Allowances are checked against a whitespace-normalized two-line window
    // so a denial phrase ("doesn't\n  predict") still counts across a wrap.
    const window = `${lines[i - 1] ?? ''} ${line}`.replace(/\s+/g, ' ');
    for (const rule of RULES) {
      if (rule.re.test(line) && !(rule.allow && rule.allow.test(window))) {
        violations++;
        console.error(`${relative(ROOT, file)}:${i + 1}  [${rule.re}]`);
        console.error(`  ${line.trim().slice(0, 140)}`);
        console.error(`  → ${rule.why}\n`);
      }
    }
  });
}

if (violations > 0) {
  console.error(`✖ ${violations} claims-policy violation(s). See docs/BRAND_COPY.md §3 and docs/REDESIGN_PLAN.md §1.2.`);
  process.exit(1);
}
console.log('✓ claims-policy lint passed');
