/* eslint-disable @typescript-eslint/no-var-requires */
import { SwaggerAPI } from 'koa-joi-router-docs'
import fs from 'fs'
import pkg from '../package.json'

import app from '../src/routes/app/router'

const generator = new SwaggerAPI()

generator.addJoiRouter(app)

const spec = generator.generateSpec({
  info: {
    title: 'Typescript HTTP Template',
    description: 'Good starting point for Typescript HTTP Server with tests and docs generator',
    version: pkg.version
  },
  basePath: '/',
  tags: [{
    name: 'App',
    description: 'Endpoints related to state of app server instance'
  }]
}, {
  defaultResponses: {}
})

fs.writeFileSync(__dirname + '/_api.json', JSON.stringify(spec))
process.exit(0)
