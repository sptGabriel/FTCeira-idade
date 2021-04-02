import { describe, test } from '@jest/globals'
import request, { Request } from 'supertest'
import app from '../setup/app'

describe('Content Type  Middleware', () => {
  test('should return default content type as json', async () => {
    app.get('/content_type', (req, res) => {
      res.send('')
    })
    await request(app).get('/content_type').expect('content-type', /json/)
  })
  test('should return xml default when force', async () => {
    app.get('/content_type_xml', (req, res) => {
      res.type('xml')
      res.send('')
    })

    await request(app).get('/content_type_xml').expect('content-type', /xml/)
  })
})
