import { ICommand } from './command'
import { IRegisterHandler } from './register-handler'

export interface IMediator {
  register(data: IRegisterHandler): void
  publish<T>(command: ICommand): Promise<T>
}
