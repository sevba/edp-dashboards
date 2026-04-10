<template>
  <div />
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

// Redirect to reconciliation dashboard
await navigateTo('/reconciliation', { replace: true })
</script>
