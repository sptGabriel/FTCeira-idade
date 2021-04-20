import { BaseError } from './base-app.error'

export interface IUnprocessableModel {
  field: string
  type: string
}

export class UnprocessableERROR extends BaseError {
  private errors = [] as IUnprocessableModel[]
  constructor(
    private readonly resource: string,
    errors?: IUnprocessableModel[],
  ) {
    super('Validation Failed')
    this.statusCode = 422
    this.name = 'UNPROCESSABLE_ERROR'
    if (errors) this.errors = errors
  }

  public serialize() {
    const { message, statusCode } = this
    const errors = this.errors.length > 0 ? this.errors : undefined
    return { message, statusCode, errors }
  }
}
