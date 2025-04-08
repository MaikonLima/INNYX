<template>
    <div>
        <label class="font-semibold" :for="inputId">{{ label }}</label>
        <DatePicker class="w-full mt-2" v-model="selectedDate" :name="name" :selectionMode="selectionMode"
            :dateFormat="dateFormat" :inline="inline" :showIcon="showIcon" :icon="icon" :prevIcon="prevIcon"
            :nextIcon="nextIcon" :numberOfMonths="numberOfMonths" :minDate="minDate" :maxDate="maxDate"
            :disabledDates="disabledDates" :disabledDays="disabledDays" :showButtonBar="showButtonBar"
            :placeholder="placeholder" :disabled="disabled" :readonly="readonly" :showTime="showTime"
            @update:modelValue="onDateChange" @date-select="onDateSelect" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, type PropType } from 'vue';
import DatePicker from 'primevue/datepicker';

type DateSelectionMode = 'single' | 'multiple' | 'range';

export default defineComponent({
    name: 'DatePickerDefault',
    components: {
        DatePicker,
    },
    props: {
        modelValue: {
            type: [Date, Array, null] as PropType<Date | Date[] | null>,
            default: null,
        },
        label: {
            type: String,
            default: 'Select date',
        },
        name: {
            type: String,
            default: null,
        },
        selectionMode: {
            type: String as PropType<DateSelectionMode>,
            default: 'single',
        },
        dateFormat: {
            type: String,
            default: 'dd/mm/yy',
        },
        inline: {
            type: Boolean,
            default: false,
        },
        showIcon: {
            type: Boolean,
            default: false,
        },
        icon: {
            type: String,
            default: null,
        },
        prevIcon: {
            type: String,
            default: null,
        },
        nextIcon: {
            type: String,
            default: null,
        },
        numberOfMonths: {
            type: Number,
            default: 1,
        },
        minDate: {
            type: Date,
            default: null,
        },
        maxDate: {
            type: Date,
            default: null,
        },
        disabledDates: {
            type: Array as PropType<Date[]>,
            default: () => [],
        },
        disabledDays: {
            type: Array as PropType<number[]>,
            default: () => [],
        },
        showButtonBar: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            default: null,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        showTime: {
            type: Boolean,
            default: false,
        },
        inputId: {
            type: String,
            default: null,
        },
    },
    emits: ['update:modelValue', 'date-select'],
    setup(props, { emit }) {
        const selectedDate = ref<Date | Date[] | null>(props.modelValue);

        watch(
            () => props.modelValue,
            (newValue) => {
                selectedDate.value = newValue;
            }
        );
        
        // @ts-ignore
        const onDateChange = (value: Date | Date[] | null) => {
            emit('update:modelValue', value);
        };
        const onDateSelect = (value: Date | Date[] | null) => {
            emit('date-select', value);
        };

        return {
            selectedDate,
            onDateChange,
            onDateSelect,
        };
    },
});
</script>