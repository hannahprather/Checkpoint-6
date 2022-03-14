import { AppState } from "../AppState"
import { Post } from "../models/post"
import { router } from "../router"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
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
      router.push({ name: 'Home' })
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
  async deletePost(id) {
    try {
      if (
        await Pop.confirm(
          "Are you sure you want to delete this post?", "warning", "yes"
        )
      )
        await api.delete('api/posts/' + id)
      AppState.posts = AppState.posts.filter(p => p.id === id)
      this.getAll()
    } catch (error) {
      logger.log('deleted')
    }
  }
  async likePost(id) {
    try {
      const res = await api.post(`api/posts/${id}/like`)
      logger.log("Likes: ", res.data.likes)
      const postIndex = AppState.posts.findIndex(p => p.id === id)
      AppState.posts.splice(postIndex, 1, new Post(res.data))
      AppState.posts = [...AppState.posts]
    } catch (error) {
      logger.log(error)
    }
  }

}
export const postsService = new PostsService()