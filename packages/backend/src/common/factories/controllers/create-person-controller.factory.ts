//import { CreatePersonCommandHandler } from '~/application/commands/create-person/create-person.command-handler'
//import { CreatePersonCommand } from '~/domain/person/commands/create-person.command'
//import { Mediator } from '~/infrastructure/mediator'
//import { CreatePersonController } from '~/presentation/controllers/create-person/create-person.controller'

//export const makeCreatePersonControllerFactory = () => {
//  const handler = new CreatePersonCommandHandler()
//  Mediator.register({
//    command: CreatePersonCommand,
//    handler,
//  })
//  return new CreatePersonController(Mediator)
//}
