import { computed, onMounted, ref } from 'vue'
import {
  alertsSeed,
  campaignsSeed,
  integrationsSeed,
  ordersSeed,
  productsSeed,
  settingsRowsSeed,
  storesSeed,
  tasksSeed,
} from '../data/mockData'
import { money } from '../utils/formatters'

const clone = (value) => structuredClone(value)

const stores = ref(clone(storesSeed))
const products = ref(clone(productsSeed))
const campaigns = ref(clone(campaignsSeed))
const orders = ref(clone(ordersSeed))
const alerts = ref(clone(alertsSeed))
const tasks = ref(clone(tasksSeed))
const integrations = ref(clone(integrationsSeed))
const settingsRows = ref(clone(settingsRowsSeed))

const selectedStores = ref(['US-001', 'UK-012'])
const selectedProducts = ref(['SKU-1001', 'SKU-1004'])
const storeSearch = ref('')
const storeCountry = ref('全部')
const storeStatus = ref('全部')
const productSearch = ref('')
const taskSeed = ref(9008)
const activityFeed = ref([])
const aiInput = ref('找出今天利润下降的店铺并给出处理建议')
const aiResult = ref('')
const initialized = ref(false)

const countries = computed(() => ['全部', ...new Set(stores.value.map((store) => store.country))])
const statuses = computed(() => ['全部', ...new Set(stores.value.map((store) => store.status))])

const filteredStores = computed(() => {
  const keyword = storeSearch.value.trim().toLowerCase()
  return stores.value.filter((store) => {
    const matchKeyword = !keyword || `${store.id} ${store.name} ${store.manager}`.toLowerCase().includes(keyword)
    const matchCountry = storeCountry.value === '全部' || store.country === storeCountry.value
    const matchStatus = storeStatus.value === '全部' || store.status === storeStatus.value
    return matchKeyword && matchCountry && matchStatus
  })
})

const filteredProducts = computed(() => {
  const keyword = productSearch.value.trim().toLowerCase()
  return products.value.filter((product) => `${product.sku} ${product.title} ${product.category}`.toLowerCase().includes(keyword))
})

const totalSales = computed(() => stores.value.reduce((sum, store) => sum + store.sales, 0))
const totalProfit = computed(() => stores.value.reduce((sum, store) => sum + store.profit, 0))
const totalAdSpend = computed(() => stores.value.reduce((sum, store) => sum + store.adSpend, 0))
const averageRoas = computed(() => (totalSales.value / totalAdSpend.value).toFixed(2))
const activeAlerts = computed(() => alerts.value.filter((alert) => alert.status !== '已处理').length)
const runningTasks = computed(() => tasks.value.filter((task) => task.status === '执行中').length)
const selectedProductRows = computed(() => products.value.filter((product) => selectedProducts.value.includes(product.sku)))
const bestStores = computed(() => [...stores.value].sort((a, b) => b.profit - a.profit).slice(0, 5))

function addActivity(message) {
  activityFeed.value.unshift({
    id: Date.now() + Math.random(),
    time: new Date().toLocaleTimeString('zh-CN', { hour12: false }),
    message,
  })
  activityFeed.value = activityFeed.value.slice(0, 8)
}

function createTask(name, target, duration = 7000) {
  const task = {
    id: `TASK-${++taskSeed.value}`,
    name,
    target,
    status: '执行中',
    progress: 3,
    success: 0,
    failed: 0,
    owner: '当前用户',
    log: '任务已进入队列',
  }
  tasks.value.unshift(task)
  addActivity(`${name} 已创建，目标：${target}`)

  const interval = setInterval(() => {
    task.progress = Math.min(100, task.progress + Math.floor(Math.random() * 13) + 8)
    task.success = Math.floor(task.progress * 3.4)
    task.log = task.progress < 100 ? '正在调用平台 Adapter 并写入操作日志' : '任务完成，结果已回写'
    if (task.progress >= 100) {
      task.status = '完成'
      task.failed = Math.random() > 0.75 ? 1 : 0
      addActivity(`${name} 已完成`)
      clearInterval(interval)
    }
  }, duration / 8)
}

function toggleStore(id) {
  selectedStores.value = selectedStores.value.includes(id)
    ? selectedStores.value.filter((item) => item !== id)
    : [...selectedStores.value, id]
}

function toggleProduct(sku) {
  selectedProducts.value = selectedProducts.value.includes(sku)
    ? selectedProducts.value.filter((item) => item !== sku)
    : [...selectedProducts.value, sku]
}

function selectVisibleStores() {
  selectedStores.value = filteredStores.value.map((store) => store.id)
  addActivity(`已选中当前筛选的 ${selectedStores.value.length} 家店铺`)
}

function syncStores() {
  const target = selectedStores.value.length ? `${selectedStores.value.length} 家店铺` : '全部店铺'
  createTask('批量同步店铺数据', target)
  stores.value.forEach((store) => {
    if (!selectedStores.value.length || selectedStores.value.includes(store.id)) {
      store.api = '正常'
      if (store.status === '离线') store.status = '在线'
    }
  })
}

function pauseAds() {
  const affected = selectedStores.value.length ? selectedStores.value : stores.value.filter((store) => store.roas < 1.6).map((store) => store.id)
  campaigns.value.forEach((campaign) => {
    if (affected.includes(campaign.store)) campaign.status = '已暂停'
  })
  createTask('暂停广告投放', affected.join('、') || '低 ROAS 店铺')
}

function syncInventory() {
  products.value.forEach((product) => {
    if (product.stock <= 20) product.status = product.stock === 0 ? '已下架' : '补货中'
  })
  stores.value.forEach((store) => {
    if (selectedStores.value.includes(store.id)) store.inventory = Math.max(store.inventory, 50)
  })
  createTask('同步库存与自动下架', selectedStores.value.length ? `${selectedStores.value.length} 家店铺` : '全部店铺')
}

function raiseProductPrice(rate = 5) {
  const rows = selectedProductRows.value.length ? selectedProductRows.value : products.value
  rows.forEach((product) => {
    product.price = Number((product.price * (1 + rate / 100)).toFixed(2))
    product.status = '待同步'
  })
  createTask(`商品批量涨价 ${rate}%`, `${rows.length} 个 SKU`)
}

function generateSeo() {
  const rows = selectedProductRows.value.length ? selectedProductRows.value : products.value
  rows.forEach((product) => {
    product.seo = Math.min(99, product.seo + 12)
    product.status = '待同步'
  })
  createTask('AI 生成商品 SEO', `${rows.length} 个 SKU`)
}

function importProducts() {
  const index = products.value.length + 1001
  products.value.unshift({
    sku: `SKU-${index}`,
    title: 'Imported Campaign Product',
    category: 'New',
    stock: 60,
    price: 32.9,
    cost: 12.5,
    status: '待同步',
    image: '完整',
    stores: 0,
    seo: 55,
  })
  createTask('批量导入商品', 'CSV 模拟导入 1 个 SKU')
}

function handleAlert(alert) {
  alert.status = '已处理'
  addActivity(`${alert.source} 告警已处理：${alert.message}`)
}

function runAi() {
  const lossStores = stores.value.filter((store) => store.profit < 1500 || store.roas < 1.6)
  aiResult.value = [
    `发现 ${lossStores.length} 家需要优先处理的店铺：${lossStores.map((store) => store.id).join('、')}。`,
    '建议动作：暂停 ROAS < 1.6 的广告组，先修复 Purchase 事件与离线 Webhook；库存低于 50 的商品进入补货队列。',
    `预计影响：可减少约 ${money(5600)} 无效广告花费，并让 ${lossStores.length * 12} 个商品恢复可售状态。`,
  ].join('\n')
  createTask('AI 经营诊断', '今日全量数据')
}

function approveTask(task) {
  task.status = '执行中'
  task.log = '审批通过，任务开始执行'
  addActivity(`${task.id} 已审批执行`)
}

function retryTask(task) {
  task.status = '执行中'
  task.progress = 12
  task.failed = 0
  task.log = '失败任务已重新入队'
  addActivity(`${task.id} 已重新执行`)
}

function markOrder(order) {
  order.status = '已标记'
  addActivity(`${order.id} 已标记复核`)
}

export function usePlatformDemo() {
  onMounted(() => {
    if (initialized.value) return
    initialized.value = true
    addActivity('系统已加载 386 家 Shopify 店铺模拟视图')
    addActivity('今日数据同步完成，发现 5 条待处理异常')
  })

  return {
    stores,
    products,
    campaigns,
    orders,
    alerts,
    tasks,
    integrations,
    settingsRows,
    selectedStores,
    selectedProducts,
    storeSearch,
    storeCountry,
    storeStatus,
    productSearch,
    activityFeed,
    aiInput,
    aiResult,
    countries,
    statuses,
    filteredStores,
    filteredProducts,
    totalSales,
    totalProfit,
    totalAdSpend,
    averageRoas,
    activeAlerts,
    runningTasks,
    bestStores,
    addActivity,
    createTask,
    toggleStore,
    toggleProduct,
    selectVisibleStores,
    syncStores,
    pauseAds,
    syncInventory,
    raiseProductPrice,
    generateSeo,
    importProducts,
    handleAlert,
    runAi,
    approveTask,
    retryTask,
    markOrder,
  }
}
