import { v4 } from 'uuid'
import { Identifier } from './Identifier'

const isEntity = (v: any): v is Entity => {
  return v instanceof Entity
}

export class UniqueEntityID extends Identifier<string | number> {
  constructor(id?: string | number) {
    super(id ? id : v4())
  }
}

export abstract class Entity {
  protected readonly _id: UniqueEntityID

  constructor(id?: UniqueEntityID) {
    this._id = id ? id : new UniqueEntityID()
  }

  public equals(object?: Entity): boolean {
    if (object == null || object == undefined || !isEntity(object)) {
      return false
    }
    if (this === object) return true
    return this._id.equals(object._id)
  }
}


