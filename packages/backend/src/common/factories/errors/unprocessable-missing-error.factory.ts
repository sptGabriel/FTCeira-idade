import { IUnprocessableModel } from '~/application/errors/unprocessable-entity.error'

export const missingFieldError = (field: string): IUnprocessableModel => {
  const type = 'Missing field'
  return { type, field }
}
