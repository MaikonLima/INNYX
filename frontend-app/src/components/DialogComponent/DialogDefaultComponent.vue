<template>
  <Dialog :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" :header="header" :footer="footer" :visible="visible"
    :modal="modal" :contentStyle="contentStyle" :contentClass="contentClass" :contentProps="contentProps"
    :closable="closable" :dismissableMask="dismissableMask" :closeOnEscape="closeOnEscape" :showHeader="showHeader"
    :blockScroll="blockScroll" :baseZIndex="baseZIndex" :autoZIndex="autoZIndex" :position="position"
    :maximizable="maximizable" :draggable="draggable" :keepInViewPort="keepInViewPort" :minX="minX" :minY="minY"
    :appendTo="appendTo" :style="dialogStyle" :closeIcon="closeIcon" :maximizeIcon="maximizeIcon"
    :minimizeIcon="minimizeIcon" :maximizeButtonProps="maximizeButtonProps" :dt="dt" :pt="pt" :ptOptions="ptOptions"
    :unstyled="unstyled" @update:visible="$emit('update:visible', $event)" @hide="$emit('hide')"
    @after-hide="$emit('after-hide')" @show="$emit('show')" @maximize="$emit('maximize', $event)"
    @unmaximize="$emit('unmaximize', $event)" @dragstart="$emit('dragstart', $event)"
    @dragend="$emit('dragend', $event)">
    <template v-slot:header>
      <slot class="text-xl" name="header"></slot>
    </template>

    <template v-slot:footer>
      <slot name="footer"></slot>
    </template>

    <template v-slot:closeicon="{ class: closeIconClass }">
      <slot name="closeicon" :class="closeIconClass"></slot>
    </template>

    <template v-slot:maximizeicon="{ maximized, class: maximizeIconClass }">
      <slot name="maximizeicon" :maximized="maximized" :class="maximizeIconClass"></slot>
    </template>

    <slot></slot>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'DialogComponent',
  props: {
    header: { type: String, default: null },
    footer: { type: String, default: null },
    visible: { type: Boolean, default: false },
    modal: { type: Boolean, default: false },
    contentStyle: { type: [String, Object] as () => string | Record<string, any> | null, default: null },
    contentClass: { type: [String, Object] as () => string | Record<string, any> | null, default: null },
    contentProps: { type: Object as () => Record<string, any> | null, default: null },
    closable: { type: Boolean, default: true },
    dismissableMask: { type: Boolean, default: false },
    closeOnEscape: { type: Boolean, default: true },
    showHeader: { type: Boolean, default: true },
    blockScroll: { type: Boolean, default: false },
    baseZIndex: { type: Number, default: 0 },
    autoZIndex: { type: Boolean, default: true },
    position: {
      type: String as () => 'left' | 'right' | 'top' | 'bottom' | 'center' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright',
      default: 'center',
      validator: (value: string) =>
        ['left', 'right', 'top', 'bottom', 'center', 'topleft', 'topright', 'bottomleft', 'bottomright'].includes(value),
    },
    maximizable: { type: Boolean, default: false },
    breakpoints: { type: Object as () => Record<string, string> | null, default: null },
    draggable: { type: Boolean, default: false },
    keepInViewPort: { type: Boolean, default: true },
    minX: { type: Number, default: 0 },
    minY: { type: Number, default: 0 },
    appendTo: { type: [String, Object] as () => string | Record<string, any>, default: 'body' },
    style: { type: [String, Object] as () => string | Record<string, any> | null, default: null },
    closeIcon: { type: String, default: null },
    maximizeIcon: { type: String, default: null },
    minimizeIcon: { type: String, default: null },
    maximizeButtonProps: { type: Object as () => Record<string, any> | null, default: null },
    dt: { type: Object as () => Record<string, any> | null, default: null },
    pt: { type: Object as () => Record<string, any> | null, default: null },
    ptOptions: { type: Object as () => Record<string, any> | null, default: null },
    unstyled: { type: Boolean, default: false },
    width: { type: String, default: '100%' },
    height: { type: String, default: 'auto' },
  },
  emits: [
    'update:visible',
    'hide',
    'after-hide',
    'show',
    'maximize',
    'unmaximize',
    'dragstart',
    'dragend',
  ],
  setup(props) {
    const dialogStyle = computed(() => ({
      ...props.style,
      width: props.width,
      height: props.height,
    }));

    return {
      dialogStyle,
    };
  },
});
</script>