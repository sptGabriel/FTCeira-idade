import { IUnprocessableModel } from '~/application/errors/unprocessable-entity.error'
import { Either, right } from '~/common/helpers/either-helper'
import { Entity } from '~/shared/domain'
import { IPersonProps } from '../interfaces/person'
import { Credentials } from '../value-objects/person-credentials.value-object'
import { PersonEmail } from '../value-objects/person-email.value-object'
import { PersonName } from '../value-objects/person-name.value-object'

export class Person extends Entity<IPersonProps> {
  private constructor(props: IPersonProps, id?: string) {
    super(props, id)
  }

  public get credentials(): Credentials {
    return this.props.credentials
  }

  public get name(): PersonName {
    return this.props.name
  }

  public get email(): PersonEmail {
    return this.props.email
  }

  public static build(
    props: IPersonProps & { id: string },
  ): Either<IUnprocessableModel[], Person> {
    const person = new Person(props, props.id)
    return right(person)
  }

  public createUser(data: Credentials) {
    if (this.props.credentials) return
    this.props.credentials = data
  }
}
