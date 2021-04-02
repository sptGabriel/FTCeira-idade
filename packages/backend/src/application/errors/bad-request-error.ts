import { DefaultError } from './default-app-error'

export class BadRequestERROR extends DefaultError {
  constructor(
    public readonly errors: any,
    public readonly statusCode = 400,
    msg?: string
  ) {
    super('Unable to process the request due to invalid syntax.', errors)
		this.name = 'BADREQUEST_ERROR'
  }
}
