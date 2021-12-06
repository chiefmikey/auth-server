import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';

const region = 'us-east-2';
const secretName = 'chiefmikey-repo';

const githubToken: () => Promise<string> = async () => {
  try {
    let secret = '';

    const client = new SecretsManagerClient({
      region,
    });

    const data = await client.send(
      new GetSecretValueCommand({ SecretId: secretName }),
    );

    if (data && data.SecretString) {
      secret = data.SecretString;
    }
    const json: { [secretName]: string } = JSON.parse(secret);
    const parseSecret: { [secretName]: string } = json;
    return parseSecret[secretName];
  } catch {
    return '';
  }
};

export default githubToken;
