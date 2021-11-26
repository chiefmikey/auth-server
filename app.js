import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import index from './routes/index.js';

const app = new Koa();

const whitelist = new Set(['https://gitlang.net']);

const checkUrl = async (context) => {
  if (
    context.request.header.origin &&
    whitelist.has(context.request.header.origin)
  ) {
    return context;
  }
  return context.throw('Not a valid origin');
};

const corsOptions = {
  origin: checkUrl,
  allowMethods: 'GET',
  maxAge: 600,
};

app
  .use(checkUrl)
  .use(cors(corsOptions))
  .use(bodyParser())
  .use(index.routes())
  .use(index.allowedMethods())
  .listen(80, () => console.log('Koa is listening on port 80'));

export default app;
