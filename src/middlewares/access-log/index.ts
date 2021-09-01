import logger from '../../modules/logger'
import Koa from 'koa'
import { performance } from 'perf_hooks'

const loggerAccess = logger.child({ module: 'HttpAccess' })

export default async function (ctx: Koa.Context, next: Koa.Next): Promise<void> {
  const t0 = performance.now()
  try {
    await next()
    loggerAccess.info({
      responseTime: Math.round(performance.now() - t0),
      status: ctx.response.status,
      user: (ctx.state.user) ? ctx.state.user.id : '-',
      ip: ctx.request.headers['X-Forwarded-For'] || ctx.request.ip || '-'
    }, ctx.request.method + ' ' + ctx.request.url.split('?')[0])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    ctx.status = err.status || 500
    ctx.body = 'Error'
    ctx.app.emit('error', err)
    loggerAccess.error({
      responseTime: Math.round(performance.now() - t0),
      status: ctx.status,
      user: (ctx.state.user) ? ctx.state.user.id : '-',
      ip: ctx.request.headers['X-Forwarded-For'] || ctx.request.ip || '-'
    }, ctx.request.method + ' ' + ctx.request.url.split('?')[0])
  }
}