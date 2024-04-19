import { it, expect, describe } from 'vitest'
import { mount } from '@vue/test-utils'
import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'

describe('Collapse.vue', () => {
  it('basic collapse', async () => {
    const wrapper = mount(Collapse, {
      props: {
        modelValue: ['a']
      },
      slots: {
        default: (
          <>
            <CollapseItem name="a" title="title a">
              content a
            </CollapseItem>
            <CollapseItem name="b" title="title b">
              content b
            </CollapseItem>
            <CollapseItem name="c" title="title c" disabled>
              content c
            </CollapseItem>
          </>
        )
      },
      global: {
        stubs: ['Icon']
      },
      attachTo: document.body
    })
    // console.log('collapse: ', wrapper.html())
    const headers = wrapper.findAll('.s-collapse-item__header')
    const contents = wrapper.findAll('.s-collapse-item__wrapper')

    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)

    const firstHeader = headers[0]
    const secondHeader = headers[1]
    expect(firstHeader.text()).toBe('title a')

    // 內容
    const firstContent = contents[0]
    const secondContent = contents[1]
    const disabledContent = contents[2]
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    expect(firstContent.text()).toBe('content a')

    // 點擊行為
    await firstHeader.trigger('click')
    console.log(firstContent.html())
    expect(firstContent.isVisible()).toBeFalsy()
    await secondHeader.trigger('click')
    expect(secondHeader.isVisible()).toBeTruthy()
    expect(wrapper.emitted()).toHaveProperty('change') // 有無 change 事件
    const changeEvent = wrapper.emitted('change') as any
    console.table(changeEvent)
    expect(changeEvent).toHaveLength(2)

    expect(changeEvent[0]).toEqual([[]])
    expect(changeEvent[1]).toEqual([['b']])

    // disabled
    const disabledHeader = headers[2]
    expect(disabledHeader.classes()).toContain('is-disabled')
    await disabledHeader.trigger('click')
    expect(disabledContent.isVisible()).toBeFalsy()
  })
})
