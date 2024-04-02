<script setup lang="ts">
import { ref } from 'vue'
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
      'is-disabled': disabled
    }"
    :disabled="disabled"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <span>
      <slot />
    </span>
  </button>
</template>

<style>
.s-button {
  --main-bg-color: #ff0000;
  background-color: var(--main-bg-color);
}
</style>
