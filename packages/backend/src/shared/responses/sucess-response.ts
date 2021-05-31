import { IResponseHandler } from '../ports/response-handler'
import { IResponseModel } from '../ports/response-model'

export class SuccessResponse<T> implements IResponseHandler<T> {
  async response(body: T): Promise<IResponseModel<T>> {
    return {
      statusCode: 200,
      body,
    }
  }
}
