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

const isActive = ref(false)
</script>

<template>
  <LazyModal v-model="isActive" />
</template>
```

## Use Cases

In most situations, the `<Modal>` component is not needed immediately when the page loads. Instead, it is usually required when a user clicks a button or triggers an event. Therefore, we want to avoid loading the component until it is actually opened for the first time. Additionally, once the component is loaded, we want to keep it in the mounted state even when it is closed, so it does not need to be mounted the next time it is opened.

Here is how we can achieve this:

```vue
<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'

const LazyModal = defineAsyncComponent(() => import('@/components/Modal.vue'));

const isActive = ref(false)
let isModalMounted = false
</script>

<template>
  <template v-if="isActive || isModalMounted">
    <LazyModal 
      v-model="isActive"
      @vnode-mounted="isModalMounted = true"
    />
  </template>
</template>
```

In this example, the `<Modal>` component loads only when it is opened for the first time and stays in the mounted state when closed.

However, if we have to do this every time, it can be cumbersome. We need an extra state to track whether the component has been loaded, and if we have many such components, the code can become messy. `defineAsyncMountComponent` allows us to achieve the same effect more easily.

The approach is almost the same as `defineAsyncComponent`.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { defineLazyShowComponent } from '@utils/defineLazyShowComponent'

const LazyModal = defineLazyShowComponent(() => import('@/components/Modal.vue'));

const isActive = ref(false)
</script>

<template>
  <LazyModal v-model="isActive"  />
</template>
```
