import axios from 'axios';

import { id, secret } from './auth';

const token = async () => {
  try {
    const response: { data: { access_token: string } } = await axios.post(
      'https://www.reddit.com/api/v1/access_token',
      {
        grant_type: 'client_credentials',
        user: await id(),
        password: await secret(),
      },
    );
    if (response && response.data && response.data.access_token) {
      return JSON.stringify(response.data.access_token);
    }
    return JSON.stringify(response);
  } catch (error) {
    return JSON.stringify(error);
  }
};

export default token;
