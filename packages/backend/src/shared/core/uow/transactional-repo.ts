import { inject, injectable } from 'tsyringe'
import {
  EntityManager,
  EntitySchema,
  getCustomRepository,
  ObjectType,
  Repository,
  Entity,
  getRepository,
} from 'typeorm'
import { IUnitOfWork } from './unit-of-work'
import { RepositoryFactory } from 'typeorm/repository/RepositoryFactory'

@injectable()
export class TransactionalRepository {
  constructor(
    @inject('Uow')
    private uow: IUnitOfWork,
  ) {}

  public getCustomRepository<T>(target: ObjectType<T>): T {
    const transactionManager = this.uow.getTransactionManager()
    if (!transactionManager) return getCustomRepository(target)
    return transactionManager.getCustomRepository(target)
  }

  public getRepository<Entity>(
    target: ObjectType<Entity> | EntitySchema<Entity> | string,
  ): Repository<Entity> {
    const transactionManager = this.uow.getTransactionManager()
    if (!transactionManager) return getRepository(target)
    const connection = this.uow.getConnection()
    const metadata = connection.getMetadata(target)
    return new RepositoryFactory().create(transactionManager, metadata)
  }
}
