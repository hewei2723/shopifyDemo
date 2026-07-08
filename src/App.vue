<script setup>
import { computed, ref } from 'vue'
import {
  Activity,
  BarChart3,
  Bot,
  ClipboardList,
  LayoutDashboard,
  Megaphone,
  PackageSearch,
  Settings,
  ShoppingBag,
  Store,
} from 'lucide-vue-next'
import AppShell from './components/layout/AppShell.vue'
import { usePlatformDemo } from './composables/usePlatformDemo'
import AdsPage from './pages/AdsPage.vue'
import AiPage from './pages/AiPage.vue'
import DashboardPage from './pages/DashboardPage.vue'
import DataPage from './pages/DataPage.vue'
import MonitoringPage from './pages/MonitoringPage.vue'
import OrdersPage from './pages/OrdersPage.vue'
import ProductsPage from './pages/ProductsPage.vue'
import SettingsPage from './pages/SettingsPage.vue'
import StoresPage from './pages/StoresPage.vue'
import TasksPage from './pages/TasksPage.vue'

const currentPage = ref('dashboard')

const pages = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, component: DashboardPage },
  { key: 'stores', label: '店铺管理', icon: Store, component: StoresPage },
  { key: 'products', label: '商品中心', icon: PackageSearch, component: ProductsPage },
  { key: 'orders', label: '订单中心', icon: ShoppingBag, component: OrdersPage },
  { key: 'ads', label: '广告中心', icon: Megaphone, component: AdsPage },
  { key: 'data', label: '数据中心', icon: BarChart3, component: DataPage },
  { key: 'tasks', label: '任务中心', icon: ClipboardList, component: TasksPage },
  { key: 'ai', label: 'AI 助手', icon: Bot, component: AiPage },
  { key: 'monitoring', label: '系统监控', icon: Activity, component: MonitoringPage },
  { key: 'settings', label: '权限设置', icon: Settings, component: SettingsPage },
]

const { tasks, activeAlerts, activityFeed, createTask } = usePlatformDemo()

const currentComponent = computed(() => pages.find((page) => page.key === currentPage.value)?.component || DashboardPage)

function setPage(pageKey) {
  currentPage.value = pageKey
}
</script>

<template>
  <AppShell
    :pages="pages"
    :current-page="currentPage"
    :task-count="tasks.length"
    :active-alerts="activeAlerts"
    :activity-feed="activityFeed"
    @change-page="setPage"
    @sync-all="createTask('全平台数据同步', 'Shopify / Ads / GA4 / ERP')"
  >
    <component :is="currentComponent" :set-page="setPage" />
  </AppShell>
</template>
