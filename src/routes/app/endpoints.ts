import Koa from 'Koa'

export async function healthcheck(ctx: Koa.Context): Promise<void> {
  ctx.status = 200
}