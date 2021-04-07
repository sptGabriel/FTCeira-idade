import { Entity, Identifier } from '~/common/helpers/entity'

class PersonID extends Identifier<string> {}
class UserID extends Identifier<string> {}
export abstract class Person extends Entity<PersonID> {}

export class Teacher extends Person {
  constructor(id: PersonID) {
    super(id)
  }
}

export class Student extends Person {
  constructor(id: PersonID) {
    super(id)
  }
}

export class User extends Entity<UserID> {
	private _personId: PersonID
	private _login: string
	private _password: string
  constructor(id: UserID) {
    super(id)
  }
}
