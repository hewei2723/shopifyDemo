<script setup>
defineProps({
  eyebrow: String,
  title: String,
})
</script>

<template>
  <div class="page-head">
    <div>
      <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
      <h1>{{ title }}</h1>
    </div>
    <div v-if="$slots.actions" class="button-row">
      <slot name="actions" />
    </div>
  </div>
</template>
