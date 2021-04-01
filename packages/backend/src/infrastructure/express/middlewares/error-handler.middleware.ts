import { Application, NextFunction, Request, Response } from 'express'
//import { ApplicationError } from '~/application/errors/app.error'

export const errorHandler = (app: Application) => {
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    //if (!(error instanceof ApplicationError)) {
    //  return res.status(500).json({
    //    error: error.name,
    //    message: 'Internal error',
    //    statusCode: 500,
    //  })
    //}
    return res.status(500).json({message: 'bad request'})
  })
}