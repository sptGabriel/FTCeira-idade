import { DefaultError } from './default-app.error'

export class ConflictERROR extends DefaultError {
  constructor(msg?: string, public readonly statusCode = 409) {
    super(msg || 'Resource already exists .')
    this.name = 'CONFLICT_ERROR'
  }
}
