<script setup>
import { levelTone, statusTone } from '../../utils/formatters'

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'status',
  },
})

const tone = props.type === 'level' ? levelTone(props.value) : statusTone(props.value)
</script>

<template>
  <span class="badge" :class="`tone-${tone}`">{{ value }}</span>
</template>
