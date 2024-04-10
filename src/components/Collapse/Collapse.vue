<script setup lang="ts">
import type { NameType, CollapseProps, CollapseEmits } from './types'
import { collapseContextKey } from './types'

defineOptions({
  name: 'SCollapse'
})

const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()

const activeNames = ref<NameType[]>(props.modelValue)
watch(
  () => props.modelValue,
  (val) => {
    activeNames.value = val
  }
)

if (props.accordion && activeNames.value.length > 1) {
  console.warn('warning: accordion mode should have one active name at most.')
}

const handleItemClick = (name: NameType) => {
  // 有 accordion 时，只能展开一个
  if (props.accordion) {
    activeNames.value = activeNames.value[0] === name ? [] : [name]
  } else {
    const index = activeNames.value.indexOf(name)
    if (index === -1) {
      activeNames.value.push(name)
    } else {
      activeNames.value.splice(index, 1)
    }
  }

  emits('update:modelValue', activeNames.value)
  emits('change', activeNames.value)
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
