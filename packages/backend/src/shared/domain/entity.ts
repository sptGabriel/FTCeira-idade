import { IEntity } from './interfaces/entity'
import { isEntity } from './is-entity'

export abstract class Entity<Props extends IEntity> {
  protected props: Readonly<Props>
  constructor(props: Props) {
    this.props = Object.freeze(props)
  }
  
  equals(object?: Entity<Props>): boolean {
    if (object == null || !object || !isEntity(object)) return false
    if (this === object) return true
    if (!isEntity(object)) return false
    return this.props.id === object.props.id
  }

  get id(): string | number {
    return this.props.id
  }
}
