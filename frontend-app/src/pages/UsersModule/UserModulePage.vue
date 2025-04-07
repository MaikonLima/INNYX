<template>
    <div class="m-8">
        <h1 class="font-bold md:text-2xl text-xl mb-10">
            Lista de Usuários
        </h1>
        <div class="flex flex-col md:flex-row gap-2 justify-end">
            <ButtonComponent label="Novo usuário" icon="pi pi-plus" @click="openCurrentModal" />
            <div class="flex flex-row gap-2 justify-end w-full lg:w-96">
                <InputSeach placeholder="Pesquisar" type="search" v-model="textSearch" />
            </div>
        </div>
        <DataTableComponent :headers="colunas" :data="itemsData" :showActions="true" :itemsPerPage="itemsPerPage"
            pagination @view="openViewModal">
        </DataTableComponent>

        <CreateModalModule :visible="openModalCreate" @close="openModalCreate = false" @save="() => {}" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent.vue';
import InputSeach from '../../components/InputComponent/InputSearchComponent/InputSeach.vue';
import DataTableComponent from '../../components/DataTableComponent/DataTableComponent.vue';
import CreateModalModule from './Modal/CreateModule/CreateModalModule.vue';

const openModalCreate = ref(false);
const openModalView = ref(false);
const textSearch = ref("");
const itemsPerPage = ref(10);
const colunas = ref([
    { field: "id", header: "ID" },
    { field: "code_sap", header: "Código SAP" },
    { field: "description", header: "Descrição" },
    { field: "client", header: "Cliente" },
]);

const itemsData = ref([
    { id: 1, code_sap: "SAP001", description: "Produto AProduto AProduto", client: "Cliente X", createdAt: "2023-10-01" },
    { id: 2, code_sap: "SAP002", description: "Produto B", client: "Cliente YCliente YCliente YCliente Y", createdAt: "2023-10-02" },
    { id: 3, code_sap: "SAP003", description: "Produto C", client: "Cliente Z", createdAt: "2023-10-03" },
    { id: 4, code_sap: "SAP004", description: "Produto D", client: "Cliente W", createdAt: "2023-10-04" },
    { id: 5, code_sap: "SAP005", description: "Produto E", client: "Cliente V", createdAt: "2023-10-05" },
]);

const openCurrentModal = () => {
    openModalCreate.value = true;
}

const openViewModal = () => {
    openModalView.value = true;
}

</script>

<style scoped></style>