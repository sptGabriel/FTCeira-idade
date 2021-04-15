export interface IConnection {
  transaction: any
  connection: any
  connect: () => Promise<void>
  dispose: () => Promise<void>
}
