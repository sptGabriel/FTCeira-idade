import { IUnprocessableModel } from '~/application/errors/unprocessable-entity.error'
import { Either, left, right } from '~/common/helpers/either-helper'
import { ValueObject } from '~/shared/domain'
import { ICredentialsProps, ICredentialsJSON } from '../interfaces/credentials'
import { Login } from './login.value-object'
import { Password } from './password.value-object'

export class Credentials extends ValueObject<ICredentialsProps> {
  private constructor(props: ICredentialsProps) {
    super(props)
  }

  public static build(
    props: ICredentialsJSON,
  ): Either<IUnprocessableModel[], Credentials> {
    const errors = [] as IUnprocessableModel[]
    const loginOrError = Login.build(props.login)
    const pwdOrError = Password.build(props.password)
    if (pwdOrError.isLeft()) errors.push(...pwdOrError.value)
    if (loginOrError.isLeft()) errors.push(...loginOrError.value)
    return errors.length > 0
      ? left(errors)
      : right(
          new Credentials({
            login: loginOrError.value as Login,
            password: pwdOrError.value as Password,
            refreshToken: props.refreshToken,
          }),
        )
  }
}
