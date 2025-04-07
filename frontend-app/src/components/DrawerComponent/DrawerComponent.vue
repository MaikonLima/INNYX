<template>
    <Drawer :visible="isVisible" :position="position" :header="header" :baseZIndex="baseZIndex" :autoZIndex="autoZIndex"
        :dismissable="dismissable" :showCloseIcon="showCloseIcon" :modal="modal" :blockScroll="blockScroll"
        @update:visible="isVisible = $event" :height="height">
        <slot></slot>
    </Drawer>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
    name: "DrawerComponent",
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
        position: {
            type: String,
            default: 'right',
        },
        header: {
            type: String,
            default: '',
        },
        baseZIndex: {
            type: Number,
            default: 0,
        },
        autoZIndex: {
            type: Boolean,
            default: true,
        },
        dismissable: {
            type: Boolean,
            default: true,
        },
        showCloseIcon: {
            type: Boolean,
            default: true,
        },
        closeButtonProps: {
            type: Object,
            default: () => ({}),
        },
        closeIcon: {
            type: String,
            default: 'pi pi-times',
        },
        modal: {
            type: Boolean,
            default: true,
        },
        blockScroll: {
            type: Boolean,
            default: true,
        },
        height: {
            type: String,
            default: 'auto',
        },
    },
    setup(props, { emit }) {
        const isVisible = ref(props.visible);

        watch(
            () => props.visible,
            (newValue) => {
                isVisible.value = newValue;
            }
        );

        watch(isVisible, (newValue) => {
            emit('update:visible', newValue);
        });

        return {
            isVisible,
        };
    },
});
</script>