import { IUnprocessableModel } from '~/application/errors/unprocessable-entity.error'

export const buildMissingFieldErr = (
  field: string,
  resource: string,
): IUnprocessableModel => {
  return { code: 'missing_field', field, resource }
}
