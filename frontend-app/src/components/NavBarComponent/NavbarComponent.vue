<template>
    <nav class="p-4 flex items-center justify-between fixed w-full h-20 z-10">
        <div class="flex items-center space-x-2 gap-4">
            <button class="gray-700 focus:outline-none cursor-pointer" @click="toggleMenuUser"
                aria-controls="overlay_menu">
                <img src="@/assets/icons/menu.svg" class="h-8 w-8" />
            </button>
            <a href="/">
                <img src="@/assets/icons/stock-icon.png" alt="Icon" class="h-12 w-12" />
            </a>
            <!-- <span class="text-2xl lg:text-3xl font-bold text-amber-50">Gerenciamento de Estoque</span> -->

            <span class="text-2xl lg:text-3xl font-bold text-amber-50"></span>
        </div>

        <div class="relative flex gap-4 lg:mr-8">

            <button class="gray-700 focus:outline-none cursor-pointer" @click="() => { }">
                <img src="@/assets/icons/user.svg" class="h-8 w-8" />
            </button>
        </div>

        <Drawer :visible="isVisible" @update:visible="isVisible = $event" class="bg-color-drawer">
            <template #container="{ closeCallback }">
                <div class="flex flex-col h-full">
                    <div class="flex items-center justify-between px-6 pt-4 shrink-0">
                        <span class="items-center flex flex-row justify-between gap-2">
                            <svg width="35" height="40" viewBox="0 0 35 40" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="..." fill="var(--p-primary-color)" />
                                <path d="..." fill="var(--p-text-color)" />
                            </svg>
                            <img src="@/assets/icons/stock-icon.png" />
                            <span class="font-semibold text-2xl text-white">
                                Menu
                            </span>
                        </span>
                        <span>
                            <Button type="button" @click="closeCallback" icon="pi pi-times"
                                class="text-white bg-button-close" rounded outlined></Button>
                        </span>
                    </div>
                    <div class="overflow-y-auto">
                        <ul class="list-none p-0 m-0 overflow-hidden">
                            <li v-for="(item, index) in options" :key="index">
                                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                                    <a v-ripple :href="href" @click="navigate"
                                        class="flex items-center cursor-pointer p-4 rounded duration-150 transition-colors p-ripple"
                                        :class="[
                                            $route.path === item.route
                                                ? 'bg-surface-200 text-black font-bold'
                                                : 'text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-500 dark:text-black font-bold'
                                        ]">
                                        <i :class="item.icon + ' mr-2'"></i>
                                        <span class="font-medium">{{ item.label }}</span>
                                    </a>
                                </router-link>
                                <a v-else v-ripple :href="item.url || '#'" :target="item.target || '_self'"
                                    class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple">
                                    <i :class="item.icon + ' mr-2'"></i>
                                    <span class="font-medium">{{ item.label }}</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="mt-auto">
                        <hr class="mb-4 mx-4 border-t border-0 border-surface-200 dark:border-surface-700" />
                        <a v-ripple
                            class="m-4 flex items-center cursor-pointer p-4 gap-2 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple">
                            <Avatar image="/images/avatar/amyelsner.png" shape="circle" />
                            <span class="font-bold">Amy Elsner</span>
                        </a>
                    </div>
                </div>
            </template>
        </Drawer>
    </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import DrawerComponent from '../DrawerComponent/DrawerComponent.vue';
import { Avatar } from 'primevue';

interface User {
    nome_completo: string;
    matricula: string;
    email: string;
    cargo: {
        descricao: string;
    };
    nivel_de_acesso: {
        descricao: string;
    };
    User_Sistema: Array<{
        sistema: {
            descricao: string;
        };
    }>;
}

export default defineComponent({
    components: {
        DrawerComponent,
    },
    setup() {
        const showMenu = ref(false);
        const isVisible = ref(false);
        const options: any[] = [
            {
                label: "Produtos",
                icon: "pi pi-file-edit",
                route: "/",
            },
            {
                label: "Usuários",
                icon: "pi pi-user",
                route: "/users-module",
            },
            {
                label: "Catergorias",
                icon: "pi pi-copy",
                route: "/categories-module",
            }
        ];

        const logout = () => {
            document.cookie = 'auth._token.local=false';
            document.cookie = 'auth._token_expiration.local=false';
            window.location.replace('http://localhost:5173/login');
        };

        const toggleMenuUser = () => {
            isVisible.value = !isVisible.value;
        };

        return {
            showMenu,
            isVisible,
            options,
            logout,
            toggleMenuUser,
        };
    },
});
</script>

<style>
nav {
    background-color: #10B981;
}

.bg-color-drawer {
    background-color: #10B981 !important;
    border-color: #10B981;
}

.bg-button-close {
    color: white !important;
    border-color: white !important;

}

.bg-button-close:hover {
    background-color: transparent !important;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    padding: 10px;
    cursor: pointer;
}

li:hover {
    background-color: #f0f0f0;
}

.containerMenu {
    display: flex;
    justify-content: center;
    height: 100vh;
    width: 100%;
    position: fixed;
    z-index: 1;
    top: 100vh;
    left: 0;
    padding-top: 10vh;
}

.containerMenu .line {
    width: 0%;
    height: 0.1rem;
    background: black;
    z-index: 2;
    position: fixed;
    transition: width 0.5s 0.2s;
}

.containerMenu .frameMenu {
    width: 100%;
    height: 23rem;
    background: var(--bgMain);
    z-index: 1;
    position: fixed;
    top: -23rem;
    padding: calc(10vh + 1rem) 1rem 1rem 1rem;

    display: grid;
    grid-template: 1fr / 1fr 0.5fr;

    transition: top 0.8s;
}

.containerMenu .frameMenu .containerSistems {
    border-right: 1px solid #d5e7d9;
}

.containerMenu .frameMenu .containerSistems ul {
    display: grid;
    gap: 0.5rem;
    width: fit-content;
}

.containerMenu .frameMenu .containerSistems ul li {
    list-style: none;
    border-radius: 1rem;
    padding: 0.5rem;
    display: flex;
}

.containerMenu .frameMenu .containerSistems ul li a {
    width: 100%;
    color: var(--labelInt);
}

.containerMenu .frameMenu .containerSistems ul li:not(.checkLink):hover {
    background: #ececec;
}

.containerMenu .frameMenu .containerSistems ul .checkLink {
    background: var(--green-200);
}

.containerMenu .frameMenu .containerUser {
    padding-left: 1vw;
}

.containerMenu .frameMenu .containerUser ul {
    display: grid;
    width: fit-content;
}

.containerMenu .frameMenu .containerUser ul li {
    list-style: none;
    border-radius: 1rem;
    padding: 0.5rem;
    display: flex;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: #757575;
}

.containerMenu .frameMenu .containerUser button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1.5rem;
    border-radius: 2rem;
    margin: 1rem 0 0 auto;
}

.containerMenu .frameMenu .containerUser button img {
    width: 1rem;
}

.containerMenu .frameMenu h4 {
    padding-left: 0.5vw;
    margin-bottom: 1rem;
    font-size: 1.3rem;
    display: flex;
    color: #9b9b9b;
    align-items: flex-end;
    gap: 0.5rem;
}

.containerMenu .frameMenu h4 img {
    width: 2rem;
}

.containerMenu.showMenu {
    top: 0vh;
    background: rgba(3, 3, 96, 0.321);
}

.containerMenu.showMenu .line {
    width: 100%;
    height: 0.1rem;
    background: black;
    z-index: 2;
}

.containerMenu.showMenu .frameMenu {
    transition-delay: 0s;
    top: 0rem;
}

.active-menu-item {
    font-weight: bold;
    background-color: blue;
}
</style>
