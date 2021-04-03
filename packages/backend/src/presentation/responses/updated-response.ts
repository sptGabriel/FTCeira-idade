import { IResponseHandler } from '~/application/ports/response-handler'
import { IResponseModel } from '~/application/ports/response-model'

export class UpdatedResponse implements IResponseHandler<void> {
  async response(): Promise<IResponseModel<void>> {
    return {
      statusCode: 204,
      body: undefined,
    }
  }
}