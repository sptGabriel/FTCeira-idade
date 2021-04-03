import { describe, it } from '@jest/globals'
import request from 'supertest'
import app from '../setup/app'

describe('Cors Middleware', () => {
  it('should enable cors', async () => {
    app.post('/check_cors', (req, res) => {
      res.send()
    })
    const result = await request(app).get('/check_cors')
    expect(result.header['access-control-allow-origin']).toBe('*')
    expect(result.header['access-control-allow-headers']).toBe('*')
    expect(result.header['access-control-allow-methods']).toBe('*')
  })
})
