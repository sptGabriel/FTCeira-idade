export interface IResponseModel<T> {
  body: T | any
  statusCode: number
}
