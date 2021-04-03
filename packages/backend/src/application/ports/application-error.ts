import { IErrorModel } from './error-model'

export interface ApplicationERROR {
  name: string
  message: string
  statusCode: number
  errors?: IErrorModel[]
}
