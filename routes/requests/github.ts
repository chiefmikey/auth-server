import Router from '@koa/router';

import githubToken from '../tokens/github';

const router = new Router({ prefix: '/github' });

router.get(
  '/repo',
  async (context: { response: { status: number; body: string } }) => {
    try {
      const token: string = await githubToken();
      if (token && token.length > 0) {
        context.response.status = 200;
        context.response.body = token;
      } else {
        context.response.status = 404;
        context.response.body = '';
      }
    } catch {
      context.response.status = 404;
      context.response.body = '';
    }
  },
);

export default router;
