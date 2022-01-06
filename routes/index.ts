import Router from '@koa/router';

import github from './requests/github';
import reddit from './requests/reddit';

const router = new Router({ prefix: '/auth' });

router.use(
  github.routes(),
  github.allowedMethods(),
  reddit.routes(),
  reddit.allowedMethods(),
);

export default router;
