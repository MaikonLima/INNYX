<template>
    <div>
        <DialogDefaultComponent header="Cadastro de Produtos" :visible="visible" modal closable
            @update:visible="$emit('close')" width="90%">

            <div class="flex flex-col lg:grid lg:grid-cols-2 gap-6">
                <InputTextField id="product_name" name="name" label="Nome" placeholder="Informe o nome do produto"
                    v-model="storeProduct.name" />
                <InputTextField id="product_description" name="description" label="Descrição"
                    placeholder="Informe a descrição do produto" v-model="storeProduct.description" />
            </div>

            <div class="flex flex-col lg:grid lg:grid-cols-2 gap-6 mt-6">
                <InputTextField id="product_price" name="price" label="Preço" placeholder="Informe o preço"
                    v-model="storeProduct.price" type="number" />
                <DatePickerComponent :dateFormat="dateFormat" :minDate="minDate" v-model="storeProduct.expirationDate
                    " :inline="false" label="Prazo Limite" :placeholder="'Informe um prazo'" />
            </div>

            <div class="flex flex-col lg:grid lg:grid-cols-2 gap-6 mt-6">
                <SelectDefaultComponent label="Selecione o nível de acesso" v-model="storeProduct.categoryId"
                    :options="optionsCategories" optionLabel="name" optionId="id" optionValue="'id'"
                    placeholder="Selecione a opção" size="medium" />

                <InputTextField id="product_description" name="categories" label="Imagem do Produto"
                    placeholder="Informe o nome da categoria" type="file" v-model="storeProduct.imageName" />
            </div>

            <template #footer>
                <ButtonComponent label="Cancelar" outlined @click="$emit('close')" />
                <ButtonComponent label="Enviar" @click="$emit('save')" />
            </template>

            <template #closeicon="{ class: closeIconClass }">
                <i :class="['pi pi-times', closeIconClass]" @click="$emit('close')"></i>
            </template>
        </DialogDefaultComponent>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import DialogDefaultComponent from '../../../../components/DialogComponent/DialogDefaultComponent.vue';
import ButtonComponent from '../../../../components/ButtonComponent/ButtonComponent.vue';
import InputTextField from '../../../../components/InputComponent/InputTextFieldComponent/InputTextField.vue';
import SelectDefaultComponent from '../../../../components/InputComponent/SelectComponent/SelectDefaultComponent.vue';
import { getOptions } from '../../../../services/Calls/CategoryCall';
import { useProductStore } from '../../../../store/productStore';
import DatePickerComponent from '../../../../components/DatePickerComponent/DatePickerComponent.vue';

export default defineComponent({
    name: "ModalCreateProduct",
    components: {
        DialogDefaultComponent,
        InputTextField,
        ButtonComponent,
        SelectDefaultComponent,
        DatePickerComponent
    },
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },
    emits: ["close", "save"],
    setup() {
        const storeProduct = useProductStore();
        const optionsCategories = ref<any>([]);
        const dateFormat = ref("dd/mm/yy");
        const minDate = new Date();

        onMounted(() => {
            getOption()
        })

        const getOption = async () => {
            getOptions()
                .then((res) => {
                    optionsCategories.value = res.data;
                })
                .catch((error) => {
                    console.log(error);

                })
        }

        return {
            storeProduct,
            optionsCategories,
            dateFormat,
            minDate
        }
    }
})

</script>