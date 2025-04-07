<template>
    <div class="flex flex-row gap-6 w-full">
        <button v-tooltip.top="'Visualização'" class="w-full flex justify-center cursor-pointer" @click="emitView">
            <img src="@/assets/icons/eye.svg" alt="View" />
        </button>

        <button  v-tooltip.top="'Edição'" class="w-full flex justify-center cursor-pointer" @click="emitEdit">
            <img src="@/assets/icons/edit.svg" alt="Edit" />
        </button>

        <button v-tooltip.top="'Excluir'" class="w-full flex justify-center cursor-pointer" @click="emitExcluir">
            <img src="@/assets/icons/x.svg" alt="Cancel" />
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ActionsButtons',
    props: {
        itemId: {
            type: Number,
            required: true,
        },
        showEdit: {
            type: Boolean,
            default: false,
        },
        showHomologation: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['view', 'edit', 'excluir'],
    methods: {
        emitView() {
            this.$emit('view', this.itemId);
        },
        emitEdit() {
            this.$emit('edit', this.itemId);
        },
        emitExcluir() {
            this.$emit('excluir', this.itemId);
        },
    },
});
</script>

<style lang="scss">
.p-width-icons {
    font-size: 26px;
}
</style>