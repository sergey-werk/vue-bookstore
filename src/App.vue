<template>
  <div id="app" class="layout">
    <TheNavbar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue';

export default {
  components: {
    TheNavbar,
  },
};
</script>
