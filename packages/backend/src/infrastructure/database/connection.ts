import knex, { Knex } from 'knex'
import { retryPromise } from '~/common/helpers/retryablePromise-helper'

export const Connection = {
  client: (null as unknown) as Knex<any, unknown[]>,
  async connect(config: Knex.Config): Promise<void> {
    try {
      this.client = await knex(config)
      await retryPromise({
        fn: this.client.raw(`select 1+1 as result`),
        retries: 5,
        interval: 1000,
        retryMsg: `Attempted connections to the remaining database`,
      })
      await this.client.migrate.latest()
    } catch (error) {
      throw error
    }
  },
  async disconnect(): Promise<void> {
    await this.client.destroy()
  },
}
