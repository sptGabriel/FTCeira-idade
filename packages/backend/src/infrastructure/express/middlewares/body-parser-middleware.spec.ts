import { describe, test } from '@jest/globals'
import request, { Request } from 'supertest'
import app from '../setup/app'

describe('Body parser Middleware', () => {
  test('Body parser Middleware', async () => {
    app.post('/body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/body_parser')
      .send({ pass: 'body-parser' })
      .expect({ pass: 'body-parser' })
  })
})
