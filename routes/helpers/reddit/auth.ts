import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';

const region = 'us-east-2';
const secretName = 'view-master-3000';
const appId = 'vm3000-id';
const appSecret = 'vm3000-secret';

export const id: () => Promise<string> = async () => {
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
    const parser: { parse: (argument: string) => { [appId]: string } } = JSON;
    const parseSecret = parser.parse(secret);
    return parseSecret[appId];
  } catch (error) {
    console.log(error);
    return JSON.stringify(error);
  }
};

export const secret: () => Promise<string> = async () => {
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
    const parser: { parse: (argument: string) => { [appSecret]: string } } =
      JSON;
    const parseSecret = parser.parse(secret);
    return parseSecret[appSecret];
  } catch (error) {
    return JSON.stringify(error);
  }
};
