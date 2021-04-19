import { Either, right } from '~/common/helpers/either-helper'
import { ValueObject } from '~/shared/domain'

export interface IUserPasswordProps {
  value: string
  hashed?: boolean
}

export class UserPassword extends ValueObject<IUserPasswordProps> {
  public static minLength = 8

  private constructor(props: IUserPasswordProps) {
    super(props)
  }

  public get password(): string {
    return this.props.value
  }

  //private static isAppropriateLength(password: string): boolean {
  //  return password.length >= this.minLength
  //}

  //public async comparePassword(plainTextPassword: string): Promise<boolean> {
  //  let hashed: string
  //  if (!this.isAlreadyHashed()) return this.props.value === plainTextPassword
  //  hashed = this.props.value
  //  return this.bcryptCompare(plainTextPassword, hashed)
  //}

  //private bcryptCompare(plainText: string, hashed: string): Promise<boolean> {
  //  return new Promise((resolve, reject) => {
  //    bcrypt.compare(plainText, hashed, (err, compareResult) => {
  //      if (err) return resolve(false)
  //      return resolve(compareResult)
  //    })
  //  })
  //}

  //public isAlreadyHashed(): boolean {
  //  return this.props.hashed || false
  //}

  //private hashPassword(password: string): Promise<string> {
  //  return new Promise((resolve, reject) => {
  //    bcrypt.hash(password, null, null, (err, hash) => {
  //      if (err) return reject(err)
  //      resolve(hash)
  //    })
  //  })
  //}

  //public getHashedValue(): Promise<string> {
  //  return new Promise((resolve) => {
  //    if (this.isAlreadyHashed()) {
  //      return resolve(this.props.value)
  //    } else {
  //      return resolve(this.hashPassword(this.props.value))
  //    }
  //  })
  //}

  public static create(props: IUserPasswordProps): Either<[], UserPassword> {
    const hashed = !!props.hashed === true
    const password = new UserPassword({ value: props.value, hashed })
    return right(password)
  }
}
