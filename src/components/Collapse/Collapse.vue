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
  let _activeNames = [...activeNames.value]
  if (props.accordion) {
    _activeNames = activeNames.value[0] === name ? [] : [name]
    activeNames.value = _activeNames
  } else {
    const index = _activeNames.indexOf(name)
    if (index === -1) {
      _activeNames.push(name)
    } else {
      _activeNames.splice(index, 1)
    }
    activeNames.value = _activeNames
  }

  emits('update:modelValue', _activeNames)
  emits('change', _activeNames)
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
