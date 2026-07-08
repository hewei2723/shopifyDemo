<script setup>
import { CircleDollarSign, Search, Upload, Wand2 } from 'lucide-vue-next'
import PageHeader from '../components/common/PageHeader.vue'
import ProgressBar from '../components/common/ProgressBar.vue'
import StatusBadge from '../components/common/StatusBadge.vue'
import { usePlatformDemo } from '../composables/usePlatformDemo'
import { money } from '../utils/formatters'

const {
  selectedProducts,
  productSearch,
  filteredProducts,
  toggleProduct,
  importProducts,
  generateSeo,
  raiseProductPrice,
} = usePlatformDemo()
</script>

<template>
  <section class="page">
    <PageHeader eyebrow="Product Master Data" title="商品中心">
      <template #actions>
        <button class="btn" type="button" @click="importProducts">
          <Upload :size="17" />
          批量导入
        </button>
        <button class="btn" type="button" @click="generateSeo">
          <Wand2 :size="17" />
          AI 生成 SEO
        </button>
        <button class="btn primary" type="button" @click="raiseProductPrice(5)">
          <CircleDollarSign :size="17" />
          涨价 5%
        </button>
      </template>
    </PageHeader>

    <div class="filters single">
      <label>
        <Search :size="16" />
        <input v-model="productSearch" type="search" placeholder="搜索 SKU、标题、分类" />
      </label>
    </div>

    <div class="table-panel">
      <table>
        <thead>
          <tr>
            <th>选择</th>
            <th>SKU</th>
            <th>标题</th>
            <th>分类</th>
            <th>库存</th>
            <th>售价</th>
            <th>成本</th>
            <th>状态</th>
            <th>覆盖店铺</th>
            <th>SEO</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in filteredProducts" :key="product.sku">
            <td><input type="checkbox" :checked="selectedProducts.includes(product.sku)" @change="toggleProduct(product.sku)" /></td>
            <td><strong>{{ product.sku }}</strong><span>图片：{{ product.image }}</span></td>
            <td>{{ product.title }}</td>
            <td>{{ product.category }}</td>
            <td :class="{ negative: product.stock <= 20 }">{{ product.stock }}</td>
            <td><input v-model.number="product.price" class="cell-input" type="number" min="0" step="0.1" /></td>
            <td>{{ money(product.cost) }}</td>
            <td><StatusBadge :value="product.status" /></td>
            <td>{{ product.stores }}</td>
            <td><ProgressBar :value="product.seo" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
