<script setup>
import { ClipboardList, RefreshCw } from 'lucide-vue-next'
import PageHeader from '../components/common/PageHeader.vue'
import ProgressBar from '../components/common/ProgressBar.vue'
import StatusBadge from '../components/common/StatusBadge.vue'
import { usePlatformDemo } from '../composables/usePlatformDemo'
import { money, percent } from '../utils/formatters'

defineProps({
  setPage: {
    type: Function,
    required: true,
  },
})

const {
  stores,
  alerts,
  tasks,
  totalSales,
  totalProfit,
  totalAdSpend,
  averageRoas,
  runningTasks,
  bestStores,
  syncStores,
} = usePlatformDemo()
</script>

<template>
  <section class="page">
    <PageHeader eyebrow="公司控制中心" title="今日运营总览">
      <template #actions>
        <button class="btn primary" type="button" @click="syncStores">
          <RefreshCw :size="17" />
          全量同步
        </button>
        <button class="btn" type="button" @click="setPage('tasks')">
          <ClipboardList :size="17" />
          查看任务
        </button>
      </template>
    </PageHeader>

    <div class="kpi-grid">
      <article class="metric">
        <span>店铺数量</span>
        <strong>386</strong>
        <em>{{ stores.length }} 家接入演示数据</em>
      </article>
      <article class="metric">
        <span>今日销售额</span>
        <strong>{{ money(totalSales) }}</strong>
        <em class="up">{{ percent(12) }} 较昨日</em>
      </article>
      <article class="metric">
        <span>广告花费</span>
        <strong>{{ money(totalAdSpend) }}</strong>
        <em class="down">{{ percent(-6) }} 较昨日</em>
      </article>
      <article class="metric">
        <span>利润</span>
        <strong>{{ money(totalProfit) }}</strong>
        <em>ROAS {{ averageRoas }}</em>
      </article>
    </div>

    <div class="dashboard-grid">
      <section class="panel wide">
        <div class="panel-head">
          <h2>销售与利润趋势</h2>
          <span>最近 7 天</span>
        </div>
        <div class="bar-chart">
          <div v-for="height in [58, 72, 66, 84, 76, 92, 88]" :key="height" class="bar-pair">
            <i :style="{ height: `${height}%` }"></i>
            <b :style="{ height: `${height - 24}%` }"></b>
          </div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-head">
          <h2>异常提醒</h2>
          <button class="text-btn" type="button" @click="setPage('monitoring')">查看全部</button>
        </div>
        <div class="alert-list">
          <div v-for="alert in alerts.slice(0, 4)" :key="alert.id" class="alert-item">
            <StatusBadge :value="alert.level" type="level" />
            <p>{{ alert.source }} · {{ alert.message }}</p>
          </div>
        </div>
      </section>

      <section class="panel">
        <div class="panel-head">
          <h2>利润排行</h2>
          <span>Top 5</span>
        </div>
        <div class="rank-list">
          <div v-for="store in bestStores" :key="store.id" class="rank-row">
            <span>{{ store.id }}</span>
            <div class="rank-track">
              <i :style="{ width: `${Math.max(18, store.profit / 55)}%` }"></i>
            </div>
            <strong>{{ money(store.profit) }}</strong>
          </div>
        </div>
      </section>

      <section class="panel wide">
        <div class="panel-head">
          <h2>最近任务</h2>
          <span>{{ runningTasks }} 个执行中</span>
        </div>
        <div class="task-strip">
          <div v-for="task in tasks.slice(0, 4)" :key="task.id" class="task-card">
            <span>{{ task.id }}</span>
            <strong>{{ task.name }}</strong>
            <ProgressBar :value="task.progress" />
            <small>{{ task.status }} · {{ task.progress }}%</small>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>
