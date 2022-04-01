import Koa from 'koa';

import log from '@/middleware/log';

const app = new Koa();
const port = 8081;

app.use(log);
app.use(ctx => ctx.body = 'hello world.');

app.listen(port, () => console.log(`app running at port ${port}`));


function increment(num_1: number, num_2: number):number {
  return num_1 + num_2;
}

increment(1, 1);
