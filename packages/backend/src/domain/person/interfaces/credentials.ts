import { UserPassword } from '../value-objects/password.value-object'
import { RefreshToken } from './jwt'

export interface ICredentialsJSON {
  login: string
  password: string
  refreshToken?: string
}

export interface ICredentialsProps {
  login: string
  password: UserPassword
  refreshToken?: RefreshToken
}
