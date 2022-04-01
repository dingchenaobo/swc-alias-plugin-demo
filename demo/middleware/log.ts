import type { Context, Next } from 'koa';

export default async function(ctx: Context, next: Next) {
  const { protocol, path, hostname } = ctx;
  const tag = `${protocol}://${hostname}/${path}`;
  console.time(tag);
  await next();
  console.timeEnd(tag);
}
