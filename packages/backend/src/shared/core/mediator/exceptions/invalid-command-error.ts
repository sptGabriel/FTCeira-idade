export class InvalidCommandException extends Error {
  constructor() {
    super(`The command is invalid!`)
  }
}
