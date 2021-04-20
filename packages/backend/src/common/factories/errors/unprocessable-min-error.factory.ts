import { IUnprocessableModel } from '~/application/errors/unprocessable-entity.error'

export const minError = (field: string, min: number): IUnprocessableModel => {
  const type = `Value must be no more than ${min} characters long`
  return { type, field }
}
