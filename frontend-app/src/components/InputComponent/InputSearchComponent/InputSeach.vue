<template>
    <IconField class="card flex flex-wrap justify-center w-full gap-4">
        <InputIcon :class="iconClass" />
        <InputText v-model="inputValue" :placeholder="placeholder" class="pl-10 w-full" />
    </IconField>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
    name: "SearchField",
    props: {
        modelValue: {
            type: String,
            default: "",
        },
        placeholder: {
            type: String,
            default: "Pesquisar...",
        },
        iconClass: {
            type: String,
            default: "pi pi-search",
        },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const inputValue = computed({
            get: () => props.modelValue,
            set: (value: string) => {
                emit('update:modelValue', value);
            },
        });

        return {
            inputValue,
        };
    },
});
</script>