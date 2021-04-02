import { NextFunction, Request, Response } from 'express'
import { DefaultError } from '~/application/errors/default-app-error'

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!(error instanceof DefaultError)) {
    return res.status(500).json({
      error: error.name,
      message: 'Internal error',
      statusCode: 500,
    })
  }
  return res.status(error.statusCode).json(error.serialize())
}
