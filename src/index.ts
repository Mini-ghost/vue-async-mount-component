import {
  defineAsyncComponent,
  defineComponent,
  h,
} from 'vue'

import type {
  AsyncComponentLoader,
  AsyncComponentOptions,
  Component,
  ComponentPublicInstance,
} from 'vue'

export function defineAsyncMountedComponent<
T extends Component = { new (): ComponentPublicInstance },
>(
  source: AsyncComponentLoader<T> | (AsyncComponentOptions<T> & { modelProp: string }),
): T {
  const modelProp = (typeof source !== 'function' ? source.modelProp : null) || 'modelValue'

  const component = defineAsyncComponent(source)
  return defineComponent({
    name: 'AsyncMountedComponent',

    setup(_, { attrs, slots }) {
      let mounted = false
      return () => {
        if (attrs[modelProp] || mounted) {
          return [
            h(component, {
              ...attrs,
              onVnodeMounted: () => {
                (attrs.onVnodeMounted as undefined | (() => void))?.()
                mounted = true
              },
            }, slots),
          ]
        }
      }
    },
  }) as T
}
