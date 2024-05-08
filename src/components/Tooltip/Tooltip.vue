<script setup lang="ts">
import type { TooltipEmits, TooltipProps, TooltipInstance } from './types'
import { debounce } from 'lodash-es'
import { useFloating, offset, flip, shift, arrow } from '@floating-ui/vue'
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
const floatingArrow = ref<HTMLElement | null>(null)
const wrapperNode = ref<HTMLElement | null>(null)
let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})

let openTimes = 0
let closeTimes = 0

const { floatingStyles, middlewareData } = useFloating(
  triggerNode,
  popperNode,
  {
    placement: props.placement,
    middleware: [
      offset(props.offset),
      flip(),
      shift(),
      arrow({ element: floatingArrow })
    ]
  }
)

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

const openFinal = () => {
  closeDebounce.cancel()
  openDebounce()
}
const closeFinal = () => {
  openDebounce.cancel()
  closeDebounce()
}

useClickOutside(wrapperNode, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    console.log('click outside')
    closeFinal()
  }
})

const togglePopper = () => {
  if (!triggerNode.value) return
  if (isOpen.value) {
    closeFinal()
  } else {
    openFinal()
  }
}

const attachEvents = () => {
  if (props.trigger === 'hover') {
    events['mouseenter'] = openFinal
    outerEvents['mouseleave'] = closeFinal
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
  ...(props.manual ? { show: openFinal, hide: closeFinal } : {})
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
        :data-popper-placement="props.placement"
      >
        <slot name="content">{{ content }}</slot>
        <div
          ref="floatingArrow"
          class="floatingArrow"
          id="arrow"
          :style="{
            position: 'absolute',
            left:
              middlewareData.arrow?.x != null
                ? `${middlewareData.arrow.x}px`
                : '',
            top:
              middlewareData.arrow?.y != null
                ? `${middlewareData.arrow.y}px`
                : ''
          }"
        ></div>
      </div>
    </Transition>
  </div>
</template>

<style scoped></style>
