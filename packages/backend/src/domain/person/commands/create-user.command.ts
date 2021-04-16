import { ICommand } from 'gbc-mediator'
import { v4 } from 'uuid'
import { IUserJSON } from '../interfaces/user'

export class CreateUserCommand implements ICommand {
  private _id: string
  private _login: string
  private _password: string

  constructor(user: Omit<IUserJSON, 'id' | 'refreshToken'>) {
    this._login = user.login
    this._password = user.password
    this._id = v4()
  }

  public get id(): string {
    return this._id
  }

  public get login(): string {
    return this._login
  }

  public get password(): string {
    return this._password
  }
}
