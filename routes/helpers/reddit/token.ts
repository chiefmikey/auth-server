import axios from 'axios';
import dotenv from 'dotenv';

import { authId, authToken } from './auth';

if (
  process.env.NODE_ENV !== 'production' ||
  process.env.NODE_ENV !== undefined
) {
  dotenv.config();
}

const token = async () => {
  try {
    const appId = process.env.appId || (await authId());
    const appSecret = process.env.appSecret || (await authToken());

    const client = axios.create({
      auth: {
        username: appId,
        password: appSecret,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const urlEncode = () => {
      const out = [];
      out.push(`grant_type=${encodeURIComponent('client_credentials')}`);
      return out.join('&');
    };

    const response: { data: { access_token: string } } = await client.post(
      'https://www.reddit.com/api/v1/access_token',
      urlEncode(),
    );
    if (response && response.data && response.data.access_token) {
      return response.data.access_token;
    }
    return '';
  } catch (error) {
    return JSON.stringify(error);
  }
};

export default token;
