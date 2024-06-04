<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

const modelValueWriteable = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <div v-show="modelValueWriteable">
    <button type="button" @click="modelValueWriteable = false">
      Close
    </button>
    Modal Content
  </div>
</template>
