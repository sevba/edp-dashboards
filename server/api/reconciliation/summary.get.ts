import { summaryKpis } from '~/server/utils/mockData'

export default defineEventHandler(async () => {
  await new Promise<void>((r) => setTimeout(r, 200))
  return summaryKpis
})
