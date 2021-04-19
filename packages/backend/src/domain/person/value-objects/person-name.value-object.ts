import { IUnprocessableModel } from '~/application/errors/unprocessable-entity.error'
import { Either } from '~/common/helpers/either-helper'
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

  public static build(_data: IName): Either<IUnprocessableModel, PersonName> {
    throw new Error(`not implemented yet`)
    //let resource = 'person'
    //let errors = [] as IUnprocessableModel[]
    //const lastName = data.lastName ?? errors.push(buildMissingFieldErr('lastName', resource))
    //const firstName = data.firstName ?? errors.push(requiredErr('firstName'))
    //const fullName = lastName + firstName
    //if (fullName.length < this.minLength) errors.push(minErr(this.minLength))
    //if (fullName.length > this.maxLength) errors.push(maxErr(this.maxLength))
    //const name = new PersonName({ firstName, lastName })
    //return errors.length > 0 ? left(errors) : right(name)
  }
}
