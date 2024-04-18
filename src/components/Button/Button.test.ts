import { it, expect, describe } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Icon from '@components/Icon/Icon.vue'

describe('Button.vue', () => {
  it('should basic button', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary'
      },
      slots: {
        default: 'button'
      }
    })
    // console.log('dom: ', wrapper.html())
    expect(wrapper.classes()).toContain('s-button--primary')
    expect(wrapper.get('button').text()).toBe('button')

    wrapper.get('button').trigger('click')
    // console.log('event emitted: ', wrapper.emitted())
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

  it('should icon arrow-up', () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'arrow-up'
      },
      slots: {
        default: 'icon'
      },
      global: {
        stubs: ['FontAwesomeIcon']
      }
    })
    // console.log('icon arrow-up: ', wrapper.html())
    const iconElement = wrapper.findComponent(FontAwesomeIcon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('arrow-up')
  })

  it('should loading', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      },
      slots: {
        default: 'loading'
      },
      global: {
        stubs: ['Icon']
      }
    })
    // console.log('icon loading: ', wrapper.html())
    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('spinner')
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})
