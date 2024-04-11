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
    el.style.overflow = 'hidden'
  },
  enter(el: HTMLElement) {
    el.style.height = `${el.scrollHeight}px`
  },
  afterEnter(el: HTMLElement) {
    el.style.height = ''
    el.style.overflow = ''
  },
  beforeLeave(el: HTMLElement) {
    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },
  leave(el: HTMLElement) {
    el.style.height = '0px'
  },
  afterLeave(el: HTMLElement) {
    el.style.height = ''
    el.style.overflow = ''
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
    <Transition name="slide" v-on="transitionEvents">
      <div class="s-collapse-item__wrapper" v-show="isActive">
        <div class="s-collapse-item__content" :id="`item-content-${name}`">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.s-collapse-item__header {
  font-size: 30px;
}
</style>
