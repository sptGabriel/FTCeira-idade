import { IUnprocessableModel } from '~/application/errors/unprocessable-entity.error'

export const notEmailError = (field: string): IUnprocessableModel => {
  const type = 'Not a valid email address'
  return { type, field }
}
