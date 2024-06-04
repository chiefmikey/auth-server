import fs from 'node:fs';

import cors from '@koa/cors';
import type Router from '@koa/router';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

interface ContextType {
  request: { header: { origin?: string } };
  throw: (error: string) => void;
}

interface RouterModule {
  default: Router;
}

const app = new Koa();

const run = async (): Promise<void> => {
  let importGitlang;
  let importConvert;

  const appGitlang = './gitlang/gitlang.ts';
  if (fs.existsSync(appGitlang)) {
    const { default: gitlang } = (await import(appGitlang)) as RouterModule;
    importGitlang = gitlang;
  }

  const appConvert = './convert/convert.ts';
  if (fs.existsSync(appConvert)) {
    const { default: convert } = (await import(appConvert)) as RouterModule;
    importConvert = convert;
  }

  const allowList = new Set(['https://gitlang.net', 'https://www.gitlang.net']);

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
    next();
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

  if (importGitlang) {
    app.use(importGitlang.routes()).use(importGitlang.allowedMethods());
  }
  if (importConvert) {
    app.use(importConvert.routes()).use(importConvert.allowedMethods());
  }

  app.listen(80);
};

void run();

export default app;
