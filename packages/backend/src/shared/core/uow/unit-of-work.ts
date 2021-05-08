import { inject, injectable } from 'tsyringe'
import {
  Connection,
  EntityManager,
  getCustomRepository,
  QueryRunner,
} from 'typeorm'
import { IConnection } from '../interfaces/connection'

export interface IUnitOfWork {
  withTransaction<T>(work: () => T): Promise<T>
  getConnection(): Connection
  getTransactionManager(): EntityManager | null
}

@injectable()
export class UnitOfWork {
  private transactionManager: EntityManager | null
  constructor(@inject('Database') private db: IConnection) {}

  getTransactionManager(): EntityManager | null {
    return this.transactionManager
  }
  getConnection(): Connection {
    return this.db.connection
  }
  async withTransaction<T>(work: () => T): Promise<T> {
    const queryRunner = this.db.connection.createQueryRunner()
    await queryRunner.startTransaction()
    this.transactionManager = queryRunner.manager
    try {
      const result = await work()
      await queryRunner.commitTransaction()
      return result
    } catch (error) {
      console.log(error)
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
      this.transactionManager = null
    }
  }
}
