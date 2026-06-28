// Static, pre-verified 2026 full-moon table (cross-checked against The Old Farmer's
// Almanac, timeanddate.com, Space.com). Dates/times are US Eastern. Rendered as static
// HTML for SEO/GEO so crawlers see the facts without running JS.
// Algorithm in lib/moon.ts reproduces every date below to the day (verified).

export interface FullMoonEntry {
  date: string; // ISO date (ET calendar day)
  name: string;
  etTime: string; // human time in ET
  supermoon?: boolean;
  blueMoon?: boolean;
  microMoon?: boolean;
  eclipse?: string;
  note: string;
}

export const FULL_MOONS_2026: FullMoonEntry[] = [
  { date: "2026-01-03", name: "Wolf Moon", etTime: "5:03 AM", supermoon: true, note: "The first of three supermoons in 2026, named by Native American and colonial traditions for the howling of wolves in deep winter." },
  { date: "2026-02-01", name: "Snow Moon", etTime: "5:09 PM", note: "Named for February's heavy snowfall across much of North America; also called the Hunger Moon." },
  { date: "2026-03-03", name: "Worm Moon", etTime: "6:38 AM", eclipse: "Total Lunar Eclipse", note: "Coincides with a total lunar eclipse — the Moon turns coppery red. Named for earthworms reappearing as soil thaws." },
  { date: "2026-04-01", name: "Pink Moon", etTime: "9:11 PM", note: "Named after the pink wild ground phlox of early spring — the Moon itself does not turn pink." },
  { date: "2026-05-01", name: "Flower Moon", etTime: "8:23 AM", note: "May's first full moon, named for the abundant blooms of late spring." },
  { date: "2026-05-31", name: "Blue Moon", etTime: "8:45 AM", blueMoon: true, microMoon: true, note: "The second full moon in May 2026 — the only Blue Moon of the year. It is also a micromoon, the smallest and faintest full moon of 2026." },
  { date: "2026-06-29", name: "Strawberry Moon", etTime: "2:57 PM", note: "Named by Algonquin tribes for the short strawberry harvest of June; the lowest-riding full moon of summer." },
  { date: "2026-07-29", name: "Buck Moon", etTime: "10:36 AM", note: "Named for the new antlers that emerge on male deer in July." },
  { date: "2026-08-28", name: "Sturgeon Moon", etTime: "12:18 AM", eclipse: "Partial Lunar Eclipse", note: "Accompanied by a partial lunar eclipse. Named for the large sturgeon fish once caught readily in the Great Lakes in late summer." },
  { date: "2026-09-26", name: "Harvest Moon", etTime: "12:49 PM", note: "The full moon closest to the autumn equinox, rising soon after sunset for several nights to light the harvest." },
  { date: "2026-10-26", name: "Hunter's Moon", etTime: "8:12 AM", note: "Named for the season when hunters tracked game by its bright light before winter." },
  { date: "2026-11-24", name: "Beaver Moon", etTime: "6:54 PM", supermoon: true, note: "A supermoon named for the time beavers finish their dams and trappers set beaver traps." },
  { date: "2026-12-23", name: "Cold Moon", etTime: "8:28 PM", supermoon: true, note: "The closest and brightest full moon since 2019 (~221,668 mi). The Cold Moon marks the long winter nights near the solstice." },
];

export const MOON_FACTS_2026 = {
  totalFullMoons: 13,
  supermoons: ["2026-01-03", "2026-11-24", "2026-12-23"],
  blueMoon: "2026-05-31",
  lunarEclipses: ["2026-03-03 (total)", "2026-08-28 (partial)"],
  synodicMonthDays: 29.530588861,
};

// Traditional name for a full moon by calendar month (fallback for years beyond 2026).
export const MONTHLY_MOON_NAMES: Record<number, string> = {
  1: "Wolf Moon",
  2: "Snow Moon",
  3: "Worm Moon",
  4: "Pink Moon",
  5: "Flower Moon",
  6: "Strawberry Moon",
  7: "Buck Moon",
  8: "Sturgeon Moon",
  9: "Harvest Moon",
  10: "Hunter's Moon",
  11: "Beaver Moon",
  12: "Cold Moon",
};
