import { Login } from '../value-objects/login.value-object'
import { Password } from '../value-objects/password.value-object'

export interface ICredentialsJSON {
  login: string
  password: string
  refreshToken?: string
}

export interface ICredentialsProps {
  login: Login
  password: Password
  refreshToken?: string
}
