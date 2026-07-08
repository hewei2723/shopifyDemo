<script setup>
defineProps({
  value: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div class="progress">
    <i :style="{ width: `${Math.min(100, Math.max(0, value))}%` }"></i>
  </div>
</template>
