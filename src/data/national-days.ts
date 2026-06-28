// US National Days dataset + pure date-rule engine. Facts (dates) are not
// copyrightable; all descriptions are original paraphrase. Dates cross-checked
// against nationaldaycalendar.com / timeanddate.com.

export type DayCategory = "food" | "fun" | "health" | "awareness";

export type DateRule =
  | { type: "fixed"; month: number; day: number } // month 1-12
  | { type: "nth-weekday"; month: number; weekday: number; nth: number } // weekday 0=Sun..6=Sat, nth -1 = last
  | { type: "easter-offset"; offset: number }; // days relative to Easter Sunday

export interface NationalDay {
  slug: string;
  name: string;
  category: DayCategory;
  rule: DateRule;
  blurb: string;
  disputed?: string;
}

export const CATEGORY_LABELS: Record<DayCategory, string> = {
  food: "Food & Drink",
  fun: "Fun & Quirky",
  health: "Health",
  awareness: "Awareness",
};

// ---- date engine ----
// Anonymous Gregorian algorithm (Meeus/Jones/Butcher) for Easter Sunday.
export function easterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

// Resolve a rule to a local Date in the given year.
export function resolveDate(rule: DateRule, year: number): Date {
  if (rule.type === "fixed") {
    return new Date(year, rule.month - 1, rule.day);
  }
  if (rule.type === "easter-offset") {
    const e = easterSunday(year);
    return new Date(e.getFullYear(), e.getMonth(), e.getDate() + rule.offset);
  }
  const { month, weekday, nth } = rule;
  if (nth === -1) {
    const last = new Date(year, month, 0);
    const diff = (last.getDay() - weekday + 7) % 7;
    return new Date(year, month - 1, last.getDate() - diff);
  }
  const first = new Date(year, month - 1, 1);
  const offset = (weekday - first.getDay() + 7) % 7;
  return new Date(year, month - 1, 1 + offset + (nth - 1) * 7);
}

export function sameLocalDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

// Next occurrence on/after `from`.
export function nextOccurrence(rule: DateRule, from: Date): Date {
  const y = from.getFullYear();
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  for (const yr of [y, y + 1, y + 2]) {
    const d = resolveDate(rule, yr);
    if (d.getTime() >= start.getTime()) return d;
  }
  return resolveDate(rule, y + 1);
}

// ---- dataset (~43 high-search US national days) ----
export const NATIONAL_DAYS: NationalDay[] = [
  { slug: "donut-day", name: "National Donut Day", category: "food", rule: { type: "nth-weekday", month: 6, weekday: 5, nth: 1 }, blurb: "Falls on the first Friday of June. It began in 1938 when the Salvation Army honored the \"Donut Lassies\" who served fried dough to soldiers in World War I. Chains like Dunkin and Krispy Kreme often give away a free donut.", disputed: "A separate fixed-date version is also observed on November 5." },
  { slug: "coffee-day", name: "National Coffee Day", category: "food", rule: { type: "fixed", month: 9, day: 29 }, blurb: "Celebrated every September 29 in the United States (the global version falls October 1). Many cafes offer free or discounted coffee to mark the day." },
  { slug: "pizza-day", name: "National Pizza Day", category: "food", rule: { type: "fixed", month: 2, day: 9 }, blurb: "Observed on February 9, honoring America's most-ordered comfort food. Pizzerias frequently run slice deals and BOGO offers." },
  { slug: "hamburger-day", name: "National Hamburger Day", category: "food", rule: { type: "fixed", month: 5, day: 28 }, blurb: "Most widely observed on May 28, celebrating the all-American burger. Fast-food chains commonly drop burger discounts.", disputed: "Some sources also list July 28 and December 21." },
  { slug: "taco-day", name: "National Taco Day", category: "food", rule: { type: "nth-weekday", month: 10, weekday: 2, nth: 1 }, blurb: "As of 2024 it moved to \"Taco Tuesday,\" the first Tuesday of October, so taco lovers can celebrate on the day tacos are already cheapest.", disputed: "It was historically fixed on October 4 for many years." },
  { slug: "ice-cream-day", name: "National Ice Cream Day", category: "food", rule: { type: "nth-weekday", month: 7, weekday: 0, nth: 3 }, blurb: "The third Sunday of July, part of National Ice Cream Month, which President Reagan proclaimed in 1984. Scoop shops often run free-cone promotions." },
  { slug: "pancake-day-ihop", name: "National Pancake Day (IHOP)", category: "food", rule: { type: "nth-weekday", month: 3, weekday: 2, nth: 1 }, blurb: "IHOP's charity event giving away free short stacks, held the first Tuesday of March.", disputed: "Shrove Tuesday (the religious Pancake Day) is a separate, Easter-linked date." },
  { slug: "pancake-day-shrove", name: "Pancake Day (Shrove Tuesday)", category: "food", rule: { type: "easter-offset", offset: -47 }, blurb: "Shrove Tuesday, the day before Lent begins - 47 days before Easter Sunday. Traditionally a day to use up eggs and butter by making pancakes." },
  { slug: "burrito-day", name: "National Burrito Day", category: "food", rule: { type: "nth-weekday", month: 4, weekday: 4, nth: 1 }, blurb: "The first Thursday of April. Mexican-grill chains frequently offer free or discounted burritos and app rewards." },
  { slug: "cheeseburger-day", name: "National Cheeseburger Day", category: "food", rule: { type: "fixed", month: 9, day: 18 }, blurb: "Observed September 18. Burger chains routinely offer dollar cheeseburgers and app-only deals." },
  { slug: "french-fry-day", name: "National French Fry Day", category: "food", rule: { type: "fixed", month: 7, day: 13 }, blurb: "Celebrated July 13. A favorite for fast-food freebies on fries with purchase." },
  { slug: "chocolate-day", name: "National Chocolate Day", category: "food", rule: { type: "fixed", month: 10, day: 28 }, blurb: "Observed October 28, one of several chocolate-themed days throughout the year." },
  { slug: "wine-day", name: "National Wine Day", category: "food", rule: { type: "fixed", month: 5, day: 25 }, blurb: "Celebrated May 25, a casual day to enjoy a favorite varietal (distinct from National Drink Wine Day on February 18)." },
  { slug: "beer-day", name: "National Beer Day", category: "food", rule: { type: "fixed", month: 4, day: 7 }, blurb: "Observed April 7, marking the day in 1933 when the Cullen-Harrison Act let Americans legally buy beer again after Prohibition." },
  { slug: "margarita-day", name: "National Margarita Day", category: "food", rule: { type: "fixed", month: 2, day: 22 }, blurb: "Celebrated February 22. Bars and Mexican restaurants frequently discount the classic tequila cocktail." },
  { slug: "popcorn-day", name: "National Popcorn Day", category: "food", rule: { type: "fixed", month: 1, day: 19 }, blurb: "Observed January 19, celebrating America's favorite movie snack." },
  { slug: "cookie-day", name: "National Cookie Day", category: "food", rule: { type: "fixed", month: 12, day: 4 }, blurb: "Celebrated December 4. Bakeries and cookie chains often hand out free samples." },
  { slug: "bacon-day", name: "International Bacon Day", category: "food", rule: { type: "nth-weekday", month: 9, weekday: 6, nth: 1 }, blurb: "The Saturday before Labor Day, a celebration of all things bacon at backyard cookouts.", disputed: "A separate National Bacon Day is also marked on December 30." },
  { slug: "pasta-day", name: "World Pasta Day", category: "food", rule: { type: "fixed", month: 10, day: 25 }, blurb: "Observed October 25, established in 1995 to celebrate pasta as a global staple." },
  { slug: "grilled-cheese-day", name: "National Grilled Cheese Day", category: "food", rule: { type: "fixed", month: 4, day: 12 }, blurb: "Celebrated April 12, honoring the melty comfort-food sandwich." },
  { slug: "avocado-day", name: "National Avocado Day", category: "food", rule: { type: "fixed", month: 7, day: 31 }, blurb: "Observed July 31. Guacamole deals are common at Mexican-grill chains." },
  { slug: "pretzel-day", name: "National Pretzel Day", category: "food", rule: { type: "fixed", month: 4, day: 26 }, blurb: "Celebrated April 26. Pretzel chains regularly give away free soft pretzels." },
  { slug: "hot-dog-day", name: "National Hot Dog Day", category: "food", rule: { type: "nth-weekday", month: 7, weekday: 3, nth: 3 }, blurb: "Often marked on the third Wednesday of July during National Hot Dog Month.", disputed: "Some sources list July 17 or other July dates." },
  { slug: "tea-day", name: "National Hot Tea Day", category: "food", rule: { type: "fixed", month: 1, day: 12 }, blurb: "Observed January 12, a cozy mid-winter celebration of hot tea." },
  { slug: "candy-day", name: "National Candy Day", category: "food", rule: { type: "fixed", month: 11, day: 4 }, blurb: "Celebrated November 4, a sweet-tooth holiday just after Halloween." },
  { slug: "cheese-day", name: "National Cheese Day", category: "food", rule: { type: "fixed", month: 6, day: 4 }, blurb: "Observed June 4, honoring cheese in all its forms." },
  { slug: "pie-day", name: "National Pie Day", category: "food", rule: { type: "fixed", month: 1, day: 23 }, blurb: "Celebrated January 23 (not to be confused with Pi Day on March 14), founded by the American Pie Council." },
  { slug: "donut-day-fall", name: "National Donut Day (Fall)", category: "food", rule: { type: "fixed", month: 11, day: 5 }, blurb: "A second, fixed-date Donut Day on November 5, separate from the better-known first-Friday-of-June observance." },
  { slug: "best-friends-day", name: "National Best Friends Day", category: "fun", rule: { type: "fixed", month: 6, day: 8 }, blurb: "Observed June 8, a day to celebrate close friendships and post tributes to your best friend." },
  { slug: "siblings-day", name: "National Siblings Day", category: "fun", rule: { type: "fixed", month: 4, day: 10 }, blurb: "Celebrated April 10 in honor of brothers and sisters; founded in 1995 by Claudia Evart in memory of her siblings." },
  { slug: "dog-day", name: "National Dog Day", category: "fun", rule: { type: "fixed", month: 8, day: 26 }, blurb: "Observed August 26, encouraging dog adoption and celebrating canine companions." },
  { slug: "cat-day", name: "National Cat Day", category: "fun", rule: { type: "fixed", month: 10, day: 29 }, blurb: "Celebrated October 29, raising awareness for cats in need of homes." },
  { slug: "puppy-day", name: "National Puppy Day", category: "fun", rule: { type: "fixed", month: 3, day: 23 }, blurb: "Observed March 23, celebrating puppies and promoting adoption over puppy mills." },
  { slug: "selfie-day", name: "National Selfie Day", category: "fun", rule: { type: "fixed", month: 6, day: 21 }, blurb: "Celebrated June 21, a social-media holiday for sharing your best self-portrait." },
  { slug: "kissing-day", name: "National Kissing Day", category: "fun", rule: { type: "fixed", month: 6, day: 22 }, blurb: "Observed June 22, a lighthearted day to celebrate a simple kiss." },
  { slug: "high-five-day", name: "National High Five Day", category: "fun", rule: { type: "nth-weekday", month: 4, weekday: 4, nth: 3 }, blurb: "The third Thursday of April, celebrating the simple gesture of camaraderie." },
  { slug: "video-game-day", name: "National Video Game Day", category: "fun", rule: { type: "fixed", month: 9, day: 12 }, blurb: "Observed September 12, a day for gamers to enjoy their favorite titles." },
  { slug: "womens-day", name: "International Women's Day", category: "awareness", rule: { type: "fixed", month: 3, day: 8 }, blurb: "Observed March 8 worldwide, celebrating the achievements of women and advocating for gender equality." },
  { slug: "mens-day", name: "International Men's Day", category: "awareness", rule: { type: "fixed", month: 11, day: 19 }, blurb: "Observed November 19, focusing on men's health, positive role models, and well-being." },
  { slug: "teacher-day", name: "National Teacher Day", category: "awareness", rule: { type: "nth-weekday", month: 5, weekday: 2, nth: 1 }, blurb: "The Tuesday of the first full week of May (Teacher Appreciation Week), honoring educators.", disputed: "Exact date varies; widely listed as the first Tuesday of May." },
  { slug: "nurses-day", name: "National Nurses Day", category: "awareness", rule: { type: "fixed", month: 5, day: 6 }, blurb: "Observed May 6, kicking off National Nurses Week, which ends May 12 on Florence Nightingale's birthday." },
  { slug: "mental-health-day", name: "World Mental Health Day", category: "health", rule: { type: "fixed", month: 10, day: 10 }, blurb: "Observed October 10, raising awareness of mental health and mobilizing support worldwide." },
  { slug: "hydration-day", name: "National Hydration Day", category: "health", rule: { type: "fixed", month: 6, day: 23 }, blurb: "Observed June 23, a reminder to stay hydrated as summer heat sets in." },
  { slug: "walking-day", name: "National Walking Day", category: "health", rule: { type: "nth-weekday", month: 4, weekday: 3, nth: 1 }, blurb: "The first Wednesday of April, promoted by the American Heart Association to encourage daily movement." },
];
