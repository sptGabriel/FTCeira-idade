import { Either } from '~/common/helpers/either-helper'
import { BaseError } from '../errors/base-app.error'
import { RequestModel } from './request-model'
import { IResponseModel } from './response-model'

export interface IController {
  handle(request: RequestModel): Promise<Either<BaseError, IResponseModel<any>>>
}
