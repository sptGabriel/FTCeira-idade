import {
  IUnprocessableModel,
  UnprocessableCodes,
} from '~/application/errors/unprocessable-entity.error'

export const buildUnprocessable = (
  field: string,
  resource: string,
  code: keyof typeof UnprocessableCodes,
): IUnprocessableModel => {
  return { code, field, resource }
}
