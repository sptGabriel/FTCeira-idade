import { v4 } from 'uuid'
import { Entity } from '~/shared/domain'
import { IUserJSON } from './interfaces/user'

export class User extends Entity<IUserJSON & { id: string | number }> {
  private constructor(props: IUserJSON, id: string | number) {
    super({ ...props, id })
  }

  public static build(user: IUserJSON, id?: string | number) {
    return new User(user, id || v4())
  }
}
