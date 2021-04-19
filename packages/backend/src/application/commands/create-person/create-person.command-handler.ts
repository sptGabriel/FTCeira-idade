//import { CreatePersonCommand } from '~/domain/person/commands/create-person.command'
//import { Person } from '~/domain/person/person.entity'
//import { IHandler } from '~/shared/core/mediator/interfaces/handler'

//export class CreatePersonCommandHandler
//  implements IHandler<CreatePersonCommand> {
//  constructor() {}

//  async execute(command: CreatePersonCommand) {
//    const { firstName, lastName, login, password, id, personId } = command
//    const user = { personId, login, password }
//    const person = Person.build({ id, lastName, firstName, user })
//    console.log(person, 'person2')
//  }
//}
