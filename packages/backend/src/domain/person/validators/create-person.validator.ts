//import { Validator } from 'fluentvalidation-ts'
//import { IPersonJSON } from '../interfaces/person'
//import { CreateUserValidator } from '../create-user.validator'

//export class CreatePersonValidator extends Validator<Omit<IPersonJSON, 'id'>> {
//  constructor() {
//    super()
//    this.ruleFor('firstName').notEmpty().withMessage('Please enter your name')
//    this.ruleFor('lastName').notEmpty().withMessage('Please enter your name')
//    this.ruleFor('user').setValidator(() => new CreateUserValidator())
//  }
//}
