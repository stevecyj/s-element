import { it, expect, describe } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button', () => {
  it('should basic button', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary'
      },
      slots: {
        default: 'button'
      }
    })
    console.log('dom: ', wrapper.html())
    expect(wrapper.classes()).toContain('s-button--primary')
    expect(wrapper.get('button').text()).toBe('button')

    wrapper.get('button').trigger('click')
    console.log('event emitted: ', wrapper.emitted())
    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('should disabled', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      },
      slots: {
        default: 'disabled'
      }
    })
    // attributes
    expect(wrapper.attributes('disabled')).toBeDefined()
    // find dom
    expect(wrapper.find('button').element.disabled).toBeDefined()

    wrapper.get('button').trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('click')
  })
})
