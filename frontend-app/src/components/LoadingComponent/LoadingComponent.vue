<template>
    <div v-if="isLoading" class="loading-overlay">
        <div class="loading-content">
            <img src="@/assets/icons/stock-icon.png" alt="Loading Image" />
            <div class="loader"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "LoadingComponent",
    props: {
        isLoading: {
            type: Boolean,
            required: true,
        },
    },
});
</script>

<style scoped>
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.loading-content {
    text-align: center;
    color: white;
}

.loading-image {
    width: 10rem;
    height: 10rem;
}

.loading-spinner {
    font-size: 3rem;
    margin-top: 10px;
}

.loader {
    width: fit-content;
    font-weight: bold;
    font-family: sans-serif;
    font-size: 30px;
    padding-bottom: 8px;
    background: linear-gradient(currentColor 0 0) 0 100%/0% 3px no-repeat;
    animation: l2 2s linear infinite;
}

.loader:before {
    content: "Carregando...";
}

@keyframes l2 {
    to {
        background-size: 100% 3px;
    }
}
</style>