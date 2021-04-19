import { v4 } from 'uuid'
import { IEntity } from './interfaces/entity'
import { isEntity } from './is-entity'

export abstract class Entity<Props extends IEntity> {
  protected readonly _id: string
  protected readonly props: Props

  constructor(props: Props, id?: string) {
    this._id = id || v4()
    this.props = props
  }

  equals(object?: Entity<Props>): boolean {
    if (object == null || !object || !isEntity(object)) return false
    if (this === object) return true
    if (!isEntity(object)) return false
    return this.props.id === object.props.id
  }

  get id(): string {
    return this.props._id
  }
}
