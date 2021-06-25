import * as path from '../path'

describe('path', () => {
  test('ext(null) to \'\'', () => {
    expect(path.ext(null)).toBe('')
  })

  test('ext(123) to \'\'', () => {
    expect(path.ext(123)).toBe('')
  })

  test('ext({}) to \'\'', () => {
    expect(path.ext({})).toBe('')
  })

  test('ext(\'img\') to \'\'', () => {
    expect(path.ext('img')).toBe('')
  })

  test('ext(\'img.png\') to \'png\'', () => {
    expect(path.ext('img.png')).toBe('png')
  })

  test('ext(\'.png\') to \'\'', () => {
    expect(path.ext('.png')).not.toBe('png')
  })

  test('ext(\'a/b/c.png\') to \'png\'', () => {
    expect(path.ext('a/b/c.png')).toBe('png')
  })
})
