import { Person } from '../entities/person.aggregrate'
import { IPersonProps } from '../interfaces/person'

export class PersonMapper {
  public static toProps(_json: IPersonProps): Person {
    throw new Error('Method not implemented.')
  }

  public static toJson(entity: Person) {
    return {
      login: entity.credentials.props.login,
      email: entity.email.value,
      firstName: entity.name.firstName,
      lastName: entity.name.lastName,
    }
  }
}
