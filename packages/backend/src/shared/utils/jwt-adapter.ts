import { verify, sign } from 'jsonwebtoken'
import { IDecrypter } from '../ports/decrypter'
import { IEncrypter } from '../ports/encrypter'

export class JwtAdapter implements IEncrypter, IDecrypter {
  constructor(
    private readonly secret: string,
    private readonly expiresIn: any,
  ) {}

  async encrypt(id: string): Promise<string> {
    return sign({ id }, this.secret, { expiresIn: this.expiresIn || 3600 })
  }
  async decrypt(ciphertext: string): Promise<string> {
    return verify(ciphertext, this.secret) as any
  }
}
