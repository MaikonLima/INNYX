<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import PublicLayout from './layouts/PublicLayout.vue';
import PrivateLayout from './layouts/PrivateLayout.vue';

export default defineComponent({
  name: 'App',
  components: {
    PublicLayout,
    PrivateLayout,
  },
  setup() {
    const route = useRoute();

    const layout = computed(() => {

      const meta = route?.meta ?? {};
      return meta.requiresAuth ? PrivateLayout : PublicLayout;
    });

    return {
      layout,
    };
  },
});
</script>