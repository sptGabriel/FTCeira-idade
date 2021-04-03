import { describe } from '@jest/globals'
import request from 'supertest'
import app from '../setup/app'

describe('Content Type  Middleware', () => {
  it('should return default content type as json', async () => {
    app.get('/content_type', (req, res) => {
      res.send('')
    })
    const result = await request(app).get('/content_type')
    expect(result.headers['content-type']).toBe(
      'application/json; charset=utf-8',
    )
  })
  it('should return xml default when force', async () => {
    app.get('/content_type_xml', (req, res) => {
      res.type('xml')
      res.send('')
    })
    const result = await request(app).get('/content_type_xml')
    expect(result.headers['content-type']).toBe(
      'application/xml; charset=utf-8',
    )
  })
})
