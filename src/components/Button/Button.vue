<script setup lang="ts">
import type { ButtonProps } from './types'
defineOptions({
  name: 'SButton'
})
withDefaults(defineProps<ButtonProps>(), { nativeType: 'button' })

const _ref = ref<HTMLButtonElement>()

defineExpose({ ref: _ref })
</script>

<template>
  <button
    ref="_ref"
    class="s-button"
    :class="{
      [`s-button--${type}`]: type,
      [`s-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading
    }"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <Icon icon="spinner" spin v-if="loading" />
    <Icon :icon="icon" v-else-if="icon" />
    <span>
      <slot />
    </span>
  </button>
</template>

<style>
/* .s-button {
  --main-bg-color: #ff0000;
  background-color: var(--main-bg-color);
} */
</style>
