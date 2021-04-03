import { describe, it } from '@jest/globals'
import request from 'supertest'
import app from '../setup/app'

describe('Body parser Middleware', () => {
  it('Body parser Middleware', async () => {
    app.post('/body_parser', (req, res) => {
      res.send(req.body)
    })
    const result = await request(app)
      .post('/body_parser')
      .send({ bodyParser: 'pass' })
    expect(result.body).toMatchObject({ bodyParser: 'pass' })
  })
})
