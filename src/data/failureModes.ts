// src/data/failureModes.ts — single source of truth for the failure modes the
// site markets. Governed by docs/BRAND_COPY.md §4: list ONLY what detection and
// the portal can actually raise today. Gas valve, blower motor, and inducer
// degradation are NOT detectable — do not add them here.

export type Severity = 'critical' | 'warning' | 'info';

export interface FailureMode {
  name: string;
  severity: Severity;
  /** One-line description used on cards (home page + what-it-catches). */
  summary: string;
  /** Example alert text, in the product's voice. */
  alert: string;
  /** What the diagnosis means for the truck / dispatch. */
  dispatch: string;
}

export const failureModes: FailureMode[] = [
  {
    name: 'Heat call with no ignition',
    severity: 'critical',
    summary:
      'The thermostat is calling for heat and the furnace has not fired — the no-heat call, caught before the house gets cold.',
    alert: 'Thermostat calling for heat since 5:42 AM. The furnace has not fired.',
    dispatch:
      'This is the emergency you usually hear about from a cold customer. Now dispatch starts from the alert, not the complaint.',
  },
  {
    name: 'Igniter failure',
    severity: 'critical',
    summary: 'The ignition sequence started — the inducer ran — but no flame was ever detected.',
    // Wording rule (BRAND_COPY §4): we observe the inducer and the flame, not the
    // control board — so no attempt counts, and no claim that the full sequence "ran".
    alert: 'Heat call at 6:05 AM: inducer ran its start sequence, no flame detected.',
    dispatch: 'Flame never established — most often the igniter. The tech rolls with a compatible igniter and the timeline of what did and didn’t run.',
  },
  {
    name: 'Flame sensor failure',
    severity: 'warning',
    summary: 'The flame lit, dropped out within seconds, and the furnace retried until it locked out.',
    // Distinct, observable signature: each lit period is a detected flame event, so
    // counting the retries here is legitimate — unlike ignition attempts, which aren't.
    alert: 'Flame detected and lost within seconds, three tries in a row — furnace has locked out.',
    dispatch: 'The failed flame-proving pattern: the flame burns but is never sensed, so the control shuts the gas off and retries. Usually a dirty or failed flame sensor — a quick first-visit fix when you arrive knowing.',
  },
  {
    name: 'Pressure switch / rollout trip',
    severity: 'critical',
    summary: 'The inducer ran, but ignition never followed — a safety is holding the furnace off.',
    alert: 'Inducer running, no ignition activity detected — a safety appears to be holding the furnace off.',
    dispatch: 'A safety is doing its job. The tech arrives ready to find out why instead of starting from “no heat.”',
  },
  {
    name: 'Short cycling',
    severity: 'warning',
    summary: 'The furnace is starting and stopping without completing normal cycles.',
    alert: 'Nine cycles in the last hour, none longer than four minutes.',
    dispatch: 'Caught while it is still a service visit, not yet a no-heat emergency or a damaged component.',
  },
  {
    name: 'Extended run',
    severity: 'warning',
    summary: 'A heating cycle running far past normal length.',
    alert: 'Current cycle has run 3× longer than this furnace’s normal cycle.',
    dispatch: 'Something is keeping the furnace from satisfying the call — worth a look before the customer notices.',
  },
  {
    name: 'Sensor offline',
    severity: 'info',
    summary: 'The sensor stopped reporting — flagged, so no furnace is ever silently unwatched.',
    alert: 'Sensor has not reported for 2 hours (last seen 6:14 AM).',
    dispatch: 'Usually the home’s Wi-Fi. Detection keeps running on the sensor; the portal tells you the unit is unwatched.',
  },
];

export const severityDot: Record<Severity, string> = {
  critical: 'bg-critical',
  warning: 'bg-warn',
  info: 'bg-navy-400',
};
