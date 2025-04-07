<template>
    <div class="flex flex-col gap-2 w-full" :class="{ 'w-full': fluid }">
        <label class="font-semibold" v-if="label" :for="id">{{ label }}</label>

        <InputText class="font-light" :id="id" :disabled="disabled" :placeholder="placeholder" :value="modelValue"
            :type="type" :class="[
                'input-text',
                sizeClass,
                variantClass,
                { 'is-invalid': invalid },
            ]" @input="onInput" v-bind="pt" aria-describedby="help-text" />

        <small v-if="helpText" :id="id + '-help'">{{ helpText }}</small>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
    name: "InputTextField",
    props: {
        modelValue: {
            type: String,
            default: null,
        },
        label: {
            type: String,
            default: null,
        },
        id: {
            type: String,
            required: true,
        },
        helpText: {
            type: String,
            default: null,
        },
        size: {
            type: String as () => 'large' | 'small' | null,
            default: null,
            validator: (value: string) => ["large", "small", null].includes(value),
        },
        invalid: {
            type: Boolean,
            default: false,
        },
        variant: {
            type: String as () => 'outlined' | 'filled',
            default: "outlined",
            validator: (value: string) => ["outlined", "filled"].includes(value),
        },
        fluid: {
            type: Boolean,
            default: false,
        },
        pt: {
            type: Object,
            default: () => ({}),
        },
        placeholder: {
            type: String,
            default: "",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: "text",
        },
    },
    emits: ["update:modelValue"],
    setup(props, { emit }) {
        const sizeClass = computed(() => {
            return props.size ? `input-text--${props.size}` : "";
        });

        const variantClass = computed(() => {
            return `input-text--${props.variant}`;
        });

        const onInput = (event: Event) => {
            const target = event.target as HTMLInputElement;
            emit("update:modelValue", target.value);
        };

        return {
            sizeClass,
            variantClass,
            onInput,
        };
    },
});
</script>

<style scoped>
.input-text {
    padding: 0.5rem;
    border-radius: 12px;
    width: 100%;
}

.input-text--large {
    padding: 1rem;
}

.input-text--small {
    padding: 0.25rem;
}

.input-text--outlined {
    background-color: white;
}

.input-text--filled {
    background-color: #f0f0f0;
}

.is-invalid {
    border-color: red;
}
</style>