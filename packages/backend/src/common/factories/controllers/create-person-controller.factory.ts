import { CreatePersonCommandHandler } from '~/application/commands/create-person/create-person.command-handler'
import { CreatePersonCommand } from '~/domain/person/commands/create-person.command'
import { Person } from '~/domain/person/entities/person.aggregrate'
import { Mediator } from '~/infrastructure/mediator'
import { CreatePersonController } from '~/presentation/controllers/create-person/create-person.controller'
import { CreatedResponse } from '~/presentation/responses/created-response'

export const makeCreatePersonControllerFactory = () => {
  const createdPersonPresenter = new CreatedResponse<Person>()
  const handler = new CreatePersonCommandHandler()
  Mediator.register({
    command: CreatePersonCommand,
    handler,
  })
  return new CreatePersonController(Mediator, createdPersonPresenter)
}
