import { container } from 'tsyringe'
import { IConnection } from '~/shared/core/interfaces/connection'
import { IUnitOfWork, UnitOfWork } from '~/shared/core/uow/unit-of-work'
import Database from '../database'

container.registerSingleton<IConnection>('Database', Database)
container.registerSingleton<IUnitOfWork>('Uow', UnitOfWork)
