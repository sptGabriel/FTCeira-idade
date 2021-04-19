import { IUnprocessableModel } from '~/application/errors/unprocessable-entity.error'
import { buildUnprocessable } from '../factories/errors/unprocessable-error.factory'

export const missingFields = (
  data: any,
  resource: string,
): IUnprocessableModel[] | undefined => {
  const errors = [] as IUnprocessableModel[]
  for (const key in data) {
    if (!data[key]) {
      errors.push(buildUnprocessable(key, resource, 'missing_field'))
    }
  }
  return errors.length > 0 ? errors : undefined
}
