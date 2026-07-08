<script setup>
import { Activity } from 'lucide-vue-next'
import PageHeader from '../components/common/PageHeader.vue'
import ProgressBar from '../components/common/ProgressBar.vue'
import StatusBadge from '../components/common/StatusBadge.vue'
import { usePlatformDemo } from '../composables/usePlatformDemo'

const { integrations, alerts, activeAlerts, createTask, handleAlert } = usePlatformDemo()
</script>

<template>
  <section class="page">
    <PageHeader eyebrow="Observability" title="系统监控">
      <template #actions>
        <button class="btn" type="button" @click="createTask('API 连通性测试', '全部集成')">
          <Activity :size="17" />
          连通性测试
        </button>
      </template>
    </PageHeader>

    <div class="monitor-grid">
      <article v-for="item in integrations" :key="item.name" class="integration">
        <div class="integration-head">
          <strong>{{ item.name }}</strong>
          <StatusBadge :value="item.status" />
        </div>
        <p>{{ item.detail }}</p>
        <ProgressBar :value="item.quota" />
        <small>{{ item.latency }}ms · 配额 {{ item.quota }}%</small>
      </article>
    </div>

    <section class="panel">
      <div class="panel-head">
        <h2>告警处理</h2>
        <span>{{ activeAlerts }} 条待处理</span>
      </div>
      <div class="alert-table">
        <div v-for="alert in alerts" :key="alert.id" class="alert-row">
          <StatusBadge :value="alert.level" type="level" />
          <strong>{{ alert.source }}</strong>
          <p>{{ alert.message }}</p>
          <span>{{ alert.owner }}</span>
          <button class="text-btn" type="button" :disabled="alert.status === '已处理'" @click="handleAlert(alert)">
            {{ alert.status === '已处理' ? '已处理' : '处理' }}
          </button>
        </div>
      </div>
    </section>
  </section>
</template>
