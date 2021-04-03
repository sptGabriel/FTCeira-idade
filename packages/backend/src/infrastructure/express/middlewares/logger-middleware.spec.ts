import { describe, test } from '@jest/globals'
import request from 'supertest'
import app from '../setup/app'

describe('Content Type  Middleware', () => {
  test('should return default content type as json', async () => {
    app.get('/content_type', (req, res) => {
      res.send('')
    })
    await request(app).get('/content_type').expect('content-type', /json/)
  })
})
