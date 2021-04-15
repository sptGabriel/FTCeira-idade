import { Entity } from '~/shared/domain'
import { IUser } from './user'

export class User extends Entity<IUser> {
  private constructor(props: any) {
    super(props)
  }

  public static build() {
    //return new User(login, password)
  }
}
