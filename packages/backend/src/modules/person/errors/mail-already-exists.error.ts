import { BaseError } from '~/application/errors/base-app.error'

export class MailAlreadyExistsError extends BaseError {
  constructor() {
    super(`The email is already registered, please choose another one.`)
    this.statusCode = 200
  }
  serialize() {
    return { message: this.message }
  }
}
