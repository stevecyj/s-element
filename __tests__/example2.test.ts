import { test, describe, vi, expect, Mocked } from 'vitest'
import { testFn, request } from './utils'
import axios from 'axios'
vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>

describe('functions', () => {
  test('create a mock function', () => {
    const callback = vi.fn()
    testFn(11, callback)
    expect(callback).toHaveBeenCalled()
    expect(callback).toHaveBeenCalledWith(11)
  })

  test('spy on method', () => {
    const obj = {
      getName: () => 1
    }
    const spy = vi.spyOn(obj, 'getName')
    obj.getName()
    expect(spy).toHaveBeenCalled()
    obj.getName()
    expect(spy).toHaveBeenCalledTimes(2)
  })

  test('mock third party library', async () => {
    mockedAxios.get.mockResolvedValue({ data: { title: 'foo' } })
    const data = await request()
    expect(data).toEqual({ title: 'foo' })
  })
})
