import { ApplicationERROR } from "../ports/application-error"
import { IErrorModel } from "../ports/error-model"

export class DefaultError extends Error implements ApplicationERROR {
  public statusCode = 500
  constructor(
    public readonly message: string,
    public readonly errors?: IErrorModel[],
  ) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    this.errors = errors
    this.name = 'INTERNAL_ERROR'
    Error.captureStackTrace(this)
  }
  public serialize(): ApplicationERROR {
    const { name, message, statusCode, errors } = this

    let error: ApplicationERROR = {
      message,
      name,
      errors,
      statusCode,
    }
    if (statusCode) error.statusCode = statusCode
    if (errors) error.errors = errors
    return error
  }
}
