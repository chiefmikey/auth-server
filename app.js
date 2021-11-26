import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import index from './routes/index.js';

const app = new Koa();

const whitelist = new Set(['https://gitlang.net']);

const checkUrl = async (context) => {
  const requestOrigin = context.request.header.host;
  if (!whitelist.has(requestOrigin)) {
    return context.throw(`${requestOrigin} is not a valid origin`);
  }
  return requestOrigin;
};

const checkWhitelist = (context) => {
  const requestOrigin = context.accept.headers.origin;
  console.log(requestOrigin);
  if (!whitelist.has(requestOrigin)) {
    return context.throw(`${requestOrigin} is not a valid origin`);
  }
  return requestOrigin;
};

const corsOptions = {
  origin: checkWhitelist,
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
