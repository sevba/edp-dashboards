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

export const summaryKpis: SummaryKpis = {
  totalRecords: 194836,
  exactMatches: 75,
  matchRatePct: 5.1,
  largeDifferences: 46706,
  totalDifferenceEur: -7600000,
}

export const reservesByProduct: ReserveByProduct[] = [
  { product: 'DB1RTL', ul3Reserve: 69715391, aiaReserve: 64612504 },
  { product: 'DB2H', ul3Reserve: 4200000, aiaReserve: 3900000 },
  { product: 'TDI', ul3Reserve: 950000, aiaReserve: 870000 },
  { product: 'DB1PRF', ul3Reserve: 220000, aiaReserve: 195000 },
]

export const recordsByProduct: RecordByProduct[] = [
  { name: 'DB1RTL', value: 147869 },
  { name: 'DB2H', value: 45386 },
  { name: 'Other', value: 1581 },
]

export const recordsByCoverageCode: RecordByCoverageCode[] = [
  { code: 'DB1_02', records: 125000 },
  { code: 'DB2_02', records: 38000 },
  { code: 'DB1_01', records: 32000 },
  { code: 'DB2_01', records: 12000 },
  { code: 'DB1_03', records: 3500 },
  { code: 'TDI_02', records: 900 },
  { code: 'DB2_03', records: 600 },
  { code: 'TDI_01', records: 400 },
  { code: 'TDI_03', records: 200 },
]

export const matchRateByProduct: MatchRateByProduct[] = [
  { product: 'TDI', records: 1558, nearMatch: 436, matchRatePct: 28, avgDiff: 23.63 },
  { product: 'DB1RTL', records: 147869, nearMatch: 8295, matchRatePct: 5.6, avgDiff: 64.12 },
  { product: 'DB2H', records: 45386, nearMatch: 1240, matchRatePct: 2.7, avgDiff: 100.51 },
  { product: 'DB1PRF', records: 23, nearMatch: 0, matchRatePct: 0, avgDiff: 128.72 },
]
