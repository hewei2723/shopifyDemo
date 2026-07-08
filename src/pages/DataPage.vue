<script setup>
import { Download } from 'lucide-vue-next'
import PageHeader from '../components/common/PageHeader.vue'
import ProgressBar from '../components/common/ProgressBar.vue'
import { usePlatformDemo } from '../composables/usePlatformDemo'

const { stores, createTask } = usePlatformDemo()
</script>

<template>
  <section class="page">
    <PageHeader eyebrow="Analytics" title="数据中心">
      <template #actions>
        <button class="btn" type="button" @click="createTask('导出经营日报', '老板日报 Excel')">
          <Download :size="17" />
          导出日报
        </button>
      </template>
    </PageHeader>

    <div class="data-grid">
      <section class="panel wide">
        <div class="panel-head">
          <h2>国家经营对比</h2>
          <span>订单 / ROAS / 利润</span>
        </div>
        <div class="country-grid">
          <div v-for="store in stores" :key="store.id" class="country-card">
            <span>{{ store.country }}</span>
            <strong>{{ store.orders }} 单</strong>
            <ProgressBar :value="Math.min(100, store.roas * 24)" />
            <small>{{ store.id }} · ROAS {{ store.roas }}</small>
          </div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-head">
          <h2>数据质量</h2>
          <span>今日</span>
        </div>
        <div class="quality-list">
          <div><span>订单匹配率</span><strong>98.7%</strong></div>
          <div><span>广告归因率</span><strong>91.4%</strong></div>
          <div><span>库存同步率</span><strong>95.2%</strong></div>
          <div><span>Webhook 成功率</span><strong>88.1%</strong></div>
        </div>
      </section>
    </div>
  </section>
</template>
