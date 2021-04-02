import { BadRequestERROR } from './bad-request-error'

describe('Bad Request Error', () => {
  it('should throw error with message', async () => {
    const action = () => {
      throw new BadRequestERROR('custom message', [
        { reason: 'err', code: 'err', field: 'a' },
      ])
    }
    expect(action).toThrow('custom message')
  })
  it('should throw', async () => {
    const action = () => {
      throw new BadRequestERROR()
    }
    expect(action).toThrow(
      'Unable to process the request due to invalid syntax.',
    )
  })
})
