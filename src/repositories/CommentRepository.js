class CommentRepository {
    constructor() {
        this._comments = []
    }

    async getAll(productId) {
        return this._comments.filter(comment => comment.productId === productId).reverse();
    }

   async add(productId, comment) {
        this._comments.push({productId, ...comment})
        return comment
    }
}

module.exports = { CommentRepository }