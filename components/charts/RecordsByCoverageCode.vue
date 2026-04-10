<template>
  <div class="card p-5 flex flex-col gap-4 min-w-0">
    <h2 class="text-sm font-semibold text-slate-700">Records by Coverage Code</h2>

    <div v-if="loading" class="flex-1 h-64 rounded bg-slate-100 animate-pulse" />

    <client-only v-else>
      <v-chart
        :option="option"
        autoresize
        class="h-64 w-full"
      />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'
import type { EChartsOption } from 'echarts'

use([BarChart, GridComponent, TooltipComponent, CanvasRenderer])

interface RecordByCoverageCode {
  code: string
  records: number
}

const props = defineProps<{
  data: RecordByCoverageCode[]
  loading?: boolean
}>()

function formatK(val: number): string {
  if (val >= 1_000) return `${(val / 1_000).toFixed(0)}k`
  return `${val}`
}

const option = computed<EChartsOption>(() => ({
  backgroundColor: 'transparent',
  textStyle: { fontFamily: 'DM Sans, system-ui, sans-serif' },
  tooltip: {
    trigger: 'axis',
    backgroundColor: '#1e293b',
    borderColor: '#1e293b',
    textStyle: { color: '#ffffff', fontFamily: 'DM Sans' },
    borderRadius: 8,
    formatter: (params: unknown) => {
      const p = params as Array<{ name: string; value: number; color: string }>
      const item = p[0]
      if (!item) return ''
      return `<div style="font-size:12px">
        <div style="font-weight:600;margin-bottom:4px">${item.name}</div>
        <div style="display:flex;align-items:center;gap:6px">
          <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${item.color}"></span>
          <span>Records: <strong>${new Intl.NumberFormat('en-GB').format(item.value)}</strong></span>
        </div>
      </div>`
    },
  },
  grid: { left: 50, right: 16, top: 12, bottom: 56, containLabel: false },
  xAxis: {
    type: 'category',
    data: props.data.map((d) => d.code),
    axisLine: { lineStyle: { color: '#e2e8f0' } },
    axisTick: { show: false },
    axisLabel: {
      color: '#64748b',
      fontSize: 11,
      fontFamily: 'DM Mono, monospace',
      rotate: 45,
      interval: 0,
    },
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      color: '#64748b',
      fontSize: 11,
      fontFamily: 'DM Mono, monospace',
      formatter: formatK,
    },
    splitLine: { lineStyle: { color: '#f1f5f9' } },
    axisLine: { show: false },
    axisTick: { show: false },
  },
  series: [
    {
      type: 'bar',
      data: props.data.map((d) => d.records),
      itemStyle: { color: '#0d9488', borderRadius: [4, 4, 0, 0] },
      barMaxWidth: 28,
    },
  ],
}))
</script>
