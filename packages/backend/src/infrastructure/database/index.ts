import { Connection, createConnection } from 'typeorm'
import { IConnection } from '~/shared/core/interfaces/connection'
import { retryPromise } from '~/shared/utils/retryablePromise-helper'

export default class Database implements IConnection {
  private _connection: Connection

  public async connect() {
    if (this._connection) return
    try {
      this._connection = await retryPromise({
        fn: createConnection(),
        retries: 5,
        interval: 1000,
        retryMsg: `Attempted connections to the remaining database`,
      })
      await this._connection.query(`CREATE SCHEMA IF NOT EXISTS public`)
      await this._connection.runMigrations()
    } catch (error) {
      console.error(error)
    }
  }

  public get connection(): Connection {
    return this._connection
  }

  public async dispose() {
    await this._connection.close()
  }
}
