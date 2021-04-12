export interface IUnitOfWork {
  start(): void
  complete(work: () => void): Promise<void>
  getRepository<T>(R: new (transaction: any) => T): T
}
