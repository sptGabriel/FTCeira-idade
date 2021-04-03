import { NextFunction, Request, Response } from 'express'
import { IController } from '~/application/ports/controller'
import { Logger } from '~/common/helpers/logger-helper'

export const adaptRoute = (controller: IController) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const result = await controller.handle({
        query: request.query,
        params: request.params,
        body: request.body,
        headers: request.headers,
        accountId: request.userId,
      })
      response.status(result.statusCode).json(result.body)
    } catch (error) {
      const { originalUrl, method, ip } = request
      Logger.error(`${error.message} - ${originalUrl} - ${method} - ${ip}`)
      next(error)
    }
  }
}
