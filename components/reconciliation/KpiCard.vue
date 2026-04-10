<template>
  <div class="card p-5 flex flex-col gap-3 relative min-w-0">
    <!-- Menu icon -->
    <button class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors" aria-label="Card options">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="5" cy="12" r="2"/>
        <circle cx="12" cy="12" r="2"/>
        <circle cx="19" cy="12" r="2"/>
      </svg>
    </button>

    <!-- Label -->
    <p class="label-upper pr-6">{{ label }}</p>

    <!-- Value + skeleton -->
    <div v-if="loading" class="h-9 w-32 rounded bg-slate-100 animate-pulse" />
    <p
      v-else
      class="metric-number text-[2rem] leading-none"
      :class="valueClass"
    >
      {{ value }}
    </p>

    <!-- Subtitle -->
    <p v-if="subtitle" class="text-xs text-slate-400 mt-auto">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  label: string
  value: string
  loading?: boolean
  negative?: boolean
  subtitle?: string
}>()

const valueClass = computed(() => ({
  'text-danger': props.negative,
}))
</script>
