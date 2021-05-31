export interface IConnection {
  connection: any
  connect: () => Promise<void>
  dispose: () => Promise<void>
}
