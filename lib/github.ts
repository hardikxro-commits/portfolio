export interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  forks_count: number;
  topics: string[];
  fork: boolean;
}

export interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubStats {
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  currentStreak: number;
  contributions: ContributionDay[];
  topRepos: GitHubRepo[];
  languages: Record<string, number>;
}

const GITHUB_USERNAME = "hardikxro-commits";

async function githubFetch<T>(path: string): Promise<T> {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "hardiknishad-portfolio",
    },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json();
}

export async function getUser(): Promise<GitHubUser> {
  return githubFetch<GitHubUser>(`/users/${GITHUB_USERNAME}`);
}

export async function getRepos(): Promise<GitHubRepo[]> {
  const repos = await githubFetch<GitHubRepo[]>(
    `/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=100`,
  );
  return repos
    .filter((r) => !r.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);
}

export async function getStats(): Promise<GitHubStats> {
  const [user, repos] = await Promise.all([getUser(), getRepos()]);

  const totalStars = repos.reduce((a, r) => a + r.stargazers_count, 0);

  const languageMap: Record<string, number> = {};
  for (const repo of repos) {
    if (repo.language) {
      languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
    }
  }

  return {
    totalCommits: 20,
    totalPRs: 1,
    totalIssues: 1,
    currentStreak: 5,
    contributions: generateMockContributions(),
    topRepos: repos.slice(0, 3),
    languages: languageMap,
  };
}

function generateMockContributions(): ContributionDay[] {
  const days: ContributionDay[] = [];
  const today = new Date();
  const accountCreation = new Date("2026-05-24");
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const isActive = d >= accountCreation;
    const level = isActive ? (Math.random() > 0.5 ? (Math.floor(Math.random() * 3) + 1) as 1 | 2 | 3 : 0) : 0;
    days.push({
      date: d.toISOString().split("T")[0],
      count: level === 0 ? 0 : Math.floor(Math.random() * 8) + 1,
      level: level as 0 | 1 | 2 | 3 | 4,
    });
  }
  return days;
}

export async function getGitHubData(): Promise<{
  user: GitHubUser;
  stats: GitHubStats;
}> {
  const [user, stats] = await Promise.all([getUser(), getStats()]);
  return { user, stats };
}
