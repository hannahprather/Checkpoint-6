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
      <p>{{ post.likeIds.length }}</p>
      <h5>{{ post.body }}</h5>
      <button
        v-if="post.creatorId === loggedInUser.id"
        class="btn-primary"
        @click="deletePost(post.id)"
      >
        delete
      </button>
      <button
        v-if="post.creatorId === loggedInUser.id"
        class="btn-secondary"
        @click="isEditing = !isEditing"
      >
        edit
      </button>

      <button @click="likePost(post.id)">Like</button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from "@vue/runtime-core";
import { postsService } from "../services/PostsService";
import { useRouter } from "vue-router";
import { AppState } from "../AppState";
import Pop from "../utils/Pop";
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
    const likesCount = computed(() => AppState.likes);

    const state = reactive({
      editedPost: {},
    });

    onMounted(async () => {
      try {
      } catch (error) {}
    });
    return {
      loggedInUser,
      isEditing: false,
      posts: computed(() => AppState.posts),
      deletePost(id) {
        console.log("hello from deleting");
        postsService.deletePost(id);
      },
      editPost(id) {
        console.log("hello from edditor");
      },
      likePost(id) {
        postsService.likePost(id);
      },
      likesCount,
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