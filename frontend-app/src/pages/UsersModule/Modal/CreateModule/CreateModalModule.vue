<template>
    <div>
        <DialogDefaultComponent header="Cadastro de Usuários" :visible="visible" modal closable
            @update:visible="$emit('close')" width="60%">

            <div class="flex flex-col lg:grid lg:grid-cols-2 gap-6">
                <InputTextField id="user_name" name="name" label="Nome" placeholder="Informe o nome" />
                <InputTextField id="user_email" name="email" label="E-mail" placeholder="Informe o e-mail" />
            </div>
            <div class="flex flex-col lg:grid lg:grid-cols-2 gap-6 mt-6">
                <InputTextField id="user_password" name="password" label="Senha" placeholder="Informe a senha" />
                <SelectDefaultComponent size="medium" label="Nível de acesso" v-model="optionsReasons" :options="[]"
                    optionId="id" placeholder="Selecione o nível de acesso" :optionValue="'id'" />
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
import { defineComponent, ref } from 'vue';
import DialogDefaultComponent from '../../../../components/DialogComponent/DialogDefaultComponent.vue';
import ButtonComponent from '../../../../components/ButtonComponent/ButtonComponent.vue';
import InputTextField from '../../../../components/InputComponent/InputTextFieldComponent/InputTextField.vue';
import SelectDefaultComponent from '../../../../components/InputComponent/SelectComponent/SelectDefaultComponent.vue';

export default defineComponent({
    name: "ModalCreateUsers",
    components: {
        DialogDefaultComponent,
        InputTextField,
        ButtonComponent,
        SelectDefaultComponent
    },
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },
    emits: ["close", "save"],
    setup() {
        const optionsReasons = ref([
            { id: 1, description: "Admin" },
            { id: 2, description: "User" },
        ])
        return {
            optionsReasons
        }
    }
})

</script>

<style scoped></style>