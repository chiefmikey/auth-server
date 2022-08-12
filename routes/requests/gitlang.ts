import Router from '@koa/router';

import auth from '../helpers/github/auth';
import languages from '../helpers/github/languages';
import repos from '../helpers/github/repos';

const router = new Router({ prefix: '/gitlang' });

router.get(
  '/langs',
  async (context: {
    request: { query: { owner: string; repos: string } };
    response: { status: number; body: string };
  }) => {
    try {
      const token = await auth();
      const response = await languages(
        context.request.query.owner,
        JSON.parse(context.request.query.repos) as string[],
        token,
      );
      if (response && response.length > 0) {
        context.response.status = 200;
        context.response.body = JSON.stringify(response);
      } else {
        context.response.status = 404;
        context.response.body = JSON.stringify([]);
      }
    } catch {
      context.response.status = 404;
      context.response.body = JSON.stringify([]);
    }
  },
);

router.get(
  '/repos',
  async (context: {
    request: { query: { username: string } };
    response: { status: number; body: string };
  }) => {
    try {
      const token = await auth();
      const response = await repos(context.request.query.username, token);
      if (response && response.length > 0) {
        context.response.status = 200;
        context.response.body = JSON.stringify(response);
      } else {
        context.response.status = 404;
        context.response.body = JSON.stringify([]);
      }
    } catch {
      context.response.status = 404;
      context.response.body = JSON.stringify([]);
    }
  },
);

export default router;
