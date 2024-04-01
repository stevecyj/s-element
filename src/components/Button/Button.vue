<script setup lang="ts">
import type { ButtonProps } from './types'
defineOptions({
  name: 'SButton'
})
defineProps<ButtonProps>()
</script>

<template>
  <button
    class="s-button"
    :class="{
      [`s-button--${type}`]: type,
      [`s-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled
    }"
    :disabled="disabled"
  >
    <span>
      <slot />
    </span>
  </button>
</template>

<style lang="scss" scoped></style>
