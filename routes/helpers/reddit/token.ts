import axios from 'axios';

import auth from '../github/auth';

import { id, secret } from './auth';

const token = async () => {
  try {
    const appId = await id();
    const appSecret = await secret();

    const response: { data: { access_token: string } } = await axios({
      url: 'https://www.reddit.com/api/v1/access_token',
      auth: { username: appId, password: appSecret },
      data: {
        grant_type: 'client_credentials',
      },
    });
    if (response && response.data && response.data.access_token) {
      return JSON.stringify(response.data.access_token);
    }
    return JSON.stringify(response);
  } catch (error) {
    return JSON.stringify(error);
  }
};

export default token;
