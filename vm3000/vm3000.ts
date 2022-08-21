import Router from '@koa/router';

import vm3000Router from './requests/vm3000Router';

const router = new Router({ prefix: '/vm3000' });

router.use(vm3000Router.routes(), vm3000Router.allowedMethods());

export default router;
