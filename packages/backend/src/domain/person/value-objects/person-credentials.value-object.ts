import { ValueObject } from '~/shared/domain'
import { ICredentialsProps, ICredentialsJSON } from '../interfaces/credentials'

export class Credentials extends ValueObject<ICredentialsProps> {
  private constructor(props: ICredentialsProps) {
    super(props)
  }

  public static build(_props: ICredentialsJSON) {}
}
