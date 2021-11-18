import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import index from './routes/index.js';

const port = process.env.PORT || 3000;

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

app.listen(port, () => console.log('Koa is listening on port', port));

export default app;
