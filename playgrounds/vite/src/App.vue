<script setup lang="ts">
import { ref } from 'vue'
import { defineAsyncMountedComponent } from 'vue-async-mount-component'

const LazyModal = defineAsyncMountedComponent(() => import('./components/Modal.vue'))

const isActive = ref(false)
</script>

<template>
  <button type="button" @click="isActive = true">
    Open Modal
  </button>
  <hr>
  <LazyModal v-model="isActive" />
</template>
