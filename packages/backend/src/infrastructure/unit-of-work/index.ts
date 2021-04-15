import { IDataContext } from "~/shared/core/interfaces/data-context"
import { IUnitOfWork } from "~/shared/core/interfaces/unit-of-work"

export class UnitOfWork implements IUnitOfWork {
  
  constructor(private readonly _context: IDataContext) {}

  public async commit(): Promise<void> {
    this._context.transaction.commit()
  }

  public async rollback(): Promise<void> {
    this._context.transaction.rollback()
  }

}
