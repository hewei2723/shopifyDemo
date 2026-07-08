<script setup>
import { Sparkles } from 'lucide-vue-next'
import PageHeader from '../components/common/PageHeader.vue'
import { usePlatformDemo } from '../composables/usePlatformDemo'

const { aiInput, aiResult, runAi } = usePlatformDemo()
</script>

<template>
  <section class="page">
    <PageHeader eyebrow="Decision Assistant" title="AI 助手">
      <template #actions>
        <button class="btn primary" type="button" @click="runAi">
          <Sparkles :size="17" />
          生成建议
        </button>
      </template>
    </PageHeader>

    <div class="ai-layout">
      <section class="panel">
        <div class="panel-head">
          <h2>经营问题</h2>
          <span>模拟输入</span>
        </div>
        <textarea v-model="aiInput" rows="8"></textarea>
      </section>
      <section class="panel">
        <div class="panel-head">
          <h2>AI 输出</h2>
          <span>可生成任务</span>
        </div>
        <pre>{{ aiResult || '点击“生成建议”后，这里会根据当前模拟数据输出诊断。' }}</pre>
      </section>
    </div>
  </section>
</template>
