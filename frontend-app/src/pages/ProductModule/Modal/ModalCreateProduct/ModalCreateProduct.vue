<template>
    <div>
        <DialogDefaultComponent header="Cadastro de Produtos" :visible="visible" modal closable
            @update:visible="$emit('close')" width="90%">

            <div class="flex flex-col lg:grid lg:grid-cols-2 gap-6">
                <InputTextField id="product_name" name="name" label="Nome"
                    placeholder="Informe o nome do produto" />
                <InputTextField id="product_description" name="description" label="Descrição"
                    placeholder="Informe a descrição do produto" />
            </div>

            <div class="flex flex-col lg:grid lg:grid-cols-2 gap-6 mt-6">
                <InputTextField id="product_price" name="price" label="Preço"
                    placeholder="Informe o preço" />
                <InputTextField id="product_expirationDate" name="expirationDate" label="Data de validade"
                    placeholder="Informe a data de validade" />
            </div>

            <div class="flex flex-col lg:grid lg:grid-cols-2 gap-6 mt-6">
                <InputTextField id="product_name" name="categories" label="Nome da Categoria"
                    placeholder="Informe o nome da categoria" />
                <InputTextField id="product_description" name="categories" label="Nome da Categoria"
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
    name: "ModalCreateProduct",
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