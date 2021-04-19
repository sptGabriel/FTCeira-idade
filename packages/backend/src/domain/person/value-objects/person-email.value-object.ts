import validator from 'validator'
import { Either, right } from '~/common/helpers/either-helper'
import { ValueObject } from '~/shared/domain'
import { IUnprocessableModel } from '~/application/errors/unprocessable-entity.error'

export interface PersonEmailProps {
  value: string
}

export class PersonEmail extends ValueObject<PersonEmailProps> {
  private constructor(props: PersonEmailProps) {
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

  public static build(value: string): Either<IUnprocessableModel, PersonEmail> {
    //const isEmail = this.isValidEmail(value)
    return right(new PersonEmail({ value }))
  }
}
