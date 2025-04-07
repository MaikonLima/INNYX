<template>
    <div>
        <NavBarComponent />
        <div class="pt-30">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBarComponent from "@/components/NavBarComponent/NavbarComponent.vue";

export default defineComponent({
    name: 'PrivateLayout',
    components: {
        NavBarComponent,
    },
});
</script>