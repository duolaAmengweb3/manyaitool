// 构建时抓取 GitHub 代码统计,写成静态 JSON(static 站没有后端,用这个替代 /api/github)。
// 用法:GITHUB_TOKEN=ghp_xxx node scripts/gen-github-stats.mjs
// 无 GITHUB_TOKEN 时会尝试读取本机 gh auth token;仍无 token 则跳过(保留已有的 public/github-stats.json)。
import { writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { execFileSync } from "node:child_process";

const USER = "duolaAmengweb3";
const API = "https://api.github.com";
const START_YEAR = 2015;
const BYTES_PER_LINE = 35;
const OUT = new URL("../public/github-stats.json", import.meta.url);

function readToken() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  try {
    return execFileSync("gh", ["auth", "token"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return "";
  }
}

const token = readToken();
if (!token) {
  console.log("[github-stats] 无 GITHUB_TOKEN / gh auth token,跳过(保留现有 JSON)");
  process.exit(0);
}
const H = { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" };

async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let idx = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (true) { const i = idx++; if (i >= items.length) break; out[i] = await fn(items[i]); }
  }));
  return out;
}
async function listOwnedRepos() {
  const repos = [];
  for (let page = 1; page <= 10; page++) {
    const res = await fetch(`${API}/user/repos?per_page=100&affiliation=owner&page=${page}`, { headers: H });
    if (!res.ok) break;
    const batch = await res.json();
    repos.push(...batch);
    if (batch.length < 100) break;
  }
  return repos.filter((r) => !r.fork);
}
async function repoBytes(full) {
  const res = await fetch(`${API}/repos/${full}/languages`, { headers: H });
  if (!res.ok) return 0;
  const text = await res.text();
  if (!text) return 0;
  try { return Object.values(JSON.parse(text)).reduce((s, n) => s + (n || 0), 0); } catch { return 0; }
}
async function totalContributions() {
  const endYear = new Date().getUTCFullYear();
  const nowIso = new Date().toISOString();
  const fields = [];
  for (let y = START_YEAR; y <= endYear; y++) {
    const from = `${y}-01-01T00:00:00Z`;
    const to = y === endYear ? nowIso : `${y}-12-31T23:59:59Z`;
    fields.push(`y${y}: contributionsCollection(from:"${from}",to:"${to}"){contributionCalendar{totalContributions}}`);
  }
  const query = `query{user(login:"${USER}"){${fields.join("\n")}}}`;
  const res = await fetch(`${API}/graphql`, { method: "POST", headers: { ...H, "Content-Type": "application/json" }, body: JSON.stringify({ query }) });
  if (!res.ok) return null;
  const user = (await res.json())?.data?.user;
  if (!user) return null;
  let total = 0;
  for (let y = START_YEAR; y <= endYear; y++) total += user[`y${y}`]?.contributionCalendar?.totalContributions ?? 0;
  return total;
}
async function repoCommitStats(repos) {
  const since = new Date(Date.now() - 7 * 86400 * 1000).toISOString();
  const chunks = [];
  for (let i = 0; i < repos.length; i += 15) chunks.push(repos.slice(i, i + 15));
  const results = await mapLimit(chunks, 4, async (grp) => {
    const parts = grp.map((r, i) => {
      const [owner, name] = r.full_name.split("/");
      return `r${i}: repository(owner:"${owner}",name:"${name}"){defaultBranchRef{target{... on Commit{recent: history(since:"${since}",first:100){nodes{additions}} all: history{totalCount}}}}}`;
    });
    const res = await fetch(`${API}/graphql`, { method: "POST", headers: { ...H, "Content-Type": "application/json" }, body: JSON.stringify({ query: `query{${parts.join("\n")}}` }) });
    if (!res.ok) return { last7: 0, commits: 0 };
    const data = (await res.json())?.data ?? {};
    let last7 = 0, commits = 0;
    for (let i = 0; i < grp.length; i++) {
      const target = data[`r${i}`]?.defaultBranchRef?.target;
      for (const c of target?.recent?.nodes ?? []) last7 += c?.additions ?? 0;
      commits += target?.all?.totalCount ?? 0;
    }
    return { last7, commits };
  });
  return { last7Loc: results.reduce((s, r) => s + r.last7, 0), totalCommits: results.reduce((s, r) => s + r.commits, 0) };
}

try {
  const repos = await listOwnedRepos();
  const [byteList, contributions, commitStats] = await Promise.all([
    mapLimit(repos, 16, (r) => repoBytes(r.full_name)),
    totalContributions(),
    repoCommitStats(repos),
  ]);
  const bytes = byteList.reduce((s, n) => s + n, 0);
  const data = {
    loc: Math.round(bytes / BYTES_PER_LINE), bytes, contributions,
    commits: commitStats.totalCommits, last7Loc: commitStats.last7Loc,
    repoCount: repos.length, updatedAt: new Date().toISOString(),
  };
  await mkdir(dirname(OUT.pathname), { recursive: true });
  await writeFile(OUT, JSON.stringify(data));
  console.log("[github-stats] 写入成功:", data.loc, "行 /", data.commits, "commits /", data.repoCount, "仓库");
} catch (e) {
  console.log("[github-stats] 抓取失败,跳过:", e.message);
  process.exit(0);
}
