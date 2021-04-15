import knex, { Knex } from 'knex'
import { retryPromise } from '~/common/helpers/retryablePromise-helper'
import { IConnection } from '~/shared/core/interfaces/connection'
import { config } from '../database/config'

class _DataContext implements IConnection {
  private _connection: Knex<any, unknown[]>
  private _transaction: Knex.Transaction

  public async connect() {
    if (!this._connection) return this._connection
    try {
      this._connection = await knex(config)
      await retryPromise({
        fn: this._connection.raw(`select 1+1 as result`),
        retries: 5,
        interval: 1000,
        retryMsg: `Attempted connections to the remaining database`,
      })
      await this._connection.migrate.latest()
      this._transaction = await this._connection.transaction()
    } catch (error) {}
  }

  public get connection(): Knex<any, unknown[]> {
    return this._connection
  }

  public get transaction(): Knex.Transaction {
    return this._transaction
  }

  public async dispose() {
    await this._connection.destroy()
    await this._transaction.destroy()
  }
}
export const DataContext = new _DataContext()
//export const Connection = {
//  client: (null as unknown) as Knex<any, unknown[]>,
//  async connect(config: Knex.Config): Promise<void> {
//    try {
//      this.client = await knex(config)
//      await retryPromise({
//        fn: this.client.raw(`select 1+1 as result`),
//        retries: 5,
//        interval: 1000,
//        retryMsg: `Attempted connections to the remaining database`,
//      })
//      await this.client.migrate.latest()
//    } catch (error) {
//      throw error
//    }
//  },
//  async disconnect(): Promise<void> {
//    await this.client.destroy()
//  },
//}
