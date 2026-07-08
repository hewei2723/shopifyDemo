<script setup>
import { Shield } from 'lucide-vue-next'
import PageHeader from '../components/common/PageHeader.vue'
import { usePlatformDemo } from '../composables/usePlatformDemo'

const { settingsRows, createTask } = usePlatformDemo()
</script>

<template>
  <section class="page">
    <PageHeader eyebrow="Access Control" title="权限设置">
      <template #actions>
        <button class="btn primary" type="button" @click="createTask('权限策略发布', 'RBAC 配置')">
          <Shield :size="17" />
          发布策略
        </button>
      </template>
    </PageHeader>

    <div class="table-panel">
      <table>
        <thead>
          <tr>
            <th>角色</th>
            <th>用户数</th>
            <th>权限范围</th>
            <th>审批策略</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in settingsRows" :key="row.role">
            <td><strong>{{ row.role }}</strong></td>
            <td>{{ row.users }}</td>
            <td>{{ row.scope }}</td>
            <td>{{ row.approval }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
