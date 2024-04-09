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
</script>

<template>
  <div class="s-collapse-item" :class="{ 'is-disabled': disabled }">
    <div
      class="s-collapse-item__header"
      :id="`item-header-${name}`"
      @click="handleClick"
    >
      <slot name="title">{{ title }}</slot>
    </div>
    <div
      class="s-collapse-item__content"
      :id="`item-content-${name}`"
      v-show="isActive"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.s-collapse-item__header {
  font-size: 30px;
}
</style>
