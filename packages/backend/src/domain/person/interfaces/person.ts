import { PersonName } from '../value-objects/person-name.value-object'
import { ICredentialsJSON, ICredentialsProps } from './credentials'

export interface IPersonJSON {
  credentails: ICredentialsJSON
  firstName: string
  lastName: string
}

export interface IPersonProps {
  credentials: ICredentialsProps
  name: PersonName
}
