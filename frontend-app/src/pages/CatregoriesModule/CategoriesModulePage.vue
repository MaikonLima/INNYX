<template>
    <LoadingComponent :isLoading="isLoading" />
    <div class="m-8">
        <h1 class="font-semibold md:text-4xl text-2xl mb-10">
            Lista de Categorias
        </h1>
        <div class="flex flex-col lg:flex-row gap-4 justify-end">
            <ButtonComponent label="Nova categoria" icon="pi pi-plus" @click="openCurrentModal" />
            <div class="flex flex-row gap-2 justify-end lg:w-96">
                <InputSeach placeholder="Pesquisar" type="search" v-model="textSearch" />
            </div>
        </div>

        <DataTableComponent :headers="colunas" :data="itemsData" :showActions="true" :itemsPerPage="itemsPerPage"
            pagination @view="openViewModal" @cancel="openDeleteModal">
        </DataTableComponent>

        <Toast />
        <ConfirmDialog></ConfirmDialog>

        <ModalCreateCategories :visible="openModalCreate" @close="openModalCreate = false"
            @save="handlerSaveCategory" />
        <ModalViewCategories :dataObject="itemsDatabyId" :visible="openModalView" @close="openModalView = false" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent.vue';
import InputSeach from '../../components/InputComponent/InputSearchComponent/InputSeach.vue';
import ModalCreateCategories from './Modal/ModalCreateCategories/ModalCreateCategories.vue';
import DataTableComponent from '../../components/DataTableComponent/DataTableComponent.vue';
import { Categories, getCategoriesById, removeCategories } from '../../services/Calls/CategoryCall';
import { ConfirmDialog, Toast, useConfirm, useToast } from 'primevue';
import dayjs from 'dayjs';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent.vue';
import ModalViewCategories from './Modal/ModalViewCategories/ModalViewCategories.vue';
import { useCategoriestore } from '../../store/categoryStore';

const openModalCreate = ref(false);
const openModalView = ref(false);
const textSearch = ref("");
const isLoading = ref(false);
const itemsPerPage = ref(10);
const itemsDatabyId = ref([]);
const selectedProductId = ref(0);
const storeCategories = useCategoriestore();
const colunas = ref([
    { field: "id", header: "ID" },
    { field: "name", header: "Nome da Categoria" },
    { field: "createdAt", header: "Data de Criação" },
]);

const itemsData = ref([]);

const toast = useToast();
const confirm = useConfirm();


const openCurrentModal = () => {
    openModalCreate.value = true;
}

const closeModalCurrent = () => {
    openModalCreate.value = false;
}

onMounted(() => {
    listAllCategories();
})

const listAllCategories = async () => {
    isLoading.value = true;
    try {
        const dados = await Categories();

        itemsData.value = dados.data.map((item: any) => ({
            id: item.id,
            name: item.name ? item.name : "----",
            createdAt: item.createdAt ? dayjs(item.createdAt).format("DD/MM/YYYY") : "----",
            homologation: item.homologation,
        }));
    } catch (error) {
        toast.add({ severity: 'warn', summary: 'Problemas de carregamento', detail: 'Erro ao carregar dados.', life: 3000 });
    }
    isLoading.value = false;
};

const openViewModal = async (item: any) => {
    selectedProductId.value = item;
    await getProductId(item);
    openModalView.value = true;
};

const getProductId = async (id: number) => {
    isLoading.value = true;
    try {
        const dataById = await getCategoriesById(id);
        itemsDatabyId.value = dataById.data;
    } catch (error) {
        toast.add({
            severity: 'warn',
            summary: 'Problemas de carregamento',
            detail: 'Erro ao carregar dados.',
            life: 3000
        });
    }
    isLoading.value = false;
};

const handlerSaveCategory = async () => {
    isLoading.value = true;
    try {
        const result = await storeCategories.submitCategoriesData(toast);
        console.log('Dados enviados com sucesso:', result);
        toast.add({
            severity: "success",
            summary: "Sucesso",
            detail: "Dados salvos com sucesso!",
            life: 3000,
        });
        closeModalCurrent();
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    } catch (error) {
        console.error('Falha ao enviar dados:', error);
        toast.add({
            severity: "error",
            summary: "Error",
            detail: `${error.response.data.message}`,
            life: 5000,
        });
        isLoading.value = false;
    }
    isLoading.value = false;
};

const openDeleteModal = async (item: any) => {
    confirm.require({
        message: 'Você quer apagar este registro?',
        header: 'Exclusão de dados',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        rejectProps: {
            label: 'Cancelar',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Deletar',
            severity: 'danger'
        },
        accept: async () => {
            isLoading.value = true;
            await removeCategories(item)
                .then(() => {
                    toast.add({ severity: 'success', summary: 'Confirmado', detail: 'Dado apagado com sucesso!', life: 3000 });
                    setTimeout(() => {
                        window.location.reload();
                    }, 500)
                })
                .catch(() => {
                    toast.add({ severity: 'error', summary: 'Cancelado', detail: 'Ocorreu um problema durante a exclusão', life: 3000 });
                })
                .finally(() => {
                    isLoading.value = false;
                })
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejeitado', detail: 'Você cancelou a exclusão', life: 3000 });
        }
    });
};


</script>

<style scoped></style>