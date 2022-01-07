import Router from '@koa/router';

import auth from '../helpers/reddit/auth';

const router = new Router({ prefix: '/vm3000' });

router.get(
  '/vm3000',
  async (context: { response: { status: number; body: string } }) => {
    try {
      const token: string = await auth();
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
