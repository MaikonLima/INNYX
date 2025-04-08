<template>
    <Button class="custom-roudend-button" :is="as" :class="buttonClasses" :style="style" @click="$emit('click')">
        <template v-if="loading && loadingIcon">
            <span :class="['p-button-loading-icon', loadingIcon]"></span>
        </template>

        <template v-if="icon && !loading">
            <span :class="['p-button-icon', iconClass, `p-button-icon-${iconPos}`, icon]"></span>
        </template>

        <template v-if="label && !loading">
            <span class="p-button-label">{{ label }}</span>
        </template>

        <template v-if="badge">
            <span :class="['p-badge', badgeClass, badgeSeverityClass]">{{
                badge
            }}</span>
        </template>

        <slot></slot>
    </Button>
</template>

<script lang="ts">
import { defineComponent, computed, type PropType } from 'vue';

export default defineComponent({
    name: 'ButtonComponent',
    props: {
        style: { type: Object as () => Record<string, any> | null, default: null },
        class: [String, Array, Object] as unknown as PropType<string | Array<any> | Record<string, any>>,
        label: { type: String, default: null },
        icon: { type: String, default: null },
        iconPos: { type: String as () => 'left' | 'right', default: 'left' },
        iconClass: [String, Array, Object] as unknown as PropType<string | Array<any> | Record<string, any>>,
        badge: { type: String, default: null },
        badgeClass: [String, Array, Object] as unknown as PropType<string | Array<any> | Record<string, any>>,
        badgeSeverity: { type: String, default: null },
        loading: { type: Boolean, default: false },
        loadingIcon: { type: String, default: null },
        as: { type: String, default: 'button' },
        link: { type: Boolean, default: false },
        severity: { type: String, default: null },
        raised: { type: Boolean, default: false },
        rounded: { type: Boolean, default: false },
        text: { type: Boolean, default: false },
        outlined: { type: Boolean, default: false },
        size: { type: String, default: null },
        plain: { type: Boolean, default: false },
        fluid: { type: Boolean, default: false },
    },
    emits: ['click'],
    setup(props) {
        const buttonClasses = computed(() => [
            'p-button',
            props.severity ? `p-button-${props.severity}` : '',
            {
                'p-button-icon-only': !props.label && props.icon,
                'p-button-rounded': props.rounded,
                'p-button-raised': props.raised,
                'p-button-text': props.text,
                'p-button-outlined': props.outlined,
                'p-button-plain': props.plain,
                'p-button-link': props.link,
                'p-button-fluid': props.fluid,
                'p-disabled': props.loading,
                'p-button-loading': props.loading,
            },
        ]);

        const badgeSeverityClass = computed(() =>
            props.badgeSeverity ? `p-badge-${props.badgeSeverity}` : ''
        );

        return {
            buttonClasses,
            badgeSeverityClass,
        };
    },
});
</script>

<style lang="css">
.custom-roudend-button {
    border-radius: 6px;
}
</style>