import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import index from './routes/index.js';

const app = new Koa();

app
  .use(
    cors({
      origin: '*',
      methods: 'GET',
      allowedHeaders: '*',
      exposedHeaders: '*',
    }),
  )
  .use(bodyParser())
  .use(index.routes())
  .use(index.allowedMethods());

app.listen(443, () => console.log('Koa is listening on port 443'));

export default app;
