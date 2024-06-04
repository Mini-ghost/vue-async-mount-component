# Vue Async Mount Component

## Installation

```bash
npm install vue-async-mount-component
```

## Usage

```vue
<script setup lang="ts">
import { defineAsyncMountComponent } from 'vue-async-mount-component'

const LazyModal = defineAsyncMountComponent(() => import('./LazyModal.vue'))
</script>

<template>
  <LazyModal v-model="isActive" />
</template>
```
