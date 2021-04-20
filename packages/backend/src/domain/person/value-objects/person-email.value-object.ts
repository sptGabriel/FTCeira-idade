import validator from 'validator'
import { Either, left, right } from '~/common/helpers/either-helper'
import { ValueObject } from '~/shared/domain'
import { IUnprocessableModel } from '~/application/errors/unprocessable-entity.error'
import { missingFieldError as missingError } from '~/common/factories/errors/unprocessable-missing-error.factory'
import { notEmailError } from '~/common/factories/errors/unprocessable-email-error.factory'

export class PersonEmail extends ValueObject<{ value: string }> {
  private constructor(props: { value: string }) {
    super(props)
  }

  get value(): string {
    return this.props.value
  }

  private static isValidEmail(email: string) {
    return validator.isEmail(email)
  }

  private static format(email: string): string {
    return email.trim().toLowerCase()
  }

  public static build(
    value: string,
  ): Either<IUnprocessableModel[], PersonEmail> {
    const errors = [] as IUnprocessableModel[]
    const email = value ?? errors.push(missingError('email'))
    if (typeof email === 'string' && !this.isValidEmail(value)) {
      errors.push(notEmailError('email'))
    }
    return errors.length > 0 ? left(errors) : right(new PersonEmail({ value }))
  }
}
