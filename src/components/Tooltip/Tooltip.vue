<script setup lang="ts">
import type { TooltipEmits, TooltipProps } from './types'
import { useFloating } from '@floating-ui/vue'

const props = withDefaults(defineProps<TooltipProps>(), { placement: 'bottom' })
const emits = defineEmits<TooltipEmits>()

const isOpen = ref(false)
const triggerNode = ref<HTMLElement | null>(null)
const popperNode = ref<HTMLElement | null>(null)
const { floatingStyles, middlewareData } = useFloating(
  triggerNode,
  popperNode,
  {
    placement: props.placement
  }
)

const togglePopper = () => {
  if (!triggerNode.value || !popperNode.value) return
  popperNode.value.style.visibility =
    popperNode.value.style.visibility === 'hidden' ? 'visible' : 'hidden'

  emits('visible-change', isOpen.value)
}
</script>

<template>
  <div class="s-tooltip">
    <div class="s-tooltip__trigger" ref="triggerNode" @click="togglePopper">
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
