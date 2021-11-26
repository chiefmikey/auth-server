import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import index from './routes/index.js';

const app = new Koa();

const whitelist = new Set(['https://gitlang.net']);

const checkWhitelist = (context) => {
  const requestOrigin = context.accept.headers.origin;
  if (!whitelist.has(requestOrigin)) {
    return context.throw(`${requestOrigin} is not a valid origin`);
  }
  return requestOrigin;
};

app
  .use(
    cors({
      origin: checkWhitelist,
      methods: 'GET',
      maxAge: 600,
    }),
  )
  .use(bodyParser())
  .use(index.routes())
  .use(index.allowedMethods());

app.listen(80, () => console.log('Koa is listening on port 80'));

export default app;
