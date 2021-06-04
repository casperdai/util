import * as unique from '../unique.js'

describe('unique', () => {
  test('uuid format', () => {
    expect(/[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{10}/.test(unique.uuid())).toBe(true)
  })

  test('uuid uniqueness', () => {
    expect(unique.uuid()).not.toBe(unique.uuid())
  })
})
