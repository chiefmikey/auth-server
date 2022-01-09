import axios from 'axios';

import { id, secret } from './auth';

const token = async () => {
  try {
    const response = await axios.get(
      'https://www.reddit.com/api/v1/access_token',
      {
        params: {
          grant_type: 'client_credentials',
          user: await id(),
          password: await secret(),
        },
      },
    );
    if (response && response.data && response.data.access_token) {
      return response.data.access_token;
    }
  } catch {
    return {};
  }
};

export default token;
