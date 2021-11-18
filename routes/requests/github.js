/* eslint-disable no-param-reassign */
import Router from '@koa/router';
import githubToken from '../tokens/github.js';

const router = new Router({ prefix: '/github' });

router.get('/token', async (context) => {
  try {
    const token = await githubToken();
    context.response.status = 200;
    context.response.body = token;
  } catch (error) {
    console.error('error with get', error);
    context.response.status = 400;
    context.response.body = 'Error retrieving GitHub token';
  }
});

export default router;
