import { GITHUB_USER } from '../config';

export const fetchCommits = async (): Promise<any[]> => {
  const url = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_USER}.github.io/commits`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json() as Promise<any[]>;
};
