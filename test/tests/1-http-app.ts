import supertest from 'supertest'
import app from '../../src/index'
import 'mocha'
import { Server } from 'http'
import { expect } from 'chai'

describe('HTTP: /app', () => {
  let server: Server
  let req: supertest.SuperTest<supertest.Test>

  before(async () => { 
    server = app.listen(8888) 
  })

  after(() => { 
    server.close()
    return
  })

  beforeEach(async () => { req = supertest(server) })

  describe('GET /app/health', () => {
    it('should respond with 200', () => {
      return req
        .get('/app/health')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.empty
        })
    })
  })
})