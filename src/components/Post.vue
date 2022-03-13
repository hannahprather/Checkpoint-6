<template>
  <div class="bg-light rounded shadow">
    <div class="d-flex">
      <router-link
        :to="{ name: 'Profile', params: { id: post.creatorId } }"
        class="selectable"
      >
        <img
          :src="post.creator.picture"
          alt=""
          class="selectable ppic p-4 rounded-circle"
        />
      </router-link>
      <h3 class="m-4 p-4">{{ post.creator.name }}</h3>
    </div>
    <div class="text-center d-flex flex-column">
      <img :src="post.imgUrl" alt="" class="img-fluid p-2 selectable" />
      <i class="mdi mdi-heart"></i>
      <h5>{{ post.body }}</h5>
      <button
        v-if="post.creatorId === loggedInUser.id"
        class="btn-primary"
        @click="deletePost()"
      >
        delete
      </button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { postsService } from "../services/PostsService";
import { useRouter } from "vue-router";
import { AppState } from "../AppState";
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const loggedInUser = computed(() => AppState.account);

    onMounted(async () => {
      try {
      } catch (error) {}
    });
    return {
      loggedInUser,
      posts: computed(() => AppState.posts),
      deletePost() {
        console.log("hello deleting");
      },
    };
  },
};
</script>

<style scoped lang="scss">
.ppic {
  max-height: 200px;
  max-width: 200px;
  margin: 1;
}
</style>