import type { Context, Next } from 'koa';

import { time, timeEnd } from '@/utils';

export default async function(ctx: Context, next: Next) {
  const { protocol, path, hostname } = ctx;
  const tag = `${protocol}://${hostname}/${path}`;
  time(tag);
  await next();
  timeEnd(tag);
}
