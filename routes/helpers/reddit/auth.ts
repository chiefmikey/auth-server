import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';

const region = 'us-east-2';
const secretName = 'vm3000-auth';
const appId = 'vm3000-id';
const appSecret = 'vm3000-secret';

export const authId: () => Promise<string> = async () => {
  try {
    let secretId = '';

    const client = new SecretsManagerClient({
      region,
    });

    const data = await client.send(
      new GetSecretValueCommand({ SecretId: secretName }),
    );

    if (data && data.SecretString) {
      secretId = data.SecretString;
    }

    const parser: { parse: (argument: string) => { [appId]: string } } = JSON;

    const parseSecret = parser.parse(secretId);
    return parseSecret[appId];
  } catch (error) {
    console.error(error);
    return JSON.stringify(error);
  }
};

export const authToken: () => Promise<string> = async () => {
  try {
    let token = '';

    const client = new SecretsManagerClient({
      region,
    });

    const data = await client.send(
      new GetSecretValueCommand({ SecretId: secretName }),
    );

    if (data && data.SecretString) {
      token = data.SecretString;
    }

    const parser: { parse: (argument: string) => { [appSecret]: string } } =
      JSON;

    const parseSecret = parser.parse(token);
    return parseSecret[appSecret];
  } catch (error) {
    console.error(error);
    return JSON.stringify(error);
  }
};
