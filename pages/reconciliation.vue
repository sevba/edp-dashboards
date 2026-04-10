<template>
  <div class="flex flex-col gap-6 min-w-[1280px]">
    <!-- Row 1: KPI Cards -->
    <section class="grid grid-cols-5 gap-4">
      <ReconciliationKpiCard
        label="Total Records"
        :value="store.totalRecordsFormatted"
        :loading="store.loading.summary"
        subtitle="All products"
      />
      <ReconciliationKpiCard
        label="Exact Matches"
        :value="store.exactMatchesFormatted"
        :loading="store.loading.summary"
        subtitle="Δ = 0"
      />
      <ReconciliationKpiCard
        label="Match Rate (%)"
        :value="store.matchRatePctFormatted"
        :loading="store.loading.summary"
        subtitle="Near-match threshold"
      />
      <ReconciliationKpiCard
        label="Large Differences (>€10k)"
        :value="store.largeDifferencesFormatted"
        :loading="store.loading.summary"
        subtitle="Require review"
      />
      <ReconciliationKpiCard
        label="Total Difference"
        :value="store.totalDifferenceEurFormatted"
        :loading="store.loading.summary"
        :negative="store.totalDifferenceIsNegative"
        subtitle="UL3 – AIA"
      />
    </section>

    <!-- Row 2: Reserves chart + Records donut -->
    <section class="grid gap-4" style="grid-template-columns: 60fr 40fr">
      <ChartsReservesByProduct
        :data="store.reservesByProduct"
        :loading="store.loading.reservesByProduct"
      />
      <ChartsRecordsByProduct
        :data="store.recordsByProduct"
        :loading="store.loading.recordsByProduct"
      />
    </section>

    <!-- Row 3: Coverage code bar + Match rate table -->
    <section class="grid grid-cols-2 gap-4">
      <ChartsRecordsByCoverageCode
        :data="store.recordsByCoverageCode"
        :loading="store.loading.recordsByCoverageCode"
      />
      <ReconciliationMatchRateTable
        :data="store.matchRateByProduct"
        :loading="store.loading.matchRateByProduct"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useReconciliationStore } from '~/stores/reconciliation'

definePageMeta({
  layout: 'default',
})

useHead({
  title: 'Reconciliation – Reserves Audit | DataWave',
})

const store = useReconciliationStore()

onMounted(() => {
  store.fetchAll()
})
</script>
