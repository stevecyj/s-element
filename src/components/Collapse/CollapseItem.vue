<script setup lang="ts">
import type { CollapseItemProps } from './types'
import { collapseContextKey } from './types'

defineOptions({
  name: 'SCollapseItem'
})

const props = defineProps<CollapseItemProps>()

const collapseContext = inject(collapseContextKey)

const isActive = computed(() =>
  collapseContext?.activeNames.value.includes(props.name)
)

const handleClick = () => {
  if (props.disabled) return
  collapseContext?.handleItemClick(props.name)
}

const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el: HTMLElement) {
    el.style.height = '0px'
  },
  enter(el: HTMLElement) {
    el.style.height = `${el.scrollHeight}px`
  },
  afterEnter(el: HTMLElement) {
    el.style.height = ''
  },
  beforeLeave(el: HTMLElement) {
    el.style.height = `${el.scrollHeight}px`
  },
  leave(el: HTMLElement) {
    el.style.height = '0px'
  },
  afterLeave(el: HTMLElement) {
    el.style.height = ''
  }
}
</script>

<template>
  <div class="s-collapse-item" :class="{ 'is-disabled': disabled }">
    <div
      class="s-collapse-item__header"
      :class="{ 'is-disabled': disabled, 'is-active': isActive }"
      :id="`item-header-${name}`"
      @click="handleClick"
    >
      <slot name="title">{{ title }}</slot>
    </div>
    <Transition
      name="slide"
      @before-enter="transitionEvents.beforeEnter"
      @enter="transitionEvents.enter"
      @after-enter="transitionEvents.afterEnter"
      @before-leave="transitionEvents.beforeLeave"
      @leave="transitionEvents.leave"
      @after-leave="transitionEvents.afterLeave"
    >
      <div
        class="s-collapse-item__content"
        :id="`item-content-${name}`"
        v-show="isActive"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.s-collapse-item__header {
  font-size: 30px;
}
</style>
