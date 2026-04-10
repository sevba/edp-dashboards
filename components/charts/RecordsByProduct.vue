<template>
  <div class="card p-5 flex flex-col gap-4 min-w-0">
    <h2 class="text-sm font-semibold text-slate-700">Records by Product</h2>

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
import { PieChart } from 'echarts/charts'
import {
  TooltipComponent,
  LegendComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'
import type { EChartsOption } from 'echarts'

use([PieChart, TooltipComponent, LegendComponent, CanvasRenderer])

interface RecordByProduct {
  name: string
  value: number
}

const props = defineProps<{
  data: RecordByProduct[]
  loading?: boolean
}>()

const COLORS: Record<string, string> = {
  DB1RTL: '#0f172a',
  DB2H: '#0d9488',
  Other: '#94a3b8',
}

const fmt = new Intl.NumberFormat('en-GB')

const total = computed(() => props.data.reduce((acc, d) => acc + d.value, 0))

const option = computed<EChartsOption>(() => ({
  backgroundColor: 'transparent',
  textStyle: { fontFamily: 'DM Sans, system-ui, sans-serif' },
  tooltip: {
    trigger: 'item',
    backgroundColor: '#1e293b',
    borderColor: '#1e293b',
    textStyle: { color: '#ffffff', fontFamily: 'DM Sans' },
    borderRadius: 8,
    formatter: (params: unknown) => {
      const p = params as { name: string; value: number; percent: number; color: string }
      return `<div style="font-size:12px">
        <div style="display:flex;align-items:center;gap:6px;margin:2px 0">
          <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${p.color}"></span>
          <span>${p.name}</span>
        </div>
        <div style="margin-top:4px"><strong>${fmt.format(p.value)}</strong> <span style="color:#94a3b8">(${p.percent}%)</span></div>
      </div>`
    },
  },
  legend: {
    bottom: 0,
    left: 'center',
    itemWidth: 10,
    itemHeight: 10,
    textStyle: { color: '#475569', fontSize: 12 },
  },
  series: [
    {
      type: 'pie',
      radius: ['50%', '75%'],
      center: ['50%', '45%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: 'center',
        formatter: () => `{total|${fmt.format(total.value)}}\n{sub|Total}`,
        rich: {
          total: {
            fontSize: 22,
            fontWeight: 'bold',
            fontFamily: 'DM Mono, monospace',
            color: '#0f172a',
            lineHeight: 28,
          },
          sub: {
            fontSize: 11,
            color: '#94a3b8',
            fontFamily: 'DM Sans',
            lineHeight: 18,
          },
        },
      },
      emphasis: {
        label: { show: true },
        itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0,0,0,0.1)' },
      },
      data: props.data.map((d) => ({
        name: d.name,
        value: d.value,
        itemStyle: { color: COLORS[d.name] ?? '#cbd5e1' },
      })),
    },
  ],
}))
</script>
