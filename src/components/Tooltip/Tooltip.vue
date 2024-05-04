<script setup lang="ts">
import type { TooltipEmits, TooltipProps, TooltipInstance } from './types'
import { debounce } from 'lodash-es'
import { useFloating, offset, flip, shift } from '@floating-ui/vue'
import useClickOutside from '@/composable/useClickOutside'

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  manual: false,
  transition: 'fade'
})
const emits = defineEmits<TooltipEmits>()

const isOpen = ref(false)
const triggerNode = ref<HTMLElement | null>(null)
const popperNode = ref<HTMLElement | null>(null)
const wrapperNode = ref<HTMLElement | null>(null)
let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})

let openTimes = 0
let closeTimes = 0

const { floatingStyles } = useFloating(triggerNode, popperNode, {
  placement: props.placement,
  middleware: [offset(props.offset), flip(), shift()]
})

const open = () => {
  openTimes++
  console.log('open tooltip', openTimes)
  if (!triggerNode.value) return
  console.log('open tooltip', props.trigger)
  isOpen.value = true
}

const close = () => {
  closeTimes++
  console.log('close tooltip', closeTimes)
  console.log('close tooltip')
  if (!triggerNode.value) return
  isOpen.value = false
}

const openDebounce = debounce(open, props.openDelay)
const closeDebounce = debounce(close, props.closeDelay)

useClickOutside(wrapperNode, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    console.log('click outside')
    closeDebounce()
  }
})

const togglePopper = () => {
  if (!triggerNode.value) return
  if (isOpen.value) {
    closeDebounce()
  } else {
    openDebounce()
  }
}

const attachEvents = () => {
  if (props.trigger === 'hover') {
    events['mouseenter'] = openDebounce
    outerEvents['mouseleave'] = closeDebounce
  } else if (props.trigger === 'click') {
    events['click'] = togglePopper
  }
}
if (!props.manual) {
  attachEvents()
}

watch(
  () => props.manual,
  (isManual) => {
    if (isManual) {
      events = {}
      outerEvents = {}
    } else {
      attachEvents()
    }
  }
)

watch(
  () => props.trigger,
  (newTrigger, oldTrigger) => {
    if (newTrigger !== oldTrigger) {
      events = {}
      outerEvents = {}
      attachEvents()
    }
  }
)

defineExpose<TooltipInstance>({
  ...(props.manual ? { show: openDebounce, hide: closeDebounce } : {})
})
</script>

<template>
  <div class="s-tooltip" v-on="outerEvents" ref="wrapperNode">
    <div class="s-tooltip__trigger" ref="triggerNode" v-on="events">
      <slot />
    </div>
    <Transition :name="transition">
      <div
        v-if="isOpen"
        class="s-tooltip__popper"
        ref="popperNode"
        :style="{
          ...floatingStyles
        }"
      >
        <slot name="content">{{ content }}</slot>
      </div>
    </Transition>
  </div>
</template>

<style scoped></style>
