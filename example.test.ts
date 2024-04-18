import { expect, test } from 'vitest'

test('example test', () => {
  const name = 'ss'
  expect(name).toBe('ss')
  expect(2 + 2).toBe(4)
  expect(2 + 2).not.toBe(5)
})

test('should be true or false', () => {
  expect(1).toBeTruthy()
  expect(0).toBeFalsy()
})

test('should be greater or less', () => {
  expect(2).toBeGreaterThan(1)
  expect(1).toBeLessThan(2)
})

test('should object', () => {
  expect({ name: 'ss' }).toEqual({ name: 'ss' })
})
