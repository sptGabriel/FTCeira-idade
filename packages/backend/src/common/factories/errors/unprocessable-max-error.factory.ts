import { IUnprocessableModel } from '~/application/errors/unprocessable-entity.error'

export const maxError = (
  field: string,
  opt: { min: number; max: number },
): IUnprocessableModel => {
  const type = `Value must be between ${opt.min} and ${opt.max} characters long`
  return { type, field }
}
