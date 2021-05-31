import { BaseError } from '~/application/errors/base-app.error'

export class CPFAlreadyExistsError extends BaseError {
  constructor(cpf: string) {
    super(`Cpf: ${cpf} is already registered`)
    this.statusCode = 200
  }
  serialize() {
    return { message: this.message }
  }
}
