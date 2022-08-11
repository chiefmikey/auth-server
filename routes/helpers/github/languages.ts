import { Octokit } from '@octokit/rest';

let octokit: Octokit;

const fetchLanguage = async (username: string, repo: string, token: string) => {
  try {
    const allLangs = [];
    if (!octokit) {
      octokit = new Octokit({ auth: token });
    }
    const response = await octokit.paginate(
      octokit.rest.repos.listLanguages,
      {
        username,
        repo,
      },
    );
    // for await (const { data } of response) {
    //   allLangs.push(data);
    // }
    console.log('languages', response);
    return response;
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
