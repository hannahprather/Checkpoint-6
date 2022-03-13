export class Post {
  constructor(data) {
    this.id = data.id
    this.likes = data.likeIds
    this.body = data.body
    this.imgUrl = data.imgUrl
    this.creator = data.creator
    this.creatorId = data.creatorId
    this.older = data.older
    this.likes = data.likes
    this.likeIds = data.likeIds
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }
}