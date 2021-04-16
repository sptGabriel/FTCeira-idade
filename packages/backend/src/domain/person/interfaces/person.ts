import { IUserJSON } from './user'
import { User } from '../user.entity'

export interface IPersonJSON {
  user: IUserJSON
  firstName: string
  lastName: string
}

export interface IPersonProps {
  user: User
  firstName: string
  lastName: string
}
