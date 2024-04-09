<script setup lang="ts">
import type { NameType } from './types'
import { collapseContextKey } from './types'

defineOptions({
  name: 'SCollapse'
})

const activeNames = ref<NameType[]>([])

const handleItemClick = (name: NameType) => {
  const index = activeNames.value.indexOf(name)
  if (index === -1) {
    activeNames.value.push(name)
  } else {
    activeNames.value.splice(index, 1)
  }
}

provide(collapseContextKey, {
  activeNames,
  handleItemClick
})
</script>

<template>
  <div class="s-collapse">
    <slot />
  </div>
</template>
