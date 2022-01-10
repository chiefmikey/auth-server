import axios from 'axios';
import dotenv from 'dotenv';

import { id, secret } from './auth';

dotenv.config();

const token = async () => {
  try {
    const appId = process.env.appId || (await id());
    const appSecret = process.env.appSecret || (await secret());
    console.log('idididid', appId, appSecret);

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
