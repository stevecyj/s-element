import { it, expect, describe } from 'vitest'
import { mount } from '@vue/test-utils'
import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'

describe('Collapse.vue', () => {
  it('basic collapse', () => {
    const wrapper = mount(Collapse, {
      props: {
        modelValue: ['a']
      },
      slots: {
        default: h(CollapseItem, { name: 'a', title: 'Title A' }, 'content A')
      },
      global: {
        stubs: ['Icon']
      }
    })
    console.log('collapse: ', wrapper.html())
  })
})
