<template>
  <div class="card flex flex-col min-w-0">
    <!-- Header -->
    <div class="px-5 py-4 border-b border-slate-100">
      <h2 class="text-sm font-semibold text-slate-700">Match Rate by Product</h2>
    </div>

    <!-- Skeleton -->
    <div v-if="loading" class="p-5 flex flex-col gap-3">
      <div v-for="i in 4" :key="i" class="h-9 rounded bg-slate-100 animate-pulse" />
    </div>

    <!-- Table -->
    <div v-else class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-slate-100">
            <th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-teal-700">
              Product
            </th>
            <th class="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-teal-700">
              Records
            </th>
            <th class="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-teal-700">
              Near Match
            </th>
            <th class="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-teal-700">
              Match Rate %
            </th>
            <th class="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-teal-700">
              Avg |Diff|
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, i) in data"
            :key="row.product"
            class="border-b border-slate-50 transition-colors hover:bg-teal-50"
            :class="i % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'"
          >
            <td class="px-5 py-3 font-medium text-slate-800 font-mono text-xs">
              {{ row.product }}
            </td>
            <td class="px-5 py-3 text-right font-mono text-xs text-slate-600">
              {{ fmt.format(row.records) }}
            </td>
            <td class="px-5 py-3 text-right font-mono text-xs text-slate-600">
              {{ fmt.format(row.nearMatch) }}
            </td>
            <td class="px-5 py-3 text-right">
              <span
                class="inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-semibold font-mono"
                :class="matchRateBadgeClass(row.matchRatePct)"
              >
                {{ row.matchRatePct }}%
              </span>
            </td>
            <td class="px-5 py-3 text-right font-mono text-xs text-slate-600">
              €{{ fmtDec.format(row.avgDiff) }}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="border-t border-slate-200 bg-slate-50">
            <td colspan="5" class="px-5 py-3 text-xs text-slate-400 font-medium">
              {{ data.length }} rows
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
interface MatchRateByProduct {
  product: string
  records: number
  nearMatch: number
  matchRatePct: number
  avgDiff: number
}

defineProps<{
  data: MatchRateByProduct[]
  loading?: boolean
}>()

const fmt = new Intl.NumberFormat('en-GB')
const fmtDec = new Intl.NumberFormat('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

function matchRateBadgeClass(pct: number): string {
  if (pct >= 20) return 'bg-teal-100 text-teal-800'
  if (pct >= 5) return 'bg-blue-100 text-blue-800'
  return 'bg-red-100 text-red-700'
}
</script>
