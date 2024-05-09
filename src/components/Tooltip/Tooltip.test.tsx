import { it, expect, describe, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import type { VueWrapper, DOMWrapper } from '@vue/test-utils'
import Tooltip from './Tooltip.vue'
const onVisibleChange = vi.fn()

// let wrapper: VueWrapper<typeof Tooltip>;
describe('Tooltip.vue', () => {
  it('basic Tooltip', () => {
    const wrapper = mount(
      () => (
        <Tooltip content="hello tooltip" onVisibleChange={onVisibleChange}>
          <button id="trigger">Trigger</button>
        </Tooltip>
      ),
      { attachTo: document.body }
    )

    console.log('wrapper: ', wrapper)
  })
})
