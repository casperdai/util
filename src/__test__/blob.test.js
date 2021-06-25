import * as blob from '../blob'

describe('blob', () => {
  const blobData = new Blob(['this is a test blob.'])

  test('blobToString(not blob)', async () => {
    await expect(blob.blobToString(null)).rejects.toThrow()
  })

  test('blobToString(blob)', async () => {
    await expect(blob.blobToString(blobData)).resolves.toBe('this is a test blob.')
  })

  test('blobToHex(not blob)', async () => {
    await expect(blob.blobToHex(null)).rejects.toThrow()
  })

  test('blobToHex(Blob(blob)', async () => {
    await expect(blob.blobToHex(blobData)).resolves.toBe('74 68 69 73 20 69 73 20 61 20 74 65 73 74 20 62 6C 6F 62 2E')
  })

  test('blobToArrayBuffer(not blob)', () => {
    expect(blob.blobToArrayBuffer(null)).rejects.toThrow()
  })

  test('blobToArrayBuffer(blob)', async () => {
    await expect(blob.blobToString(new Blob([await blob.blobToArrayBuffer(blobData)]))).resolves.toBe(await blob.blobToString(blobData))
  })

  test('createChunks(not blob) to []', () => {
    expect(blob.createChunks(null)).toEqual([])
  })

  test('createChunks(blob)', async () => {
    const chunks = blob.createChunks(blobData)
    expect(chunks.length).toBe(1)
    expect(await blob.blobToString(chunks[0].chunk)).toBe('this is a test blob.')
  })

  test('createChunks(blob, chunkSize = 4)', async () => {
    const chunks = blob.createChunks(blobData, 4)
    expect(chunks.length).toBe(5)
    expect(await blob.blobToString(chunks[0].chunk)).toBe('this')
    expect(await blob.blobToString(chunks[1].chunk)).toBe(' is ')
    expect(await blob.blobToString(chunks[2].chunk)).toBe('a te')
    expect(await blob.blobToString(chunks[3].chunk)).toBe('st b')
    expect(await blob.blobToString(chunks[4].chunk)).toBe('lob.')
  })
})
