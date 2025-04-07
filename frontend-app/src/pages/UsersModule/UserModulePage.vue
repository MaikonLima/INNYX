<template>
    <LoadingComponent :isLoading="isLoading" />
    <div class="m-8">
        <h1 class="font-semibold lg:text-4xl text-2xl mb-10">
            Lista de Usuários
        </h1>
        <div class="flex flex-col lg:flex-row gap-4 justify-end">
            <ButtonComponent label="Novo usuário" icon="pi pi-plus" @click="openCurrentModal" />
            <div class="flex flex-row gap-2 justify-end w-full lg:w-96">
                <InputSeach placeholder="Pesquisar" type="search" v-model="textSearch" />
            </div>
        </div>
        <DataTableComponent :headers="colunas" :data="itemsData" :showActions="true" :itemsPerPage="itemsPerPage"
            :currentPage="currentPage" :totalItems="totalItems" pagination @view="openViewModal"
            @cancel="openDeleteModal" @page-change="(newPage) => { currentPage.value = newPage; loadUsers(); }" />

        <Toast />
        <ConfirmDialog></ConfirmDialog>

        <CreateModalModule :visible="openModalCreate" @close="openModalCreate = false" @save="handlerSaveUser" />
        <ViewModalModule :dataObject="itemsDatabyId" :visible="openModalView" @close="openModalView = false" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent.vue';
import InputSeach from '../../components/InputComponent/InputSearchComponent/InputSeach.vue';
import DataTableComponent from '../../components/DataTableComponent/DataTableComponent.vue';
import CreateModalModule from './Modal/CreateModule/CreateModalModule.vue';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent.vue';
import dayjs from 'dayjs';
import { Toast, useConfirm, useToast } from 'primevue';
import { getUserById, removeUser, Users } from '../../services/Calls/UsersCall';
import ViewModalModule from './Modal/ViewModule/ViewModalModule.vue';
import { userStore } from '../../store/userStore';

const openModalCreate = ref(false);
const openModalView = ref(false);
const textSearch = ref("");
const isLoading = ref(false);
const itemsPerPage = ref(10);
const currentPage = ref(1);
const totalItems = ref(0);
const itemsDatabyId = ref([]);
const selectedProductId = ref(0);
const colunas = ref([
    { field: "id", header: "ID" },
    { field: "name", header: "Nome" },
    { field: "email", header: "E-mail" },
    { field: "roles", header: "Nível de acesso" },
    { field: "createdAt", header: "Data de criação" },
]);

const itemsData = ref([]);
const toast = useToast();
const storeUser = userStore();
const confirm = useConfirm();

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
        const skip = (currentPage.value - 1) * itemsPerPage.value;
        const take = itemsPerPage.value;

        const dados = await Users(take, skip);

        totalItems.value = dados.data.total;
        itemsData.value = dados.data.items.map((item: any) => ({
            id: item.id,
            name: item.name || "----",
            email: item.email || "----",
            roles:
                item.roles && item.roles.length > 0
                    ? formatRole(item.roles[0].roleId)
                    : "----",
            createdAt: item.createdAt
                ? dayjs(item.createdAt).format("DD/MM/YYYY")
                : "----",
        }));
    } catch (error) {
        toast.add({
            severity: "warn",
            summary: "Problemas de carregamento",
            detail: "Erro ao carregar dados.",
            life: 3000,
        });
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
        const dataById = await getUserById(id);
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

const handlerSaveUser = async () => {
    isLoading.value = true;
    try {
        const result = await storeUser.submitUserData();
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
        console.log(error, "aqui");

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
            await removeUser(item)
                .then(() => {
                    toast.add({ severity: 'success', summary: 'Confirmado', detail: 'Dado apagado com sucesso!', life: 3000 });
                })
                .catch(() => {
                    toast.add({ severity: 'error', summary: 'Cancelado', detail: 'Ocorreu um problema durante a exclusão', life: 3000 });
                })
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejeitado', detail: 'Você cancelou a exclusão', life: 3000 });
        }
    });
};

function formatRole(data: any) {
    return data === 1 ? 'ADMIN' : 'USER';
}


</script>

<style scoped></style>