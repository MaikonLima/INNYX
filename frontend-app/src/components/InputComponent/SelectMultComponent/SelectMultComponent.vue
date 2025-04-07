<template>
    <div>
        <label class="font-semibold" v-if="label" :for="id">{{ label }}</label>
        <MultiSelect class="w-full mt-2 rounded-xl custom-select-border" v-model="selectedItems" :options="options"
            :optionLabel="optionLabel" :optionValue="optionValue" :optionDisabled="optionDisabled"
            :placeholder="placeholder" :showClear="showClear" :filter="filter" :filterPlaceholder="filterPlaceholder"
            :display="displayMode" :selectionLimit="selectionLimit" @update:modelValue="onValueChange" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from 'vue';
import MultiSelect from 'primevue/multiselect';

interface Option {
    id: string | number;
    description: string;
    [key: string]: any;
}

export default defineComponent({
    name: 'MultSelectComponent',
    components: { MultiSelect },
    props: {
        modelValue: {
            type: Array as PropType<Array<{ id: string | number; description: string }>>,
            default: () => [],
        },
        options: {
            type: Array as PropType<Option[]>,
            required: true,
        },
        optionLabel: {
            type: [String, Function] as PropType<string | ((option: Option) => string)>,
            default: 'description',
        },
        optionValue: {
            type: [String, Function] as PropType<string | ((option: Option) => string | number)>,
            default: 'id',
        },
        optionDisabled: {
            type: [String, Function] as PropType<string | ((option: Option) => boolean)>,
            default: () => false,
        },
        placeholder: {
            type: String,
            default: 'Selecione uma opção',
        },
        showClear: {
            type: Boolean,
            default: true,
        },
        filter: {
            type: Boolean,
            default: true,
        },
        filterPlaceholder: {
            type: String,
            default: 'Filtrar...',
        },
        displayMode: {
            type: String,
            default: 'chip',
        },
        selectionLimit: {
            type: Number as PropType<number | null>,
            default: null,
        },
        label: {
            type: String,
            default: '',
        },
        id: {
            type: String,
            default: () => `multiselect-${Math.random().toString(36).substr(2, 9)}`,
        },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const selectedItems = ref<(string | number)[]>([]);

        watch(
            () => props.modelValue,
            (newValue) => {
                if (Array.isArray(newValue)) {
                    selectedItems.value = newValue.map((item) => item.id);
                } else {
                    selectedItems.value = [];
                }
            },
            { immediate: true, deep: true },
        );

        const onValueChange = (selected: (string | number)[]) => {
            const mappedItems = selected
                .map((id) => {
                    const option = props.options.find((item) => item.id === id);
                    return option
                        ? { id: option.id, description: option.description }
                        : null;
                })
                .filter((item) => item !== null) as Array<{ id: string | number; description: string }>;

            emit('update:modelValue', mappedItems);
        };

        return {
            selectedItems,
            onValueChange,
        };
    },
});
</script>

<style scoped>
.custom-select-border {
    border-radius: 12px;
}
</style>