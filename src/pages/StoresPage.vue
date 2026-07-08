<script setup>
import { Activity, Boxes, Check, ChevronDown, Globe2, Pause, RefreshCw, Search, SlidersHorizontal } from 'lucide-vue-next'
import PageHeader from '../components/common/PageHeader.vue'
import StatusBadge from '../components/common/StatusBadge.vue'
import { usePlatformDemo } from '../composables/usePlatformDemo'
import { money } from '../utils/formatters'

const {
  selectedStores,
  storeSearch,
  storeCountry,
  storeStatus,
  countries,
  statuses,
  filteredStores,
  createTask,
  toggleStore,
  selectVisibleStores,
  syncStores,
  pauseAds,
  syncInventory,
} = usePlatformDemo()
</script>

<template>
  <section class="page">
    <PageHeader eyebrow="Store Cluster" title="店铺管理">
      <template #actions>
        <button class="btn" type="button" @click="selectVisibleStores">
          <Check :size="17" />
          选中筛选结果
        </button>
        <button class="btn primary" type="button" @click="syncStores">
          <RefreshCw :size="17" />
          批量同步
        </button>
        <button class="btn warning" type="button" @click="pauseAds">
          <Pause :size="17" />
          暂停广告
        </button>
      </template>
    </PageHeader>

    <div class="filters">
      <label>
        <Search :size="16" />
        <input v-model="storeSearch" type="search" placeholder="搜索店铺 ID、名称、负责人" />
      </label>
      <label>
        <Globe2 :size="16" />
        <select v-model="storeCountry">
          <option v-for="country in countries" :key="country">{{ country }}</option>
        </select>
        <ChevronDown :size="15" />
      </label>
      <label>
        <SlidersHorizontal :size="16" />
        <select v-model="storeStatus">
          <option v-for="status in statuses" :key="status">{{ status }}</option>
        </select>
        <ChevronDown :size="15" />
      </label>
    </div>

    <div class="table-panel">
      <table>
        <thead>
          <tr>
            <th>选择</th>
            <th>店铺</th>
            <th>国家</th>
            <th>负责人</th>
            <th>状态</th>
            <th>今日销售</th>
            <th>利润</th>
            <th>ROAS</th>
            <th>库存</th>
            <th>API</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="store in filteredStores" :key="store.id">
            <td><input type="checkbox" :checked="selectedStores.includes(store.id)" @change="toggleStore(store.id)" /></td>
            <td><strong>{{ store.id }}</strong><span>{{ store.name }}</span></td>
            <td>{{ store.country }}</td>
            <td>{{ store.manager }}</td>
            <td><StatusBadge :value="store.status" /></td>
            <td>{{ money(store.sales) }}</td>
            <td :class="{ negative: store.profit < 0 }">{{ money(store.profit) }}</td>
            <td>{{ store.roas }}</td>
            <td>{{ store.inventory }}%</td>
            <td><StatusBadge :value="store.api" /></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="operation-dock">
      <strong>已选 {{ selectedStores.length }} 家店铺</strong>
      <button class="btn" type="button" @click="syncInventory">
        <Boxes :size="17" />
        同步库存
      </button>
      <button class="btn" type="button" @click="createTask('店铺健康检查', selectedStores.join('、') || '全部店铺')">
        <Activity :size="17" />
        健康检查
      </button>
    </div>
  </section>
</template>
