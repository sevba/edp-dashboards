# DataWave – EDP Reconciliation Dashboard

A full-stack Nuxt 4 dashboard for the Ensur Data Platform, visualising reserves audit and reconciliation metrics for the migration pipeline.

## Stack

| Layer | Technology |
|---|---|
| Framework | Nuxt 3 (SSR, Nitro) |
| Language | TypeScript |
| Charts | vue-echarts + ECharts 5 |
| Styling | Tailwind CSS |
| State | Pinia |
| DB client | postgres.js (mocked) |

## Quick start

### Prerequisites

- Node.js ≥ 20
- npm ≥ 10

### Development

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start dev server (http://localhost:3000)
npm run dev
```

The dev server hot-reloads on file changes. Navigate to `http://localhost:3000` – you will be redirected to `/reconciliation` automatically.

### Production build

```bash
npm run build
node .output/server/index.mjs
```

## Docker

### Build & run with Docker Compose (recommended)

```bash
# Copy env template
cp .env .env.local   # edit values if needed

# Build image and start container
docker-compose up -d

# Follow logs
docker-compose logs -f dashboard

# Stop
docker-compose down
```

The app is available at `http://localhost:3000`.

### Build image manually

```bash
docker build -t edp-dashboards:latest .
docker run -p 3000:3000 --env-file .env edp-dashboards:latest
```

## Project structure

```
edp-dashboards/
├── assets/css/           # Global Tailwind CSS
├── components/
│   ├── charts/           # ECharts visualisations
│   │   ├── ReservesByProduct.vue
│   │   ├── RecordsByProduct.vue
│   │   └── RecordsByCoverageCode.vue
│   └── reconciliation/   # Dashboard-specific components
│       ├── KpiCard.vue
│       └── MatchRateTable.vue
├── layouts/
│   └── default.vue       # Sidebar + topbar shell
├── pages/
│   ├── index.vue         # Redirects → /reconciliation
│   ├── reconciliation.vue
│   ├── migration-progress.vue
│   ├── data-quality.vue
│   └── settings.vue
├── server/
│   ├── api/reconciliation/ # Mocked API routes (5 endpoints)
│   └── utils/mockData.ts   # Typed mock data
├── stores/
│   └── reconciliation.ts   # Pinia store with formatters
├── Dockerfile
├── docker-compose.yml
├── nuxt.config.ts
└── tailwind.config.ts
```

## API endpoints

All endpoints introduce a 200 ms artificial delay to simulate DB latency.

| Method | Path | Description |
|---|---|---|
| GET | `/api/reconciliation/summary` | KPI summary |
| GET | `/api/reconciliation/reserves-by-product` | Reserve amounts by product |
| GET | `/api/reconciliation/records-by-product` | Record counts by product |
| GET | `/api/reconciliation/records-by-coverage-code` | Record counts by coverage code |
| GET | `/api/reconciliation/match-rate-by-product` | Match rate statistics |
