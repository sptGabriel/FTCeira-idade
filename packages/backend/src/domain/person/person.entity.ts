import { v4 } from 'uuid'
import { Entity } from '~/shared/domain'
import { IPersonJSON, IPersonProps } from './interfaces/person'
import { IUserJSON } from './interfaces/user'
import { User } from './user.entity'

export class Person extends Entity<IPersonProps & { id: string }> {
  private constructor(props: IPersonProps, id: string) {
    super({ ...props, id: id || v4() })
  }

  public static create(props: IPersonJSON, id?: string) {
    const user = User.build(props.user, id)
    return new Person({ ...props, user }, id || v4())
  }

  public createUser(_data: IUserJSON) {
    if (this.props.user) return
  }
}
