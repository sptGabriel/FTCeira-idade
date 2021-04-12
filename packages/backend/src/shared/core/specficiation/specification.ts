import { AndNotSpecification } from "./and-not-specification"
import { AndSpecification } from "./and-specification"
import { ISpecification } from "./interface/specification"
import { NotSpecification } from "./not-specification"
import { OrNotSpecification } from "./or-not-specification"
import { OrSpecification } from "./or-specification"


export abstract class Specification<T> implements ISpecification<T> {
  abstract isSatisfiedBy(candidate: T): boolean

  and(other: ISpecification<T>): ISpecification<T> {
    return new AndSpecification<T>(this, other)
  }

  andNot(other: ISpecification<T>): ISpecification<T> {
    return new AndNotSpecification<T>(this, other)
  }

  or(other: ISpecification<T>): ISpecification<T> {
    return new OrSpecification<T>(this, other)
  }

  orNot(other: ISpecification<T>): ISpecification<T> {
    return new OrNotSpecification<T>(this, other)
  }

  not(): ISpecification<T> {
    return new NotSpecification<T>(this)
  }
}
