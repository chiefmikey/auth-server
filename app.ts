import cors from '@koa/cors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import index from './routes/index';

const app = new Koa();

const whitelist = new Set(['https://gitlang.net']);

const checkUrl = (context, next) => {
  if (
    !context.request.header.origin ||
    (context.request.header.origin &&
      !whitelist.has(context.request.header.origin))
  ) {
    return context.throw('Bad-Origin');
  }
  return next();
};

const checkCors = (context) => {
  if (
    !context.request.header.origin ||
    (context.request.header.origin &&
      !whitelist.has(context.request.header.origin))
  ) {
    return context.throw('Bad-Origin');
  }
  return context.request.header.origin;
};

const corsOptions = {
  origin: checkCors,
  allowMethods: 'GET',
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
