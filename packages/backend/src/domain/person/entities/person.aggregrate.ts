//import { IValidator } from 'fluentvalidation-ts/dist/IValidator'
//import { v4 } from 'uuid'
//import { IErrorModel } from '~/application/ports/error-model'
//import { Either, left, right } from '~/common/helpers/either-helper'
//import { Entity } from '~/shared/domain'
//import { ICredentialsJSON, ICredentialsProps } from '../interfaces/credentials'
//import { IPersonJSON, IPersonProps } from '../interfaces/person'
//import { PersonName } from '../value-objects/person-name.value-object'

//export class Person extends Entity<IPersonProps> {
//  private constructor(props: IPersonProps, id?: string) {
//    super(props, id)
//  }

//  //private static canBuild(props: IPersonJSON): IErrorModel[] {
//  //  let errors = [] as IErrorModel[]
//  //  if (typeof props.firstName !== 'string') errors.push({} as any)
//  //  if (typeof props.lastName !== 'string') errors.push({} as any)
//  //  if (props.firstName.length < 4) errors.push({} as any)
//  //  if (props.lastName.length < 2) errors.push({} as any)
//  //  return errors
//  //}

//  public static build(
//    props: IPersonProps,
//    id: string,
//  ): Either<IErrorModel[], Person> {
//    const person = new Person(props, id)
//    return right(person)
//  }

//  public createUser(data: ICredentialsProps) {
//    if (this.props.credentials) return
//    this.props.credentials = data
//  }
//}
