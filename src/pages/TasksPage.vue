<script setup>
import { RefreshCw } from 'lucide-vue-next'
import PageHeader from '../components/common/PageHeader.vue'
import ProgressBar from '../components/common/ProgressBar.vue'
import StatusBadge from '../components/common/StatusBadge.vue'
import { usePlatformDemo } from '../composables/usePlatformDemo'

const { tasks, createTask, approveTask, retryTask } = usePlatformDemo()
</script>

<template>
  <section class="page">
    <PageHeader eyebrow="Async Jobs" title="任务中心">
      <template #actions>
        <button class="btn primary" type="button" @click="createTask('手动触发全链路巡检', '全部 Adapter')">
          <RefreshCw :size="17" />
          新建巡检任务
        </button>
      </template>
    </PageHeader>

    <div class="task-board">
      <article v-for="task in tasks" :key="task.id" class="task-row">
        <div>
          <span>{{ task.id }}</span>
          <strong>{{ task.name }}</strong>
          <p>{{ task.target }} · {{ task.owner }} · {{ task.log }}</p>
        </div>
        <div class="task-progress">
          <ProgressBar :value="task.progress" />
          <small>{{ task.progress }}%</small>
        </div>
        <StatusBadge :value="task.status" />
        <button v-if="task.status === '等待中'" class="text-btn" type="button" @click="approveTask(task)">审批</button>
        <button v-else-if="task.status === '失败'" class="text-btn" type="button" @click="retryTask(task)">重试</button>
      </article>
    </div>
  </section>
</template>
