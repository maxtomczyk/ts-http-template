import config from '../../config'
import pino from 'pino'

export default pino({
  name: 'api',
  level: !process.env.TEST_RUN ? config.system.logLevel : 'silent',
  prettyPrint: config.system.env === 'development'
})
