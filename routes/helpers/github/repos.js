import { Octokit } from 'octokit';

let octokit;

const repos = async (owner, token) => {
  try {
    const allRepos = [];
    if (!octokit) {
      octokit = new Octokit({ auth: token });
    }
    const response = await octokit.paginate.iterator(
      'GET /users/{owner}/repos',
      {
        owner,
        type: 'public',
        per_page: 100,
      },
    );
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
