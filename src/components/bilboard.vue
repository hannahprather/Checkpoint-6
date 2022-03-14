<template>
  <div class="row m-0 p-0">
    <div class="col-md-4">
      <img :src="bilboards[0].banner" class="img-fluid" alt="" />
    </div>
    <div class="col-md-4" v-if="bilboards[0] != null">
      <img :src="bilboards[1].banner" class="img-fluid" alt="" />
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { AppState } from "../AppState";

export default {
  name: "bilboard",
  setup() {
    return {
      bilboards: computed(() => AppState.bilboard),
    };
  },
  components: {},
};
</script>

<style scoped lang="scss">
</style>