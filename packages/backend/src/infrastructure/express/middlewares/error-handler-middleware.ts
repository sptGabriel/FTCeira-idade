import { NextFunction, Request, Response } from 'express'
import { DefaultError } from '~/application/errors/default-app-error'

export const errorHandler = (
  error: Error | DefaultError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const internal = {
    error: 'Internal_ERROR',
    message: 'Internal error',
  }
  if (!(error instanceof DefaultError)) return res.status(500).json(internal)
  return res.status(error.statusCode).json(error.serialize())
}
