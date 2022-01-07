import Router from '@koa/router';

import auth from '../helpers/github/auth';
import languages from '../helpers/github/languages';
import repos from '../helpers/github/repos';

const router = new Router({ prefix: '/gitlang' });
let token: string;

router.get('/langs', async (context) => {
  try {
    if (!token) {
      token = await auth();
    }
    const response = await languages(
      context.request.query.owner,
      context.request.query.repos,
      token,
    );
    if (response && response.length > 0) {
      context.response.status = 200;
      context.response.body = response;
    } else {
      context.response.status = 404;
      context.response.body = [];
    }
  } catch {
    context.response.status = 404;
    context.response.body = [];
  }
});

router.get('/repos', async (context) => {
  try {
    if (!token) {
      token = await auth();
    }
    const response = await repos(context.request.query.owner, token);
    if (response && response.length > 0) {
      context.response.status = 200;
      context.response.body = response;
    } else {
      context.response.status = 404;
      context.response.body = [];
    }
  } catch {
    context.response.status = 404;
    context.response.body = [];
  }
});

export default router;
