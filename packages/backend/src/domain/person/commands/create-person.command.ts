import { v4 } from 'uuid'
import { ICommand } from '~/shared/core/mediator/interfaces/command'
import { Credentials } from '../value-objects/person-credentials.value-object'
import { PersonEmail } from '../value-objects/person-email.value-object'
import { PersonName } from '../value-objects/person-name.value-object'

export class CreatePersonCommand implements ICommand {
  private readonly id: string
  constructor(
    private readonly _name: PersonName,
    private readonly _email: PersonEmail,
    private readonly _credentials: Credentials,
  ) {
    this.id = v4()
  }

  public get name(): PersonName {
    return this._name
  }
  public get email(): PersonEmail {
    return this._email
  }

  public get credentials(): Credentials {
    return this._credentials
  }
}
