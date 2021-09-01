import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'
import { createHttpTerminator } from 'http-terminator'
import logger from './modules/logger'
import pkg from '../package.json'
import accessLog from './middlewares/access-log'

import appRouter from './routes/app/router'
import config from './config'

const loggerMain = logger.child({ module: 'Main' })
const loggerEndpointError = logger.child({ module: 'EndpointError' })

const app = new Koa()

app.on('error', (err) => {
  loggerEndpointError.error(err)
})

app.use(accessLog)
app.use(bodyParser())
app.use(helmet())

app.use(appRouter.middleware())

loggerMain.info(`${pkg.name} ${pkg.version}, ${pkg.author}`)

const server = app.listen(config.system.port, '0.0.0.0', () => {
  loggerMain.info(`HTTP server started at port ${config.system.port}`)
})

const terminator = createHttpTerminator({ server })

async function shutdown(signal: string) {
  try {
    loggerMain.info(`${signal} signal received. Shutting down server.`)
    await terminator.terminate()
    loggerMain.info('HTTP Server stopped.')
  } catch (e) {
    loggerMain.error(e as string)
    process.exit(1)
  }
}

process.on('SIGTERM', () => { shutdown('SIGTERM') })
process.on('SIGINT', () => { shutdown('SIGINT') })

export default app
