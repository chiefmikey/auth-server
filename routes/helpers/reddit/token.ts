import axios from 'axios';

import { id, secret } from './auth';

let response;

const token = async () => {
  try {
    response = await axios.get('https://www.reddit.com/api/v1/access_token', {
      params: {
        grant_type: 'client_credentials',
        user: await id(),
        password: await secret(),
      },
    });
    if (response && response.data && response.data.access_token) {
      return response.data.access_token;
    }
  } catch {
    return response.data;
  }
};

export default token;
