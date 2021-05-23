import { ICommand } from './command'
import { IHandler } from './handler'
import { IType } from './instance'

export interface IRegisterHandler {
  command: IType<ICommand>
  handler: IHandler
}
