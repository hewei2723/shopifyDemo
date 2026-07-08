<script setup>
import { Bell, Gauge, RefreshCw, Search, Users } from 'lucide-vue-next'
import ActivityPanel from './ActivityPanel.vue'

defineProps({
  pages: {
    type: Array,
    required: true,
  },
  currentPage: {
    type: String,
    required: true,
  },
  taskCount: {
    type: Number,
    required: true,
  },
  activeAlerts: {
    type: Number,
    required: true,
  },
  activityFeed: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['change-page', 'sync-all'])
</script>

<template>
  <div class="shell">
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark">
          <Gauge :size="22" />
        </div>
        <div>
          <strong>运营中台</strong>
          <span>Operations Platform</span>
        </div>
      </div>

      <nav class="nav-list" aria-label="主导航">
        <button
          v-for="page in pages"
          :key="page.key"
          class="nav-item"
          :class="{ active: currentPage === page.key }"
          type="button"
          @click="emit('change-page', page.key)"
        >
          <component :is="page.icon" :size="18" />
          <span>{{ page.label }}</span>
        </button>
      </nav>

      <div class="sidebar-foot">
        <div class="mini-stat">
          <span>今日任务</span>
          <strong>{{ taskCount }}</strong>
        </div>
        <div class="mini-stat danger">
          <span>待处理异常</span>
          <strong>{{ activeAlerts }}</strong>
        </div>
      </div>
    </aside>

    <main class="main">
      <header class="topbar">
        <div class="global-search">
          <Search :size="18" />
          <input type="search" placeholder="搜索店铺、SKU、订单、任务" />
        </div>
        <div class="top-actions">
          <button class="icon-btn" type="button" title="同步全部数据" @click="emit('sync-all')">
            <RefreshCw :size="18" />
          </button>
          <button class="icon-btn" type="button" title="通知中心">
            <Bell :size="18" />
          </button>
          <div class="user-chip">
            <Users :size="16" />
            <span>Admin</span>
          </div>
        </div>
      </header>

      <slot />
      <ActivityPanel :items="activityFeed" />
    </main>
  </div>
</template>
