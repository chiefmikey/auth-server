import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';

const region = 'us-east-2';
const secretName = 'chiefmikey-repo';

const githubToken = async () => {
  try {
    let secret = { TOKEN: '' };

    const client = new SecretsManagerClient({
      region,
    });

    const data = await client.send(
      new GetSecretValueCommand({ SecretId: secretName }),
    );

    if (data && data.SecretString) {
      secret = data.SecretString;
    }

    return JSON.parse(secret).TOKEN;
  } catch (error) {
    return error;
  }
};
export default githubToken;
