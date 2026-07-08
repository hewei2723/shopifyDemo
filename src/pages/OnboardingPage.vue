<script setup>
import { CheckCircle2, Link2, RefreshCw, ShieldCheck } from 'lucide-vue-next'
import PageHeader from '../components/common/PageHeader.vue'
import StatusBadge from '../components/common/StatusBadge.vue'
import { usePlatformDemo } from '../composables/usePlatformDemo'

const { connectors, accessRequests, onboardingForm, startAccessRequest, retryAccess } = usePlatformDemo()

const syncOptions = [
  { key: 'syncProducts', label: '商品' },
  { key: 'syncOrders', label: '订单' },
  { key: 'syncInventory', label: '库存' },
  { key: 'bindGoogleAds', label: '绑定广告账号' },
]
</script>

<template>
  <section class="page">
    <PageHeader eyebrow="Access Center" title="接入中心">
      <template #actions>
        <button class="btn primary" type="button" @click="startAccessRequest">
          <Link2 :size="17" />
          开始接入
        </button>
      </template>
    </PageHeader>

    <div class="access-grid">
      <section class="panel">
        <div class="panel-head">
          <h2>运营接入入口</h2>
          <span>模拟授权流程</span>
        </div>

        <div class="access-form">
          <label>
            <span>接入类型</span>
            <select v-model="onboardingForm.type">
              <option>Shopify 店铺</option>
              <option>Google Ads 账号</option>
              <option>GA4 Property</option>
              <option>Meta Ads 账号</option>
              <option>ERP / 供应商</option>
              <option>物流平台</option>
            </select>
          </label>

          <label>
            <span>网站 / 店铺域名</span>
            <input v-model="onboardingForm.storeDomain" type="text" placeholder="example.myshopify.com" />
          </label>

          <div class="form-row">
            <label>
              <span>国家</span>
              <select v-model="onboardingForm.country">
                <option>美国</option>
                <option>英国</option>
                <option>加拿大</option>
                <option>德国</option>
                <option>日本</option>
                <option>法国</option>
                <option>澳大利亚</option>
              </select>
            </label>
            <label>
              <span>币种</span>
              <select v-model="onboardingForm.currency">
                <option>USD</option>
                <option>GBP</option>
                <option>CAD</option>
                <option>EUR</option>
                <option>JPY</option>
                <option>AUD</option>
              </select>
            </label>
          </div>

          <label>
            <span>负责人</span>
            <input v-model="onboardingForm.owner" type="text" placeholder="运营负责人" />
          </label>

          <div class="check-grid">
            <label v-for="item in syncOptions" :key="item.key" class="check-item">
              <input v-model="onboardingForm[item.key]" type="checkbox" />
              <span>{{ item.label }}</span>
            </label>
          </div>

          <label>
            <span>备注</span>
            <textarea v-model="onboardingForm.note" rows="4"></textarea>
          </label>
        </div>
      </section>

      <section class="panel">
        <div class="panel-head">
          <h2>运营实际会经历什么</h2>
          <span>建议给老板确认</span>
        </div>
        <div class="step-list">
          <div>
            <i><Link2 :size="16" /></i>
            <strong>1. 填店铺信息</strong>
            <p>运营输入店铺域名、国家、币种、负责人。</p>
          </div>
          <div>
            <i><ShieldCheck :size="16" /></i>
            <strong>2. 跳转授权</strong>
            <p>系统打开 Shopify / Google 授权页，运营确认权限。</p>
          </div>
          <div>
            <i><RefreshCw :size="16" /></i>
            <strong>3. 后台同步</strong>
            <p>中台拉取商品、订单、库存、广告、GA4 数据。</p>
          </div>
          <div>
            <i><CheckCircle2 :size="16" /></i>
            <strong>4. 开始管理</strong>
            <p>接入完成后，店铺进入店铺管理、Dashboard 和任务中心。</p>
          </div>
        </div>
      </section>
    </div>

    <section class="panel">
      <div class="panel-head">
        <h2>可接入平台</h2>
        <span>连接器</span>
      </div>
      <div class="connector-grid">
        <article v-for="item in connectors" :key="item.key" class="connector-card">
          <div>
            <strong>{{ item.name }}</strong>
            <span>{{ item.vendor }} · {{ item.owner }}</span>
          </div>
          <StatusBadge :value="item.status" />
          <p>{{ item.description }}</p>
          <small>已接入 {{ item.connected }} 个</small>
        </article>
      </div>
    </section>

    <section class="panel">
      <div class="panel-head">
        <h2>接入申请</h2>
        <span>最近记录</span>
      </div>
      <div class="table-panel compact">
        <table>
          <thead>
            <tr>
              <th>申请 ID</th>
              <th>类型</th>
              <th>目标</th>
              <th>负责人</th>
              <th>状态</th>
              <th>当前步骤</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="request in accessRequests" :key="request.id">
              <td><strong>{{ request.id }}</strong></td>
              <td>{{ request.type }}</td>
              <td>{{ request.target }}</td>
              <td>{{ request.owner }}</td>
              <td><StatusBadge :value="request.status" /></td>
              <td>{{ request.step }}</td>
              <td>
                <button v-if="request.status === '校验失败'" class="text-btn" type="button" @click="retryAccess(request)">重试</button>
                <span v-else>--</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </section>
</template>
