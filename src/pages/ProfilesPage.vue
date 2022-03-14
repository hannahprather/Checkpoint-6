<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-8 justify-content-end">
        <img :src="activeProfile.picture" alt="profile pic" />
      </div>
      <!-- <p>{{ activeProfile.name }}</p> -->
      <p>{{ activeProfile.bio }}</p>
      <!-- <p>{{ activePro}}</p> -->
    </div>
    <Post v-for="p in posts" :key="p.id" :post="p" />
    <div>
      <div>
        <button
          :disabled="currentPage === 1"
          @click="getNewPage()"
          class="btn btn-secondary"
        >
          previous
        </button>
        <button
          @click="getOldPage(activeProfile.creatorId)"
          class="btn btn-secondary"
        >
          next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { useRoute } from "vue-router";
import { postsService } from "../services/PostsService";
import { watchEffect } from "@vue/runtime-core";
import { profilesService } from "../services/ProfilesService";
import { logger } from "../utils/Logger";
import Post from "../components/Post.vue";

export default {
  components: { Post },
  setup() {
    const activeProfile = computed(() => AppState.activeProfile);
    const posts = computed(() => AppState.posts);

    const route = useRoute();
    async function getActiveProfilePosts() {
      try {
        await postsService.getAll({ creatorId: route.params.id });
      } catch (error) {
        logger.log("error");
      }
    }

    watchEffect(async () => {
      if (route.params.id) {
        await profilesService.getProfileById(route.params.id);
        getActiveProfilePosts();
      }
    });
    return {
      activeProfile,
      posts,
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

<style>
</style>
