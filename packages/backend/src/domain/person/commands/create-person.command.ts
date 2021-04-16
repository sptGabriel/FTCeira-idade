import { ICommand } from 'gbc-mediator'
import { v4 } from 'uuid'
import { IPersonJSON } from '../interfaces/person'
import { IUserJSON } from '../interfaces/user'

export class CreatePersonCommand implements ICommand {
  private _id: string
  private _user: IUserJSON
  private _firstName: string
  private _lastName: string

  constructor(person: IPersonJSON) {
    this._id = v4()
    this._user.login = person.user.login
    this._user.password = person.user.password
    this._user.refreshToken = person.user.refreshToken
    this._firstName = person.firstName
    this._lastName = person.lastName
  }

  public get id(): string {
    return this._id
  }

  public get user(): IUserJSON {
    return this._user
  }

  public get firstName(): string {
    return this._firstName
  }

  public get lastName(): string {
    return this._lastName
  }
}
