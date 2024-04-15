<script setup lang="ts">
import type { FontAwesomeIconProps } from './types'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
defineOptions({
  name: 'SIcon',
  inheritAttrs: false
})

defineProps<FontAwesomeIconProps>()
</script>

<template>
  <i class="s-icon">
    <FontAwesomeIcon v-bind="$props" />
  </i>
</template>

<style lang="css" scoped></style>
