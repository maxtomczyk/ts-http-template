import Router from 'koa-joi-router'
import * as endpoints from './endpoints'

const router = Router()

router.prefix('/app')

router.route({
  method: 'get',
  path: '/health',
  handler: [endpoints.healthcheck],
  meta: {
    swagger: {
      summary: 'Healthcheck',
      description: 'Returns 200 if instance is healthy.',
      tags: ['App']
    }
  },
  validate: {}
})

export default router