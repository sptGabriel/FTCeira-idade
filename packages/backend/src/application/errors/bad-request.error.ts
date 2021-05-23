import { DefaultError } from './default-app.error'

interface BadRequest {
  errors?: any
  message?: string
}

export class BadRequestERROR extends DefaultError {
  constructor(err?: BadRequest, public readonly statusCode = 400) {
    super((err && err.message) || 'Problems parsing JSON.')
    this.name = 'BADREQUEST_ERROR'
  }
}
