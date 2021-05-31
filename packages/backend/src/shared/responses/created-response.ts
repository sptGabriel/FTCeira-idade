import { IResponseHandler } from '../ports/response-handler'
import { IResponseModel } from '../ports/response-model'

export class CreatedResponse<T> implements IResponseHandler<T> {
  async response(body: T | undefined): Promise<IResponseModel<T>> {
    return {
      statusCode: 201,
      body: body,
    }
  }
}
