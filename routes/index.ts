import Router from '@koa/router';

import gitlang from './requests/gitlang';
import vm3000 from './requests/vm3000';

const router = new Router({ prefix: '/auth' });

router.use(
  gitlang.routes(),
  gitlang.allowedMethods(),
  vm3000.routes(),
  vm3000.allowedMethods(),
);

export default router;
