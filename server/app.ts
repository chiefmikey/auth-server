import fs from 'node:fs';

import cors from '@koa/cors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

let gitlangImport;
const appGitlang = './gitlang/gitlang';
if (fs.existsSync(appGitlang)) {
  console.log('gitlang exists');
  const { default: gitlang } = await import(appGitlang);
  gitlangImport = gitlang;
}

let vm3000Import;
const appVm3000 = './vm3000/vm3000';
if (fs.existsSync(appVm3000)) {
  console.log('vm3000 exists');
  const { default: vm3000 } = await import(appVm3000);
  vm3000Import = vm3000;
}

interface ContextType {
  request: { header: { origin?: string } };
  throw: (error: string) => void;
}

const app = new Koa();

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
    context.throw('CORS-Bad-Origin');
  }
  return context.request.header.origin || '';
};

const corsOptions = {
  origin: checkCors,
  allowMethods: ['GET', 'POST'],
  maxAge: 600,
};

app.use(checkUrl).use(cors(corsOptions)).use(bodyParser());

gitlangImport &&
  app.use(gitlangImport.routes()).use(gitlangImport.allowedMethods());
vm3000Import &&
  app.use(vm3000Import.routes()).use(vm3000Import.allowedMethods());

app.listen(80);

export default app;
