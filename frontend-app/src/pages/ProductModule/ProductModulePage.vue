<template>
    <LoadingComponent :isLoading="isLoading" />

    <div class="m-8">
        <h1 class="font-semibold lg:text-4xl text-2xl mb-10">
            Lista de Produtos
        </h1>
        <div class="flex flex-col lg:flex-row gap-4 justify-end">
            <ButtonComponent label="Novo produto" icon="pi pi-plus" @click="openCurrentModal" />
            <div class="flex flex-row gap-2 justify-end w-full lg:w-96">
                <InputSeach placeholder="Pesquisar" type="search" v-model="textSearch" />
            </div>
        </div>
        <DataTableComponent :headers="colunas" :data="itemsData" :showActions="true" :itemsPerPage="itemsPerPage"
            pagination @view="openViewModal" @cancel="openDeleteModal">
        </DataTableComponent>

        <Toast />
        <ConfirmDialog></ConfirmDialog>

        <ModalCreateProduct :visible="openModalCreate" @close="openModalCreate = false" @save="handlerSaveProduct" />
        <ModalViewProduct :dataObject="itemsDatabyId" :visible="openModalView" @close="openModalView = false" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import dayjs from 'dayjs';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent.vue';
import InputSeach from '../../components/InputComponent/InputSearchComponent/InputSeach.vue';
import DataTableComponent from '../../components/DataTableComponent/DataTableComponent.vue';
import ModalCreateProduct from './Modal/ModalCreateProduct/ModalCreateProduct.vue';
import { Toast, useConfirm, useToast } from 'primevue';
import { getProductById, Products, removeProduct } from '../../services/Calls/ProductsCall';
import ModalViewProduct from './Modal/ModalViewProdutct/ModalViewProduct.vue';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent.vue';
import { useProductStore } from '../../store/productStore';


const openModalCreate = ref(false);
const openModalView = ref(false);
const textSearch = ref("");
const isLoading = ref(false);
const itemsPerPage = ref(10);
const itemsData = ref([]);
const itemsDatabyId = ref([]);
const selectedProductId = ref(0);
const toast = useToast();
const confirm = useConfirm();
const storeProduct = useProductStore();

const colunas = ref([
    { field: "id", header: "ID" },
    { field: "name", header: "Nome do produto" },
    { field: "description", header: "Descrição" },
    { field: "category", header: "Categoria" },
    { field: "expirationDate", header: "Data de validade" }
]);


const openCurrentModal = () => {
    openModalCreate.value = true;
}

const closeModalCurrent = () => {
    openModalCreate.value = false;
}

onMounted(() => {
    listAllUsers();
})

const listAllUsers = async () => {
    isLoading.value = true;
    try {
        const dados = await Products();
        itemsData.value = dados.data.items.map((item: any) => ({
            id: item.id,
            name: item.name ? item.name : "----",
            category: item.category.name ? item.category.name : "----",
            description: item.description ? item.description : "----",
            expirationDate: item.expirationDate ? dayjs(item.expirationDate).format("DD/MM/YYYY") : "----",
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
        const dataById = await getProductById(id);
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


const handlerSaveProduct = async () => {
    isLoading.value = true;
    try {
        const result = await storeProduct.sendProductData();
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
        toast.add({
            severity: "error",
            summary: "Error",
            detail: `${error}`,
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
            await removeProduct(item)
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