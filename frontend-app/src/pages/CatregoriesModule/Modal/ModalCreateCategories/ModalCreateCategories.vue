<template>
    <div>
        <DialogDefaultComponent header="Cadastro de Categoria" :visible="visible" modal closable
            @update:visible="$emit('close')" width="60%" height="30%">

            <div class="flex flex-row">
                <InputTextField id="categories_name" name="categories" label="Nome da Categoria"
                    placeholder="Informe o nome da categoria" />
            </div>

            <template #footer>
                <ButtonComponent label="Cancelar" outlined @click="$emit('close')" />
                <ButtonComponent label="Salvar" @click="$emit('save')" />
            </template>

            <template #closeicon="{ class: closeIconClass }">
                <i :class="['pi pi-times', closeIconClass]" @click="$emit('close')"></i>
            </template>
        </DialogDefaultComponent>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DialogDefaultComponent from '../../../../components/DialogComponent/DialogDefaultComponent.vue';
import ButtonComponent from '../../../../components/ButtonComponent/ButtonComponent.vue';
import InputTextField from '../../../../components/InputComponent/InputTextFieldComponent/InputTextField.vue';

export default defineComponent({
    name: "ModalCreateCategories",
    components: {
        DialogDefaultComponent,
        InputTextField,
        ButtonComponent
    },
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },
    emits: ["close", "save"],
})

</script>

<style scoped></style>