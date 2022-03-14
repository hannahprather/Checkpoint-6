<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    <p>{{ account.bio }}</p>
  </div>

  <form @submit.prevent="createPost" action="">
    <div class="col-8 offset-2 my-2">
      <input
        type="text"
        placeholder="post body"
        class="form-control"
        v-model="state.newPost.body"
      />
      <input
        type="text"
        placeholder="Img URL"
        class="form-control"
        v-model="state.newPost.imgUrl"
      />
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal">
        Close
      </button>
      <button type="submit" class="btn btn-primary">Create Post</button>
    </div>
  </form>

  <form @submit.prevent="editProfile" action="">
    <div class="col-8 offset-2 my-2">
      <input
        type="text"
        placeholder="edit email"
        class="form-control"
        v-model="account.email"
      />
      <input
        type="text"
        placeholder="name"
        class="form-control"
        v-model="account.name"
      />
    </div>
    <div class="">
      <button type="button" class="btn btn-secondary">Close</button>
      <button type="submit" class="btn btn-primary">edit profile</button>
    </div>
  </form>
</template>

<script>
import { computed, reactive } from "vue";
import { AppState } from "../AppState";
import { postsService } from "../services/PostsService";
import { profilesService } from "../services/ProfilesService";
export default {
  name: "Account",
  setup() {
    const state = reactive({
      newPost: {
        likes: 0,
      },
    });
    const account = computed(() => AppState.account);

    return {
      state,
      account,
      createPost() {
        postsService.createPost(state.newPost);
      },
      editProfile() {
        profilesService.editAccount(account.value);
      },
    };
  },
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
