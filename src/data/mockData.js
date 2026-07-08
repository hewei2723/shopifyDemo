export const storesSeed = [
  { id: 'US-001', name: 'US Beauty Prime', country: '美国', manager: 'Alice', status: '在线', sales: 18230, profit: 4920, adSpend: 6200, roas: 3.2, orders: 410, alerts: 1, inventory: 78, api: '正常' },
  { id: 'US-018', name: 'US Home Nest', country: '美国', manager: 'Kevin', status: '在线', sales: 12980, profit: 3180, adSpend: 4800, roas: 2.7, orders: 268, alerts: 0, inventory: 62, api: '正常' },
  { id: 'UK-012', name: 'UK Gadget Flow', country: '英国', manager: 'Mia', status: '库存风险', sales: 9060, profit: 1220, adSpend: 3900, roas: 2.1, orders: 151, alerts: 3, inventory: 18, api: '正常' },
  { id: 'CA-007', name: 'CA Outdoor Max', country: '加拿大', manager: 'Noah', status: '广告异常', sales: 7420, profit: 810, adSpend: 4200, roas: 1.4, orders: 119, alerts: 2, inventory: 36, api: '正常' },
  { id: 'DE-031', name: 'DE Auto Kit', country: '德国', manager: 'Lena', status: 'GA 异常', sales: 10430, profit: 2560, adSpend: 3100, roas: 3.0, orders: 177, alerts: 2, inventory: 55, api: '限流' },
  { id: 'JP-004', name: 'JP Kitchen Lab', country: '日本', manager: 'Haru', status: '离线', sales: 2180, profit: -240, adSpend: 1400, roas: 0.9, orders: 42, alerts: 4, inventory: 22, api: '失败' },
  { id: 'FR-003', name: 'FR Pet House', country: '法国', manager: 'Emma', status: '在线', sales: 6810, profit: 1840, adSpend: 1900, roas: 3.5, orders: 91, alerts: 0, inventory: 88, api: '正常' },
  { id: 'AU-022', name: 'AU Sports Lane', country: '澳大利亚', manager: 'Leo', status: '在线', sales: 11320, profit: 3010, adSpend: 3600, roas: 3.1, orders: 204, alerts: 1, inventory: 70, api: '正常' },
]

export const productsSeed = [
  { sku: 'SKU-1001', title: 'Portable LED Makeup Mirror', category: 'Beauty', stock: 42, price: 29.9, cost: 11.2, status: '已同步', image: '完整', stores: 126, seo: 82 },
  { sku: 'SKU-1002', title: 'Smart Bottle Warmer', category: 'Home', stock: 15, price: 39.9, cost: 18.6, status: '库存低', image: '完整', stores: 82, seo: 76 },
  { sku: 'SKU-1003', title: 'Foldable Pet Ramp', category: 'Pet', stock: 120, price: 59.9, cost: 24.1, status: '已同步', image: '完整', stores: 64, seo: 88 },
  { sku: 'SKU-1004', title: 'Wireless Car Vacuum', category: 'Auto', stock: 0, price: 49.9, cost: 20.3, status: '待下架', image: '缺失', stores: 97, seo: 61 },
  { sku: 'SKU-1005', title: 'Outdoor Compression Bag', category: 'Sports', stock: 77, price: 24.9, cost: 8.4, status: '待同步', image: '完整', stores: 138, seo: 69 },
  { sku: 'SKU-1006', title: 'Kitchen Scale Pro', category: 'Kitchen', stock: 36, price: 34.9, cost: 13.7, status: '已同步', image: '完整', stores: 53, seo: 80 },
]

export const campaignsSeed = [
  { id: 'ADS-001', name: 'US Beauty Search', platform: 'Google Ads', store: 'US-001', spend: 6200, revenue: 19840, roas: 3.2, status: '投放中', issue: '无' },
  { id: 'ADS-029', name: 'CA Outdoor PMax', platform: 'Google Ads', store: 'CA-007', spend: 4200, revenue: 5880, roas: 1.4, status: '待优化', issue: 'ROAS 低' },
  { id: 'ADS-063', name: 'JP Kitchen Retarget', platform: 'Meta', store: 'JP-004', spend: 1400, revenue: 1260, roas: 0.9, status: '暂停建议', issue: 'Purchase 事件丢失' },
  { id: 'ADS-105', name: 'DE Auto Prospecting', platform: 'TikTok Ads', store: 'DE-031', spend: 3100, revenue: 9300, roas: 3.0, status: '投放中', issue: 'GA4 限流' },
]

export const ordersSeed = [
  { id: 'ORD-72190', store: 'US-001', country: '美国', amount: 189.7, status: '已支付', risk: '低', channel: 'Google' },
  { id: 'ORD-72191', store: 'UK-012', country: '英国', amount: 76.2, status: '待发货', risk: '中', channel: 'Meta' },
  { id: 'ORD-72192', store: 'CA-007', country: '加拿大', amount: 242.1, status: '退款中', risk: '高', channel: 'TikTok' },
  { id: 'ORD-72193', store: 'DE-031', country: '德国', amount: 98.5, status: '已发货', risk: '低', channel: 'Google' },
  { id: 'ORD-72194', store: 'JP-004', country: '日本', amount: 33.9, status: '支付失败', risk: '高', channel: 'Direct' },
]

export const alertsSeed = [
  { id: 1, level: '高', source: 'JP-004', message: '店铺离线，Webhook 连续失败 12 次', owner: '平台', status: '待处理' },
  { id: 2, level: '高', source: 'CA-007', message: 'Google Ads ROAS 较昨日下降 42%', owner: '广告', status: '待处理' },
  { id: 3, level: '中', source: 'UK-012', message: '17 个 SKU 库存低于安全线', owner: '运营', status: '处理中' },
  { id: 4, level: '中', source: 'DE-031', message: 'GA4 API 限流，部分报表延迟', owner: '数据', status: '处理中' },
  { id: 5, level: '低', source: 'SKU-1004', message: '商品图片缺失，影响 97 家店铺', owner: '商品', status: '待处理' },
]

export const tasksSeed = [
  { id: 'TASK-9001', name: '同步商品主数据', target: '全部店铺', status: '执行中', progress: 62, success: 238, failed: 3, owner: '系统', log: '正在同步 Shopify product variant' },
  { id: 'TASK-9002', name: '库存安全线扫描', target: '386 家店铺', status: '完成', progress: 100, success: 386, failed: 0, owner: '调度器', log: '发现 17 个低库存 SKU' },
  { id: 'TASK-9003', name: '暂停异常广告', target: 'CA-007 / JP-004', status: '等待中', progress: 0, success: 0, failed: 0, owner: '广告', log: '等待审批' },
  { id: 'TASK-9004', name: 'AI 生成 SEO 标题', target: '500 个商品', status: '失败', progress: 48, success: 241, failed: 12, owner: 'AI', log: '部分商品缺少图片素材' },
]

export const integrationsSeed = [
  { name: 'Shopify API', status: '正常', latency: 126, quota: 78, detail: '386/386 店铺可连接' },
  { name: 'Google Ads API', status: '正常', latency: 184, quota: 64, detail: '97 个账号同步完成' },
  { name: 'GA4 Data API', status: '限流', latency: 860, quota: 92, detail: 'DE-031 报表延迟' },
  { name: 'Redis Queue', status: '正常', latency: 18, quota: 42, detail: '12 个任务等待中' },
  { name: 'PostgreSQL', status: '正常', latency: 24, quota: 58, detail: '写入延迟稳定' },
  { name: 'Webhook Gateway', status: '异常', latency: 1300, quota: 96, detail: 'JP-004 回调失败' },
]

export const settingsRowsSeed = [
  { role: '老板', users: 2, scope: '全部店铺 / 全部操作', approval: '无需审批' },
  { role: '运营经理', users: 5, scope: '商品、库存、店铺批量操作', approval: '高风险操作审批' },
  { role: '广告专员', users: 15, scope: '广告账号、ROAS 报表', approval: '暂停广告需审批' },
  { role: '客服', users: 18, scope: '订单查询、退款标记', approval: '退款需审批' },
]
