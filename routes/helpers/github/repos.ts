import { Octokit } from 'octokit';

let octokit: Octokit;

const repos = async (owner: string, token: string) => {
  try {
    const allRepos = [];
    if (!octokit) {
      octokit = new Octokit({ auth: token });
    }
    const response = octokit.paginate.iterator('GET /users/{owner}/repos', {
      type: 'owner',
      per_page: 100,
    });
    for await (const { data } of response) {
      for (const repo of data) {
        allRepos.push(repo);
      }
    }
    return allRepos;
  } catch {
    return [];
  }
};

export default repos;
