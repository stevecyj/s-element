<script setup lang="ts">
import type { CollapseItemProps } from './types'
defineOptions({
  name: 'SCollapseItem'
})
defineProps<CollapseItemProps>()
</script>

<template>
  <div class="s-collapse-item" :class="{ 'is-disabled': disabled }">
    <div class="s-collapse-item__header" :id="`item-header-${name}`">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="s-collapse-item__content" :id="`item-content-${name}`">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
