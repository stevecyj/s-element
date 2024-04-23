<script setup lang="ts">
import type { TooltipEmits, TooltipProps, TooltipInstance } from './types'
import { useFloating } from '@floating-ui/vue'
import useClickOutside from '@/composable/useClickOutside'

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover'
})
const emits = defineEmits<TooltipEmits>()

const isOpen = ref(false)
const triggerNode = ref<HTMLElement | null>(null)
const popperNode = ref<HTMLElement | null>(null)
const wrapperNode = ref<HTMLElement | null>(null)
let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})

const { floatingStyles, middlewareData } = useFloating(
  triggerNode,
  popperNode,
  {
    placement: props.placement
  }
)

const open = () => {
  if (!triggerNode.value || !popperNode.value) return
  console.log('open tooltip')
  popperNode.value.style.visibility = 'visible'
  isOpen.value = true
}

const close = () => {
  console.log('close tooltip')
  if (!triggerNode.value || !popperNode.value) return
  popperNode.value.style.visibility = 'hidden'
  isOpen.value = false
}

useClickOutside(wrapperNode, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    console.log('click outside')
    close()
  }
})

const togglePopper = () => {
  if (!triggerNode.value || !popperNode.value) return
  popperNode.value.style.visibility =
    popperNode.value.style.visibility === 'hidden' ? 'visible' : 'hidden'
  isOpen.value = popperNode.value.style.visibility === 'hidden' ? false : true

  emits('visible-change', isOpen.value)
}

const attachEvents = () => {
  if (props.trigger === 'hover') {
    events['mouseenter'] = open
    outerEvents['mouseleave'] = close
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
  show: open,
  hide: close
})
</script>

<template>
  <div class="s-tooltip" v-on="outerEvents" ref="wrapperNode">
    <div class="s-tooltip__trigger" ref="triggerNode" v-on="events">
      <slot />
    </div>
    <div
      class="s-tooltip__popper"
      ref="popperNode"
      :style="{
        ...floatingStyles,
        visibility: middlewareData.hide?.referenceHidden ? 'visible' : 'hidden'
      }"
    >
      <slot name="content">{{ content }}</slot>
    </div>
  </div>
</template>

<style scoped></style>
