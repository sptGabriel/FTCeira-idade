import { describe, it } from '@jest/globals'
import { retryPromise } from './retryablePromise-helper'

interface retry {
  fn: any
  retries: number
  interval: number
  retryMsg?: string
}

describe('retryable promise', () => {
  it('Should pass', async () => {
    const expected: retry = {
      fn: Promise.resolve({ ok: 'sucess' }),
      retries: 100,
      interval: 1000,
      retryMsg: 'Retryable promise',
    }
    const result = await retryPromise<{ ok: 'sucess' }>(expected).then(
      (res) => res,
    )
    expect(result).toMatchObject({ ok: 'sucess' })
  })
  it('Should reject promise', async () => {
    const expected: retry = {
      fn: Promise.reject('bad'),
      retries: 100,
      interval: 10,
      retryMsg: 'Retryable promise',
    }
    const result: any = await retryPromise(expected)
      .then((res) => res)
      .catch((err) => err)
    expect(result.message).toBe('bad')
    expect(result.name).toBe('Error')
  })
  it('Should throw error with no params', async () => {
    const result: any = await retryPromise(undefined as any)
      .then((res) => res)
      .catch((err) => err)
    expect(result.message).toBe('Invalid operation')
    expect(result.name).toBe('Error')
  })
})
//Promise.reject(new Error("bad"))
