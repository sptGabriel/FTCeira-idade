import { User } from "./user-entity";

export interface IPerson {
  id: string
	user: User
  firstName: string
  lastName: string
  registration: string
}