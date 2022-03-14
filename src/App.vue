<template>
  <header>
    <Navbar />
    <bilboard v-for="b in bilboards" :key="b.title" :bilboard="b" />
  </header>
  <main>
    <div class="container-fluid"></div>
    <router-view />
  </main>
  <footer></footer>
</template>

<script>
import { computed, onMounted } from "vue";
import { AppState } from "./AppState";
import { bilboardService } from "./services/BilboardsService";
import bilboard from "./components/bilboard.vue";
export default {
  components: { bilboard },
  name: "App",

  setup() {
    onMounted(async () => {
      try {
        await bilboardService.getBilboards();
      } catch (error) {
        Pop.toast(error.message, "error");
      }
    });
    return {
      appState: computed(() => AppState),
      bilboards: computed(() => AppState.bilboard),
    };
  },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
