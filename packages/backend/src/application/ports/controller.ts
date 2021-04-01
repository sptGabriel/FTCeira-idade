import { RequestModel } from './request-model'
import { IResponseModel } from './response-model'

export interface IController {
  handle(request: RequestModel): Promise<IResponseModel<any>>
}
