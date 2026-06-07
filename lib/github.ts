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

async function fetchContributions(): Promise<ContributionDay[]> {
  const res = await fetch(
    `https://github.com/users/${GITHUB_USERNAME}/contributions`,
    {
      headers: { "User-Agent": "hardiknishad-portfolio" },
      next: { revalidate: 43200 },
    },
  );
  if (!res.ok) throw new Error(`Contributions fetch error: ${res.status}`);
  const html = await res.text();
  const dayRegex = /<rect[^>]*data-date="([^"]*)"[^>]*data-level="([^"]*)"[^>]*data-count="([^"]*)"[^>]*\/?>/g;
  const days: ContributionDay[] = [];
  let match: RegExpExecArray | null;
  while ((match = dayRegex.exec(html)) !== null) {
    days.push({
      date: match[1],
      level: parseInt(match[2], 10) as 0 | 1 | 2 | 3 | 4,
      count: parseInt(match[3], 10),
    });
  }
  return days;
}

function calculateStreak(days: ContributionDay[]): number {
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) streak++;
    else break;
  }
  return streak;
}

interface SearchResult {
  total_count: number;
}

async function searchCount(query: string): Promise<number> {
  try {
    const result = await githubFetch<SearchResult>(
      `/search/issues?q=${encodeURIComponent(query)}&per_page=1`,
    );
    return result.total_count;
  } catch {
    return 0;
  }
}

export async function getStats(): Promise<GitHubStats> {
  const [user, repos, contributions, totalPRs, totalIssues] = await Promise.all([
    getUser(),
    getRepos(),
    fetchContributions(),
    searchCount(`author:${GITHUB_USERNAME}+type:pr`),
    searchCount(`author:${GITHUB_USERNAME}+type:issue`),
  ]);

  const languageMap: Record<string, number> = {};
  for (const repo of repos) {
    if (repo.language) {
      languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
    }
  }

  const totalCommits = contributions.reduce((sum, d) => sum + d.count, 0);
  const currentStreak = calculateStreak(contributions);

  return {
    totalCommits,
    totalPRs,
    totalIssues,
    currentStreak,
    contributions,
    topRepos: repos.slice(0, 3),
    languages: languageMap,
  };
}

export async function getGitHubData(): Promise<{
  user: GitHubUser;
  stats: GitHubStats;
}> {
  const [user, stats] = await Promise.all([getUser(), getStats()]);
  return { user, stats };
}
