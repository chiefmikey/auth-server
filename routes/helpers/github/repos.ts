import { Octokit } from '@octokit/rest';

let octokit: Octokit;

const repos = async (username: string, token: string) => {
  try {
    // const allRepos = [];
    if (!octokit) {
      octokit = new Octokit({ auth: token });
    }
    const response = await octokit.paginate(
      octokit.rest.repos.listForUser,
      {
        username,
        type: 'owner',
      },
      (response) =>
        response.data.map((repo) => {
          console.log('indy responsey', repo);
          return repo.name;
        }),
    );
    console.log('full res', response);
    // for await (const { data } of response) {
    //   for (const repo of data) {
    //     allRepos.push(repo);
    //   }
    // }
    // return allRepos;
    // console.log('repos', response);
    return response;
  } catch {
    return [];
  }
};

export default repos;
