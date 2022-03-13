import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  posts: [],
  activeProfile: {},
  url: {
    page: 0,
    newer: '',
    older: ''
  },
  currentPage: 1,
  likes: [],
  postsData: {}
})
