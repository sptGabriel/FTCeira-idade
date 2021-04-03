import { describe, test } from '@jest/globals'
import { NextFunction, Request, Response } from 'express'
import { BadRequestERROR } from '~/application/errors/bad-request-error'
import { errorHandler } from './error-handler-middleware'

describe('Content Type  Middleware', () => {
  let mockRequest: Partial<Request>
  const mockResponse = () => {
    const res = {} as {
      status: jest.FunctionLike
      json: jest.FunctionLike
    }
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
  }
  const nextFunction: NextFunction = jest.fn()

  test('should return a internal error', async () => {
    const res = mockResponse()
    errorHandler(
      new Error('a'),
      mockRequest as Request,
      res as Response,
      nextFunction as NextFunction,
    )
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      error: 'Internal_ERROR',
      message: 'Internal error',
    })
  })

  test('should return a bad request error', async () => {
    const res = mockResponse()
    errorHandler(
      new BadRequestERROR('Handler test', [
        { code: 'a', field: 'handler', reason: 'fail' },
      ]),
      mockRequest as Request,
      res as Response,
      nextFunction as NextFunction,
    )
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      errors: [{ code: 'a', field: 'handler', reason: 'fail' }],
      message: 'Handler test',
      name: 'BADREQUEST_ERROR',
      statusCode: 400,
    })
  })
})
