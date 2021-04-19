import { HandlerNotFoundException } from './exceptions/handler-not-found-error'
import { InvalidCommandException } from './exceptions/invalid-command-error'
import { ICommand } from './interfaces/command'
import { IHandler } from './interfaces/handler'
import { IMediator } from './interfaces/mediator'
import { IRegisterHandler } from './interfaces/register-handler'

export class Mediator implements IMediator {
  private registry: Map<string, IHandler> = new Map()
  public register(data: IRegisterHandler): void {
    this.registry.set(data.command.name, data.handler)
  }
  public publish<T extends ICommand>(command: T): Promise<any> {
    if (!command) throw new InvalidCommandException()
    const handler = this.registry.get(command.constructor.name)
    if (!handler) throw new HandlerNotFoundException(command.constructor.name)
    if (!command.CanExecute()) throw new InvalidCommandException()
    return handler.execute(command)
  }
}
