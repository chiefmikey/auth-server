import Router from '@koa/router';

import redditToken from '../tokens/redditToken';

const router = new Router({ prefix: '/reddit' });

router.get(
  '/view-master-3000',
  async (context: { response: { status: number; body: string } }) => {
    try {
      const token: string = await redditToken();
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
