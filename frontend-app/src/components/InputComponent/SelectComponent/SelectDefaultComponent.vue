<template>
    <div class="custom-select">
        <label class="font-semibold mb-1" :for="inputId">{{ label }}</label>
        <Select class="mt-1 custom-select-border" :modelValue="modelValue" :options="options"
            :optionLabel="resolveOptionLabel" :optionValue="resolveOptionValue" :name="name" :placeholder="placeholder"
            :scrollHeight="scrollHeight" :filter="filter" :filterPlaceholder="filterPlaceholder" :disabled="disabled"
            :size="size" :variant="variant" :fluid="fluid" :showClear="showClear" :loading="loading"
            :dropdownIcon="dropdownIcon" :clearIcon="clearIcon" :loadingIcon="loadingIcon"
            :resetFilterOnClear="resetFilterOnClear" :inputId="inputId" @update:modelValue="updateValue"
            @change="emitChange" @focus="handleFocus" @blur="handleBlur" @filter="handleFilter" :editable="editable">
            <template #option="slotProps">
                <span :class="{ selected: slotProps.selected }">
                    {{ resolveOptionLabel(slotProps.option) }}
                </span>
            </template>
        </Select>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Select from 'primevue/select';

interface Option {
    [key: string]: any;
}

export default defineComponent({
    name: 'SelectDefaultComponent',
    components: { Select },
    props: {
        modelValue: {
            type: [String, Number, Object] as PropType<string | number | object | null>,
            default: null,
        },
        options: {
            type: Array as PropType<Option[]>,
            required: true,
        },
        label: {
            type: String,
            default: 'Selecione a opção',
        },
        name: {
            type: String,
            default: null,
        },
        placeholder: {
            type: String,
            default: 'Selecione uma opção...',
        },
        optionId: {
            type: [String, Function] as PropType<string | ((option: Option) => string)>,
            default: 'value',
        },
        optionLabel: {
            type: [String, Function] as PropType<string | ((option: Option) => string)>,
            default: 'label',
        },
        optionValue: {
            type: [String, Function] as PropType<string | ((option: Option) => string)>,
            default: 'value',
        },
        optionDisabled: {
            type: [String, Function] as PropType<string | ((option: Option) => boolean)>,
            default: null,
        },
        scrollHeight: {
            type: String,
            default: '14rem',
        },
        filter: {
            type: Boolean,
            default: false,
        },
        filterPlaceholder: {
            type: String,
            default: 'Buscar...',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: 'large',
        },
        variant: {
            type: String,
            default: 'outlined',
        },
        fluid: {
            type: Boolean,
            default: true,
        },
        showClear: {
            type: Boolean,
            default: false,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        dropdownIcon: {
            type: String,
            default: 'pi pi-chevron-down',
        },
        clearIcon: {
            type: String,
            default: 'pi pi-times',
        },
        loadingIcon: {
            type: String,
            default: 'pi pi-spin pi-spinner',
        },
        resetFilterOnClear: {
            type: Boolean,
            default: true,
        },
        inputId: {
            type: String,
            default: null,
        },
        editable: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['update:modelValue', 'change', 'focus', 'blur', 'filter'],
    methods: {
        updateValue(value: string | number | object | null) {
            this.$emit('update:modelValue', value);
        },
        emitChange(event: Event) {
            this.$emit('change', event);
        },
        handleFocus(event: Event) {
            this.$emit('focus', event);
        },
        handleBlur(event: Event) {
            this.$emit('blur', event);
        },
        handleFilter(event: Event) {
            this.$emit('filter', event);
        },
        resolveOptionLabel(option: Option): string {
            return typeof this.optionLabel === 'function'
                ? this.optionLabel(option)
                : option[this.optionLabel] || option.description;
        },
        resolveOptionId(option: Option): string {
            return typeof this.optionId === 'function'
                ? this.optionId(option)
                : option[this.optionId] || option.id;
        },
        resolveOptionValue(option: Option): string | number | null {
            if (!option) return null;
            return this.optionId === 'id'
                ? option[this.optionId] || option.id
                : option[this.optionLabel] || option.description;
        },
    },
});
</script>

<style scoped>
.custom-select {
    display: flex;
    flex-direction: column;
}

.custom-select .selected {
    font-weight: bold;
}

.custom-select-border {
    border-radius: 12px;
}
</style>