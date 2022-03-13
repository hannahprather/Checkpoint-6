<template>
  <div
    class="
      flex-grow-1
      d-flex
      flex-column
      align-items-center
      justify-content-center
      container-fluid
    "
  >
    <div class="row p-3 m-2">
      <div v-for="p in posts" :key="p.id" class="py-3">
        <Post :post="p" />
      </div>
    </div>
  </div>
  <div>
    <button
      :disabled="currentPage === 1"
      @click="getNewPage()"
      class="btn btn-secondary"
    >
      previous
    </button>
    <button @click="getOldPage()" class="btn btn-secondary">next</button>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import Pop from "../utils/Pop";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { postsService } from "../services/PostsService";

export default {
  name: "Home",
  setup() {
    onMounted(async () => {
      try {
        await postsService.getAll();
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      posts: computed(() => AppState.posts),
      async getOldPage() {
        try {
          await postsService.getOldPage();
        } catch (error) {
          Pop.toast("thats it folks!", "error", error);
        }
      },
      async getNewPage() {
        try {
          await postsService.getNewPage();
        } catch (error) {
          Pop.toast("error", error);
        }
      },
    };
  },
};
</script>

 <style scoped lang="scss">
.home {
  // display: grid;
  height: 80vh;
  place-content: center;
  // text-align: center;
  // user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
