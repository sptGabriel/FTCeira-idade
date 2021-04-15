import { Knex } from 'knex'

export interface IUnitOfWork {
  commit: () => Promise<void>
  rollback: () => Promise<void>
}