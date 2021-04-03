import { describe, it } from '@jest/globals'
import { DefaultError } from './default-app-error'

describe('Default Error', () => {
  it('should throw error with message', async () => {
    const action = () => {
      throw new DefaultError('custom message', [
        { reason: 'err', code: 'err', field: 'a' },
      ])
    }
    expect(action).toThrow('custom message')
  })
  it('should throw', async () => {
    const action = () => {
      throw new DefaultError()
    }
    expect(action).toThrow('Internal error')
  })
  it('should serialize error', async () => {
    const action = new DefaultError()
    expect(action.serialize()).toMatchObject({
      errors: undefined,
      message: 'Internal error',
      name: 'INTERNAL_ERROR',
      statusCode: 500,
    })
  })
})
