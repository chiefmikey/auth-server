import cors from '@koa/cors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import index from './routes/index';

interface ContextType {
  request: { header: { origin?: string } };
  throw: (error: string) => void;
}

const app = new Koa();

const whitelist = new Set([
  'https://gitlang.net',
  'https://viewmaster3000.com',
]);

const checkUrl = (context: ContextType, next: () => void) => {
  if (
    !context.request.header.origin ||
    (context.request.header.origin &&
      !whitelist.has(context.request.header.origin))
  ) {
    context.throw('Bad-Origin');
  }
  return next();
};

const checkCors = (context: ContextType): string => {
  if (
    !context.request.header.origin ||
    (context.request.header.origin &&
      !whitelist.has(context.request.header.origin))
  ) {
    context.throw('Bad-Origin');
  }
  return context.request.header.origin || '';
};

const corsOptions = {
  origin: checkCors,
  allowMethods: ['GET', 'POST'],
  maxAge: 600,
};

app
  .use(checkUrl)
  .use(cors(corsOptions))
  .use(bodyParser())
  .use(index.routes())
  .use(index.allowedMethods())
  .listen(80);

export default app;
