import { join, extname } from 'path';
import { createReadStream } from 'fs';
import type { Context, Next } from 'koa';

export default function view(absolutePath: string) {
  return function(ctx: Context, next: Next) {
    ctx.render = function render(tpl: string) {
      const ext = extname(tpl) || '.html';

      ctx.body = createReadStream(
        join(absolutePath, `${tpl}${ext}`)
      );
    };

    next();
  }
}
