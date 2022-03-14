export class Post {
  constructor(data) {
    this.id = data.id
    this.likes = data.likeIds
    this.imgUrl = data.imgUrl
    this.creator = data.creator
    this.likeIds = data.likeIds
    this.body = data.body
    this.creatorId = data.creatorId
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    this.older = data.older
    this.likes = data.likes
  }
}