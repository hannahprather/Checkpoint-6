import { AppState } from "../AppState"
import { Post } from "../models/post"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class PostsService {
  async getAll(query = {}) {
    const res = await api.get('api/posts', { params: query })
    logger.log('[get all posts]', res.data)
    AppState.posts = res.data.posts
  }

  async createPost(post) {
    try {
      await api.post('api/posts/', post);
      this.getAll()
    } catch (error) {

    }
  }
  async getNewPage() {
    AppState.posts = []
    AppState.postsData = {}
    AppState.currentPage--
    const res = await api.get(`api/posts?page=${AppState.currentPage}`)
    AppState.postsData = res.data
    AppState.posts = res.data.posts.map(p => new Post(p))
  }
  async getOldPage() {
    AppState.posts = []
    AppState.postsData = {}
    AppState.currentPage++
    const res = await api.get(`api/posts?page=${AppState.currentPage}`)
    AppState.postsData = res.data
    AppState.posts = res.data.posts.map(p => new Post(p))
  }
}
export const postsService = new PostsService()