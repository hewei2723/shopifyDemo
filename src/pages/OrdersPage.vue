<script setup>
import { Shield } from 'lucide-vue-next'
import PageHeader from '../components/common/PageHeader.vue'
import StatusBadge from '../components/common/StatusBadge.vue'
import { usePlatformDemo } from '../composables/usePlatformDemo'
import { money } from '../utils/formatters'

const { orders, createTask, markOrder } = usePlatformDemo()
</script>

<template>
  <section class="page">
    <PageHeader eyebrow="Orders" title="订单中心">
      <template #actions>
        <button class="btn" type="button" @click="createTask('订单风控扫描', '最近 24 小时订单')">
          <Shield :size="17" />
          风控扫描
        </button>
      </template>
    </PageHeader>

    <div class="summary-band">
      <div><span>今日订单</span><strong>6,218</strong></div>
      <div><span>退款中</span><strong>37</strong></div>
      <div><span>高风险</span><strong>12</strong></div>
      <div><span>待发货</span><strong>843</strong></div>
    </div>

    <div class="table-panel">
      <table>
        <thead>
          <tr>
            <th>订单号</th>
            <th>店铺</th>
            <th>国家</th>
            <th>金额</th>
            <th>状态</th>
            <th>风险</th>
            <th>渠道</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td><strong>{{ order.id }}</strong></td>
            <td>{{ order.store }}</td>
            <td>{{ order.country }}</td>
            <td>{{ money(order.amount) }}</td>
            <td><StatusBadge :value="order.status" /></td>
            <td><StatusBadge :value="order.risk" type="level" /></td>
            <td>{{ order.channel }}</td>
            <td><button class="text-btn" type="button" @click="markOrder(order)">标记复核</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
