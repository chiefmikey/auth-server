import Router from '@koa/router';

import github from './requests/github.js';

const router = new Router({ prefix: '/auth' });

router.use(github.routes(), github.allowedMethods());

export default router;
