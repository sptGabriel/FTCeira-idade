import { NextFunction, Request, Response } from 'express'
import { BaseError } from '~/application/errors/base-app.error'
import { DefaultError } from '~/application/errors/default-app.error'

export const errorHandler = (
  error: Error | DefaultError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const internal = {
    error: 'Internal_ERROR',
    message: 'Internal error',
  }
  if (!(error instanceof BaseError)) return res.status(500).json(internal)
  return res.status(error.statusCode).json(error.serialize())
}
