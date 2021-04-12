import { AndSpecification } from "./and-specification"

export class AndNotSpecification<T> extends AndSpecification<T> {
  isSatisfiedBy(candidate: T): boolean {
    return super.isSatisfiedBy(candidate) !== true
  }

  toString(): string {
    return 'not ' + super.toString()
  }
}