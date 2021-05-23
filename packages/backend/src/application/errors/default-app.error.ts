import { ApplicationERROR } from '../../shared/ports/application-error'
import { BaseError } from './base-app.error'

export class DefaultError extends BaseError implements ApplicationERROR {
  public statusCode = 500
  constructor(message?: string) {
    super(message || 'Internal error')
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = 'INTERNAL_ERROR'
    //Error.captureStackTrace(this)
  }
  public serialize() {
    return { message: this.message }
  }
}
