import { defineStore } from 'pinia'

export interface SummaryKpis {
  totalRecords: number
  exactMatches: number
  matchRatePct: number
  largeDifferences: number
  totalDifferenceEur: number
}

export interface ReserveByProduct {
  product: string
  ul3Reserve: number
  aiaReserve: number
}

export interface RecordByProduct {
  name: string
  value: number
}

export interface RecordByCoverageCode {
  code: string
  records: number
}

export interface MatchRateByProduct {
  product: string
  records: number
  nearMatch: number
  matchRatePct: number
  avgDiff: number
}

interface ReconciliationState {
  summary: SummaryKpis | null
  reservesByProduct: ReserveByProduct[]
  recordsByProduct: RecordByProduct[]
  recordsByCoverageCode: RecordByCoverageCode[]
  matchRateByProduct: MatchRateByProduct[]
  loading: {
    summary: boolean
    reservesByProduct: boolean
    recordsByProduct: boolean
    recordsByCoverageCode: boolean
    matchRateByProduct: boolean
  }
  error: string | null
}

const fmt = new Intl.NumberFormat('en-GB')
const fmtEur = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

function formatCompact(value: number): string {
  const abs = Math.abs(value)
  const sign = value < 0 ? '-' : ''
  if (abs >= 1_000_000) return `${sign}${(abs / 1_000_000).toFixed(1)}M`
  if (abs >= 1_000) return `${sign}${(abs / 1_000).toFixed(1)}k`
  return `${value}`
}

export const useReconciliationStore = defineStore('reconciliation', {
  state: (): ReconciliationState => ({
    summary: null,
    reservesByProduct: [],
    recordsByProduct: [],
    recordsByCoverageCode: [],
    matchRateByProduct: [],
    loading: {
      summary: false,
      reservesByProduct: false,
      recordsByProduct: false,
      recordsByCoverageCode: false,
      matchRateByProduct: false,
    },
    error: null,
  }),

  getters: {
    isLoading: (state): boolean =>
      Object.values(state.loading).some((v) => v),

    totalRecordsFormatted: (state): string =>
      state.summary ? formatCompact(state.summary.totalRecords) : '—',

    exactMatchesFormatted: (state): string =>
      state.summary ? fmt.format(state.summary.exactMatches) : '—',

    matchRatePctFormatted: (state): string =>
      state.summary ? `${state.summary.matchRatePct}%` : '—',

    largeDifferencesFormatted: (state): string =>
      state.summary ? fmt.format(state.summary.largeDifferences) : '—',

    totalDifferenceEurFormatted: (state): string =>
      state.summary ? formatCompact(state.summary.totalDifferenceEur) : '—',

    totalDifferenceIsNegative: (state): boolean =>
      state.summary ? state.summary.totalDifferenceEur < 0 : false,
  },

  actions: {
    async fetchAll() {
      this.error = null
      Object.keys(this.loading).forEach((k) => {
        this.loading[k as keyof typeof this.loading] = true
      })

      try {
        const [summary, reservesByProduct, recordsByProduct, recordsByCoverageCode, matchRateByProduct] =
          await Promise.all([
            $fetch<SummaryKpis>('/api/reconciliation/summary'),
            $fetch<ReserveByProduct[]>('/api/reconciliation/reserves-by-product'),
            $fetch<RecordByProduct[]>('/api/reconciliation/records-by-product'),
            $fetch<RecordByCoverageCode[]>('/api/reconciliation/records-by-coverage-code'),
            $fetch<MatchRateByProduct[]>('/api/reconciliation/match-rate-by-product'),
          ])

        this.summary = summary
        this.reservesByProduct = reservesByProduct
        this.recordsByProduct = recordsByProduct
        this.recordsByCoverageCode = recordsByCoverageCode
        this.matchRateByProduct = matchRateByProduct
      } catch (e) {
        this.error = e instanceof Error ? e.message : 'Failed to load data'
      } finally {
        Object.keys(this.loading).forEach((k) => {
          this.loading[k as keyof typeof this.loading] = false
        })
      }
    },
  },
})
