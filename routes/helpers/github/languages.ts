import { Octokit } from 'octokit';

let octokit: Octokit;

const fetchLanguage = async (owner: string, repo: string, token: string) => {
  try {
    const allLangs = [];
    if (!octokit) {
      octokit = new Octokit({ auth: token });
    }
    const response = await octokit.paginate.iterator(
      'GET /repos/{owner}/{repo}/languages',
      {
        owner,
        repo,
        type: 'public',
        per_page: 100,
      },
    );
    for await (const { data } of response) {
      allLangs.push(data);
    }
    return allLangs;
  } catch {
    return [];
  }
};

const languages = (owner: string, names: string[], token: string) => {
  const languages = [];
  for (const repo of names) {
    languages.push(fetchLanguage(owner, repo, token));
  }
  return Promise.all(languages);
};

export default languages;
