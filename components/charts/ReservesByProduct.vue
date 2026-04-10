<template>
  <div class="card p-5 flex flex-col gap-4 min-w-0">
    <h2 class="text-sm font-semibold text-slate-700">Reserves by Product – UL3 vs AIA</h2>

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
  LegendComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'
import type { EChartsOption } from 'echarts'

use([BarChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer])

interface ReserveByProduct {
  product: string
  ul3Reserve: number
  aiaReserve: number
}

const props = defineProps<{
  data: ReserveByProduct[]
  loading?: boolean
}>()

function formatEurM(val: number): string {
  return `€${(val / 1_000_000).toFixed(1)}M`
}

const option = computed<EChartsOption>(() => ({
  backgroundColor: 'transparent',
  textStyle: { fontFamily: 'DM Sans, system-ui, sans-serif' },
  legend: {
    top: 0,
    right: 0,
    itemWidth: 12,
    itemHeight: 12,
    textStyle: { color: '#475569', fontSize: 12 },
    data: ['UL3 Reserve', 'AIA Reserve'],
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: '#1e293b',
    borderColor: '#1e293b',
    textStyle: { color: '#ffffff', fontFamily: 'DM Sans' },
    borderRadius: 8,
    formatter: (params: unknown) => {
      const p = params as Array<{ name: string; seriesName: string; value: number; color: string }>
      const product = p[0]?.name ?? ''
      const rows = p
        .map(
          (item) =>
            `<div style="display:flex;align-items:center;gap:6px;margin:3px 0">
              <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${item.color}"></span>
              <span style="flex:1">${item.seriesName}</span>
              <strong style="margin-left:12px">${new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(item.value)}</strong>
            </div>`,
        )
        .join('')
      return `<div style="font-size:12px"><div style="font-weight:600;margin-bottom:6px">${product}</div>${rows}</div>`
    },
  },
  grid: { left: 60, right: 20, top: 36, bottom: 20, containLabel: false },
  xAxis: {
    type: 'category',
    data: props.data.map((d) => d.product),
    axisLine: { lineStyle: { color: '#e2e8f0' } },
    axisTick: { show: false },
    axisLabel: { color: '#64748b', fontSize: 12, fontFamily: 'DM Sans' },
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      color: '#64748b',
      fontSize: 11,
      fontFamily: 'DM Mono, monospace',
      formatter: formatEurM,
    },
    splitLine: { lineStyle: { color: '#f1f5f9' } },
    axisLine: { show: false },
    axisTick: { show: false },
  },
  series: [
    {
      name: 'UL3 Reserve',
      type: 'bar',
      data: props.data.map((d) => d.ul3Reserve),
      itemStyle: { color: '#94a3b8', borderRadius: [4, 4, 0, 0] },
      barMaxWidth: 32,
    },
    {
      name: 'AIA Reserve',
      type: 'bar',
      data: props.data.map((d) => d.aiaReserve),
      itemStyle: { color: '#0d9488', borderRadius: [4, 4, 0, 0] },
      barMaxWidth: 32,
    },
  ],
}))
</script>
