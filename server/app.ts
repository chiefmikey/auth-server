import fs from 'node:fs';

import cors from '@koa/cors';
import Router from '@koa/router';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

interface ContextType {
  request: { header: { origin?: string } };
  throw: (error: string) => void;
}

type RouterModule = {
  default: Router;
};

const app = new Koa();

const run = async () => {
  let importGitlang;
  let importGitlangBeta;
  let importVm3000;

  const appGitlang = './gitlang/gitlang.ts';
  if (fs.existsSync(appGitlang)) {
    const { default: gitlang } = (await import(appGitlang)) as RouterModule;
    importGitlang = gitlang;
  }

  const appGitlangBeta = './gitlang-beta/gitlang.ts';
  if (fs.existsSync(appGitlangBeta)) {
    const { default: gitlang } = (await import(appGitlangBeta)) as RouterModule;
    importGitlangBeta = gitlang;
  }

  const appVm3000 = './vm3000/vm3000.ts';
  if (fs.existsSync(appVm3000)) {
    const { default: vm3000 } = (await import(appVm3000)) as RouterModule;
    importVm3000 = vm3000;
  }

  const allowList = new Set([
    'https://gitlang.net',
    'https://beta.gitlang.net',
    'https://viewmaster3000.com',
  ]);

  const checkUrl = (context: ContextType, next: () => void) => {
    console.log('Request:', context.request);
    if (
      !context.request.header.origin ||
      (context.request.header.origin &&
        !allowList.has(context.request.header.origin))
    ) {
      console.error('Bad-Origin:', context.request.header.origin);
      context.throw('Bad-Origin');
    }
    return next();
  };

  const checkCors = (context: ContextType) => {
    if (
      !context.request.header.origin ||
      (context.request.header.origin &&
        !allowList.has(context.request.header.origin))
    ) {
      console.error('CORS-Bad-Origin:', context.request.header.origin);
      context.throw('CORS-Bad-Origin');
    }
    return context.request.header.origin ?? '';
  };

  const corsOptions = {
    origin: checkCors,
    allowMethods: ['GET', 'POST'],
    maxAge: 600,
  };

  app.use(checkUrl).use(cors(corsOptions)).use(bodyParser());

  importGitlang &&
    app.use(importGitlang.routes()).use(importGitlang.allowedMethods());
  importGitlangBeta &&
    app.use(importGitlangBeta.routes()).use(importGitlangBeta.allowedMethods());
  importVm3000 &&
    app.use(importVm3000.routes()).use(importVm3000.allowedMethods());

  app.listen(80);
};

run().catch((error) => {
  console.error(error);
});

export default app;
