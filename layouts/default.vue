<template>
  <div class="flex h-screen overflow-hidden bg-slate-50">
    <!-- Mobile backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 z-30 bg-black/50 md:hidden"
        @click="sidebarOpen = false"
      />
    </Transition>

    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-40 flex flex-col w-60 shrink-0 bg-sidebar overflow-y-auto
             transition-transform duration-300 ease-in-out
             md:relative md:inset-auto md:z-auto md:translate-x-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Logo -->
      <div class="flex items-center gap-2.5 px-5 py-5 border-b border-slate-800">
        <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600 shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" class="text-white">
            <path d="M2 12C2 12 5 6 12 6C19 6 22 12 22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M2 16C2 16 5 10 12 10C19 10 22 16 22 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
            <path d="M2 8C2 8 5 4 12 4C19 4 22 8 22 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.3"/>
          </svg>
        </div>
        <span class="text-white font-bold text-lg tracking-tight">DataWave</span>
        <!-- Close button (mobile only) -->
        <button
          class="ml-auto md:hidden text-slate-400 hover:text-white transition-colors"
          aria-label="Close menu"
          @click="sidebarOpen = false"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Nav -->
      <nav class="flex flex-col gap-1 px-3 py-4 flex-1">
        <p class="px-2 mb-2 text-slate-600 text-xs font-semibold uppercase tracking-widest">Main</p>

        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-item"
          :class="{ active: route.path === item.to || (item.to !== '/' && route.path.startsWith(item.to)) }"
        >
          <component :is="item.icon" class="w-4 h-4 shrink-0" />
          <span>{{ item.label }}</span>
        </NuxtLink>

        <!-- Bottom section -->
        <div class="mt-auto pt-4 border-t border-slate-800">
          <NuxtLink to="/settings" class="nav-item">
            <SettingsIcon class="w-4 h-4 shrink-0" />
            <span>Settings</span>
          </NuxtLink>
        </div>
      </nav>
    </aside>

    <!-- Main area -->
    <div class="flex flex-col flex-1 min-w-0 overflow-hidden">
      <!-- Top bar -->
      <header class="flex items-center gap-3 px-4 md:px-6 py-4 bg-white border-b border-slate-200 shrink-0">
        <!-- Hamburger button (mobile only) -->
        <button
          class="md:hidden flex items-center justify-center w-8 h-8 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors shrink-0"
          aria-label="Open menu"
          @click="sidebarOpen = true"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M3 12h18M3 6h18M3 18h18"/>
          </svg>
        </button>

        <div class="flex flex-col flex-1 min-w-0">
          <h1 class="text-base font-semibold text-slate-900 truncate">{{ pageTitle }}</h1>
          <nav aria-label="breadcrumb" class="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
            <span>DataWave</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            <span class="text-slate-700 font-medium truncate">{{ pageTitle }}</span>
          </nav>
        </div>

        <!-- User avatar -->
        <div class="flex items-center gap-3 shrink-0">
          <div class="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-semibold select-none">
            U
          </div>
        </div>
      </header>

      <!-- Scrollable content -->
      <main class="flex-1 overflow-y-auto p-4 md:p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineComponent, h } from 'vue'

const route = useRoute()
const sidebarOpen = ref(false)

// Close sidebar on navigation (mobile)
watch(() => route.path, () => {
  sidebarOpen.value = false
})

const pageTitle = computed(() => {
  const map: Record<string, string> = {
    '/': 'Dashboard',
    '/reconciliation': 'Reconciliation – Reserves Audit',
    '/migration-progress': 'Migration Progress',
    '/data-quality': 'Data Quality',
    '/settings': 'Settings',
  }
  return map[route.path] ?? 'DataWave'
})

// Inline SVG icon components
const DashboardIcon = defineComponent({
  render: () =>
    h('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round' }, [
      h('rect', { x: 3, y: 3, width: 7, height: 7, rx: 1 }),
      h('rect', { x: 14, y: 3, width: 7, height: 7, rx: 1 }),
      h('rect', { x: 3, y: 14, width: 7, height: 7, rx: 1 }),
      h('rect', { x: 14, y: 14, width: 7, height: 7, rx: 1 }),
    ]),
})

const ReconcileIcon = defineComponent({
  render: () =>
    h('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round' }, [
      h('path', { d: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18' }),
    ]),
})

const MigrationIcon = defineComponent({
  render: () =>
    h('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round' }, [
      h('path', { d: 'M5 12h14M12 5l7 7-7 7' }),
    ]),
})

const DataQualityIcon = defineComponent({
  render: () =>
    h('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round' }, [
      h('path', { d: 'M22 11.08V12a10 10 0 11-5.93-9.14' }),
      h('path', { d: 'M22 4L12 14.01l-3-3' }),
    ]),
})

const SettingsIcon = defineComponent({
  render: () =>
    h('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round' }, [
      h('circle', { cx: 12, cy: 12, r: 3 }),
      h('path', { d: 'M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z' }),
    ]),
})

const navItems = [
  { to: '/', label: 'Dashboard', icon: DashboardIcon },
  { to: '/reconciliation', label: 'Reconciliation', icon: ReconcileIcon },
  { to: '/migration-progress', label: 'Migration Progress', icon: MigrationIcon },
  { to: '/data-quality', label: 'Data Quality', icon: DataQualityIcon },
]
</script>
