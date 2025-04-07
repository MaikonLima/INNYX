<template>
    <div class="m-8">
        <h1 class="font-bold md:text-2xl text-xl mb-10">
            Lista de Categorias
        </h1>
        <div class="flex flex-col md:flex-row gap-2 justify-end">
            <ButtonComponent label="Nova categoria" icon="pi pi-plus" @click="openCurrentModal" />
            <div class="flex flex-row gap-2 justify-end lg:w-96">
                <InputSeach placeholder="Pesquisar" type="search" v-model="textSearch" />
            </div>
        </div>

        <DataTableComponent :headers="colunas" :data="itemsData" :showActions="true" :itemsPerPage="itemsPerPage"
            pagination @view="openViewModal">
        </DataTableComponent>

        <ModalCreateCategories :visible="openModalCreate" @close="openModalCreate = false" @save="() => {}" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent.vue';
import InputSeach from '../../components/InputComponent/InputSearchComponent/InputSeach.vue';
import ModalCreateCategories from './Modal/ModalCreateCategories/ModalCreateCategories.vue';
import DataTableComponent from '../../components/DataTableComponent/DataTableComponent.vue';

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
    { id: 6, code_sap: "SAP006", description: "Produto F", client: "Cliente U", createdAt: "2023-10-06" },
    { id: 7, code_sap: "SAP007", description: "Produto G", client: "Cliente T", createdAt: "2023-10-07" },
    { id: 8, code_sap: "SAP008", description: "Produto H", client: "Cliente S", createdAt: "2023-10-08" },
    { id: 9, code_sap: "SAP009", description: "Produto I", client: "Cliente R", createdAt: "2023-10-09" },
    { id: 10, code_sap: "SAP010", description: "Produto J", client: "Cliente Q", createdAt: "2023-10-10" },
    { id: 11, code_sap: "SAP011", description: "Produto K", client: "Cliente P", createdAt: "2023-10-11" },
    { id: 12, code_sap: "SAP012", description: "Produto L", client: "Cliente O", createdAt: "2023-10-12" },
    { id: 13, code_sap: "SAP013", description: "Produto M", client: "Cliente N", createdAt: "2023-10-13" },
    { id: 14, code_sap: "SAP014", description: "Produto N", client: "Cliente M", createdAt: "2023-10-14" },
    { id: 15, code_sap: "SAP015", description: "Produto O", client: "Cliente L", createdAt: "2023-10-15" },
    { id: 16, code_sap: "SAP016", description: "Produto P", client: "Cliente K", createdAt: "2023-10-16" },
    { id: 17, code_sap: "SAP017", description: "Produto Q", client: "Cliente J", createdAt: "2023-10-17" },
    { id: 18, code_sap: "SAP018", description: "Produto R", client: "Cliente I", createdAt: "2023-10-18" },
    { id: 19, code_sap: "SAP019", description: "Produto S", client: "Cliente H", createdAt: "2023-10-19" },
    { id: 20, code_sap: "SAP020", description: "Produto T", client: "Cliente G", createdAt: "2023-10-20" }
]);

const openCurrentModal = () => {
    openModalCreate.value = true;
}

const openViewModal = () => {
    openModalView.value = true;
}


</script>

<style scoped></style>