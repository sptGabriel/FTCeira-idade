import { shallowEqual } from 'shallow-equal-object'

export abstract class ValueObject<Props = { [index: string]: any }> {
  public readonly props: Readonly<Props>

  constructor(props: Props) {
    this.props = Object.freeze(props)
  }

  public equals(object?: ValueObject<Props>): boolean {
    if (!object || object === null || !object.props) return false
    return shallowEqual(this.props, object.props)
  }
}
