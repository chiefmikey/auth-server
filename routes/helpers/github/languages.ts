import { Octokit } from '@octokit/rest';

let octokit: Octokit;

const fetchLanguage = async (owner: string, repo: string, token: string) => {
  try {
    // const allLangs = [];
    if (!octokit) {
      octokit = new Octokit({ auth: token });
    }
    const res = await octokit.paginate(octokit.rest.repos.listLanguages, {
      owner,
      repo,
    });
    console.log('lannnnn', res);
    return res;
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
