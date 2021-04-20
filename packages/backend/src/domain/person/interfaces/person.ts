import { Credentials } from '../value-objects/person-credentials.value-object'
import { PersonEmail } from '../value-objects/person-email.value-object'
import { PersonName } from '../value-objects/person-name.value-object'
import { ICredentialsJSON } from './credentials'

export interface IPersonJSON {
  credentails: ICredentialsJSON
  firstName: string
  lastName: string
}

export interface IPersonProps {
  credentials: Credentials
  name: PersonName
  email: PersonEmail
}
