<template>
    <div v-if="data.length === 0" class="table-container">
        <table class="rounded-table">
            <thead>
                <tr>
                    <th v-for="(header, index) in headers" :key="index">
                        {{ header.header }}
                    </th>
                    <th class="w-60">Ações</th>
                </tr>
            </thead>
        </table>
        <div class="w-full h-98 flex flex-col items-center mb-10">
            <div class="flex justify-center w-full">
                <img src="@/assets/icons/no_data.svg" class="w-full h-96" />
            </div>
            <span>Sem dados cadastrados :(</span>
        </div>
    </div>
    <div v-else class="table-container">
        <table class="rounded-table">
            <thead>
                <tr>
                    <th v-for="(header, index) in headers" :key="index">
                        {{ header.header }}
                    </th>
                    <th class="w-auto min-w-min">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in paginatedData" :key="index">
                    <td v-for="(header, idx) in headers" class="break-all" :key="idx" :data-label="header.header">
                        <slot :name="`column-${header.field}`" :row="row">
                            {{ row[header.field] }}
                        </slot>
                    </td>
                    <td data-label="Ações">
                        <ActionsButtons :itemId="row.id" @view="viewItem" @edit="editItem" @excluir="cancelItem" />
                    </td>
                </tr>
            </tbody>
        </table>
        <tfoot class="flex justify-end w-full flex-col">
            <tr>
                <td :colspan="headers.length" class="footer-left w-full">
                    Total: {{ data.length }}
                </td>
                <td class="footer-right" v-if="pagination">
                    <div class="pagination flex items-center">
                        <button class="rounded-full w-8 h-8 cursor-pointer bg-color-paginator" @click="previousPage"
                            :disabled="currentPage === 1">
                            <img src="@/assets/icons/arrow-left.svg" class="ml-1" />
                        </button>
                        <span class="font-semibold w-24 text-center">Página {{ currentPage }} de {{ totalPages }}</span>
                        <button class="rounded-full w-8 h-8 cursor-pointer bg-color-paginator" @click="nextPage"
                            :disabled="currentPage === totalPages">
                            <img src="@/assets/icons/arrow-right.svg" class="ml-1" />
                        </button>
                    </div>
                </td>
            </tr>
        </tfoot>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import ActionsButtons from './ActionsButtons/ActionsButtons.vue';

interface Header {
    header: string;
    field: string;
}

interface Row {
    id: string;
    status: string;
    [key: string]: any;
}

export default defineComponent({
    name: 'DataTable',
    components: {
        ActionsButtons,
    },
    props: {
        headers: {
            type: Array as () => Header[],
            required: true,
        },
        data: {
            type: Array as () => Row[],
            required: true,
        },
        showActions: {
            type: Boolean,
            default: false,
        },
        itemsPerPage: {
            type: Number,
            default: 10,
        },
        pagination: {
            type: Boolean,
            default: true,
        },
        isEnabledButton: {
            type: Boolean
        }
    },
    setup(props, { emit }) {
        const currentPage = ref(1);
        // const userStore = useUserStore();

        const totalPages = computed(() => {
            return Math.ceil(props.data.length / props.itemsPerPage);
        });

        const paginatedData = computed(() => {
            const start = (currentPage.value - 1) * props.itemsPerPage;
            const end = Math.min(start + props.itemsPerPage, props.data.length);
            return props.data.slice(start, end);
        });

        const isSpecificScreen = computed(() => {
            return window.location.pathname === "/";
        });

        const nextPage = () => {
            if (currentPage.value < totalPages.value) {
                currentPage.value++;
            }
        };

        const previousPage = () => {
            if (currentPage.value > 1) {
                currentPage.value--;
            }
        };

        const viewItem = (itemId: string) => {
            emit("view", itemId);
        };

        const editItem = (itemId: string) => {
            emit("edit", itemId);
        };

        const cancelItem = (itemId: string) => {
            emit("cancel", itemId);
        };

        return {
            currentPage,
            // userStore,
            totalPages,
            paginatedData,
            isSpecificScreen,
            nextPage,
            previousPage,
            viewItem,
            editItem,
            cancelItem,
        };
    },
});
</script>

<style scoped>
.table-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: auto;
    margin-top: 30px;
    border: 1px solid #f1f5f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.rounded-table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 10px;
    overflow: hidden;
}

.rounded-table th,
.rounded-table td {
    padding: 12px;
    text-align: left;
}

.rounded-table thead {
    background-color: #10B981;
    color: #FFF;
}

.bg-color-paginator {
    background-color: #10B981;
}

.bg-color-paginator:disabled {
    background-color: #e5e7eb;
}

tfoot td {
    padding: 10px;
    font-weight: bold;
}

.footer-left {
    text-align: left;
    border-top: 1px solid #e5e7eb;
}

.footer-right {
    border-top: 1px solid #e5e7eb;
    height: 100%;
}

.pagination {
    display: flex;
    gap: 16px;
    font-size: 14px;
}

@media (max-width: 768px) {
    .table-container {
        max-width: 100%;
        overflow-x: auto;
    }

    .rounded-table {
        position: relative;
    }

    thead th {
        position: sticky;
        top: 0;
        background-color: #f1f5f9;
        color: #27292d;
        z-index: 1;
    }

    tfoot td {
        position: sticky;
        bottom: 0;
        background-color: #f1f1f1;
    }
}

@media (max-width: 768px) {
    thead {
        display: none;
    }

    td {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        border-bottom: 1px solid #f1f1f1;
    }

    td::before {
        content: attr(data-label);
        font-weight: bold;
        text-transform: uppercase;
    }
}
</style>