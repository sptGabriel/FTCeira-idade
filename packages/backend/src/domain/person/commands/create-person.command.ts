//import { v4 } from 'uuid'
//import { BadRequestERROR } from '~/application/errors/bad-request-error'
//import { IErrorModel } from '~/application/ports/error-model'
//import { ICommand } from '~/shared/core/mediator/interfaces/command'
//import { IPersonJSON } from '../interfaces/person'
//import { IUserJSON } from '../interfaces/user'

//export class CreatePersonCommand implements ICommand {
//  private readonly id: string
//  private readonly login!: string
//  private readonly password!: string
//  private readonly personId!: string
//  private readonly firstName!: string
//  private readonly lastName!: string

//  constructor(person: Omit<IPersonJSON & IUserJSON, 'user' | 'personId'>) {
//    this.id = v4()
//    this.personId = this.id
//    this.login = person.login
//    this.password = person.password
//    this.firstName = person.firstName
//    this.lastName = person.lastName
//  }

//  public CanExecute(): boolean {
//    const errors = [] as IErrorModel[]
//    for (const field in this) {
//      if (!this[field]) {
//        errors.push({ code: 215, message: `Required field: ${field}` })
//      }
//    }
//    if (errors.length > 0) throw new BadRequestERROR({ errors })
//    return errors.length <= 0
//  }
//}
