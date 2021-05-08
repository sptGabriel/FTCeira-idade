import { ICommand } from './command'

export interface IHandler<TCommand extends ICommand = any, TResult = any> {
  execute(command: TCommand): Promise<TResult>
}
