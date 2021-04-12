import { Entity } from './entity'
import { IEntity } from './interfaces/entity'

export interface IRepository<T extends Entity<IEntity>> {
  AddOrUpdate(obj: T): Promise<void>
  GetById(id: string): Promise<T>
  Remove(id: string): Promise<T>
  Count(): number
}
