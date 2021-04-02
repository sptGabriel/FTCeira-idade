export interface IError {
  name: string
  message: string
  statusCode: number
  errors?: any[]
}

export class DefaultError extends Error implements IError {
  public statusCode = 500;
  constructor(
    public readonly message: string,
    public readonly errors?: any,
  ) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    this.errors = errors
    this.name = 'INTERNAL_ERROR'
    Error.captureStackTrace(this)
  }
  public serialize(): IError {
    const { name, message, statusCode, errors } = this;

    let error: IError = {
      message,
      name,
			errors,
			statusCode
    };
    if (statusCode) error.statusCode = statusCode
    if (errors) error.errors = errors
    return error;
  }
}
