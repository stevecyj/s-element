import { it, expect, describe } from 'vitest'
import { mount } from '@vue/test-utils'
import type { VueWrapper, DOMWrapper } from '@vue/test-utils'
import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'

const onChange = vi.fn()

let wrapper: VueWrapper
let headers: DOMWrapper<Element>[], contents: DOMWrapper<Element>[]
let firstHeader: DOMWrapper<Element>,
  secondHeader: DOMWrapper<Element>,
  disabledHeader: DOMWrapper<Element>
let firstContent: DOMWrapper<Element>,
  secondContent: DOMWrapper<Element>,
  disabledContent: DOMWrapper<Element>

describe('Collapse.vue', () => {
  beforeAll(() => {
    wrapper = mount(
      () => (
        <Collapse modelValue={['a']} onChange={onChange}>
          <CollapseItem title="title a" name="a">
            content a
          </CollapseItem>
          <CollapseItem title="title b" name="b">
            content b
          </CollapseItem>
          <CollapseItem title="title c" name="c" disabled>
            content c
          </CollapseItem>
        </Collapse>
      ),
      {
        global: {
          stubs: ['Icon']
        },
        attachTo: document.body
      }
    )
    // console.log('collapse: ', wrapper.html())
    headers = wrapper.findAll('.s-collapse-item__header')
    contents = wrapper.findAll('.s-collapse-item__wrapper')

    // 內容
    firstHeader = headers[0]
    secondHeader = headers[1]
    disabledHeader = headers[2]

    firstContent = contents[0]
    secondContent = contents[1]
    disabledContent = contents[2]
  })

  it('basic structure, corresponding text', () => {
    // length
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)

    // context
    expect(firstHeader.text()).toBe('title a')
    expect(firstContent.isVisible()).toBeTruthy()

    expect(secondContent.isVisible()).toBeFalsy()
    expect(firstContent.text()).toBe('content a')
  })

  it('click header to open/close content', async () => {
    // 點擊行為
    await firstHeader.trigger('click')
    // console.log(firstContent.html())
    expect(firstContent.isVisible()).toBeFalsy()
    await secondHeader.trigger('click')
    expect(secondHeader.isVisible()).toBeTruthy()
  })

  it('emit correct event', () => {
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith([])
    expect(onChange).toHaveBeenLastCalledWith(['b'])
  })

  it('should no response for disabled', async () => {
    onChange.mockClear()

    expect(disabledHeader.classes()).toContain('is-disabled')
    await disabledHeader.trigger('click')
    expect(disabledContent.isVisible()).toBeFalsy()

    expect(onChange).not.toHaveBeenCalled()
  })
})
