// Long-tail moon pages derived from the verified 2026 full-moon table.
// One data source -> year page + 12 month pages + blue-moon + supermoon event pages.
import { FULL_MOONS_2026, type FullMoonEntry } from "@/lib/moon-data";

export interface MoonPage {
  slug: string;
  kind: "year" | "month" | "event";
  h1: string;
  title: string; // <=60 chars
  metaDesc: string; // 150-160
  moons: FullMoonEntry[];
  blurb: string;
}

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const MONTHS_CAP = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function monthOf(e: FullMoonEntry) {
  return parseInt(e.date.slice(5, 7), 10) - 1; // 0-11
}
function dayOf(e: FullMoonEntry) {
  return parseInt(e.date.slice(8, 10), 10);
}

export function getMoonPages(): MoonPage[] {
  const pages: MoonPage[] = [];

  // Year page
  pages.push({
    slug: "calendar-2026",
    kind: "year",
    h1: "Full Moon Calendar 2026",
    title: "Full Moon Calendar 2026 - Dates, Names & Times",
    metaDesc: "The complete 2026 full moon calendar: all 13 full moons with dates, traditional names (Wolf, Snow, Pink, Strawberry), 3 supermoons and the May blue moon.",
    moons: FULL_MOONS_2026,
    blurb: "There are 13 full moons in 2026, including three supermoons (January 3, November 24, and December 23), a single blue moon on May 31, and two lunar eclipses (March 3 total, August 28 partial). Each full moon carries a traditional name drawn from Native American and colonial seasons. All times below are US Eastern.",
  });

  // Month pages
  for (let m = 0; m < 12; m++) {
    const moons = FULL_MOONS_2026.filter((e) => monthOf(e) === m);
    if (moons.length === 0) continue;
    const names = moons.map((x) => x.name).join(" and the ");
    pages.push({
      slug: `${MONTHS[m]}-2026`,
      kind: "month",
      h1: `Full Moon in ${MONTHS_CAP[m]} 2026`,
      title: `Full Moon ${MONTHS_CAP[m]} 2026 - ${moons[0].name} Date`.slice(0, 60),
      metaDesc: `When is the full moon in ${MONTHS_CAP[m]} 2026? The ${names} ${moons.length > 1 ? "are" : "is"} on ${moons.map((x) => `${MONTHS_CAP[m]} ${dayOf(x)}`).join(" and ")}. See the exact time and add it to your calendar.`.slice(0, 160),
      moons,
      blurb: `${MONTHS_CAP[m]} 2026 has ${moons.length > 1 ? `${moons.length} full moons` : `one full moon`}: the ${names}. ${moons[0].note}`,
    });
  }

  // Blue moon event page
  const blue = FULL_MOONS_2026.filter((e) => e.blueMoon);
  if (blue.length) {
    pages.push({
      slug: "blue-moon-2026",
      kind: "event",
      h1: "Blue Moon 2026",
      title: "Blue Moon 2026 - When Is the Next Blue Moon?",
      metaDesc: "The only blue moon of 2026 is on May 31 — the second full moon in May. It is also a micromoon, the smallest and faintest full moon of the year.",
      moons: blue,
      blurb: "A blue moon is the second full moon in a single calendar month — it has nothing to do with color. The only blue moon of 2026 falls on May 31. It is also a micromoon, meaning the Moon is near its farthest point from Earth, making it the smallest and faintest full moon of the year.",
    });
  }

  // Supermoon event page
  const supers = FULL_MOONS_2026.filter((e) => e.supermoon);
  if (supers.length) {
    pages.push({
      slug: "supermoon-2026",
      kind: "event",
      h1: "Supermoons in 2026",
      title: "Supermoon 2026 - Dates of All 3 Supermoons",
      metaDesc: "2026 has three supermoons: January 3, November 24, and December 23. The December 23 Cold Moon is the closest and brightest full moon since 2019.",
      moons: supers,
      blurb: "A supermoon is a full moon that occurs near perigee, the Moon's closest point to Earth, appearing about 14% larger and 30% brighter than usual. 2026 has three: the January 3 Wolf Moon, the November 24 Beaver Moon, and the December 23 Cold Moon — the closest and brightest full moon since 2019.",
    });
  }

  return pages;
}

export function getMoonPage(slug: string): MoonPage | undefined {
  return getMoonPages().find((p) => p.slug === slug);
}
