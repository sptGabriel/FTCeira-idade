import { IResponseHandler } from '../ports/response-handler'
import { IResponseModel } from '../ports/response-model'

export class UpdatedResponse implements IResponseHandler<void> {
  async response(): Promise<IResponseModel<void>> {
    return {
      statusCode: 204,
      body: undefined,
    }
  }
}
