import { IResponseModel } from './response-model'

export interface IMiddleware {
  handle(requestModel: any): Promise<IResponseModel<any>>
}
