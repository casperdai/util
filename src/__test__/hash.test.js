import * as hash from '../hash'

describe('hash', () => {
  window.requestIdleCallback = cb => {
    setImmediate(() => {
      let time = 3
      cb({ timeRemaining () { return time-- } })
    })
  }
  const blob = new Blob(['this is a test blob.'])

  test('md5(null) to null', () => {
    expect(hash.md5(null)).toBe(null)
  })

  test('md5(\'Hi\') to \'c1a5298f939e87e8f962a5edfc206918\'', () => {
    expect(hash.md5('Hi')).toBe('c1a5298f939e87e8f962a5edfc206918')
  })

  test('calculateHash(blob) to 32-bit string', async () => {
    expect((await hash.calculateHash(blob)).length).toBe(32)
  })

  test('calculateHash(blob) === calculateHash(blob), blob.size = 20', async () => {
    expect(await hash.calculateHash(blob)).toBe(await hash.calculateHash(blob))
  })

  test('calculateHash(blob, chunkSize = 5) !== calculateHash(blob, chunkSize = 4), blob.size = 20', async () => {
    expect(await hash.calculateHash(blob, 5)).not.toBe(await hash.calculateHash(blob, 4))
  })

  test('calculateHashByIdle(blob) to 32-bit string', async () => {
    expect((await hash.calculateHashByIdle(blob)).length).toBe(32)
  })

  test('calculateHashByIdle(blob, { progress }), blob.size = 20', async () => {
    const mockFn = jest.fn()
    await hash.calculateHashByIdle(blob, { progress: mockFn })
    expect(mockFn).toHaveBeenCalledWith(0, 1)
    expect(mockFn).toHaveBeenLastCalledWith(1, 1)
  })

  test('calculateHashByIdle(blob, { chunkSize: 5, progress }), blob.size = 20', async () => {
    const mockFn = jest.fn()
    await hash.calculateHashByIdle(blob, { chunkSize: 5, progress: mockFn })
    expect(mockFn).toHaveBeenCalledWith(0, 4)
    expect(mockFn).toHaveBeenCalledWith(1, 4)
    expect(mockFn).toHaveBeenCalledWith(2, 4)
    expect(mockFn).toHaveBeenLastCalledWith(4, 4)
  })

  test('calculateHashByIdle(blob) === calculateHashByIdle(blob), blob.size = 20', async () => {
    expect(await hash.calculateHashByIdle(blob)).toBe(await hash.calculateHashByIdle(blob))
  })

  test('calculateHashByIdle(blob, { chunkSize: 5 }) === calculateHashByIdle(blob, { chunkSize: 4 }), blob.size = 20', async () => {
    expect(await hash.calculateHashByIdle(blob, { chunkSize: 5 })).toBe(await hash.calculateHashByIdle(blob, { chunkSize: 4 }))
  })
})
