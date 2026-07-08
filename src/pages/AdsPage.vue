<script setup>
import { Pause, Play } from 'lucide-vue-next'
import PageHeader from '../components/common/PageHeader.vue'
import StatusBadge from '../components/common/StatusBadge.vue'
import { usePlatformDemo } from '../composables/usePlatformDemo'
import { money } from '../utils/formatters'

const { campaigns, createTask, pauseAds } = usePlatformDemo()
</script>

<template>
  <section class="page">
    <PageHeader eyebrow="Ads Control" title="广告中心">
      <template #actions>
        <button class="btn warning" type="button" @click="pauseAds">
          <Pause :size="17" />
          暂停低效广告
        </button>
        <button class="btn primary" type="button" @click="createTask('重启优质广告', 'ROAS > 3 的广告系列')">
          <Play :size="17" />
          重启优质广告
        </button>
      </template>
    </PageHeader>

    <div class="table-panel">
      <table>
        <thead>
          <tr>
            <th>广告系列</th>
            <th>平台</th>
            <th>店铺</th>
            <th>花费</th>
            <th>收入</th>
            <th>ROAS</th>
            <th>状态</th>
            <th>异常</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="campaign in campaigns" :key="campaign.id">
            <td><strong>{{ campaign.name }}</strong><span>{{ campaign.id }}</span></td>
            <td>{{ campaign.platform }}</td>
            <td>{{ campaign.store }}</td>
            <td>{{ money(campaign.spend) }}</td>
            <td>{{ money(campaign.revenue) }}</td>
            <td :class="{ negative: campaign.roas < 1.6 }">{{ campaign.roas }}</td>
            <td><StatusBadge :value="campaign.status" /></td>
            <td>{{ campaign.issue }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
