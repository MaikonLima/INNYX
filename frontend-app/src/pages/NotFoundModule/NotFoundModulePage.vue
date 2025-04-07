<template>
    <div class="not-found">
        <h1>404 - Página não encontrada</h1>
        <p>A página que você está procurando não existe.</p>
        <router-link to="/">Voltar para a página inicial</router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'NotFoundPage',
});
</script>

<style scoped>
.not-found {
    text-align: center;
    margin-top: 50px;
}
</style>