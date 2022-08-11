import { Octokit } from '@octokit/rest';

let octokit: Octokit;

const repos = async (username: string, token: string) => {
  try {
    const allRepos = [];
    if (!octokit) {
      octokit = new Octokit({ auth: token });
    }
    const response = octokit.paginate(
      octokit.rest.repos.listForUser, {
        username,
        type: 'owner',
      }
    );
    // for await (const { data } of response) {
    //   for (const repo of data) {
    //     allRepos.push(repo);
    //   }
    // }
    // return allRepos;
    console.log(response);
    return response;
  } catch {
    return [];
  }
};

export default repos;
