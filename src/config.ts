import dotenv from 'dotenv'
dotenv.config()

export default {
  system: {
    port: Number(process.env.PORT) || 3000,
    logLevel: process.env.LOG_LEVEL || 'info',
    env: process.env.NODE_ENV || 'development'
  }
}
