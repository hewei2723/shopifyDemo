<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <aside class="activity-panel">
    <div class="panel-head">
      <h2>操作流</h2>
      <span>实时模拟</span>
    </div>
    <div class="feed">
      <div v-for="item in items" :key="item.id">
        <time>{{ item.time }}</time>
        <p>{{ item.message }}</p>
      </div>
    </div>
  </aside>
</template>
