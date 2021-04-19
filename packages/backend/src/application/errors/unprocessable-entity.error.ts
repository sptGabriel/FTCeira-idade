import { BaseError } from './base-app.error'

export enum UnprocessableCodes {
  'missing_field',
  'missing',
  'invalid',
  'already_exists',
  'unprocessable',
}

export interface IUnprocessableModel {
  resource: string
  field: string
  code: keyof typeof UnprocessableCodes
}

export class UnprocessableEntityERROR extends BaseError {
  private errors = [] as IUnprocessableModel[]
  constructor(errors?: IUnprocessableModel[]) {
    super('Validation Failed')
    this.statusCode = 422
    this.name = 'UNPROCESSABLE_ERROR'
    if (errors) this.errors.push(...errors)
  }

  public addError(model: IUnprocessableModel) {
    this.errors.push(model)
  }

  public serialize() {
    const { message, statusCode, errors } = this
    return { message, statusCode, errors: errors.length > 0 || undefined }
  }
}
