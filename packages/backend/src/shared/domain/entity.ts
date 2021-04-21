import { v4 } from 'uuid'
import { IEntity } from './interfaces/entity'
import { isEntity } from './is-entity'

export abstract class Entity<Props extends IEntity> {
  protected readonly _id: string
  protected readonly _props: Props

  constructor(props: Props, id?: string) {
    this._id = id || v4()
    this._props = props
  }

  equals(object?: Entity<Props>): boolean {
    if (object == null || !object || !isEntity(object)) return false
    if (this === object) return true
    if (!isEntity(object)) return false
    return this._id === object._id
  }

  get id(): string {
    return this._id
  }
  get props(): Props {
    return this._props
  }
}
