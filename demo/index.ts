import Koa from 'koa';
import { join } from 'path';

import log from '@/middleware/log';
import view from '@/middleware/view';

const app = new Koa();
const port = 8081;

app.use(log);
app.use(view(join(__dirname, './public')));
app.use(ctx => ctx.render('index'));

app.listen(port, () => console.log(`app running at port ${port}`));
