import { ValueObject } from '~/shared/domain'
import { missingFieldError as missingError } from '~/common/factories/errors/unprocessable-missing-error.factory'
import { IUnprocessableModel } from '~/application/errors/unprocessable-entity.error'
import { minError } from '~/common/factories/errors/unprocessable-min-error.factory'
import { Either, left, right } from '~/common/helpers/either-helper'

export class Password extends ValueObject<{ value: string }> {
  public static minLength = 8

  private constructor(props: { value: string }) {
    super(props)
  }

  get value(): string {
    return this.props.value
  }

  private static isAppropriateLength(password: string): boolean {
    return password.length >= this.minLength
  }

  public static build(value: string): Either<IUnprocessableModel[], Password> {
    const errors = [] as IUnprocessableModel[]
    const password = value ?? errors.push(missingError('password'))
    if (typeof value === 'string' && !this.isAppropriateLength(value)) {
      errors.push(minError('password', this.minLength))
    }
    if (errors.length > 0) return left(errors)
    return right(new Password({ value: password }))
  }
}
