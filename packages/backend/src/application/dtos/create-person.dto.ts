export interface ICredentialsJSON {
  email: string
  password: string
}

export type CreatePersonDTO = {
  firstName: string
  lastName: string
  credentials: ICredentialsJSON
  phone: string
  cpf: string
  birthDate: Date
  role: string
  iesCourse?: string
}
