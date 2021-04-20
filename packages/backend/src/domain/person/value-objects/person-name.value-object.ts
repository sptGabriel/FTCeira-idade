import validator from 'validator'
import { IUnprocessableModel } from '~/application/errors/unprocessable-entity.error'
import { rangeError } from '~/common/factories/errors/unprocessable-length-error.factory'
import { missingFieldError as missingError } from '~/common/factories/errors/unprocessable-missing-error.factory'
import { Either, left, right } from '~/common/helpers/either-helper'
import { ValueObject } from '~/shared/domain'

interface IName {
  firstName: string
  lastName: string
}

export class PersonName extends ValueObject<IName> {
  public static maxLength = 30
  public static minLength = 4

  private constructor(props: IName) {
    super(props)
  }

  public get fullName(): string {
    return `${this.props.firstName} ${this.props.lastName}`
  }

  public get firstName(): string {
    return this.props.firstName
  }

  public get lastName(): string {
    return this.props.lastName
  }

  private static isAppropriateLength(value: string): boolean {
    const num = value.length
    return num >= this.minLength && num <= this.maxLength
  }
  private static validateSize(value: string) {
    return validator.isByteLength(value, {
      min: this.minLength,
      max: this.maxLength,
    })
  }

  public static build(data: IName): Either<IUnprocessableModel[], PersonName> {
    const errors = [] as IUnprocessableModel[]
    const lastName = data.lastName ?? errors.push(missingError('lastName'))
    const firstName = data.firstName ?? errors.push(missingError('firstName'))
    if (errors.length > 0) return left(errors)
    if (!this.isAppropriateLength(firstName)) {
      const err = rangeError('firstName', this.maxLength, this.minLength)
      errors.push(err)
    }
    if (!this.isAppropriateLength(lastName)) {
      const err = rangeError('lastName', this.maxLength, this.minLength)
      errors.push(err)
    }
    if (errors.length > 0) return left(errors)
    const name = new PersonName({ firstName, lastName })
    return right(name)
  }
}
