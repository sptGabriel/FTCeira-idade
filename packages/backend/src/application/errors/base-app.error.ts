import { ApplicationERROR } from '../ports/application-error'

export abstract class BaseError extends Error implements ApplicationERROR {
  public statusCode = 500
  constructor(message?: string) {
    super(message || 'Internal error')
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = 'INTERNAL_ERROR'
    //Error.captureStackTrace(this)
  }
  abstract serialize(): any
}
