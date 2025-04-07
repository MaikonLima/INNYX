<template>
    <div class="flex gap-2 flex-col">
        <label class="font-semibold" v-if="label" :for="id">{{ label }}</label>
        <Textarea class="bg-color-textarea" :value="modelValue" :name="name" :defaultValue="defaultValue"
            :autoResize="autoResize" :size="size" :invalid="invalid" :variant="variant" :fluid="fluid"
            :formControl="formControl" @input="onInput" :placeholder="placeholder" :disabled="disabled"
            :maxlength="maxlength" :minlength="minlength" />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Textarea from 'primevue/textarea';

export default defineComponent({
    name: 'TexteAreaDefault',
    components: { Textarea },
    props: {
        modelValue: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            default: 'textarea',
        },
        label: {
            type: String,
            default: null,
        },
        defaultValue: {
            type: String,
            default: '',
        },
        autoResize: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String as PropType<'small' | 'large' | null>,
            default: null,
            validator: (value: string) => ['small', 'large', null].includes(value),
        },
        invalid: {
            type: Boolean,
            default: false,
        },
        variant: {
            type: String as PropType<'outlined' | 'filled'>,
            default: 'outlined',
            validator: (value: string) => ['outlined', 'filled'].includes(value),
        },
        fluid: {
            type: Boolean,
            default: false,
        },
        formControl: {
            type: Object as PropType<Record<string, any>>,
            default: () => ({}),
        },
        placeholder: {
            type: String,
            default: 'Escreva seu texto aqui...',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        maxlength: {
            type: String,
        },
        minlength: {
            type: String,
        },
    },
    emits: ['update:modelValue'],
    methods: {
        onInput(event: Event) {
            const target = event.target as HTMLTextAreaElement;
            this.$emit('update:modelValue', target.value);
        },
    },
});
</script>

<style scoped>
.bg-color-textarea {
    background-color: #ffffff !important;
    border-radius: 12px;
}

.bg-color-textarea:focus {
    background-color: #ffffff !important;
}

.bg-color-textarea:disabled {
    background-color: #e2e8f0 !important;
}
</style>