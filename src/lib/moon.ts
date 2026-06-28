// Moon phase calculations — Jean Meeus, "Astronomical Algorithms" (Ch. 47, 48, 49).
// Pure functions, no dependencies, no network. Accurate to ~1 minute for new/full moon
// instants vs USNO. All inputs/outputs in UTC; the UI converts to the user's local zone.

const RAD = Math.PI / 180;
const SYNODIC = 29.530588861; // mean synodic month (days)

function toJD(date: Date): number {
  return date.getTime() / 86400000 + 2440587.5;
}
function fromJD(jd: number): Date {
  return new Date((jd - 2440587.5) * 86400000);
}
// ΔT ≈ 69 s in 2026 — convert Dynamical Time (TT) to UTC.
const DELTA_T_DAYS = 69 / 86400;

// ---- Meeus Ch. 49: instant of a given lunar phase ----
// phase: 0 = new, 0.25 = first quarter, 0.5 = full, 0.75 = last quarter
function meanJDE(k: number): number {
  const T = k / 1236.85;
  return (
    2451550.09766 +
    29.530588861 * k +
    0.00015437 * T * T -
    0.000000150 * T * T * T +
    0.00000000073 * T * T * T * T
  );
}

function phaseJDE(k: number, phase: number): number {
  // k must already encode the phase via its fractional part (.0 new, .5 full, etc.)
  const T = k / 1236.85;
  const E = 1 - 0.002516 * T - 0.0000074 * T * T;
  const M = (2.5534 + 29.1053567 * k - 0.0000014 * T * T - 0.00000011 * T * T * T) * RAD;
  const Mp =
    (201.5643 + 385.81693528 * k + 0.0107582 * T * T + 0.00001238 * T * T * T - 0.000000058 * T * T * T * T) * RAD;
  const F =
    (160.7108 + 390.67050284 * k - 0.0016118 * T * T - 0.00000227 * T * T * T + 0.000000011 * T * T * T * T) * RAD;
  const Om = (124.7746 - 1.56375588 * k + 0.0020672 * T * T + 0.00000215 * T * T * T) * RAD;

  let corr = 0;
  const isQuarter = phase === 0.25 || phase === 0.75;

  if (!isQuarter) {
    // New & Full moon corrections (identical table)
    corr =
      -0.4072 * Math.sin(Mp) +
      0.17241 * E * Math.sin(M) +
      0.01608 * Math.sin(2 * Mp) +
      0.01039 * Math.sin(2 * F) +
      0.00739 * E * Math.sin(Mp - M) -
      0.00514 * E * Math.sin(Mp + M) +
      0.00208 * E * E * Math.sin(2 * M) -
      0.00111 * Math.sin(Mp - 2 * F) -
      0.00057 * Math.sin(Mp + 2 * F) +
      0.00056 * E * Math.sin(2 * Mp + M) -
      0.00042 * Math.sin(3 * Mp) +
      0.00042 * E * Math.sin(M + 2 * F) +
      0.00038 * E * Math.sin(M - 2 * F) -
      0.00024 * E * Math.sin(2 * Mp - M) -
      0.00017 * Math.sin(Om) -
      0.00007 * Math.sin(Mp + 2 * M) +
      0.00004 * Math.sin(2 * Mp - 2 * F) +
      0.00004 * Math.sin(3 * M) +
      0.00003 * Math.sin(Mp + M - 2 * F) +
      0.00003 * Math.sin(2 * Mp + 2 * F) -
      0.00003 * Math.sin(Mp + M + 2 * F) +
      0.00003 * Math.sin(Mp - M + 2 * F) -
      0.00002 * Math.sin(Mp - M - 2 * F) -
      0.00002 * Math.sin(3 * Mp + M) +
      0.00002 * Math.sin(4 * Mp);
  } else {
    corr =
      -0.62801 * Math.sin(Mp) +
      0.17172 * E * Math.sin(M) -
      0.01183 * E * Math.sin(Mp + M) +
      0.00862 * Math.sin(2 * Mp) +
      0.00804 * Math.sin(2 * F) +
      0.00454 * E * Math.sin(Mp - M) +
      0.00204 * E * E * Math.sin(2 * M) -
      0.0018 * Math.sin(Mp - 2 * F) -
      0.0007 * Math.sin(Mp + 2 * F) -
      0.0004 * Math.sin(3 * Mp) -
      0.00034 * E * Math.sin(2 * Mp - M) +
      0.00032 * E * Math.sin(M + 2 * F) +
      0.00032 * E * Math.sin(M - 2 * F) -
      0.00028 * E * E * Math.sin(Mp + 2 * M) +
      0.00027 * E * Math.sin(2 * Mp + M) -
      0.00017 * Math.sin(Om);
    const W =
      0.00306 -
      0.00038 * E * Math.cos(M) +
      0.00026 * Math.cos(Mp) -
      0.00002 * Math.cos(Mp - M) +
      0.00002 * Math.cos(Mp + M) +
      0.00002 * Math.cos(2 * F);
    corr += phase === 0.25 ? W : -W;
  }

  // Additional planetary corrections (same for all phases)
  const A: number[] = [
    299.77 + 0.107408 * k - 0.009173 * T * T,
    251.88 + 0.016321 * k,
    251.83 + 26.651886 * k,
    349.42 + 36.412478 * k,
    84.66 + 18.206239 * k,
    141.74 + 53.303771 * k,
    207.14 + 2.453732 * k,
    154.84 + 7.30686 * k,
    34.52 + 27.261239 * k,
    207.19 + 0.121824 * k,
    291.34 + 1.844379 * k,
    161.72 + 24.198154 * k,
    239.56 + 25.513099 * k,
    331.55 + 3.592518 * k,
  ];
  const Ac = [
    0.000325, 0.000165, 0.000164, 0.000126, 0.00011, 0.000062, 0.00006, 0.000056, 0.000047, 0.000042,
    0.00004, 0.000037, 0.000035, 0.000023,
  ];
  let add = 0;
  for (let i = 0; i < A.length; i++) add += Ac[i] * Math.sin(A[i] * RAD);

  return meanJDE(k) + corr + add - DELTA_T_DAYS;
}

// Find the phase instant on/after `after`. phase: 0 new, 0.25 FQ, 0.5 full, 0.75 LQ.
export function nextPhase(after: Date, phase: number): Date {
  const jd0 = toJD(after);
  const year = 2000 + (jd0 - 2451545.0) / 365.25;
  let k = Math.floor((year - 2000) * 12.3685);
  // align k to the requested phase fraction, search outward
  for (let i = -2; i < 16; i++) {
    const kk = Math.floor(k) + phase + i;
    const jd = phaseJDE(kk, phase);
    if (jd >= jd0) return fromJD(jd);
  }
  return fromJD(phaseJDE(Math.floor(k) + phase + 16, phase));
}

// Find the phase instant on/before `before`.
export function prevPhase(before: Date, phase: number): Date {
  const jd0 = toJD(before);
  const year = 2000 + (jd0 - 2451545.0) / 365.25;
  const k = Math.floor((year - 2000) * 12.3685);
  let best = -Infinity;
  for (let i = -16; i < 4; i++) {
    const kk = Math.floor(k) + phase + i;
    const jd = phaseJDE(kk, phase);
    if (jd <= jd0 && jd > best) best = jd;
  }
  return fromJD(best);
}

// ---- Ch. 48: illuminated fraction & phase angle at an instant ----
export interface MoonState {
  phaseName: string;
  illumination: number; // 0..1
  ageDays: number; // days since last new moon
  waxing: boolean;
}

const PHASE_NAMES = [
  "New Moon",
  "Waxing Crescent",
  "First Quarter",
  "Waxing Gibbous",
  "Full Moon",
  "Waning Gibbous",
  "Last Quarter",
  "Waning Crescent",
];

export function moonState(date: Date): MoonState {
  const jd = toJD(date);
  const T = (jd - 2451545.0) / 36525;

  // Mean elongation, Sun anomaly, Moon anomaly (Ch. 47)
  const D = (297.8501921 + 445267.1114034 * T - 0.0018819 * T * T) * RAD;
  const M = (357.5291092 + 35999.0502909 * T - 0.0001536 * T * T) * RAD;
  const Mp = (134.9633964 + 477198.8675055 * T + 0.0087414 * T * T) * RAD;

  // Phase angle i (Ch. 48.4)
  const i =
    180 -
    (D / RAD) -
    6.289 * Math.sin(Mp) +
    2.1 * Math.sin(M) -
    1.274 * Math.sin(2 * D - Mp) -
    0.658 * Math.sin(2 * D) -
    0.214 * Math.sin(2 * Mp) -
    0.11 * Math.sin(D);
  const illumination = (1 + Math.cos(i * RAD)) / 2;

  // Age from last new moon → phase name & waxing flag
  const lastNew = prevPhase(date, 0);
  const ageDays = (date.getTime() - lastNew.getTime()) / 86400000;
  const frac = ageDays / SYNODIC;
  let idx = Math.floor(frac * 8 + 0.5) % 8;
  if (idx < 0) idx += 8;
  const waxing = ageDays < SYNODIC / 2;

  return { phaseName: PHASE_NAMES[idx], illumination, ageDays, waxing };
}

// Is `date` (in the given local calendar day) a full-moon day?
export function isFullMoonOn(date: Date): boolean {
  const next = nextPhase(date, 0.5);
  const prev = prevPhase(date, 0.5);
  const sameLocalDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  return sameLocalDay(next, date) || sameLocalDay(prev, date);
}
