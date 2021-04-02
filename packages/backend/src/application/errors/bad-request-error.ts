import { IErrorModel } from '../ports/error-model'
import { DefaultError } from './default-app-error'

export class BadRequestERROR extends DefaultError {
  constructor(
    message?: string,
    public readonly errors?: IErrorModel[],
    public readonly statusCode = 400,
  ) {
    super(
      message || 'Unable to process the request due to invalid syntax.',
      errors,
    )
    this.name = 'BADREQUEST_ERROR'
  }
}
