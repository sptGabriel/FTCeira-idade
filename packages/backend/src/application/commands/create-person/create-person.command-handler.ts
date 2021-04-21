import { Either, right } from '~/common/helpers/either-helper'
import { CreatePersonCommand } from '~/domain/person/commands/create-person.command'
import { Person } from '~/domain/person/entities/person.aggregrate'
import { IHandler } from '~/shared/core/mediator/interfaces/handler'

export class CreatePersonCommandHandler
  implements IHandler<CreatePersonCommand> {
  constructor() {}

  async execute(command: CreatePersonCommand): Promise<Either<any, Person>> {
    const { name, credentials, email } = command
    const person = Person.build({ name, credentials, email })
    return right(person)
  }
}
