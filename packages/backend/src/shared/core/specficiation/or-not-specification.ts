import { OrSpecification } from './or-specification'

export class OrNotSpecification<T> extends OrSpecification<T> {
  isSatisfiedBy(candidate: T): boolean {
    return super.isSatisfiedBy(candidate) !== true
  }

  toString(): string {
    return 'not ' + super.toString()
  }
}
