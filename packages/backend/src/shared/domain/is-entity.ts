import { Entity } from './entity'

export const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity
}
