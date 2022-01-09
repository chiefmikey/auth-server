import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';

const region = 'us-east-2';
const appId = 'vm3000-id';
const appSecret = 'vm3000-secret';

export const id: () => Promise<string> = async () => {
  try {
    let secret = '';

    const client = new SecretsManagerClient({
      region,
    });

    const data = await client.send(
      new GetSecretValueCommand({ SecretId: appId }),
    );

    if (data && data.SecretString) {
      secret = data.SecretString;
    }
    const parser: { parse: (argument: string) => { [appId]: string } } = JSON;
    const parseSecret = parser.parse(secret);
    return parseSecret[appId];
  } catch {
    return '';
  }
};

export const secret: () => Promise<string> = async () => {
  try {
    let secret = '';

    const client = new SecretsManagerClient({
      region,
    });

    const data = await client.send(
      new GetSecretValueCommand({ SecretId: appSecret }),
    );

    if (data && data.SecretString) {
      secret = data.SecretString;
    }
    const parser: { parse: (argument: string) => { [appSecret]: string } } =
      JSON;
    const parseSecret = parser.parse(secret);
    return parseSecret[appSecret];
  } catch {
    return '';
  }
};
