import { ISpecification } from './interface/specification'
import { Specification } from './specification'

export class NotSpecification<T> extends Specification<T> {
  private other: ISpecification<T>

  constructor(other: ISpecification<T>) {
    super()
    this.other = other
  }

  isSatisfiedBy(candidate: T): boolean {
    return !this.other.isSatisfiedBy(candidate)
  }

  toString(): string {
    return '(not ' + this.other.toString() + ')'
  }
}
