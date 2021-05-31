export class HandlerNotFoundException extends Error {
  constructor(command: string) {
    super(`The command handler for the "${command}" command was not found!`)
  }
}
