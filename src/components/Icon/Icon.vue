<script setup lang="ts">
import { omit } from 'lodash-es'
import type { FontAwesomeIconProps } from './types'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
defineOptions({
  name: 'SIcon',
  inheritAttrs: false
})

const props = defineProps<FontAwesomeIconProps>()
const filterProps = computed(() => omit(props, ['type', 'color']))
const customStyles = computed(() => {
  return props.color ? { color: props.color } : {}
})
</script>

<template>
  <i
    class="s-icon"
    :class="{ [`s-icon--${type}`]: type }"
    :style="customStyles"
  >
    <FontAwesomeIcon v-bind="filterProps" />
  </i>
</template>

<style lang="css" scoped></style>
