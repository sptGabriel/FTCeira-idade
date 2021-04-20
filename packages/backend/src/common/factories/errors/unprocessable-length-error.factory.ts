import { IUnprocessableModel } from '~/application/errors/unprocessable-entity.error'

export const rangeError = (
  field: string,
  min: number,
  max: number,
): IUnprocessableModel => {
  const type = `Value must be between ${min} and ${max} characters long`
  return { type, field }
}
