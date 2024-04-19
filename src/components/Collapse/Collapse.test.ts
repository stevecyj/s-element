import { it, expect, describe } from 'vitest'
import { mount } from '@vue/test-utils'
import Collapse from './Collapse.vue'

describe('Collapse.vue', () => {
  it('basic collapse', () => {
    const wrapper = mount(Collapse, {
      slots: {
        default: `<Item name="a" title="title A">content a</Item>`
      }
    })
    console.log('collapse: ', wrapper.html())
  })
})
