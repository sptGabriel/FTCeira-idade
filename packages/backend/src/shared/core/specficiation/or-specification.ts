import { ISpecification } from "./interface/specification"
import { Specification } from "./specification"

export class OrSpecification<T> extends Specification<T> {
  private left: ISpecification<T>
  private right: ISpecification<T>

  constructor(left: ISpecification<T>, right: ISpecification<T>) {
    super()
    this.left = left
    this.right = right
  }

  isSatisfiedBy(candidate: T): boolean {
    return (
      this.left.isSatisfiedBy(candidate) || this.right.isSatisfiedBy(candidate)
    )
  }

  toString(): string {
    return '(' + this.left.toString() + ' or ' + this.right.toString() + ')'
  }
}