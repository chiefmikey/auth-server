import { Octokit } from '@octokit/rest';

let octokit: Octokit;

const repos = async (username: string, token: string) => {
  try {
    if (!octokit) {
      octokit = new Octokit({ auth: token });
    }
    return await octokit.paginate(
      octokit.rest.repos.listForUser,
      {
        username,
        type: 'owner',
      },
      (response) =>
        response.data.map((repo) => {
          console.log('owny', repo.owner);
          console.log('permy', repo.permissions);
          return repo.name;
        }),
    );
  } catch {
    return [];
  }
};

export default repos;
