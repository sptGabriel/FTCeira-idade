import { describe, it } from '@jest/globals'
import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return 'jwt_token'
  },
  async verify(): Promise<string> {
    return 'payload'
  },
}))

const sut = (): JwtAdapter => {
  return new JwtAdapter('secret', 60)
}

describe('Jwt Adapter', () => {
  it('Should call sign with correct values', async () => {
    jest.spyOn(jwt, 'sign')
    const adapter = sut()
    await adapter.encrypt('x')
    expect(jwt.sign).toHaveReturnedTimes(1)
    expect(jwt.sign).toHaveBeenCalledWith({ id: 'x' }, 'secret', {
      expiresIn: 60,
    })
  })

  it('Should call sign with correct values and undefined expiresIn', async () => {
    jest.spyOn(jwt, 'sign')
    const adapter = new JwtAdapter('secret', (null as unknown) as number)
    await adapter.encrypt('x')
    expect(jwt.sign).toHaveReturnedTimes(1)
    expect(jwt.sign).toHaveBeenCalledWith({ id: 'x' }, 'secret', {
      expiresIn: 3600,
    })
  })

  it('Should return a token when has signin success', async () => {
    const adapter = sut()
    const accessToken = await adapter.encrypt('x')
    expect(jwt.sign).toHaveReturnedTimes(1)
    expect(accessToken).toBe('jwt_token')
  })

  it('Should return error if sign failed', async () => {
    const adapter = sut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error('problem to generate access TOKEN') as any
    })
    const encrypt = async () => {
      await adapter.encrypt('any_id')
    }
    await expect(encrypt()).rejects.toThrow('problem to generate access TOKEN')
  })

  it('Should call verify with correct values', async () => {
    jest.spyOn(jwt, 'verify')
    const adapter = sut()
    await adapter.decrypt('x')
    expect(jwt.verify).toHaveReturnedTimes(1)
    expect(jwt.verify).toHaveBeenCalledWith('x', 'secret')
  })

  it('Should call verify with correct values and undefined expiresIn', async () => {
    jest.spyOn(jwt, 'verify')
    const adapter = new JwtAdapter('secret', (null as unknown) as number)
    await adapter.decrypt('x')
    expect(jwt.verify).toHaveReturnedTimes(1)
    expect(jwt.verify).toHaveBeenCalledWith('x', 'secret')
  })

  it('Should return a payload on verify success', async () => {
    const provider = sut()
    const value = await provider.decrypt('any_token')
    expect(value).toBe('payload')
  })

  it('Should return error if verify failed', async () => {
    const adapter = sut()
    jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
      throw new Error('problem to decrypt token') as any
    })
    const decrypt = async () => {
      await adapter.decrypt('token')
    }
    await expect(decrypt).rejects.toThrow('problem to decrypt token')
  })
})
