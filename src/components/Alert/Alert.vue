<script setup lang="ts">
import type { AlertProps, AlertEmits } from './types'
defineOptions({
  name: 'SAlert'
})

withDefaults(defineProps<AlertProps>(), {
  type: 'primary',
  closable: true,
  effect: 'light'
})

const visible = ref<boolean>(true)
</script>

<template>
  <Transition name="s-alert-fade">
    <div
      class="s-alert"
      :class="{ [`s-alert__${type}`]: type, [`s-alert__${effect}`]: effect }"
      v-if="visible"
    >
      <div class="s-alert__content">
        <span v-if="title || $slots.title">
          <slot name="title"> {{ title }}</slot>
        </span>
        <p v-if="description || $slots.description">
          <slot name="description"> {{ description }}</slot>
        </p>
      </div>
      <div class="s-alert__close" v-if="closable">
        <Icon icon="xmark" @click.stop="visible = false" />
      </div>
    </div>
  </Transition>
</template>

<style lang="css" scoped></style>
