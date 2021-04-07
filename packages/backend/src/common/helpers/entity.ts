export const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity
}

export class Identifier<T> {
  constructor(private value: T) {
    this.value = value
  }
  equals(id?: Identifier<T>): boolean {
    if (id === null || id === undefined) {
      return false
    }
    if (!(id instanceof this.constructor)) {
      return false
    }
    return id.toValue() === this.value
  }
  toString() {
    const constructorName = this.constructor.name
    return `${constructorName}(${String(this.value)})`
  }
  toValue(): T {
    return this.value
  }
}

export class Entity<ID extends Identifier<any>> {
  private readonly _id: ID

  constructor(props: ID) {
    this._id = Object.freeze(props)
  }

  /*
   * Check equality by identifier
   */
  equals(object?: Entity<ID>): boolean {
    if (object == null || object == undefined) {
      return false
    }
    if (this === object) {
      return true
    }
    if (!isEntity(object)) {
      return false
    }
    return this.id.equals(object.id);
  }

  get id (): ID {
    return this.id
  }
}
