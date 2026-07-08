<script setup>
import { computed } from 'vue'
import { ArrowLeft, Cpu, RadioTower, ShieldAlert, TrendingUp, Zap } from 'lucide-vue-next'
import { usePlatformDemo } from '../composables/usePlatformDemo'
import { money } from '../utils/formatters'

defineProps({
  setPage: {
    type: Function,
    required: true,
  },
})

const {
  stores,
  alerts,
  campaigns,
  tasks,
  integrations,
  totalSales,
  totalProfit,
  totalAdSpend,
  averageRoas,
  activeAlerts,
  runningTasks,
} = usePlatformDemo()

const revenueBars = [68, 76, 71, 88, 82, 96, 91, 104, 99, 112, 118, 124]
const trendPoints = [42, 55, 49, 67, 72, 66, 88, 81, 92, 105, 98, 118]
const pulseLines = [
  { width: 72, label: 'Shopify Sync' },
  { width: 58, label: 'Ads Learning' },
  { width: 84, label: 'Order Stream' },
  { width: 46, label: 'Inventory Risk' },
]
const channelFunnel = [
  { label: '曝光', value: 100, count: '8.42M' },
  { label: '点击', value: 72, count: '612K' },
  { label: '加购', value: 48, count: '86K' },
  { label: '支付', value: 31, count: '18.7K' },
]

const hotCampaigns = computed(() => [...campaigns.value].sort((a, b) => b.revenue - a.revenue).slice(0, 4))
const dangerAlerts = computed(() => alerts.value.filter((item) => item.status !== '已处理').slice(0, 5))
const systemHealth = computed(() => Math.max(72, 100 - activeAlerts.value * 4 - runningTasks.value * 2))
const countryRanking = computed(() => [...stores.value].sort((a, b) => b.sales - a.sales).slice(0, 6))
const maxStoreSales = computed(() => Math.max(...countryRanking.value.map((store) => store.sales)))
const trendPath = computed(() => trendPoints.map((point, index) => `${index * 9},${130 - point}`).join(' '))
const trendArea = computed(() => `0,140 ${trendPath.value} 99,140`)
</script>

<template>
  <main class="executive-screen">
    <div class="screen-grid"></div>
    <div class="screen-glow glow-a"></div>
    <div class="screen-glow glow-b"></div>

    <header class="screen-header">
      <button class="screen-back" type="button" @click="setPage('dashboard')">
        <ArrowLeft :size="18" />
        返回后台
      </button>
      <div>
        <p>GLOBAL OPERATION COMMAND CENTER</p>
        <h1>全球店铺运营指挥舱</h1>
      </div>
      <div class="screen-clock">
        <span>LIVE</span>
        <strong>{{ new Date().toLocaleDateString('zh-CN') }}</strong>
      </div>
    </header>

    <section class="screen-kpis">
      <article>
        <span>今日销售额</span>
        <strong>{{ money(totalSales * 3) }}</strong>
        <em>+12.8%</em>
      </article>
      <article>
        <span>净利润</span>
        <strong>{{ money(totalProfit * 3) }}</strong>
        <em>+8.4%</em>
      </article>
      <article>
        <span>广告花费</span>
        <strong>{{ money(totalAdSpend * 3) }}</strong>
        <em class="cold">ROAS {{ averageRoas }}</em>
      </article>
      <article>
        <span>接入店铺</span>
        <strong>386</strong>
        <em>{{ stores.length }} 个演示节点</em>
      </article>
      <article>
        <span>系统健康度</span>
        <strong>{{ systemHealth }}%</strong>
        <em class="cold">{{ activeAlerts }} 个告警</em>
      </article>
    </section>

    <section class="screen-main">
      <aside class="screen-panel left-top">
        <div class="screen-panel-head">
          <h2>实时收入曲线</h2>
          <span>12H</span>
        </div>
        <div class="holo-bars">
          <i v-for="(bar, index) in revenueBars" :key="index" :style="{ height: `${bar}px` }"></i>
        </div>
      </aside>

      <aside class="screen-panel left-bottom">
        <div class="screen-panel-head">
          <h2>平台数据链路</h2>
          <Cpu :size="17" />
        </div>
        <div class="pulse-list">
          <div v-for="line in pulseLines" :key="line.label">
            <span>{{ line.label }}</span>
            <b><i :style="{ width: `${line.width}%` }"></i></b>
          </div>
        </div>
      </aside>

      <section class="chart-stage">
        <div class="screen-panel-head">
          <h2>核心经营态势</h2>
          <TrendingUp :size="18" />
        </div>

        <div class="command-matrix">
          <article class="hero-chart">
            <div class="chart-title">
              <span>销售趋势</span>
              <strong>过去 12 小时</strong>
            </div>
            <svg viewBox="0 0 100 145" preserveAspectRatio="none">
              <polygon :points="trendArea" />
              <polyline :points="trendPath" />
            </svg>
            <div class="chart-axis">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
            </div>
          </article>

          <article class="ring-board">
            <div class="ring-chart" style="--value: 78">
              <b>78%</b>
              <span>健康度</span>
            </div>
            <div class="ring-chart cyan" style="--value: 64">
              <b>2.70</b>
              <span>ROAS</span>
            </div>
            <div class="ring-chart green" style="--value: 71">
              <b>22%</b>
              <span>利润率</span>
            </div>
          </article>

          <article class="ranking-chart">
            <div class="chart-title">
              <span>国家 / 区域销售排行</span>
              <strong>Top 6</strong>
            </div>
            <div v-for="store in countryRanking" :key="store.id" class="rank-line">
              <span>{{ store.country }}</span>
              <b><i :style="{ width: `${(store.sales / maxStoreSales) * 100}%` }"></i></b>
              <em>{{ money(store.sales) }}</em>
            </div>
          </article>

          <article class="funnel-chart">
            <div class="chart-title">
              <span>营销转化漏斗</span>
              <strong>全渠道</strong>
            </div>
            <div v-for="item in channelFunnel" :key="item.label" class="funnel-row">
              <span>{{ item.label }}</span>
              <b :style="{ width: `${item.value}%` }">{{ item.count }}</b>
            </div>
          </article>

          <article class="matrix-chart">
            <div class="chart-title">
              <span>广告效率矩阵</span>
              <strong>Spend / Revenue</strong>
            </div>
            <div class="bubble-field">
              <i
                v-for="campaign in hotCampaigns"
                :key="campaign.id"
                :style="{
                  left: `${Math.min(82, campaign.spend / 75)}%`,
                  bottom: `${Math.min(78, campaign.revenue / 260)}%`,
                  width: `${Math.max(22, campaign.roas * 12)}px`,
                  height: `${Math.max(22, campaign.roas * 12)}px`,
                }"
              >
                {{ campaign.store }}
              </i>
            </div>
          </article>
        </div>
      </section>

      <aside class="screen-panel right-top">
        <div class="screen-panel-head">
          <h2>高价值广告系列</h2>
          <Zap :size="17" />
        </div>
        <div class="campaign-radar">
          <div v-for="campaign in hotCampaigns" :key="campaign.id">
            <span>{{ campaign.store }}</span>
            <strong>{{ campaign.name }}</strong>
            <em>ROAS {{ campaign.roas }} · {{ money(campaign.revenue) }}</em>
          </div>
        </div>
      </aside>

      <aside class="screen-panel right-bottom">
        <div class="screen-panel-head">
          <h2>风险雷达</h2>
          <ShieldAlert :size="17" />
        </div>
        <div class="risk-feed">
          <div v-for="alert in dangerAlerts" :key="alert.id">
            <span>{{ alert.level }}</span>
            <p>{{ alert.source }} · {{ alert.message }}</p>
          </div>
        </div>
      </aside>
    </section>

    <footer class="screen-footer">
      <div>
        <RadioTower :size="16" />
        <span>实时同步任务 {{ runningTasks }} 个</span>
      </div>
      <div v-for="item in integrations" :key="item.name">
        <i :class="{ warn: item.status !== '正常' }"></i>
        <span>{{ item.name }} · {{ item.status }}</span>
      </div>
    </footer>
  </main>
</template>
