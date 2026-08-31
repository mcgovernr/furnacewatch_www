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
    summary: 'The ignition sequence ran and the burner did not light.',
    alert: 'Ignition sequence ran, burner did not light — three attempts, no flame.',
    dispatch: 'The tech rolls with a compatible igniter on the truck instead of finding out in the basement.',
  },
  {
    name: 'Flame sensor failure',
    severity: 'warning',
    summary: 'The burner lit and dropped out early, cycle after cycle.',
    alert: 'Burner lit and dropped out inside 10 seconds, three cycles in a row.',
    dispatch: 'Classic dirty or failing flame sensor pattern — usually a quick first-visit fix when you arrive knowing.',
  },
  {
    name: 'Pressure switch / rollout trip',
    severity: 'critical',
    summary: 'The inducer ran and ignition was never attempted.',
    alert: 'Inducer ran, ignition never attempted — safety circuit is holding the furnace off.',
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
