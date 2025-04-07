<template>
    <div>
        <DialogDefaultComponent header="Cadastro de Produtos" :visible="visible" modal closable
            @update:visible="$emit('close')" width="90%">

            <div class="flex flex-col lg:grid lg:grid-cols-2 gap-6">
                <InputTextField id="product_name" name="name" label="Nome" placeholder="Informe o nome do produto"
                    :disabled="true" v-model="dataObject.name" />
                <InputTextField id="product_description" name="description" label="Descrição"
                    placeholder="Informe a descrição do produto" :disabled="true" v-model="dataObject.description" />
            </div>

            <div class="flex flex-col lg:grid lg:grid-cols-2 gap-6 mt-6">
                <InputTextField id="product_price" name="price" label="Preço" placeholder="Informe o preço"
                    :disabled="true" v-model="dataObject.price" />
                <InputTextField id="product_expirationDate" name="expirationDate" label="Data de validade"
                    placeholder="Informe a data de validade" :disabled="true"
                    :model-value="formatDate(dataObject.expirationDate)" />
            </div>

            <div class="flex flex-col lg:grid lg:grid-cols-2 gap-6 mt-6">
                <InputTextField id="product_name" name="categories" label="Nome da Categoria"
                    placeholder="Informe o nome da categoria" :disabled="true" v-model="dataObject.category.name" />
                <InputTextField id="product_description" name="categories" label="Imagem do Produto"
                    placeholder="Informe o nome da categoria" type="file" :disabled="true" />
            </div>

            <template #footer>
                <ButtonComponent label="Voltar" outlined @click="$emit('close')" />
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
import dayjs from 'dayjs';

export default defineComponent({
    name: "ModalViewProduct",
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
        dataObject: {
            type: Object,
            default: () => ({}),
        }
    },
    emits: ["close", "save"],
    setup(props, { emit }) {

        const formatDate = (dataObject: any) => {
            return dayjs(dataObject).format("DD/MM/YYYY");
        }

        return {
            formatDate
        };
    },
})

</script>