import { NextFunction, Request, Response } from 'express'
import { IController } from '~/shared/ports/controller'

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
      return result.isRight()
        ? response.status(result.value.statusCode).json(result.value.body)
        : response
            .status(result.value.statusCode)
            .json(result.value.serialize())
    } catch (error) {
      console.log(error)
      const { originalUrl, method, ip } = request
      //Logger.error(`${error.message} - ${originalUrl} - ${method} - ${ip}`)
      next(error)
    }
  }
}
