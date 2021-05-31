import { ObjectSchema, ValidationOptions } from 'joi'
import { UnprocessableERROR } from '../../application/errors/unprocessable-entity.error'

export const validateDTO = (
  data: any,
  schema: ObjectSchema<any>,
  resource: string,
) => {
  const options: ValidationOptions = { abortEarly: false, convert: true }
  const errors = schema.validate(data, options)
  return errors.error
    ? new UnprocessableERROR(
        resource,
        buildUsefulErrorObject(errors.error.details),
      )
    : null
}

const buildUsefulErrorObject = (errors: any) => {
  return errors.map((error: any) => {
    return {
      field: error.path.join('.'),
      reason: error.message.split(`"`).join(''),
    }
  })
}
