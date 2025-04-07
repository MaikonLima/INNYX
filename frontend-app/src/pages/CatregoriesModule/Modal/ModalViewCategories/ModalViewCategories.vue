<template>
    <div>
        <DialogDefaultComponent header="Cadastro de Produtos" :visible="visible" modal closable
            @update:visible="$emit('close')" width="90%">

            <div class="flex flex-col gap-6">
                <InputTextField id="product_name" name="name" label="Nome" placeholder="Informe o nome do produto"
                    :disabled="true" v-model="dataObject.name" />
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